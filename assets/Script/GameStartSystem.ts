const {ccclass, property} = cc._decorator;

import Block from "./Block";
import GameRules from "./GameRules";
import GameSession from "./GameSession";
import MatchFinder from "./MatchFinder";
import GridGenerator from "./GridGenerator";
import { BoosterType } from "./BoosterType";
import IBlockClickHandler from "./IBlockClickHandler";
import BoosterService, { BoosterAction } from "./BoosterService";
import PlayabilityService, { PlayabilityResult } from "./PlayabilityService";

@ccclass
export default class GameStartSystem extends cc.Component implements IBlockClickHandler {

    @property(cc.RichText)
    label: cc.RichText = null;

    @property(cc.RichText)
    label2: cc.RichText = null;

    @property
    targetScore: number = 200;

    @property(cc.Node)
    gridNode: cc.Node = null;

    @property(GridGenerator)
    gridGenerator: GridGenerator = null;

    @property(cc.Node)
    losePanel: cc.Node = null;

    @property(cc.Node)
    winPanel: cc.Node = null;

    @property(cc.Button)
    buttonYesLose: cc.Button = null;

    @property(cc.Button)
    buttonNoLose: cc.Button = null;

    @property(cc.Button)
    buttonYesWin: cc.Button = null;

    @property(cc.Button)
    buttonNoWin: cc.Button = null;

    @property(cc.RichText)
    QuantityBooster: cc.RichText = null;

    @property(cc.RichText)
    QuantityBooster2: cc.RichText = null;

    @property(cc.Node)
    Booster: cc.Node = null;

    @property(cc.Node)
    Booster2: cc.Node = null;

    @property(cc.SpriteFrame)
    iconBoosterBomb: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    iconBoosterTeleport: cc.SpriteFrame = null;

    @property({
        tooltip: "Радиус бомбы в клетках (1 = квадрат 3×3)"
    })
    bombRadius: number = 1;

    private readonly session = new GameSession();
    private matchFinder: MatchFinder = null;
    private boosterService: BoosterService = null;
    private playabilityService: PlayabilityService = null;

    start() {
        this.initServices();
        this.session.reset(this.targetScore);
        this.boosterService.initCounts();

        this.resolveBoosterRefs();
        this.applyBoosterIcons();
        this.setupBoosterButtons();
        this.updateUI();
        this.updateBoosterUI();

        if (this.losePanel) this.losePanel.active = false;
        if (this.winPanel) this.winPanel.active = false;

        this.bindPanelButtons();
        this.scheduleOnce(() => this.runPlayabilityCheck(), 0);
    }

    private initServices() {
        if (this.gridGenerator) {
            this.matchFinder = new MatchFinder(this.gridGenerator);
            this.playabilityService = new PlayabilityService(this.gridGenerator, this.matchFinder);
        }
        this.boosterService = new BoosterService(this.bombRadius);
    }

    private bindPanelButtons() {
        if (this.buttonYesLose) this.buttonYesLose.node.on('click', this.restartGame, this);
        if (this.buttonNoLose) this.buttonNoLose.node.on('click', this.exitGame, this);
        if (this.buttonYesWin) this.buttonYesWin.node.on('click', this.restartGame, this);
        if (this.buttonNoWin) this.buttonNoWin.node.on('click', this.exitGame, this);
    }

    onBlockClicked(block: Block) {
        if (!this.gridGenerator || !block || !cc.isValid(block.node) || this.isGameOver()) {
            return;
        }

        if (this.boosterService.activeType !== BoosterType.None) {
            this.handleBoosterBlockClick(block);
            return;
        }

        if (!this.session.canSpendStep()) {
            return;
        }

        const group = this.matchFinder.findGroup(block);
        if (group.length < GameRules.MIN_GROUP_SIZE) {
            return;
        }

        this.session.spendStep();
        this.session.addScore(GameRules.scoreForGroup(group.length));
        this.gridGenerator.removeBlocks(group);
        this.gridGenerator.resolveBoardAfterChange();

        this.session.resetShuffleAttempts();
        this.refreshHud();
        this.applyEndState();

        if (!this.isGameOver()) {
            this.scheduleOnce(() => this.runPlayabilityCheck(), 0.3);
        }
    }

    private handleBoosterBlockClick(block: Block) {
        const result = this.boosterService.handleBlockClick(block, this.gridGenerator);

        switch (result.action) {
            case BoosterAction.WaitSecondTile:
                this.highlightTeleportBlock(block, true);
                this.updateBoosterUI();
                return;

            case BoosterAction.CancelSelection:
                this.clearTeleportHighlight();
                this.updateBoosterUI();
                return;

            case BoosterAction.BombUsed:
                if (result.targets && result.targets.length > 0) {
                    this.session.addScore(GameRules.scoreForBombTiles(result.targets.length));
                    this.gridGenerator.removeBlocks(result.targets);
                    this.gridGenerator.resolveBoardAfterChange();
                    this.refreshHud();
                    this.applyEndState();
                    if (!this.isGameOver()) {
                        this.scheduleOnce(() => this.runPlayabilityCheck(), 0.3);
                    }
                }
                this.updateBoosterUI();
                return;

            case BoosterAction.TeleportUsed:
                this.clearTeleportHighlight();
                this.updateBoosterUI();
                this.scheduleOnce(() => this.runPlayabilityCheck(), 0.1);
                return;

            default:
                this.updateBoosterUI();
        }
    }

    private runPlayabilityCheck() {
        if (!this.playabilityService || this.isGameOver()) return;

        const result = this.playabilityService.ensurePlayable(this.session);

        if (result === PlayabilityResult.NoMovesLeft) {
            this.boosterService.resetActivation();
            if (this.losePanel) this.losePanel.active = true;
            this.updateBoosterUI();
        }
    }

    private applyEndState() {
        if (this.session.isWin()) {
            this.boosterService.resetActivation();
            if (this.winPanel) this.winPanel.active = true;
            return;
        }

        if (this.session.isLoseBySteps()) {
            this.boosterService.resetActivation();
            if (this.losePanel) this.losePanel.active = true;
        }
    }

    private refreshHud() {
        this.updateUI();
        this.updateBoosterUI();
    }

    updateUI() {
        if (this.label) {
            this.label.string = `<color=#ffffff>${this.session.steps}</color>`;
        }
        if (this.label2) {
            this.label2.string =
                `<color=#ffffff>${this.session.score}/${this.session.targetScore}</color>`;
        }
    }

    updateBoosterUI() {
        if (this.QuantityBooster) {
            this.QuantityBooster.string =
                `<color=#ffffff>${this.boosterService.bombCount}</color>`;
        }
        if (this.QuantityBooster2) {
            this.QuantityBooster2.string =
                `<color=#ffffff>${this.boosterService.teleportCount}</color>`;
        }

        this.setBoosterVisual(this.Booster, BoosterType.Bomb, this.boosterService.bombCount);
        this.setBoosterVisual(this.Booster2, BoosterType.Teleport, this.boosterService.teleportCount);
    }

    private setBoosterVisual(node: cc.Node, type: BoosterType, count: number) {
        if (!node) return;
        node.opacity = count > 0 ? 255 : 120;
        node.scale = this.boosterService.activeType === type ? 1.15 : 1;
    }

    private onBombBoosterClicked() {
        if (this.isGameOver() || this.boosterService.bombCount <= 0) return;
        if (this.boosterService.toggle(BoosterType.Bomb)) {
            this.clearTeleportHighlight();
            this.updateBoosterUI();
        }
    }

    private onTeleportBoosterClicked() {
        if (this.isGameOver() || this.boosterService.teleportCount <= 0) return;
        if (this.boosterService.toggle(BoosterType.Teleport)) {
            this.clearTeleportHighlight();
            this.updateBoosterUI();
        }
    }

    private highlightTeleportBlock(block: Block, on: boolean) {
        if (!block || !cc.isValid(block.node)) return;
        block.node.scale = on ? 1.15 : 1;
    }

    private clearTeleportHighlight() {
        const first = this.boosterService.getTeleportFirst();
        if (first) this.highlightTeleportBlock(first, false);
    }

    private resolveBoosterRefs() {
        const canvas = cc.find("Canvas");
        if (!canvas) return;

        if (!this.QuantityBooster) {
            const node = this.findNodeByName(canvas, "QuantityBooster");
            if (node) this.QuantityBooster = node.getComponent(cc.RichText);
        }
        if (!this.QuantityBooster2) {
            const node = this.findNodeByName(canvas, "QuantityBooster2");
            if (node) this.QuantityBooster2 = node.getComponent(cc.RichText);
        }
        if (!this.Booster || !this.Booster2) {
            const boosterNodes = this.findAllNodesByName(canvas, "Booster");
            if (!this.Booster && boosterNodes.length > 0) this.Booster = boosterNodes[0];
            if (!this.Booster2 && boosterNodes.length > 1) this.Booster2 = boosterNodes[1];
        }
    }

    private findNodeByName(root: cc.Node, name: string): cc.Node | null {
        if (root.name === name) return root;
        for (let i = 0; i < root.childrenCount; i++) {
            const found = this.findNodeByName(root.children[i], name);
            if (found) return found;
        }
        return null;
    }

    private findAllNodesByName(root: cc.Node, name: string): cc.Node[] {
        const result: cc.Node[] = [];
        if (root.name === name) result.push(root);
        for (let i = 0; i < root.childrenCount; i++) {
            result.push(...this.findAllNodesByName(root.children[i], name));
        }
        return result;
    }

    private applyBoosterIcons() {
        this.applyIconToBoosterNode(this.Booster, this.iconBoosterBomb);
        this.applyIconToBoosterNode(this.Booster2, this.iconBoosterTeleport);
    }

    private applyIconToBoosterNode(node: cc.Node, frame: cc.SpriteFrame) {
        if (!node || !frame) return;
        const sprite = node.getComponent(cc.Sprite);
        if (!sprite) return;
        sprite.spriteFrame = frame;
        sprite.sizeMode = cc.Sprite.SizeMode.TRIMMED;
    }

    private setupBoosterButtons() {
        if (this.Booster) this.Booster.on('touchend', this.onBombBoosterClicked, this);
        if (this.Booster2) this.Booster2.on('touchend', this.onTeleportBoosterClicked, this);
    }

    isGameOver(): boolean {
        return (this.winPanel && this.winPanel.active) ||
            (this.losePanel && this.losePanel.active);
    }

    restartGame() {
        cc.director.loadScene(cc.director.getScene().name);
    }

    exitGame() {
        cc.game.end();
    }
}
