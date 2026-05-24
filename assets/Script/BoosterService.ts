import Block from "./Block";
import GameRules from "./GameRules";
import GridGenerator from "./GridGenerator";
import { BoosterType } from "./BoosterType";

export enum BoosterAction {
    None = 0,
    WaitSecondTile = 1,
    CancelSelection = 2,
    BombUsed = 3,
    TeleportUsed = 4,
}

export interface BoosterHandleResult {
    action: BoosterAction;
    targets?: Block[];
}

export default class BoosterService {

    activeType: BoosterType = BoosterType.None;
    bombCount: number = 0;
    teleportCount: number = 0;

    private teleportFirst: Block = null;

    constructor(private readonly bombRadius: number) {}

    initCounts() {
        this.bombCount = GameRules.randomBoosterCount();
        this.teleportCount = GameRules.randomBoosterCount();
        this.resetActivation();
    }

    resetActivation() {
        this.activeType = BoosterType.None;
        this.teleportFirst = null;
    }

    getTeleportFirst(): Block | null {
        return this.teleportFirst;
    }

    toggle(type: BoosterType): boolean {
        if (type === BoosterType.Bomb && this.bombCount <= 0) return false;
        if (type === BoosterType.Teleport && this.teleportCount <= 0) return false;

        if (this.activeType === type) {
            this.resetActivation();
            return true;
        }

        this.activeType = type;
        this.teleportFirst = null;
        return true;
    }

    handleBlockClick(block: Block, grid: GridGenerator): BoosterHandleResult {
        if (this.activeType === BoosterType.Bomb) {
            return this.useBomb(block, grid);
        }
        if (this.activeType === BoosterType.Teleport) {
            return { action: this.useTeleport(block, grid) };
        }
        return { action: BoosterAction.None };
    }

    private useBomb(block: Block, grid: GridGenerator): BoosterHandleResult {
        if (this.bombCount <= 0) {
            this.resetActivation();
            return { action: BoosterAction.None };
        }

        const targets = grid.getBlocksInRadius(block.gridX, block.gridY, this.bombRadius);
        if (targets.length === 0) {
            return { action: BoosterAction.None };
        }

        this.bombCount--;
        this.resetActivation();
        return { action: BoosterAction.BombUsed, targets };
    }

    private useTeleport(block: Block, grid: GridGenerator): BoosterAction {
        if (this.teleportCount <= 0) {
            this.resetActivation();
            return BoosterAction.None;
        }

        if (!this.teleportFirst) {
            this.teleportFirst = block;
            return BoosterAction.WaitSecondTile;
        }

        if (this.teleportFirst === block) {
            this.teleportFirst = null;
            return BoosterAction.CancelSelection;
        }

        grid.swapBlocks(this.teleportFirst, block);
        this.teleportCount--;
        this.teleportFirst = null;
        this.resetActivation();
        return BoosterAction.TeleportUsed;
    }
}
