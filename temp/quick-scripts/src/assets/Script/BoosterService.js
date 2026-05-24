"use strict";
cc._RF.push(module, '3a7e45uOANBsa8b+WOnZAdV', 'BoosterService');
// Script/BoosterService.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoosterAction = void 0;
var GameRules_1 = require("./GameRules");
var BoosterType_1 = require("./BoosterType");
var BoosterAction;
(function (BoosterAction) {
    BoosterAction[BoosterAction["None"] = 0] = "None";
    BoosterAction[BoosterAction["WaitSecondTile"] = 1] = "WaitSecondTile";
    BoosterAction[BoosterAction["CancelSelection"] = 2] = "CancelSelection";
    BoosterAction[BoosterAction["BombUsed"] = 3] = "BombUsed";
    BoosterAction[BoosterAction["TeleportUsed"] = 4] = "TeleportUsed";
})(BoosterAction = exports.BoosterAction || (exports.BoosterAction = {}));
var BoosterService = /** @class */ (function () {
    function BoosterService(bombRadius) {
        this.bombRadius = bombRadius;
        this.activeType = BoosterType_1.BoosterType.None;
        this.bombCount = 0;
        this.teleportCount = 0;
        this.teleportFirst = null;
    }
    BoosterService.prototype.initCounts = function () {
        this.bombCount = GameRules_1.default.randomBoosterCount();
        this.teleportCount = GameRules_1.default.randomBoosterCount();
        this.resetActivation();
    };
    BoosterService.prototype.resetActivation = function () {
        this.activeType = BoosterType_1.BoosterType.None;
        this.teleportFirst = null;
    };
    BoosterService.prototype.getTeleportFirst = function () {
        return this.teleportFirst;
    };
    BoosterService.prototype.toggle = function (type) {
        if (type === BoosterType_1.BoosterType.Bomb && this.bombCount <= 0)
            return false;
        if (type === BoosterType_1.BoosterType.Teleport && this.teleportCount <= 0)
            return false;
        if (this.activeType === type) {
            this.resetActivation();
            return true;
        }
        this.activeType = type;
        this.teleportFirst = null;
        return true;
    };
    BoosterService.prototype.handleBlockClick = function (block, grid) {
        if (this.activeType === BoosterType_1.BoosterType.Bomb) {
            return this.useBomb(block, grid);
        }
        if (this.activeType === BoosterType_1.BoosterType.Teleport) {
            return { action: this.useTeleport(block, grid) };
        }
        return { action: BoosterAction.None };
    };
    BoosterService.prototype.useBomb = function (block, grid) {
        if (this.bombCount <= 0) {
            this.resetActivation();
            return { action: BoosterAction.None };
        }
        var targets = grid.getBlocksInRadius(block.gridX, block.gridY, this.bombRadius);
        if (targets.length === 0) {
            return { action: BoosterAction.None };
        }
        this.bombCount--;
        this.resetActivation();
        return { action: BoosterAction.BombUsed, targets: targets };
    };
    BoosterService.prototype.useTeleport = function (block, grid) {
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
    };
    return BoosterService;
}());
exports.default = BoosterService;

cc._RF.pop();