"use strict";
cc._RF.push(module, 'b80c9CDanVCxo+izmiRWFGz', 'GameStartSystem');
// Script/GameStartSystem.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameRules_1 = require("./GameRules");
var GameSession_1 = require("./GameSession");
var MatchFinder_1 = require("./MatchFinder");
var GridGenerator_1 = require("./GridGenerator");
var BoosterType_1 = require("./BoosterType");
var BoosterService_1 = require("./BoosterService");
var PlayabilityService_1 = require("./PlayabilityService");
var GameStartSystem = /** @class */ (function (_super) {
    __extends(GameStartSystem, _super);
    function GameStartSystem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.label2 = null;
        _this.targetScore = 200;
        _this.gridNode = null;
        _this.gridGenerator = null;
        _this.losePanel = null;
        _this.winPanel = null;
        _this.buttonYesLose = null;
        _this.buttonNoLose = null;
        _this.buttonYesWin = null;
        _this.buttonNoWin = null;
        _this.QuantityBooster = null;
        _this.QuantityBooster2 = null;
        _this.Booster = null;
        _this.Booster2 = null;
        _this.iconBoosterBomb = null;
        _this.iconBoosterTeleport = null;
        _this.bombRadius = 1;
        _this.session = new GameSession_1.default();
        _this.matchFinder = null;
        _this.boosterService = null;
        _this.playabilityService = null;
        return _this;
    }
    GameStartSystem.prototype.start = function () {
        var _this = this;
        this.initServices();
        this.session.reset(this.targetScore);
        this.boosterService.initCounts();
        this.resolveBoosterRefs();
        this.applyBoosterIcons();
        this.setupBoosterButtons();
        this.updateUI();
        this.updateBoosterUI();
        if (this.losePanel)
            this.losePanel.active = false;
        if (this.winPanel)
            this.winPanel.active = false;
        this.bindPanelButtons();
        this.scheduleOnce(function () { return _this.runPlayabilityCheck(); }, 0);
    };
    GameStartSystem.prototype.initServices = function () {
        if (this.gridGenerator) {
            this.matchFinder = new MatchFinder_1.default(this.gridGenerator);
            this.playabilityService = new PlayabilityService_1.default(this.gridGenerator, this.matchFinder);
        }
        this.boosterService = new BoosterService_1.default(this.bombRadius);
    };
    GameStartSystem.prototype.bindPanelButtons = function () {
        if (this.buttonYesLose)
            this.buttonYesLose.node.on('click', this.restartGame, this);
        if (this.buttonNoLose)
            this.buttonNoLose.node.on('click', this.exitGame, this);
        if (this.buttonYesWin)
            this.buttonYesWin.node.on('click', this.restartGame, this);
        if (this.buttonNoWin)
            this.buttonNoWin.node.on('click', this.exitGame, this);
    };
    GameStartSystem.prototype.onBlockClicked = function (block) {
        var _this = this;
        if (!this.gridGenerator || !block || !cc.isValid(block.node) || this.isGameOver()) {
            return;
        }
        if (this.boosterService.activeType !== BoosterType_1.BoosterType.None) {
            this.handleBoosterBlockClick(block);
            return;
        }
        if (!this.session.canSpendStep()) {
            return;
        }
        var group = this.matchFinder.findGroup(block);
        if (group.length < GameRules_1.default.MIN_GROUP_SIZE) {
            return;
        }
        this.session.spendStep();
        this.session.addScore(GameRules_1.default.scoreForGroup(group.length));
        this.gridGenerator.removeBlocks(group);
        this.gridGenerator.resolveBoardAfterChange();
        this.session.resetShuffleAttempts();
        this.refreshHud();
        this.applyEndState();
        if (!this.isGameOver()) {
            this.scheduleOnce(function () { return _this.runPlayabilityCheck(); }, 0.3);
        }
    };
    GameStartSystem.prototype.handleBoosterBlockClick = function (block) {
        var _this = this;
        var result = this.boosterService.handleBlockClick(block, this.gridGenerator);
        switch (result.action) {
            case BoosterService_1.BoosterAction.WaitSecondTile:
                this.highlightTeleportBlock(block, true);
                this.updateBoosterUI();
                return;
            case BoosterService_1.BoosterAction.CancelSelection:
                this.clearTeleportHighlight();
                this.updateBoosterUI();
                return;
            case BoosterService_1.BoosterAction.BombUsed:
                if (result.targets && result.targets.length > 0) {
                    this.session.addScore(GameRules_1.default.scoreForBombTiles(result.targets.length));
                    this.gridGenerator.removeBlocks(result.targets);
                    this.gridGenerator.resolveBoardAfterChange();
                    this.refreshHud();
                    this.applyEndState();
                    if (!this.isGameOver()) {
                        this.scheduleOnce(function () { return _this.runPlayabilityCheck(); }, 0.3);
                    }
                }
                this.updateBoosterUI();
                return;
            case BoosterService_1.BoosterAction.TeleportUsed:
                this.clearTeleportHighlight();
                this.updateBoosterUI();
                this.scheduleOnce(function () { return _this.runPlayabilityCheck(); }, 0.1);
                return;
            default:
                this.updateBoosterUI();
        }
    };
    GameStartSystem.prototype.runPlayabilityCheck = function () {
        if (!this.playabilityService || this.isGameOver())
            return;
        var result = this.playabilityService.ensurePlayable(this.session);
        if (result === PlayabilityService_1.PlayabilityResult.NoMovesLeft) {
            this.boosterService.resetActivation();
            if (this.losePanel)
                this.losePanel.active = true;
            this.updateBoosterUI();
        }
    };
    GameStartSystem.prototype.applyEndState = function () {
        if (this.session.isWin()) {
            this.boosterService.resetActivation();
            if (this.winPanel)
                this.winPanel.active = true;
            return;
        }
        if (this.session.isLoseBySteps()) {
            this.boosterService.resetActivation();
            if (this.losePanel)
                this.losePanel.active = true;
        }
    };
    GameStartSystem.prototype.refreshHud = function () {
        this.updateUI();
        this.updateBoosterUI();
    };
    GameStartSystem.prototype.updateUI = function () {
        if (this.label) {
            this.label.string = "<color=#ffffff>" + this.session.steps + "</color>";
        }
        if (this.label2) {
            this.label2.string =
                "<color=#ffffff>" + this.session.score + "/" + this.session.targetScore + "</color>";
        }
    };
    GameStartSystem.prototype.updateBoosterUI = function () {
        if (this.QuantityBooster) {
            this.QuantityBooster.string =
                "<color=#ffffff>" + this.boosterService.bombCount + "</color>";
        }
        if (this.QuantityBooster2) {
            this.QuantityBooster2.string =
                "<color=#ffffff>" + this.boosterService.teleportCount + "</color>";
        }
        this.setBoosterVisual(this.Booster, BoosterType_1.BoosterType.Bomb, this.boosterService.bombCount);
        this.setBoosterVisual(this.Booster2, BoosterType_1.BoosterType.Teleport, this.boosterService.teleportCount);
    };
    GameStartSystem.prototype.setBoosterVisual = function (node, type, count) {
        if (!node)
            return;
        node.opacity = count > 0 ? 255 : 120;
        node.scale = this.boosterService.activeType === type ? 1.15 : 1;
    };
    GameStartSystem.prototype.onBombBoosterClicked = function () {
        if (this.isGameOver() || this.boosterService.bombCount <= 0)
            return;
        if (this.boosterService.toggle(BoosterType_1.BoosterType.Bomb)) {
            this.clearTeleportHighlight();
            this.updateBoosterUI();
        }
    };
    GameStartSystem.prototype.onTeleportBoosterClicked = function () {
        if (this.isGameOver() || this.boosterService.teleportCount <= 0)
            return;
        if (this.boosterService.toggle(BoosterType_1.BoosterType.Teleport)) {
            this.clearTeleportHighlight();
            this.updateBoosterUI();
        }
    };
    GameStartSystem.prototype.highlightTeleportBlock = function (block, on) {
        if (!block || !cc.isValid(block.node))
            return;
        block.node.scale = on ? 1.15 : 1;
    };
    GameStartSystem.prototype.clearTeleportHighlight = function () {
        var first = this.boosterService.getTeleportFirst();
        if (first)
            this.highlightTeleportBlock(first, false);
    };
    GameStartSystem.prototype.resolveBoosterRefs = function () {
        var canvas = cc.find("Canvas");
        if (!canvas)
            return;
        if (!this.QuantityBooster) {
            var node = this.findNodeByName(canvas, "QuantityBooster");
            if (node)
                this.QuantityBooster = node.getComponent(cc.RichText);
        }
        if (!this.QuantityBooster2) {
            var node = this.findNodeByName(canvas, "QuantityBooster2");
            if (node)
                this.QuantityBooster2 = node.getComponent(cc.RichText);
        }
        if (!this.Booster || !this.Booster2) {
            var boosterNodes = this.findAllNodesByName(canvas, "Booster");
            if (!this.Booster && boosterNodes.length > 0)
                this.Booster = boosterNodes[0];
            if (!this.Booster2 && boosterNodes.length > 1)
                this.Booster2 = boosterNodes[1];
        }
    };
    GameStartSystem.prototype.findNodeByName = function (root, name) {
        if (root.name === name)
            return root;
        for (var i = 0; i < root.childrenCount; i++) {
            var found = this.findNodeByName(root.children[i], name);
            if (found)
                return found;
        }
        return null;
    };
    GameStartSystem.prototype.findAllNodesByName = function (root, name) {
        var result = [];
        if (root.name === name)
            result.push(root);
        for (var i = 0; i < root.childrenCount; i++) {
            result.push.apply(result, this.findAllNodesByName(root.children[i], name));
        }
        return result;
    };
    GameStartSystem.prototype.applyBoosterIcons = function () {
        this.applyIconToBoosterNode(this.Booster, this.iconBoosterBomb);
        this.applyIconToBoosterNode(this.Booster2, this.iconBoosterTeleport);
    };
    GameStartSystem.prototype.applyIconToBoosterNode = function (node, frame) {
        if (!node || !frame)
            return;
        var sprite = node.getComponent(cc.Sprite);
        if (!sprite)
            return;
        sprite.spriteFrame = frame;
        sprite.sizeMode = cc.Sprite.SizeMode.TRIMMED;
    };
    GameStartSystem.prototype.setupBoosterButtons = function () {
        if (this.Booster)
            this.Booster.on('touchend', this.onBombBoosterClicked, this);
        if (this.Booster2)
            this.Booster2.on('touchend', this.onTeleportBoosterClicked, this);
    };
    GameStartSystem.prototype.isGameOver = function () {
        return (this.winPanel && this.winPanel.active) ||
            (this.losePanel && this.losePanel.active);
    };
    GameStartSystem.prototype.restartGame = function () {
        cc.director.loadScene(cc.director.getScene().name);
    };
    GameStartSystem.prototype.exitGame = function () {
        cc.game.end();
    };
    __decorate([
        property(cc.RichText)
    ], GameStartSystem.prototype, "label", void 0);
    __decorate([
        property(cc.RichText)
    ], GameStartSystem.prototype, "label2", void 0);
    __decorate([
        property
    ], GameStartSystem.prototype, "targetScore", void 0);
    __decorate([
        property(cc.Node)
    ], GameStartSystem.prototype, "gridNode", void 0);
    __decorate([
        property(GridGenerator_1.default)
    ], GameStartSystem.prototype, "gridGenerator", void 0);
    __decorate([
        property(cc.Node)
    ], GameStartSystem.prototype, "losePanel", void 0);
    __decorate([
        property(cc.Node)
    ], GameStartSystem.prototype, "winPanel", void 0);
    __decorate([
        property(cc.Button)
    ], GameStartSystem.prototype, "buttonYesLose", void 0);
    __decorate([
        property(cc.Button)
    ], GameStartSystem.prototype, "buttonNoLose", void 0);
    __decorate([
        property(cc.Button)
    ], GameStartSystem.prototype, "buttonYesWin", void 0);
    __decorate([
        property(cc.Button)
    ], GameStartSystem.prototype, "buttonNoWin", void 0);
    __decorate([
        property(cc.RichText)
    ], GameStartSystem.prototype, "QuantityBooster", void 0);
    __decorate([
        property(cc.RichText)
    ], GameStartSystem.prototype, "QuantityBooster2", void 0);
    __decorate([
        property(cc.Node)
    ], GameStartSystem.prototype, "Booster", void 0);
    __decorate([
        property(cc.Node)
    ], GameStartSystem.prototype, "Booster2", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], GameStartSystem.prototype, "iconBoosterBomb", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], GameStartSystem.prototype, "iconBoosterTeleport", void 0);
    __decorate([
        property({
            tooltip: "Радиус бомбы в клетках (1 = квадрат 3×3)"
        })
    ], GameStartSystem.prototype, "bombRadius", void 0);
    GameStartSystem = __decorate([
        ccclass
    ], GameStartSystem);
    return GameStartSystem;
}(cc.Component));
exports.default = GameStartSystem;

cc._RF.pop();