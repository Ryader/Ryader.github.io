
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/BoosterService.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxCb29zdGVyU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSx5Q0FBb0M7QUFFcEMsNkNBQTRDO0FBRTVDLElBQVksYUFNWDtBQU5ELFdBQVksYUFBYTtJQUNyQixpREFBUSxDQUFBO0lBQ1IscUVBQWtCLENBQUE7SUFDbEIsdUVBQW1CLENBQUE7SUFDbkIseURBQVksQ0FBQTtJQUNaLGlFQUFnQixDQUFBO0FBQ3BCLENBQUMsRUFOVyxhQUFhLEdBQWIscUJBQWEsS0FBYixxQkFBYSxRQU14QjtBQU9EO0lBUUksd0JBQTZCLFVBQWtCO1FBQWxCLGVBQVUsR0FBVixVQUFVLENBQVE7UUFOL0MsZUFBVSxHQUFnQix5QkFBVyxDQUFDLElBQUksQ0FBQztRQUMzQyxjQUFTLEdBQVcsQ0FBQyxDQUFDO1FBQ3RCLGtCQUFhLEdBQVcsQ0FBQyxDQUFDO1FBRWxCLGtCQUFhLEdBQVUsSUFBSSxDQUFDO0lBRWMsQ0FBQztJQUVuRCxtQ0FBVSxHQUFWO1FBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBRyxtQkFBUyxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDaEQsSUFBSSxDQUFDLGFBQWEsR0FBRyxtQkFBUyxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDcEQsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCx3Q0FBZSxHQUFmO1FBQ0ksSUFBSSxDQUFDLFVBQVUsR0FBRyx5QkFBVyxDQUFDLElBQUksQ0FBQztRQUNuQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztJQUM5QixDQUFDO0lBRUQseUNBQWdCLEdBQWhCO1FBQ0ksT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzlCLENBQUM7SUFFRCwrQkFBTSxHQUFOLFVBQU8sSUFBaUI7UUFDcEIsSUFBSSxJQUFJLEtBQUsseUJBQVcsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFDbkUsSUFBSSxJQUFJLEtBQUsseUJBQVcsQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLGFBQWEsSUFBSSxDQUFDO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFFM0UsSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLElBQUksRUFBRTtZQUMxQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDdkIsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUVELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBQzFCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCx5Q0FBZ0IsR0FBaEIsVUFBaUIsS0FBWSxFQUFFLElBQW1CO1FBQzlDLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyx5QkFBVyxDQUFDLElBQUksRUFBRTtZQUN0QyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3BDO1FBQ0QsSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLHlCQUFXLENBQUMsUUFBUSxFQUFFO1lBQzFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQztTQUNwRDtRQUNELE9BQU8sRUFBRSxNQUFNLEVBQUUsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzFDLENBQUM7SUFFTyxnQ0FBTyxHQUFmLFVBQWdCLEtBQVksRUFBRSxJQUFtQjtRQUM3QyxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUN2QixPQUFPLEVBQUUsTUFBTSxFQUFFLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN6QztRQUVELElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2xGLElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDdEIsT0FBTyxFQUFFLE1BQU0sRUFBRSxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDekM7UUFFRCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3ZCLE9BQU8sRUFBRSxNQUFNLEVBQUUsYUFBYSxDQUFDLFFBQVEsRUFBRSxPQUFPLFNBQUEsRUFBRSxDQUFDO0lBQ3ZELENBQUM7SUFFTyxvQ0FBVyxHQUFuQixVQUFvQixLQUFZLEVBQUUsSUFBbUI7UUFDakQsSUFBSSxJQUFJLENBQUMsYUFBYSxJQUFJLENBQUMsRUFBRTtZQUN6QixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDdkIsT0FBTyxhQUFhLENBQUMsSUFBSSxDQUFDO1NBQzdCO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDckIsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7WUFDM0IsT0FBTyxhQUFhLENBQUMsY0FBYyxDQUFDO1NBQ3ZDO1FBRUQsSUFBSSxJQUFJLENBQUMsYUFBYSxLQUFLLEtBQUssRUFBRTtZQUM5QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztZQUMxQixPQUFPLGFBQWEsQ0FBQyxlQUFlLENBQUM7U0FDeEM7UUFFRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBQzFCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN2QixPQUFPLGFBQWEsQ0FBQyxZQUFZLENBQUM7SUFDdEMsQ0FBQztJQUNMLHFCQUFDO0FBQUQsQ0F2RkEsQUF1RkMsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCbG9jayBmcm9tIFwiLi9CbG9ja1wiO1xuaW1wb3J0IEdhbWVSdWxlcyBmcm9tIFwiLi9HYW1lUnVsZXNcIjtcbmltcG9ydCBHcmlkR2VuZXJhdG9yIGZyb20gXCIuL0dyaWRHZW5lcmF0b3JcIjtcbmltcG9ydCB7IEJvb3N0ZXJUeXBlIH0gZnJvbSBcIi4vQm9vc3RlclR5cGVcIjtcblxuZXhwb3J0IGVudW0gQm9vc3RlckFjdGlvbiB7XG4gICAgTm9uZSA9IDAsXG4gICAgV2FpdFNlY29uZFRpbGUgPSAxLFxuICAgIENhbmNlbFNlbGVjdGlvbiA9IDIsXG4gICAgQm9tYlVzZWQgPSAzLFxuICAgIFRlbGVwb3J0VXNlZCA9IDQsXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQm9vc3RlckhhbmRsZVJlc3VsdCB7XG4gICAgYWN0aW9uOiBCb29zdGVyQWN0aW9uO1xuICAgIHRhcmdldHM/OiBCbG9ja1tdO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb29zdGVyU2VydmljZSB7XG5cbiAgICBhY3RpdmVUeXBlOiBCb29zdGVyVHlwZSA9IEJvb3N0ZXJUeXBlLk5vbmU7XG4gICAgYm9tYkNvdW50OiBudW1iZXIgPSAwO1xuICAgIHRlbGVwb3J0Q291bnQ6IG51bWJlciA9IDA7XG5cbiAgICBwcml2YXRlIHRlbGVwb3J0Rmlyc3Q6IEJsb2NrID0gbnVsbDtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgYm9tYlJhZGl1czogbnVtYmVyKSB7fVxuXG4gICAgaW5pdENvdW50cygpIHtcbiAgICAgICAgdGhpcy5ib21iQ291bnQgPSBHYW1lUnVsZXMucmFuZG9tQm9vc3RlckNvdW50KCk7XG4gICAgICAgIHRoaXMudGVsZXBvcnRDb3VudCA9IEdhbWVSdWxlcy5yYW5kb21Cb29zdGVyQ291bnQoKTtcbiAgICAgICAgdGhpcy5yZXNldEFjdGl2YXRpb24oKTtcbiAgICB9XG5cbiAgICByZXNldEFjdGl2YXRpb24oKSB7XG4gICAgICAgIHRoaXMuYWN0aXZlVHlwZSA9IEJvb3N0ZXJUeXBlLk5vbmU7XG4gICAgICAgIHRoaXMudGVsZXBvcnRGaXJzdCA9IG51bGw7XG4gICAgfVxuXG4gICAgZ2V0VGVsZXBvcnRGaXJzdCgpOiBCbG9jayB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy50ZWxlcG9ydEZpcnN0O1xuICAgIH1cblxuICAgIHRvZ2dsZSh0eXBlOiBCb29zdGVyVHlwZSk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodHlwZSA9PT0gQm9vc3RlclR5cGUuQm9tYiAmJiB0aGlzLmJvbWJDb3VudCA8PSAwKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmICh0eXBlID09PSBCb29zdGVyVHlwZS5UZWxlcG9ydCAmJiB0aGlzLnRlbGVwb3J0Q291bnQgPD0gMCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIGlmICh0aGlzLmFjdGl2ZVR5cGUgPT09IHR5cGUpIHtcbiAgICAgICAgICAgIHRoaXMucmVzZXRBY3RpdmF0aW9uKCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYWN0aXZlVHlwZSA9IHR5cGU7XG4gICAgICAgIHRoaXMudGVsZXBvcnRGaXJzdCA9IG51bGw7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGhhbmRsZUJsb2NrQ2xpY2soYmxvY2s6IEJsb2NrLCBncmlkOiBHcmlkR2VuZXJhdG9yKTogQm9vc3RlckhhbmRsZVJlc3VsdCB7XG4gICAgICAgIGlmICh0aGlzLmFjdGl2ZVR5cGUgPT09IEJvb3N0ZXJUeXBlLkJvbWIpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnVzZUJvbWIoYmxvY2ssIGdyaWQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmFjdGl2ZVR5cGUgPT09IEJvb3N0ZXJUeXBlLlRlbGVwb3J0KSB7XG4gICAgICAgICAgICByZXR1cm4geyBhY3Rpb246IHRoaXMudXNlVGVsZXBvcnQoYmxvY2ssIGdyaWQpIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgYWN0aW9uOiBCb29zdGVyQWN0aW9uLk5vbmUgfTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVzZUJvbWIoYmxvY2s6IEJsb2NrLCBncmlkOiBHcmlkR2VuZXJhdG9yKTogQm9vc3RlckhhbmRsZVJlc3VsdCB7XG4gICAgICAgIGlmICh0aGlzLmJvbWJDb3VudCA8PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0QWN0aXZhdGlvbigpO1xuICAgICAgICAgICAgcmV0dXJuIHsgYWN0aW9uOiBCb29zdGVyQWN0aW9uLk5vbmUgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHRhcmdldHMgPSBncmlkLmdldEJsb2Nrc0luUmFkaXVzKGJsb2NrLmdyaWRYLCBibG9jay5ncmlkWSwgdGhpcy5ib21iUmFkaXVzKTtcbiAgICAgICAgaWYgKHRhcmdldHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4geyBhY3Rpb246IEJvb3N0ZXJBY3Rpb24uTm9uZSB9O1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5ib21iQ291bnQtLTtcbiAgICAgICAgdGhpcy5yZXNldEFjdGl2YXRpb24oKTtcbiAgICAgICAgcmV0dXJuIHsgYWN0aW9uOiBCb29zdGVyQWN0aW9uLkJvbWJVc2VkLCB0YXJnZXRzIH07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1c2VUZWxlcG9ydChibG9jazogQmxvY2ssIGdyaWQ6IEdyaWRHZW5lcmF0b3IpOiBCb29zdGVyQWN0aW9uIHtcbiAgICAgICAgaWYgKHRoaXMudGVsZXBvcnRDb3VudCA8PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0QWN0aXZhdGlvbigpO1xuICAgICAgICAgICAgcmV0dXJuIEJvb3N0ZXJBY3Rpb24uTm9uZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy50ZWxlcG9ydEZpcnN0KSB7XG4gICAgICAgICAgICB0aGlzLnRlbGVwb3J0Rmlyc3QgPSBibG9jaztcbiAgICAgICAgICAgIHJldHVybiBCb29zdGVyQWN0aW9uLldhaXRTZWNvbmRUaWxlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMudGVsZXBvcnRGaXJzdCA9PT0gYmxvY2spIHtcbiAgICAgICAgICAgIHRoaXMudGVsZXBvcnRGaXJzdCA9IG51bGw7XG4gICAgICAgICAgICByZXR1cm4gQm9vc3RlckFjdGlvbi5DYW5jZWxTZWxlY3Rpb247XG4gICAgICAgIH1cblxuICAgICAgICBncmlkLnN3YXBCbG9ja3ModGhpcy50ZWxlcG9ydEZpcnN0LCBibG9jayk7XG4gICAgICAgIHRoaXMudGVsZXBvcnRDb3VudC0tO1xuICAgICAgICB0aGlzLnRlbGVwb3J0Rmlyc3QgPSBudWxsO1xuICAgICAgICB0aGlzLnJlc2V0QWN0aXZhdGlvbigpO1xuICAgICAgICByZXR1cm4gQm9vc3RlckFjdGlvbi5UZWxlcG9ydFVzZWQ7XG4gICAgfVxufVxuIl19