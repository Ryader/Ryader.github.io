
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/__qc_index__.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}
require('./assets/Script/Block');
require('./assets/Script/BoosterService');
require('./assets/Script/BoosterType');
require('./assets/Script/GameRules');
require('./assets/Script/GameSession');
require('./assets/Script/GameStartSystem');
require('./assets/Script/GridGenerator');
require('./assets/Script/IBlockClickHandler');
require('./assets/Script/IGridAccess');
require('./assets/Script/MatchFinder');
require('./assets/Script/PlayabilityService');

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
//------QC-SOURCE-SPLIT------

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxCb29zdGVyU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSx5Q0FBb0M7QUFFcEMsNkNBQTRDO0FBRTVDLElBQVksYUFNWDtBQU5ELFdBQVksYUFBYTtJQUNyQixpREFBUSxDQUFBO0lBQ1IscUVBQWtCLENBQUE7SUFDbEIsdUVBQW1CLENBQUE7SUFDbkIseURBQVksQ0FBQTtJQUNaLGlFQUFnQixDQUFBO0FBQ3BCLENBQUMsRUFOVyxhQUFhLEdBQWIscUJBQWEsS0FBYixxQkFBYSxRQU14QjtBQU9EO0lBUUksd0JBQTZCLFVBQWtCO1FBQWxCLGVBQVUsR0FBVixVQUFVLENBQVE7UUFOL0MsZUFBVSxHQUFnQix5QkFBVyxDQUFDLElBQUksQ0FBQztRQUMzQyxjQUFTLEdBQVcsQ0FBQyxDQUFDO1FBQ3RCLGtCQUFhLEdBQVcsQ0FBQyxDQUFDO1FBRWxCLGtCQUFhLEdBQVUsSUFBSSxDQUFDO0lBRWMsQ0FBQztJQUVuRCxtQ0FBVSxHQUFWO1FBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBRyxtQkFBUyxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDaEQsSUFBSSxDQUFDLGFBQWEsR0FBRyxtQkFBUyxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDcEQsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCx3Q0FBZSxHQUFmO1FBQ0ksSUFBSSxDQUFDLFVBQVUsR0FBRyx5QkFBVyxDQUFDLElBQUksQ0FBQztRQUNuQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztJQUM5QixDQUFDO0lBRUQseUNBQWdCLEdBQWhCO1FBQ0ksT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzlCLENBQUM7SUFFRCwrQkFBTSxHQUFOLFVBQU8sSUFBaUI7UUFDcEIsSUFBSSxJQUFJLEtBQUsseUJBQVcsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDO1lB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ZXNDb250ZW50IjpbImltcG9ydCBCbG9jayBmcm9tIFwiLi9CbG9ja1wiO1xuaW1wb3J0IEdhbWVSdWxlcyBmcm9tIFwiLi9HYW1lUnVsZXNcIjtcbmltcG9ydCBHcmlkR2VuZXJhdG9yIGZyb20gXCIuL0dyaWRHZW5lcmF0b3JcIjtcbmltcG9ydCB7IEJvb3N0ZXJUeXBlIH0gZnJvbSBcIi4vQm9vc3RlclR5cGVcIjtcblxuZXhwb3J0IGVudW0gQm9vc3RlckFjdGlvbiB7XG4gICAgTm9uZSA9IDAsXG4gICAgV2FpdFNlY29uZFRpbGUgPSAxLFxuICAgIENhbmNlbFNlbGVjdGlvbiA9IDIsXG4gICAgQm9tYlVzZWQgPSAzLFxuICAgIFRlbGVwb3J0VXNlZCA9IDQsXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQm9vc3RlckhhbmRsZVJlc3VsdCB7XG4gICAgYWN0aW9uOiBCb29zdGVyQWN0aW9uO1xuICAgIHRhcmdldHM/OiBCbG9ja1tdO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb29zdGVyU2VydmljZSB7XG5cbiAgICBhY3RpdmVUeXBlOiBCb29zdGVyVHlwZSA9IEJvb3N0ZXJUeXBlLk5vbmU7XG4gICAgYm9tYkNvdW50OiBudW1iZXIgPSAwO1xuICAgIHRlbGVwb3J0Q291bnQ6IG51bWJlciA9IDA7XG5cbiAgICBwcml2YXRlIHRlbGVwb3J0Rmlyc3Q6IEJsb2NrID0gbnVsbDtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgYm9tYlJhZGl1czogbnVtYmVyKSB7fVxuXG4gICAgaW5pdENvdW50cygpIHtcbiAgICAgICAgdGhpcy5ib21iQ291bnQgPSBHYW1lUnVsZXMucmFuZG9tQm9vc3RlckNvdW50KCk7XG4gICAgICAgIHRoaXMudGVsZXBvcnRDb3VudCA9IEdhbWVSdWxlcy5yYW5kb21Cb29zdGVyQ291bnQoKTtcbiAgICAgICAgdGhpcy5yZXNldEFjdGl2YXRpb24oKTtcbiAgICB9XG5cbiAgICByZXNldEFjdGl2YXRpb24oKSB7XG4gICAgICAgIHRoaXMuYWN0aXZlVHlwZSA9IEJvb3N0ZXJUeXBlLk5vbmU7XG4gICAgICAgIHRoaXMudGVsZXBvcnRGaXJzdCA9IG51bGw7XG4gICAgfVxuXG4gICAgZ2V0VGVsZXBvcnRGaXJzdCgpOiBCbG9jayB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy50ZWxlcG9ydEZpcnN0O1xuICAgIH1cblxuICAgIHRvZ2dsZSh0eXBlOiBCb29zdGVyVHlwZSk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodHlwZSA9PT0gQm9vc3RlclR5cGUuQm9tYiAmJiB0aGlzLmJvbWJDb3VudCA8PSAwKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmICh0eXBlID09PSBCb29zdGVyVHlwZS5UZWxlcG9ydCAmJiB0aGlzLnRlbGVwb3J0Q291bnQgPD0gMCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIGlmICh0aGlzLmFjdGl2ZVR5cGUgPT09IHR5cGUpIHtcbiAgICAgICAgICAgIHRoaXMucmVzZXRBY3RpdmF0aW9uKCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYWN0aXZlVHlwZSA9IHR5cGU7XG4gICAgICAgIHRoaXMudGVsZXBvcnRGaXJzdCA9IG51bGw7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGhhbmRsZUJsb2NrQ2xpY2soYmxvY2s6IEJsb2NrLCBncmlkOiBHcmlkR2VuZXJhdG9yKTogQm9vc3RlckhhbmRsZVJlc3VsdCB7XG4gICAgICAgIGlmICh0aGlzLmFjdGl2ZVR5cGUgPT09IEJvb3N0ZXJUeXBlLkJvbWIpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnVzZUJvbWIoYmxvY2ssIGdyaWQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmFjdGl2ZVR5cGUgPT09IEJvb3N0ZXJUeXBlLlRlbGVwb3J0KSB7XG4gICAgICAgICAgICByZXR1cm4geyBhY3Rpb246IHRoaXMudXNlVGVsZXBvcnQoYmxvY2ssIGdyaWQpIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgYWN0aW9uOiBCb29zdGVyQWN0aW9uLk5vbmUgfTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVzZUJvbWIoYmxvY2s6IEJsb2NrLCBncmlkOiBHcmlkR2VuZXJhdG9yKTogQm9vc3RlckhhbmRsZVJlc3VsdCB7XG4gICAgICAgIGlmICh0aGlzLmJvbWJDb3VudCA8PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0QWN0aXZhdGlvbigpO1xuICAgICAgICAgICAgcmV0dXJuIHsgYWN0aW9uOiBCb29zdGVyQWN0aW9uLk5vbmUgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHRhcmdldHMgPSBncmlkLmdldEJsb2Nrc0luUmFkaXVzKGJsb2NrLmdyaWRYLCBibG9jay5ncmlkWSwgdGhpcy5ib21iUmFkaXVzKTtcbiAgICAgICAgaWYgKHRhcmdldHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4geyBhY3Rpb246IEJvb3N0ZXJBY3Rpb24uTm9uZSB9O1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5ib21iQ291bnQtLTtcbiAgICAgICAgdGhpcy5yZXNldEFjdGl2YXRpb24oKTtcbiAgICAgICAgcmV0dXJuIHsgYWN0aW9uOiBCb29zdGVyQWN0aW9uLkJvbWJVc2VkLCB0YXJnZXRzIH07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1c2VUZWxlcG9ydChibG9jazogQmxvY2ssIGdyaWQ6IEdyaWRHZW5lcmF0b3IpOiBCb29zdGVyQWN0aW9uIHtcbiAgICAgICAgaWYgKHRoaXMudGVsZXBvcnRDb3VudCA8PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0QWN0aXZhdGlvbigpO1xuICAgICAgICAgICAgcmV0dXJuIEJvb3N0ZXJBY3Rpb24uTm9uZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy50ZWxlcG9ydEZpcnN0KSB7XG4gICAgICAgICAgICB0aGlzLnRlbGVwb3J0Rmlyc3QgPSBibG9jaztcbiAgICAgICAgICAgIHJldHVybiBCb29zdGVyQWN0aW9uLldhaXRTZWNvbmRUaWxlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMudGVsZXBvcnRGaXJzdCA9PT0gYmxvY2spIHtcbiAgICAgICAgICAgIHRoaXMudGVsZXBvcnRGaXJzdCA9IG51bGw7XG4gICAgICAgICAgICByZXR1cm4gQm9vc3RlckFjdGlvbi5DYW5jZWxTZWxlY3Rpb247XG4gICAgICAgIH1cblxuICAgICAgICBncmlkLnN3YXBCbG9ja3ModGhpcy50ZWxlcG9ydEZpcnN0LCBibG9jayk7XG4gICAgICAgIHRoaXMudGVsZXBvcnRDb3VudC0tO1xuICAgICAgICB0aGlzLnRlbGVwb3J0Rmlyc3QgPSBudWxsO1xuICAgICAgICB0aGlzLnJlc2V0QWN0aXZhdGlvbigpO1xuICAgICAgICByZXR1cm4gQm9vc3RlckFjdGlvbi5UZWxlcG9ydFVzZWQ7XG4gICAgfVxufVxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/GameRules.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '70db39m9T5A7aHvbyLgeGZh', 'GameRules');
// Script/GameRules.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameRules = /** @class */ (function () {
    function GameRules() {
    }
    GameRules.randomSteps = function () {
        return Math.floor(Math.random() * (GameRules.MAX_STEPS - GameRules.MIN_STEPS + 1) + GameRules.MIN_STEPS);
    };
    GameRules.randomBoosterCount = function () {
        return Math.floor(Math.random() * (GameRules.MAX_BOOSTER_COUNT - GameRules.MIN_BOOSTER_COUNT + 1) +
            GameRules.MIN_BOOSTER_COUNT);
    };
    GameRules.scoreForGroup = function (size) {
        if (size === 3)
            return 10;
        if (size === 4)
            return 15;
        if (size >= 5)
            return 20;
        return 0;
    };
    GameRules.scoreForBombTiles = function (destroyedCount) {
        return destroyedCount * 10;
    };
    GameRules.MIN_STEPS = 20;
    GameRules.MAX_STEPS = 40;
    GameRules.MIN_BOOSTER_COUNT = 1;
    GameRules.MAX_BOOSTER_COUNT = 5;
    GameRules.MIN_GROUP_SIZE = 3;
    GameRules.MAX_SHUFFLE_ATTEMPTS = 3;
    return GameRules;
}());
exports.default = GameRules;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lUnVsZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtJQUFBO0lBZ0NBLENBQUM7SUF2QlUscUJBQVcsR0FBbEI7UUFDSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQ2IsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQ3hGLENBQUM7SUFDTixDQUFDO0lBRU0sNEJBQWtCLEdBQXpCO1FBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUNiLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsR0FBRyxTQUFTLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDO1lBQy9FLFNBQVMsQ0FBQyxpQkFBaUIsQ0FDOUIsQ0FBQztJQUNOLENBQUM7SUFFTSx1QkFBYSxHQUFwQixVQUFxQixJQUFZO1FBQzdCLElBQUksSUFBSSxLQUFLLENBQUM7WUFBRSxPQUFPLEVBQUUsQ0FBQztRQUMxQixJQUFJLElBQUksS0FBSyxDQUFDO1lBQUUsT0FBTyxFQUFFLENBQUM7UUFDMUIsSUFBSSxJQUFJLElBQUksQ0FBQztZQUFFLE9BQU8sRUFBRSxDQUFDO1FBQ3pCLE9BQU8sQ0FBQyxDQUFDO0lBQ2IsQ0FBQztJQUVNLDJCQUFpQixHQUF4QixVQUF5QixjQUFzQjtRQUMzQyxPQUFPLGNBQWMsR0FBRyxFQUFFLENBQUM7SUFDL0IsQ0FBQztJQTdCZSxtQkFBUyxHQUFHLEVBQUUsQ0FBQztJQUNmLG1CQUFTLEdBQUcsRUFBRSxDQUFDO0lBQ2YsMkJBQWlCLEdBQUcsQ0FBQyxDQUFDO0lBQ3RCLDJCQUFpQixHQUFHLENBQUMsQ0FBQztJQUN0Qix3QkFBYyxHQUFHLENBQUMsQ0FBQztJQUNuQiw4QkFBb0IsR0FBRyxDQUFDLENBQUM7SUF5QjdDLGdCQUFDO0NBaENELEFBZ0NDLElBQUE7a0JBaENvQixTQUFTIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZVJ1bGVzIHtcblxuICAgIHN0YXRpYyByZWFkb25seSBNSU5fU1RFUFMgPSAyMDtcbiAgICBzdGF0aWMgcmVhZG9ubHkgTUFYX1NURVBTID0gNDA7XG4gICAgc3RhdGljIHJlYWRvbmx5IE1JTl9CT09TVEVSX0NPVU5UID0gMTtcbiAgICBzdGF0aWMgcmVhZG9ubHkgTUFYX0JPT1NURVJfQ09VTlQgPSA1O1xuICAgIHN0YXRpYyByZWFkb25seSBNSU5fR1JPVVBfU0laRSA9IDM7XG4gICAgc3RhdGljIHJlYWRvbmx5IE1BWF9TSFVGRkxFX0FUVEVNUFRTID0gMztcblxuICAgIHN0YXRpYyByYW5kb21TdGVwcygpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihcbiAgICAgICAgICAgIE1hdGgucmFuZG9tKCkgKiAoR2FtZVJ1bGVzLk1BWF9TVEVQUyAtIEdhbWVSdWxlcy5NSU5fU1RFUFMgKyAxKSArIEdhbWVSdWxlcy5NSU5fU1RFUFNcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgcmFuZG9tQm9vc3RlckNvdW50KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKFxuICAgICAgICAgICAgTWF0aC5yYW5kb20oKSAqIChHYW1lUnVsZXMuTUFYX0JPT1NURVJfQ09VTlQgLSBHYW1lUnVsZXMuTUlOX0JPT1NURVJfQ09VTlQgKyAxKSArXG4gICAgICAgICAgICBHYW1lUnVsZXMuTUlOX0JPT1NURVJfQ09VTlRcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc2NvcmVGb3JHcm91cChzaXplOiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICBpZiAoc2l6ZSA9PT0gMykgcmV0dXJuIDEwO1xuICAgICAgICBpZiAoc2l6ZSA9PT0gNCkgcmV0dXJuIDE1O1xuICAgICAgICBpZiAoc2l6ZSA+PSA1KSByZXR1cm4gMjA7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIHN0YXRpYyBzY29yZUZvckJvbWJUaWxlcyhkZXN0cm95ZWRDb3VudDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIGRlc3Ryb3llZENvdW50ICogMTA7XG4gICAgfVxufVxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/BoosterType.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'faf58UgefFMaqb+QWn4s6pX', 'BoosterType');
// Script/BoosterType.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoosterType = void 0;
var BoosterType;
(function (BoosterType) {
    BoosterType[BoosterType["None"] = 0] = "None";
    BoosterType[BoosterType["Bomb"] = 1] = "Bomb";
    BoosterType[BoosterType["Teleport"] = 2] = "Teleport";
})(BoosterType = exports.BoosterType || (exports.BoosterType = {}));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxCb29zdGVyVHlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFZLFdBSVg7QUFKRCxXQUFZLFdBQVc7SUFDbkIsNkNBQVEsQ0FBQTtJQUNSLDZDQUFRLENBQUE7SUFDUixxREFBWSxDQUFBO0FBQ2hCLENBQUMsRUFKVyxXQUFXLEdBQVgsbUJBQVcsS0FBWCxtQkFBVyxRQUl0QiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBlbnVtIEJvb3N0ZXJUeXBlIHtcbiAgICBOb25lID0gMCxcbiAgICBCb21iID0gMSxcbiAgICBUZWxlcG9ydCA9IDIsXG59XG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/IGridAccess.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'cca6aHmDOFMZKJ1O0pJbv90', 'IGridAccess');
// Script/IGridAccess.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxJR3JpZEFjY2Vzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJsb2NrIGZyb20gXCIuL0Jsb2NrXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGludGVyZmFjZSBJR3JpZEFjY2VzcyB7XG4gICAgcmVhZG9ubHkgd2lkdGg6IG51bWJlcjtcbiAgICByZWFkb25seSBoZWlnaHQ6IG51bWJlcjtcbiAgICBnZXROZWlnaGJvcnMoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBCbG9ja1tdO1xuICAgIGdldEJsb2NrQXQoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBCbG9jayB8IG51bGw7XG4gICAgZm9yRWFjaEJsb2NrKGNhbGxiYWNrOiAoYmxvY2s6IEJsb2NrLCB4OiBudW1iZXIsIHk6IG51bWJlcikgPT4gdm9pZCk6IHZvaWQ7XG59XG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/IBlockClickHandler.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '53ce5tmXtdFp5l1+Xhw5Iwr', 'IBlockClickHandler');
// Script/IBlockClickHandler.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxJQmxvY2tDbGlja0hhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCbG9jayBmcm9tIFwiLi9CbG9ja1wiO1xuXG5leHBvcnQgZGVmYXVsdCBpbnRlcmZhY2UgSUJsb2NrQ2xpY2tIYW5kbGVyIHtcbiAgICBvbkJsb2NrQ2xpY2tlZChibG9jazogQmxvY2spOiB2b2lkO1xufVxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/GameStartSystem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lU3RhcnRTeXN0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQU0sSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUMseUNBQW9DO0FBQ3BDLDZDQUF3QztBQUN4Qyw2Q0FBd0M7QUFDeEMsaURBQTRDO0FBQzVDLDZDQUE0QztBQUU1QyxtREFBaUU7QUFDakUsMkRBQTZFO0FBRzdFO0lBQTZDLG1DQUFZO0lBQXpEO1FBQUEscUVBaVVDO1FBOVRHLFdBQUssR0FBZ0IsSUFBSSxDQUFDO1FBRzFCLFlBQU0sR0FBZ0IsSUFBSSxDQUFDO1FBRzNCLGlCQUFXLEdBQVcsR0FBRyxDQUFDO1FBRzFCLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFHekIsbUJBQWEsR0FBa0IsSUFBSSxDQUFDO1FBR3BDLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFHMUIsY0FBUSxHQUFZLElBQUksQ0FBQztRQUd6QixtQkFBYSxHQUFjLElBQUksQ0FBQztRQUdoQyxrQkFBWSxHQUFjLElBQUksQ0FBQztRQUcvQixrQkFBWSxHQUFjLElBQUksQ0FBQztRQUcvQixpQkFBVyxHQUFjLElBQUksQ0FBQztRQUc5QixxQkFBZSxHQUFnQixJQUFJLENBQUM7UUFHcEMsc0JBQWdCLEdBQWdCLElBQUksQ0FBQztRQUdyQyxhQUFPLEdBQVksSUFBSSxDQUFDO1FBR3hCLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFHekIscUJBQWUsR0FBbUIsSUFBSSxDQUFDO1FBR3ZDLHlCQUFtQixHQUFtQixJQUFJLENBQUM7UUFLM0MsZ0JBQVUsR0FBVyxDQUFDLENBQUM7UUFFTixhQUFPLEdBQUcsSUFBSSxxQkFBVyxFQUFFLENBQUM7UUFDckMsaUJBQVcsR0FBZ0IsSUFBSSxDQUFDO1FBQ2hDLG9CQUFjLEdBQW1CLElBQUksQ0FBQztRQUN0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ZXNDb250ZW50IjpbImNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5pbXBvcnQgQmxvY2sgZnJvbSBcIi4vQmxvY2tcIjtcbmltcG9ydCBHYW1lUnVsZXMgZnJvbSBcIi4vR2FtZVJ1bGVzXCI7XG5pbXBvcnQgR2FtZVNlc3Npb24gZnJvbSBcIi4vR2FtZVNlc3Npb25cIjtcbmltcG9ydCBNYXRjaEZpbmRlciBmcm9tIFwiLi9NYXRjaEZpbmRlclwiO1xuaW1wb3J0IEdyaWRHZW5lcmF0b3IgZnJvbSBcIi4vR3JpZEdlbmVyYXRvclwiO1xuaW1wb3J0IHsgQm9vc3RlclR5cGUgfSBmcm9tIFwiLi9Cb29zdGVyVHlwZVwiO1xuaW1wb3J0IElCbG9ja0NsaWNrSGFuZGxlciBmcm9tIFwiLi9JQmxvY2tDbGlja0hhbmRsZXJcIjtcbmltcG9ydCBCb29zdGVyU2VydmljZSwgeyBCb29zdGVyQWN0aW9uIH0gZnJvbSBcIi4vQm9vc3RlclNlcnZpY2VcIjtcbmltcG9ydCBQbGF5YWJpbGl0eVNlcnZpY2UsIHsgUGxheWFiaWxpdHlSZXN1bHQgfSBmcm9tIFwiLi9QbGF5YWJpbGl0eVNlcnZpY2VcIjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVTdGFydFN5c3RlbSBleHRlbmRzIGNjLkNvbXBvbmVudCBpbXBsZW1lbnRzIElCbG9ja0NsaWNrSGFuZGxlciB7XG5cbiAgICBAcHJvcGVydHkoY2MuUmljaFRleHQpXG4gICAgbGFiZWw6IGNjLlJpY2hUZXh0ID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5SaWNoVGV4dClcbiAgICBsYWJlbDI6IGNjLlJpY2hUZXh0ID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eVxuICAgIHRhcmdldFNjb3JlOiBudW1iZXIgPSAyMDA7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBncmlkTm9kZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoR3JpZEdlbmVyYXRvcilcbiAgICBncmlkR2VuZXJhdG9yOiBHcmlkR2VuZXJhdG9yID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGxvc2VQYW5lbDogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICB3aW5QYW5lbDogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuQnV0dG9uKVxuICAgIGJ1dHRvblllc0xvc2U6IGNjLkJ1dHRvbiA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuQnV0dG9uKVxuICAgIGJ1dHRvbk5vTG9zZTogY2MuQnV0dG9uID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5CdXR0b24pXG4gICAgYnV0dG9uWWVzV2luOiBjYy5CdXR0b24gPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkJ1dHRvbilcbiAgICBidXR0b25Ob1dpbjogY2MuQnV0dG9uID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5SaWNoVGV4dClcbiAgICBRdWFudGl0eUJvb3N0ZXI6IGNjLlJpY2hUZXh0ID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5SaWNoVGV4dClcbiAgICBRdWFudGl0eUJvb3N0ZXIyOiBjYy5SaWNoVGV4dCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBCb29zdGVyOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIEJvb3N0ZXIyOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGVGcmFtZSlcbiAgICBpY29uQm9vc3RlckJvbWI6IGNjLlNwcml0ZUZyYW1lID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGVGcmFtZSlcbiAgICBpY29uQm9vc3RlclRlbGVwb3J0OiBjYy5TcHJpdGVGcmFtZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoe1xuICAgICAgICB0b29sdGlwOiBcItCg0LDQtNC40YPRgSDQsdC+0LzQsdGLINCyINC60LvQtdGC0LrQsNGFICgxID0g0LrQstCw0LTRgNCw0YIgM8OXMylcIlxuICAgIH0pXG4gICAgYm9tYlJhZGl1czogbnVtYmVyID0gMTtcblxuICAgIHByaXZhdGUgcmVhZG9ubHkgc2Vzc2lvbiA9IG5ldyBHYW1lU2Vzc2lvbigpO1xuICAgIHByaXZhdGUgbWF0Y2hGaW5kZXI6IE1hdGNoRmluZGVyID0gbnVsbDtcbiAgICBwcml2YXRlIGJvb3N0ZXJTZXJ2aWNlOiBCb29zdGVyU2VydmljZSA9IG51bGw7XG4gICAgcHJpdmF0ZSBwbGF5YWJpbGl0eVNlcnZpY2U6IFBsYXlhYmlsaXR5U2VydmljZSA9IG51bGw7XG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgdGhpcy5pbml0U2VydmljZXMoKTtcbiAgICAgICAgdGhpcy5zZXNzaW9uLnJlc2V0KHRoaXMudGFyZ2V0U2NvcmUpO1xuICAgICAgICB0aGlzLmJvb3N0ZXJTZXJ2aWNlLmluaXRDb3VudHMoKTtcblxuICAgICAgICB0aGlzLnJlc29sdmVCb29zdGVyUmVmcygpO1xuICAgICAgICB0aGlzLmFwcGx5Qm9vc3Rlckljb25zKCk7XG4gICAgICAgIHRoaXMuc2V0dXBCb29zdGVyQnV0dG9ucygpO1xuICAgICAgICB0aGlzLnVwZGF0ZVVJKCk7XG4gICAgICAgIHRoaXMudXBkYXRlQm9vc3RlclVJKCk7XG5cbiAgICAgICAgaWYgKHRoaXMubG9zZVBhbmVsKSB0aGlzLmxvc2VQYW5lbC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgaWYgKHRoaXMud2luUGFuZWwpIHRoaXMud2luUGFuZWwuYWN0aXZlID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5iaW5kUGFuZWxCdXR0b25zKCk7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHRoaXMucnVuUGxheWFiaWxpdHlDaGVjaygpLCAwKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRTZXJ2aWNlcygpIHtcbiAgICAgICAgaWYgKHRoaXMuZ3JpZEdlbmVyYXRvcikge1xuICAgICAgICAgICAgdGhpcy5tYXRjaEZpbmRlciA9IG5ldyBNYXRjaEZpbmRlcih0aGlzLmdyaWRHZW5lcmF0b3IpO1xuICAgICAgICAgICAgdGhpcy5wbGF5YWJpbGl0eVNlcnZpY2UgPSBuZXcgUGxheWFiaWxpdHlTZXJ2aWNlKHRoaXMuZ3JpZEdlbmVyYXRvciwgdGhpcy5tYXRjaEZpbmRlcik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ib29zdGVyU2VydmljZSA9IG5ldyBCb29zdGVyU2VydmljZSh0aGlzLmJvbWJSYWRpdXMpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYmluZFBhbmVsQnV0dG9ucygpIHtcbiAgICAgICAgaWYgKHRoaXMuYnV0dG9uWWVzTG9zZSkgdGhpcy5idXR0b25ZZXNMb3NlLm5vZGUub24oJ2NsaWNrJywgdGhpcy5yZXN0YXJ0R2FtZSwgdGhpcyk7XG4gICAgICAgIGlmICh0aGlzLmJ1dHRvbk5vTG9zZSkgdGhpcy5idXR0b25Ob0xvc2Uubm9kZS5vbignY2xpY2snLCB0aGlzLmV4aXRHYW1lLCB0aGlzKTtcbiAgICAgICAgaWYgKHRoaXMuYnV0dG9uWWVzV2luKSB0aGlzLmJ1dHRvblllc1dpbi5ub2RlLm9uKCdjbGljaycsIHRoaXMucmVzdGFydEdhbWUsIHRoaXMpO1xuICAgICAgICBpZiAodGhpcy5idXR0b25Ob1dpbikgdGhpcy5idXR0b25Ob1dpbi5ub2RlLm9uKCdjbGljaycsIHRoaXMuZXhpdEdhbWUsIHRoaXMpO1xuICAgIH1cblxuICAgIG9uQmxvY2tDbGlja2VkKGJsb2NrOiBCbG9jaykge1xuICAgICAgICBpZiAoIXRoaXMuZ3JpZEdlbmVyYXRvciB8fCAhYmxvY2sgfHwgIWNjLmlzVmFsaWQoYmxvY2subm9kZSkgfHwgdGhpcy5pc0dhbWVPdmVyKCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmJvb3N0ZXJTZXJ2aWNlLmFjdGl2ZVR5cGUgIT09IEJvb3N0ZXJUeXBlLk5vbmUpIHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlQm9vc3RlckJsb2NrQ2xpY2soYmxvY2spO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLnNlc3Npb24uY2FuU3BlbmRTdGVwKCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGdyb3VwID0gdGhpcy5tYXRjaEZpbmRlci5maW5kR3JvdXAoYmxvY2spO1xuICAgICAgICBpZiAoZ3JvdXAubGVuZ3RoIDwgR2FtZVJ1bGVzLk1JTl9HUk9VUF9TSVpFKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNlc3Npb24uc3BlbmRTdGVwKCk7XG4gICAgICAgIHRoaXMuc2Vzc2lvbi5hZGRTY29yZShHYW1lUnVsZXMuc2NvcmVGb3JHcm91cChncm91cC5sZW5ndGgpKTtcbiAgICAgICAgdGhpcy5ncmlkR2VuZXJhdG9yLnJlbW92ZUJsb2Nrcyhncm91cCk7XG4gICAgICAgIHRoaXMuZ3JpZEdlbmVyYXRvci5yZXNvbHZlQm9hcmRBZnRlckNoYW5nZSgpO1xuXG4gICAgICAgIHRoaXMuc2Vzc2lvbi5yZXNldFNodWZmbGVBdHRlbXB0cygpO1xuICAgICAgICB0aGlzLnJlZnJlc2hIdWQoKTtcbiAgICAgICAgdGhpcy5hcHBseUVuZFN0YXRlKCk7XG5cbiAgICAgICAgaWYgKCF0aGlzLmlzR2FtZU92ZXIoKSkge1xuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4gdGhpcy5ydW5QbGF5YWJpbGl0eUNoZWNrKCksIDAuMyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGhhbmRsZUJvb3N0ZXJCbG9ja0NsaWNrKGJsb2NrOiBCbG9jaykge1xuICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLmJvb3N0ZXJTZXJ2aWNlLmhhbmRsZUJsb2NrQ2xpY2soYmxvY2ssIHRoaXMuZ3JpZEdlbmVyYXRvcik7XG5cbiAgICAgICAgc3dpdGNoIChyZXN1bHQuYWN0aW9uKSB7XG4gICAgICAgICAgICBjYXNlIEJvb3N0ZXJBY3Rpb24uV2FpdFNlY29uZFRpbGU6XG4gICAgICAgICAgICAgICAgdGhpcy5oaWdobGlnaHRUZWxlcG9ydEJsb2NrKGJsb2NrLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUJvb3N0ZXJVSSgpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgY2FzZSBCb29zdGVyQWN0aW9uLkNhbmNlbFNlbGVjdGlvbjpcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyVGVsZXBvcnRIaWdobGlnaHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUJvb3N0ZXJVSSgpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgY2FzZSBCb29zdGVyQWN0aW9uLkJvbWJVc2VkOlxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQudGFyZ2V0cyAmJiByZXN1bHQudGFyZ2V0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2Vzc2lvbi5hZGRTY29yZShHYW1lUnVsZXMuc2NvcmVGb3JCb21iVGlsZXMocmVzdWx0LnRhcmdldHMubGVuZ3RoKSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JpZEdlbmVyYXRvci5yZW1vdmVCbG9ja3MocmVzdWx0LnRhcmdldHMpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdyaWRHZW5lcmF0b3IucmVzb2x2ZUJvYXJkQWZ0ZXJDaGFuZ2UoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoSHVkKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwbHlFbmRTdGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNHYW1lT3ZlcigpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB0aGlzLnJ1blBsYXlhYmlsaXR5Q2hlY2soKSwgMC4zKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUJvb3N0ZXJVSSgpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgY2FzZSBCb29zdGVyQWN0aW9uLlRlbGVwb3J0VXNlZDpcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyVGVsZXBvcnRIaWdobGlnaHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUJvb3N0ZXJVSSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHRoaXMucnVuUGxheWFiaWxpdHlDaGVjaygpLCAwLjEpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUJvb3N0ZXJVSSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBydW5QbGF5YWJpbGl0eUNoZWNrKCkge1xuICAgICAgICBpZiAoIXRoaXMucGxheWFiaWxpdHlTZXJ2aWNlIHx8IHRoaXMuaXNHYW1lT3ZlcigpKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5wbGF5YWJpbGl0eVNlcnZpY2UuZW5zdXJlUGxheWFibGUodGhpcy5zZXNzaW9uKTtcblxuICAgICAgICBpZiAocmVzdWx0ID09PSBQbGF5YWJpbGl0eVJlc3VsdC5Ob01vdmVzTGVmdCkge1xuICAgICAgICAgICAgdGhpcy5ib29zdGVyU2VydmljZS5yZXNldEFjdGl2YXRpb24oKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmxvc2VQYW5lbCkgdGhpcy5sb3NlUGFuZWwuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQm9vc3RlclVJKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGFwcGx5RW5kU3RhdGUoKSB7XG4gICAgICAgIGlmICh0aGlzLnNlc3Npb24uaXNXaW4oKSkge1xuICAgICAgICAgICAgdGhpcy5ib29zdGVyU2VydmljZS5yZXNldEFjdGl2YXRpb24oKTtcbiAgICAgICAgICAgIGlmICh0aGlzLndpblBhbmVsKSB0aGlzLndpblBhbmVsLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5zZXNzaW9uLmlzTG9zZUJ5U3RlcHMoKSkge1xuICAgICAgICAgICAgdGhpcy5ib29zdGVyU2VydmljZS5yZXNldEFjdGl2YXRpb24oKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmxvc2VQYW5lbCkgdGhpcy5sb3NlUGFuZWwuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgcmVmcmVzaEh1ZCgpIHtcbiAgICAgICAgdGhpcy51cGRhdGVVSSgpO1xuICAgICAgICB0aGlzLnVwZGF0ZUJvb3N0ZXJVSSgpO1xuICAgIH1cblxuICAgIHVwZGF0ZVVJKCkge1xuICAgICAgICBpZiAodGhpcy5sYWJlbCkge1xuICAgICAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSBgPGNvbG9yPSNmZmZmZmY+JHt0aGlzLnNlc3Npb24uc3RlcHN9PC9jb2xvcj5gO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmxhYmVsMikge1xuICAgICAgICAgICAgdGhpcy5sYWJlbDIuc3RyaW5nID1cbiAgICAgICAgICAgICAgICBgPGNvbG9yPSNmZmZmZmY+JHt0aGlzLnNlc3Npb24uc2NvcmV9LyR7dGhpcy5zZXNzaW9uLnRhcmdldFNjb3JlfTwvY29sb3I+YDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZUJvb3N0ZXJVSSgpIHtcbiAgICAgICAgaWYgKHRoaXMuUXVhbnRpdHlCb29zdGVyKSB7XG4gICAgICAgICAgICB0aGlzLlF1YW50aXR5Qm9vc3Rlci5zdHJpbmcgPVxuICAgICAgICAgICAgICAgIGA8Y29sb3I9I2ZmZmZmZj4ke3RoaXMuYm9vc3RlclNlcnZpY2UuYm9tYkNvdW50fTwvY29sb3I+YDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5RdWFudGl0eUJvb3N0ZXIyKSB7XG4gICAgICAgICAgICB0aGlzLlF1YW50aXR5Qm9vc3RlcjIuc3RyaW5nID1cbiAgICAgICAgICAgICAgICBgPGNvbG9yPSNmZmZmZmY+JHt0aGlzLmJvb3N0ZXJTZXJ2aWNlLnRlbGVwb3J0Q291bnR9PC9jb2xvcj5gO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRCb29zdGVyVmlzdWFsKHRoaXMuQm9vc3RlciwgQm9vc3RlclR5cGUuQm9tYiwgdGhpcy5ib29zdGVyU2VydmljZS5ib21iQ291bnQpO1xuICAgICAgICB0aGlzLnNldEJvb3N0ZXJWaXN1YWwodGhpcy5Cb29zdGVyMiwgQm9vc3RlclR5cGUuVGVsZXBvcnQsIHRoaXMuYm9vc3RlclNlcnZpY2UudGVsZXBvcnRDb3VudCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRCb29zdGVyVmlzdWFsKG5vZGU6IGNjLk5vZGUsIHR5cGU6IEJvb3N0ZXJUeXBlLCBjb3VudDogbnVtYmVyKSB7XG4gICAgICAgIGlmICghbm9kZSkgcmV0dXJuO1xuICAgICAgICBub2RlLm9wYWNpdHkgPSBjb3VudCA+IDAgPyAyNTUgOiAxMjA7XG4gICAgICAgIG5vZGUuc2NhbGUgPSB0aGlzLmJvb3N0ZXJTZXJ2aWNlLmFjdGl2ZVR5cGUgPT09IHR5cGUgPyAxLjE1IDogMTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQm9tYkJvb3N0ZXJDbGlja2VkKCkge1xuICAgICAgICBpZiAodGhpcy5pc0dhbWVPdmVyKCkgfHwgdGhpcy5ib29zdGVyU2VydmljZS5ib21iQ291bnQgPD0gMCkgcmV0dXJuO1xuICAgICAgICBpZiAodGhpcy5ib29zdGVyU2VydmljZS50b2dnbGUoQm9vc3RlclR5cGUuQm9tYikpIHtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJUZWxlcG9ydEhpZ2hsaWdodCgpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVCb29zdGVyVUkoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgb25UZWxlcG9ydEJvb3N0ZXJDbGlja2VkKCkge1xuICAgICAgICBpZiAodGhpcy5pc0dhbWVPdmVyKCkgfHwgdGhpcy5ib29zdGVyU2VydmljZS50ZWxlcG9ydENvdW50IDw9IDApIHJldHVybjtcbiAgICAgICAgaWYgKHRoaXMuYm9vc3RlclNlcnZpY2UudG9nZ2xlKEJvb3N0ZXJUeXBlLlRlbGVwb3J0KSkge1xuICAgICAgICAgICAgdGhpcy5jbGVhclRlbGVwb3J0SGlnaGxpZ2h0KCk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUJvb3N0ZXJVSSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoaWdobGlnaHRUZWxlcG9ydEJsb2NrKGJsb2NrOiBCbG9jaywgb246IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKCFibG9jayB8fCAhY2MuaXNWYWxpZChibG9jay5ub2RlKSkgcmV0dXJuO1xuICAgICAgICBibG9jay5ub2RlLnNjYWxlID0gb24gPyAxLjE1IDogMTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNsZWFyVGVsZXBvcnRIaWdobGlnaHQoKSB7XG4gICAgICAgIGNvbnN0IGZpcnN0ID0gdGhpcy5ib29zdGVyU2VydmljZS5nZXRUZWxlcG9ydEZpcnN0KCk7XG4gICAgICAgIGlmIChmaXJzdCkgdGhpcy5oaWdobGlnaHRUZWxlcG9ydEJsb2NrKGZpcnN0LCBmYWxzZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZXNvbHZlQm9vc3RlclJlZnMoKSB7XG4gICAgICAgIGNvbnN0IGNhbnZhcyA9IGNjLmZpbmQoXCJDYW52YXNcIik7XG4gICAgICAgIGlmICghY2FudmFzKSByZXR1cm47XG5cbiAgICAgICAgaWYgKCF0aGlzLlF1YW50aXR5Qm9vc3Rlcikge1xuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IHRoaXMuZmluZE5vZGVCeU5hbWUoY2FudmFzLCBcIlF1YW50aXR5Qm9vc3RlclwiKTtcbiAgICAgICAgICAgIGlmIChub2RlKSB0aGlzLlF1YW50aXR5Qm9vc3RlciA9IG5vZGUuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuUXVhbnRpdHlCb29zdGVyMikge1xuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IHRoaXMuZmluZE5vZGVCeU5hbWUoY2FudmFzLCBcIlF1YW50aXR5Qm9vc3RlcjJcIik7XG4gICAgICAgICAgICBpZiAobm9kZSkgdGhpcy5RdWFudGl0eUJvb3N0ZXIyID0gbm9kZS5nZXRDb21wb25lbnQoY2MuUmljaFRleHQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5Cb29zdGVyIHx8ICF0aGlzLkJvb3N0ZXIyKSB7XG4gICAgICAgICAgICBjb25zdCBib29zdGVyTm9kZXMgPSB0aGlzLmZpbmRBbGxOb2Rlc0J5TmFtZShjYW52YXMsIFwiQm9vc3RlclwiKTtcbiAgICAgICAgICAgIGlmICghdGhpcy5Cb29zdGVyICYmIGJvb3N0ZXJOb2Rlcy5sZW5ndGggPiAwKSB0aGlzLkJvb3N0ZXIgPSBib29zdGVyTm9kZXNbMF07XG4gICAgICAgICAgICBpZiAoIXRoaXMuQm9vc3RlcjIgJiYgYm9vc3Rlck5vZGVzLmxlbmd0aCA+IDEpIHRoaXMuQm9vc3RlcjIgPSBib29zdGVyTm9kZXNbMV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGZpbmROb2RlQnlOYW1lKHJvb3Q6IGNjLk5vZGUsIG5hbWU6IHN0cmluZyk6IGNjLk5vZGUgfCBudWxsIHtcbiAgICAgICAgaWYgKHJvb3QubmFtZSA9PT0gbmFtZSkgcmV0dXJuIHJvb3Q7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcm9vdC5jaGlsZHJlbkNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGZvdW5kID0gdGhpcy5maW5kTm9kZUJ5TmFtZShyb290LmNoaWxkcmVuW2ldLCBuYW1lKTtcbiAgICAgICAgICAgIGlmIChmb3VuZCkgcmV0dXJuIGZvdW5kO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHByaXZhdGUgZmluZEFsbE5vZGVzQnlOYW1lKHJvb3Q6IGNjLk5vZGUsIG5hbWU6IHN0cmluZyk6IGNjLk5vZGVbXSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdDogY2MuTm9kZVtdID0gW107XG4gICAgICAgIGlmIChyb290Lm5hbWUgPT09IG5hbWUpIHJlc3VsdC5wdXNoKHJvb3QpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJvb3QuY2hpbGRyZW5Db3VudDsgaSsrKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaCguLi50aGlzLmZpbmRBbGxOb2Rlc0J5TmFtZShyb290LmNoaWxkcmVuW2ldLCBuYW1lKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFwcGx5Qm9vc3Rlckljb25zKCkge1xuICAgICAgICB0aGlzLmFwcGx5SWNvblRvQm9vc3Rlck5vZGUodGhpcy5Cb29zdGVyLCB0aGlzLmljb25Cb29zdGVyQm9tYik7XG4gICAgICAgIHRoaXMuYXBwbHlJY29uVG9Cb29zdGVyTm9kZSh0aGlzLkJvb3N0ZXIyLCB0aGlzLmljb25Cb29zdGVyVGVsZXBvcnQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXBwbHlJY29uVG9Cb29zdGVyTm9kZShub2RlOiBjYy5Ob2RlLCBmcmFtZTogY2MuU3ByaXRlRnJhbWUpIHtcbiAgICAgICAgaWYgKCFub2RlIHx8ICFmcmFtZSkgcmV0dXJuO1xuICAgICAgICBjb25zdCBzcHJpdGUgPSBub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xuICAgICAgICBpZiAoIXNwcml0ZSkgcmV0dXJuO1xuICAgICAgICBzcHJpdGUuc3ByaXRlRnJhbWUgPSBmcmFtZTtcbiAgICAgICAgc3ByaXRlLnNpemVNb2RlID0gY2MuU3ByaXRlLlNpemVNb2RlLlRSSU1NRUQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXR1cEJvb3N0ZXJCdXR0b25zKCkge1xuICAgICAgICBpZiAodGhpcy5Cb29zdGVyKSB0aGlzLkJvb3N0ZXIub24oJ3RvdWNoZW5kJywgdGhpcy5vbkJvbWJCb29zdGVyQ2xpY2tlZCwgdGhpcyk7XG4gICAgICAgIGlmICh0aGlzLkJvb3N0ZXIyKSB0aGlzLkJvb3N0ZXIyLm9uKCd0b3VjaGVuZCcsIHRoaXMub25UZWxlcG9ydEJvb3N0ZXJDbGlja2VkLCB0aGlzKTtcbiAgICB9XG5cbiAgICBpc0dhbWVPdmVyKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gKHRoaXMud2luUGFuZWwgJiYgdGhpcy53aW5QYW5lbC5hY3RpdmUpIHx8XG4gICAgICAgICAgICAodGhpcy5sb3NlUGFuZWwgJiYgdGhpcy5sb3NlUGFuZWwuYWN0aXZlKTtcbiAgICB9XG5cbiAgICByZXN0YXJ0R2FtZSgpIHtcbiAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKGNjLmRpcmVjdG9yLmdldFNjZW5lKCkubmFtZSk7XG4gICAgfVxuXG4gICAgZXhpdEdhbWUoKSB7XG4gICAgICAgIGNjLmdhbWUuZW5kKCk7XG4gICAgfVxufVxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/GridGenerator.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'df031ErxMlCyryu41niHe//', 'GridGenerator');
// Script/GridGenerator.ts

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
var Block_1 = require("./Block");
var GridGenerator = /** @class */ (function (_super) {
    __extends(GridGenerator, _super);
    function GridGenerator() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.X = 9;
        _this.Y = 10;
        _this.blockPrefab = null;
        _this.sprites = [];
        _this.cellSize = 64;
        _this.padding = 8;
        _this.grid = [];
        return _this;
    }
    Object.defineProperty(GridGenerator.prototype, "width", {
        get: function () {
            return this.X;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GridGenerator.prototype, "height", {
        get: function () {
            return this.Y;
        },
        enumerable: false,
        configurable: true
    });
    GridGenerator.prototype.forEachBlock = function (callback) {
        for (var y = 0; y < this.Y; y++) {
            for (var x = 0; x < this.X; x++) {
                var block = this.grid[y][x];
                if (block)
                    callback(block, x, y);
            }
        }
    };
    GridGenerator.prototype.removeBlocks = function (blocks) {
        for (var _i = 0, blocks_1 = blocks; _i < blocks_1.length; _i++) {
            var block = blocks_1[_i];
            if (!block || !cc.isValid(block.node))
                continue;
            var gridX = block.gridX, gridY = block.gridY;
            if (this.grid[gridY] && this.grid[gridY][gridX] === block) {
                this.grid[gridY][gridX] = null;
            }
            block.node.destroy();
        }
    };
    GridGenerator.prototype.resolveBoardAfterChange = function () {
        this.fallDown();
        this.spawnNewBlocks();
    };
    GridGenerator.prototype.start = function () {
        this.initGrid();
        this.generateGrid();
    };
    GridGenerator.prototype.initGrid = function () {
        this.grid = [];
        for (var y = 0; y < this.Y; y++) {
            this.grid[y] = [];
            for (var x = 0; x < this.X; x++) {
                this.grid[y][x] = null;
            }
        }
    };
    GridGenerator.prototype.generateGrid = function () {
        var step = this.cellSize + this.padding;
        var totalWidth = this.X * step;
        var totalHeight = this.Y * step;
        var offsetX = -totalWidth / 2 + step / 2;
        var offsetY = -totalHeight / 2 + step / 2;
        for (var y = 0; y < this.Y; y++) {
            for (var x = 0; x < this.X; x++) {
                this.spawnBlock(x, y, offsetX, offsetY);
            }
        }
    };
    GridGenerator.prototype.getGridOffsets = function () {
        var step = this.cellSize + this.padding;
        var totalWidth = this.X * step;
        var totalHeight = this.Y * step;
        return {
            step: step,
            offsetX: -totalWidth / 2 + step / 2,
            offsetY: -totalHeight / 2 + step / 2,
        };
    };
    GridGenerator.prototype.getCellPosition = function (x, y) {
        var _a = this.getGridOffsets(), step = _a.step, offsetX = _a.offsetX, offsetY = _a.offsetY;
        return cc.v2(offsetX + x * step, offsetY + y * step);
    };
    GridGenerator.prototype.snapBlockToCell = function (block) {
        if (!block || !cc.isValid(block.node))
            return;
        var pos = this.getCellPosition(block.gridX, block.gridY);
        block.node.stopAllActions();
        block.node.setPosition(pos.x, pos.y);
        block.node.scale = 1;
    };
    GridGenerator.prototype.spawnBlock = function (x, y, offsetX, offsetY, animated) {
        if (animated === void 0) { animated = true; }
        if (!this.blockPrefab || this.sprites.length === 0) {
            cc.warn("GridGenerator: blockPrefab или sprites не заданы");
            return;
        }
        var blockNode = cc.instantiate(this.blockPrefab);
        blockNode.parent = this.node;
        var _a = this.getGridOffsets(), step = _a.step, defOffsetX = _a.offsetX, defOffsetY = _a.offsetY;
        if (offsetX === undefined)
            offsetX = defOffsetX;
        if (offsetY === undefined)
            offsetY = defOffsetY;
        var finalX = offsetX + x * step;
        var finalY = offsetY + y * step;
        if (animated) {
            blockNode.setPosition(finalX, finalY + 300);
        }
        else {
            blockNode.setPosition(finalX, finalY);
        }
        var block = blockNode.getComponent(Block_1.default);
        if (!block) {
            cc.warn("GridGenerator: на префабе нет компонента Block");
            blockNode.destroy();
            return;
        }
        var playFrame = cc.find("Canvas/bg_frame_play");
        if (playFrame) {
            var handler = playFrame.getComponent("GameStartSystem");
            if (handler)
                block.clickHandler = handler;
        }
        var randomIndex = Math.floor(Math.random() * this.sprites.length);
        block.sprite.spriteFrame = this.sprites[randomIndex];
        block.gridX = x;
        block.gridY = y;
        block.colorId = randomIndex;
        this.grid[y][x] = block;
        if (animated) {
            blockNode.runAction(cc.moveTo(0.25, finalX, finalY).easing(cc.easeCubicActionOut()));
        }
    };
    GridGenerator.prototype.getBlockAt = function (x, y) {
        if (y < 0 || y >= this.Y || x < 0 || x >= this.X) {
            return null;
        }
        return this.grid[y][x];
    };
    /** Все тайлы в квадрате с радиусом R (расстояние Чебышёва). */
    GridGenerator.prototype.getBlocksInRadius = function (centerX, centerY, radius) {
        var result = [];
        var seen = new Set();
        for (var y = centerY - radius; y <= centerY + radius; y++) {
            for (var x = centerX - radius; x <= centerX + radius; x++) {
                var block = this.getBlockAt(x, y);
                if (block && !seen.has(block)) {
                    seen.add(block);
                    result.push(block);
                }
            }
        }
        return result;
    };
    GridGenerator.prototype.swapBlocks = function (a, b) {
        if (!a || !b || a === b)
            return;
        var ax = a.gridX;
        var ay = a.gridY;
        var bx = b.gridX;
        var by = b.gridY;
        this.grid[ay][ax] = b;
        this.grid[by][bx] = a;
        a.gridX = bx;
        a.gridY = by;
        b.gridX = ax;
        b.gridY = ay;
        this.snapBlockToCell(a);
        this.snapBlockToCell(b);
    };
    GridGenerator.prototype.getNeighbors = function (x, y) {
        var result = [];
        var dirs = [
            [1, 0], [-1, 0],
            [0, 1], [0, -1]
        ];
        for (var _i = 0, dirs_1 = dirs; _i < dirs_1.length; _i++) {
            var d = dirs_1[_i];
            var nx = x + d[0];
            var ny = y + d[1];
            if (ny >= 0 && ny < this.Y && nx >= 0 && nx < this.X) {
                var b = this.grid[ny][nx];
                if (b)
                    result.push(b);
            }
        }
        return result;
    };
    /** Уплотняет сетку: все блоки вниз, пустые ячейки сверху. */
    GridGenerator.prototype.compactGridData = function () {
        for (var x = 0; x < this.X; x++) {
            var writeY = 0;
            for (var readY = 0; readY < this.Y; readY++) {
                var block = this.grid[readY][x];
                if (!block)
                    continue;
                if (readY !== writeY) {
                    this.grid[writeY][x] = block;
                    this.grid[readY][x] = null;
                    block.gridY = writeY;
                }
                writeY++;
            }
            for (var y = writeY; y < this.Y; y++) {
                this.grid[y][x] = null;
            }
        }
    };
    GridGenerator.prototype.fallDown = function (animated) {
        if (animated === void 0) { animated = true; }
        var movedBlocks = [];
        for (var x = 0; x < this.X; x++) {
            var writeY = 0;
            for (var readY = 0; readY < this.Y; readY++) {
                var block = this.grid[readY][x];
                if (!block)
                    continue;
                if (readY !== writeY) {
                    this.grid[writeY][x] = block;
                    this.grid[readY][x] = null;
                    block.gridY = writeY;
                    movedBlocks.push(block);
                }
                writeY++;
            }
            for (var y = writeY; y < this.Y; y++) {
                this.grid[y][x] = null;
            }
        }
        if (!animated) {
            for (var y = 0; y < this.Y; y++) {
                for (var x = 0; x < this.X; x++) {
                    var block = this.grid[y][x];
                    if (block)
                        this.snapBlockToCell(block);
                }
            }
            return;
        }
        for (var _i = 0, movedBlocks_1 = movedBlocks; _i < movedBlocks_1.length; _i++) {
            var block = movedBlocks_1[_i];
            var pos = this.getCellPosition(block.gridX, block.gridY);
            var distance = Math.abs(block.node.y - pos.y);
            var duration = Math.min(0.25, Math.max(0.05, distance / 600));
            var delay = block.gridX * 0.02;
            block.node.stopAllActions();
            block.node.runAction(cc.sequence(cc.delayTime(delay), cc.moveTo(duration, pos.x, pos.y).easing(cc.easeCubicActionOut())));
        }
    };
    GridGenerator.prototype.spawnNewBlocks = function (animated) {
        if (animated === void 0) { animated = true; }
        var _a = this.getGridOffsets(), offsetX = _a.offsetX, offsetY = _a.offsetY;
        for (var y = 0; y < this.Y; y++) {
            for (var x = 0; x < this.X; x++) {
                if (this.grid[y][x] === null) {
                    this.spawnBlock(x, y, offsetX, offsetY, animated);
                }
            }
        }
    };
    /**
     * Приводит поле в согласованное состояние: уплотнение, синхронизация позиций, досыпание.
     */
    GridGenerator.prototype.resolveGrid = function (animated) {
        if (animated === void 0) { animated = false; }
        this.compactGridData();
        if (animated) {
            this.fallDown(true);
            this.spawnNewBlocks(true);
        }
        else {
            this.fallDown(false);
            this.spawnNewBlocks(false);
        }
    };
    /** Перемешивает цвета на поле. Возвращает true, если после этого есть ход ≥ 3. */
    GridGenerator.prototype.shuffleBlocks = function (matchFinder) {
        this.resolveGrid(false);
        var blocks = [];
        var colors = [];
        for (var y = 0; y < this.Y; y++) {
            for (var x = 0; x < this.X; x++) {
                var block = this.grid[y][x];
                if (!block)
                    continue;
                blocks.push(block);
                colors.push(block.colorId);
            }
        }
        if (blocks.length === 0) {
            return false;
        }
        var maxTries = 80;
        for (var attempt = 0; attempt < maxTries; attempt++) {
            this.shuffleArray(colors);
            this.applyColorsToBlocks(blocks, colors);
            if (matchFinder.hasValidMoves()) {
                this.playShuffleAnimation(blocks);
                return true;
            }
        }
        return false;
    };
    GridGenerator.prototype.applyColorsToBlocks = function (blocks, colors) {
        for (var i = 0; i < blocks.length; i++) {
            var colorId = colors[i];
            var block = blocks[i];
            block.colorId = colorId;
            if (block.sprite && this.sprites[colorId]) {
                block.sprite.spriteFrame = this.sprites[colorId];
            }
        }
    };
    GridGenerator.prototype.shuffleArray = function (array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = array[i];
            array[i] = array[j];
            array[j] = tmp;
        }
    };
    GridGenerator.prototype.playShuffleAnimation = function (blocks) {
        for (var _i = 0, blocks_2 = blocks; _i < blocks_2.length; _i++) {
            var block = blocks_2[_i];
            if (!block || !cc.isValid(block.node))
                continue;
            this.snapBlockToCell(block);
            block.node.runAction(cc.sequence(cc.scaleTo(0.08, 0.85), cc.scaleTo(0.08, 1)));
        }
    };
    __decorate([
        property
    ], GridGenerator.prototype, "X", void 0);
    __decorate([
        property
    ], GridGenerator.prototype, "Y", void 0);
    __decorate([
        property(cc.Prefab)
    ], GridGenerator.prototype, "blockPrefab", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], GridGenerator.prototype, "sprites", void 0);
    __decorate([
        property
    ], GridGenerator.prototype, "cellSize", void 0);
    __decorate([
        property
    ], GridGenerator.prototype, "padding", void 0);
    GridGenerator = __decorate([
        ccclass
    ], GridGenerator);
    return GridGenerator;
}(cc.Component));
exports.default = GridGenerator;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHcmlkR2VuZXJhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFNLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRTVDLGlDQUE0QjtBQUk1QjtJQUEyQyxpQ0FBWTtJQUF2RDtRQUFBLHFFQTJZQztRQXRXRyxPQUFDLEdBQVcsQ0FBQyxDQUFDO1FBR2QsT0FBQyxHQUFXLEVBQUUsQ0FBQztRQUdmLGlCQUFXLEdBQWMsSUFBSSxDQUFDO1FBRzlCLGFBQU8sR0FBcUIsRUFBRSxDQUFDO1FBRy9CLGNBQVEsR0FBVyxFQUFFLENBQUM7UUFHdEIsYUFBTyxHQUFXLENBQUMsQ0FBQztRQUVwQixVQUFJLEdBQXVCLEVBQUUsQ0FBQzs7SUFxVmxDLENBQUM7SUF6WUcsc0JBQUksZ0NBQUs7YUFBVDtZQUNJLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNsQixDQUFDOzs7T0FBQTtJQUVELHNCQUFJLGlDQUFNO2FBQVY7WUFDSSxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDbEIsQ0FBQzs7O09BQUE7SUFFRCxvQ0FBWSxHQUFaLFVBQWEsUUFBc0Q7UUFDL0QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDN0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQzdCLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzlCLElBQUksS0FBSztvQkFBRSxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzthQUNwQztTQUNKO0lBQ0wsQ0FBQztJQUVELG9DQUFZLEdBQVosVUFBYSxNQUFlO1FBQ3hCLEtBQW9CLFVBQU0sRUFBTixpQkFBTSxFQUFOLG9CQUFNLEVBQU4sSUFBTSxFQUFFO1lBQXZCLElBQU0sS0FBSyxlQUFBO1lBQ1osSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztnQkFBRSxTQUFTO1lBRXhDLElBQUEsS0FBSyxHQUFZLEtBQUssTUFBakIsRUFBRSxLQUFLLEdBQUssS0FBSyxNQUFWLENBQVc7WUFDL0IsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxFQUFFO2dCQUN2RCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQzthQUNsQztZQUNELEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDeEI7SUFDTCxDQUFDO0lBRUQsK0NBQXVCLEdBQXZCO1FBQ0ksSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBc0JELDZCQUFLLEdBQUw7UUFDSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFRCxnQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7UUFDZixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUM3QixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUNsQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDN0IsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7YUFDMUI7U0FDSjtJQUNMLENBQUM7SUFFRCxvQ0FBWSxHQUFaO1FBQ0ksSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBRTFDLElBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ2pDLElBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBRWxDLElBQU0sT0FBTyxHQUFHLENBQUMsVUFBVSxHQUFHLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQzNDLElBQU0sT0FBTyxHQUFHLENBQUMsV0FBVyxHQUFHLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBRTVDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzdCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUM3QixJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO2FBQzNDO1NBQ0o7SUFDTCxDQUFDO0lBRUQsc0NBQWMsR0FBZDtRQUNJLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUMxQyxJQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUNqQyxJQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUNsQyxPQUFPO1lBQ0gsSUFBSSxNQUFBO1lBQ0osT0FBTyxFQUFFLENBQUMsVUFBVSxHQUFHLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQztZQUNuQyxPQUFPLEVBQUUsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDO1NBQ3ZDLENBQUM7SUFDTixDQUFDO0lBRUQsdUNBQWUsR0FBZixVQUFnQixDQUFTLEVBQUUsQ0FBUztRQUMxQixJQUFBLEtBQTZCLElBQUksQ0FBQyxjQUFjLEVBQUUsRUFBaEQsSUFBSSxVQUFBLEVBQUUsT0FBTyxhQUFBLEVBQUUsT0FBTyxhQUEwQixDQUFDO1FBQ3pELE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxHQUFHLElBQUksRUFBRSxPQUFPLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFRCx1Q0FBZSxHQUFmLFVBQWdCLEtBQVk7UUFDeEIsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztZQUFFLE9BQU87UUFDOUMsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzRCxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQzVCLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBRUQsa0NBQVUsR0FBVixVQUFXLENBQVMsRUFBRSxDQUFTLEVBQUUsT0FBZ0IsRUFBRSxPQUFnQixFQUFFLFFBQXdCO1FBQXhCLHlCQUFBLEVBQUEsZUFBd0I7UUFDekYsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ2hELEVBQUUsQ0FBQyxJQUFJLENBQUMsa0RBQWtELENBQUMsQ0FBQztZQUM1RCxPQUFPO1NBQ1Y7UUFFRCxJQUFNLFNBQVMsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNuRCxTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFFdkIsSUFBQSxLQUFxRCxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQXhFLElBQUksVUFBQSxFQUFXLFVBQVUsYUFBQSxFQUFXLFVBQVUsYUFBMEIsQ0FBQztRQUNqRixJQUFJLE9BQU8sS0FBSyxTQUFTO1lBQUUsT0FBTyxHQUFHLFVBQVUsQ0FBQztRQUNoRCxJQUFJLE9BQU8sS0FBSyxTQUFTO1lBQUUsT0FBTyxHQUFHLFVBQVUsQ0FBQztRQUVoRCxJQUFNLE1BQU0sR0FBRyxPQUFPLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUNsQyxJQUFNLE1BQU0sR0FBRyxPQUFPLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUVsQyxJQUFJLFFBQVEsRUFBRTtZQUNWLFNBQVMsQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQztTQUMvQzthQUFNO1lBQ0gsU0FBUyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDekM7UUFFRCxJQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsWUFBWSxDQUFDLGVBQUssQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDUixFQUFFLENBQUMsSUFBSSxDQUFDLGdEQUFnRCxDQUFDLENBQUM7WUFDMUQsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3BCLE9BQU87U0FDVjtRQUVELElBQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUNsRCxJQUFJLFNBQVMsRUFBRTtZQUNYLElBQU0sT0FBTyxHQUFHLFNBQVMsQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUMxRCxJQUFJLE9BQU87Z0JBQUUsS0FBSyxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUM7U0FDN0M7UUFFRCxJQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BFLEtBQUssQ0FBQyxNQUFNLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFckQsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDaEIsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDaEIsS0FBSyxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUM7UUFFNUIsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7UUFFeEIsSUFBSSxRQUFRLEVBQUU7WUFDVixTQUFTLENBQUMsU0FBUyxDQUNmLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLGtCQUFrQixFQUFFLENBQUMsQ0FDbEUsQ0FBQztTQUNMO0lBQ0wsQ0FBQztJQUVELGtDQUFVLEdBQVYsVUFBVyxDQUFTLEVBQUUsQ0FBUztRQUMzQixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRTtZQUM5QyxPQUFPLElBQUksQ0FBQztTQUNmO1FBQ0QsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFRCwrREFBK0Q7SUFDL0QseUNBQWlCLEdBQWpCLFVBQWtCLE9BQWUsRUFBRSxPQUFlLEVBQUUsTUFBYztRQUM5RCxJQUFNLE1BQU0sR0FBWSxFQUFFLENBQUM7UUFDM0IsSUFBTSxJQUFJLEdBQUcsSUFBSSxHQUFHLEVBQVMsQ0FBQztRQUU5QixLQUFLLElBQUksQ0FBQyxHQUFHLE9BQU8sR0FBRyxNQUFNLEVBQUUsQ0FBQyxJQUFJLE9BQU8sR0FBRyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDdkQsS0FBSyxJQUFJLENBQUMsR0FBRyxPQUFPLEdBQUcsTUFBTSxFQUFFLENBQUMsSUFBSSxPQUFPLEdBQUcsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUN2RCxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDcEMsSUFBSSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUMzQixJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUN0QjthQUNKO1NBQ0o7UUFFRCxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBRUQsa0NBQVUsR0FBVixVQUFXLENBQVEsRUFBRSxDQUFRO1FBQ3pCLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7WUFBRSxPQUFPO1FBRWhDLElBQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDbkIsSUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUNuQixJQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ25CLElBQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFFbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFdEIsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDYixDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNiLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2IsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFFYixJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVELG9DQUFZLEdBQVosVUFBYSxDQUFTLEVBQUUsQ0FBUztRQUM3QixJQUFNLE1BQU0sR0FBWSxFQUFFLENBQUM7UUFFM0IsSUFBTSxJQUFJLEdBQUc7WUFDVCxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNmLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ2xCLENBQUM7UUFFRixLQUFjLFVBQUksRUFBSixhQUFJLEVBQUosa0JBQUksRUFBSixJQUFJLEVBQUU7WUFBZixJQUFJLENBQUMsYUFBQTtZQUNOLElBQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEIsSUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVwQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsRUFBRTtnQkFDbEQsSUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDNUIsSUFBSSxDQUFDO29CQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDekI7U0FDSjtRQUVELE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFFRCw2REFBNkQ7SUFDN0QsdUNBQWUsR0FBZjtRQUNJLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzdCLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztZQUVmLEtBQUssSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFO2dCQUN6QyxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNsQyxJQUFJLENBQUMsS0FBSztvQkFBRSxTQUFTO2dCQUVyQixJQUFJLEtBQUssS0FBSyxNQUFNLEVBQUU7b0JBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO29CQUM3QixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztvQkFDM0IsS0FBSyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7aUJBQ3hCO2dCQUVELE1BQU0sRUFBRSxDQUFDO2FBQ1o7WUFFRCxLQUFLLElBQUksQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7YUFDMUI7U0FDSjtJQUNMLENBQUM7SUFFRCxnQ0FBUSxHQUFSLFVBQVMsUUFBd0I7UUFBeEIseUJBQUEsRUFBQSxlQUF3QjtRQUM3QixJQUFNLFdBQVcsR0FBWSxFQUFFLENBQUM7UUFFaEMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDN0IsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO1lBRWYsS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUU7Z0JBQ3pDLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xDLElBQUksQ0FBQyxLQUFLO29CQUFFLFNBQVM7Z0JBRXJCLElBQUksS0FBSyxLQUFLLE1BQU0sRUFBRTtvQkFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7b0JBQzdCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO29CQUMzQixLQUFLLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQztvQkFDckIsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDM0I7Z0JBRUQsTUFBTSxFQUFFLENBQUM7YUFDWjtZQUVELEtBQUssSUFBSSxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNsQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQzthQUMxQjtTQUNKO1FBRUQsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNYLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUM3QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDN0IsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDOUIsSUFBSSxLQUFLO3dCQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQzFDO2FBQ0o7WUFDRCxPQUFPO1NBQ1Y7UUFFRCxLQUFvQixVQUFXLEVBQVgsMkJBQVcsRUFBWCx5QkFBVyxFQUFYLElBQVcsRUFBRTtZQUE1QixJQUFNLEtBQUssb0JBQUE7WUFDWixJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzNELElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hELElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFFBQVEsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ2hFLElBQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBRWpDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDNUIsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQ2hCLEVBQUUsQ0FBQyxRQUFRLENBQ1AsRUFBRSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFDbkIsRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLENBQ3BFLENBQ0osQ0FBQztTQUNMO0lBQ0wsQ0FBQztJQUVELHNDQUFjLEdBQWQsVUFBZSxRQUF3QjtRQUF4Qix5QkFBQSxFQUFBLGVBQXdCO1FBQzdCLElBQUEsS0FBdUIsSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUExQyxPQUFPLGFBQUEsRUFBRSxPQUFPLGFBQTBCLENBQUM7UUFFbkQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDN0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQzdCLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLEVBQUU7b0JBQzFCLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2lCQUNyRDthQUNKO1NBQ0o7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxtQ0FBVyxHQUFYLFVBQVksUUFBeUI7UUFBekIseUJBQUEsRUFBQSxnQkFBeUI7UUFDakMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBRXZCLElBQUksUUFBUSxFQUFFO1lBQ1YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNwQixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzdCO2FBQU07WUFDSCxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDOUI7SUFDTCxDQUFDO0lBRUQsa0ZBQWtGO0lBQ2xGLHFDQUFhLEdBQWIsVUFBYyxXQUF5QztRQUNuRCxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXhCLElBQU0sTUFBTSxHQUFZLEVBQUUsQ0FBQztRQUMzQixJQUFNLE1BQU0sR0FBYSxFQUFFLENBQUM7UUFFNUIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDN0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQzdCLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzlCLElBQUksQ0FBQyxLQUFLO29CQUFFLFNBQVM7Z0JBQ3JCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ25CLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQzlCO1NBQ0o7UUFFRCxJQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ3JCLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBRUQsSUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLEtBQUssSUFBSSxPQUFPLEdBQUcsQ0FBQyxFQUFFLE9BQU8sR0FBRyxRQUFRLEVBQUUsT0FBTyxFQUFFLEVBQUU7WUFDakQsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ3pDLElBQUksV0FBVyxDQUFDLGFBQWEsRUFBRSxFQUFFO2dCQUM3QixJQUFJLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ2xDLE9BQU8sSUFBSSxDQUFDO2FBQ2Y7U0FDSjtRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFTywyQ0FBbUIsR0FBM0IsVUFBNEIsTUFBZSxFQUFFLE1BQWdCO1FBQ3pELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3BDLElBQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQixJQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEIsS0FBSyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7WUFDeEIsSUFBSSxLQUFLLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ3ZDLEtBQUssQ0FBQyxNQUFNLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDcEQ7U0FDSjtJQUNMLENBQUM7SUFFTyxvQ0FBWSxHQUFwQixVQUF3QixLQUFVO1FBQzlCLEtBQUssSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN2QyxJQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlDLElBQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyQixLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7U0FDbEI7SUFDTCxDQUFDO0lBRU8sNENBQW9CLEdBQTVCLFVBQTZCLE1BQWU7UUFDeEMsS0FBb0IsVUFBTSxFQUFOLGlCQUFNLEVBQU4sb0JBQU0sRUFBTixJQUFNLEVBQUU7WUFBdkIsSUFBTSxLQUFLLGVBQUE7WUFDWixJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO2dCQUFFLFNBQVM7WUFDaEQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM1QixLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FDaEIsRUFBRSxDQUFDLFFBQVEsQ0FDUCxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFDdEIsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQ3RCLENBQ0osQ0FBQztTQUNMO0lBQ0wsQ0FBQztJQXJXRDtRQURDLFFBQVE7NENBQ0s7SUFHZDtRQURDLFFBQVE7NENBQ007SUFHZjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO3NEQUNVO0lBRzlCO1FBREMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2tEQUNJO0lBRy9CO1FBREMsUUFBUTttREFDYTtJQUd0QjtRQURDLFFBQVE7a0RBQ1c7SUFwREgsYUFBYTtRQURqQyxPQUFPO09BQ2EsYUFBYSxDQTJZakM7SUFBRCxvQkFBQztDQTNZRCxBQTJZQyxDQTNZMEMsRUFBRSxDQUFDLFNBQVMsR0EyWXREO2tCQTNZb0IsYUFBYSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbmltcG9ydCBCbG9jayBmcm9tIFwiLi9CbG9ja1wiO1xuaW1wb3J0IElHcmlkQWNjZXNzIGZyb20gXCIuL0lHcmlkQWNjZXNzXCI7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcmlkR2VuZXJhdG9yIGV4dGVuZHMgY2MuQ29tcG9uZW50IGltcGxlbWVudHMgSUdyaWRBY2Nlc3Mge1xuXG4gICAgZ2V0IHdpZHRoKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLlg7XG4gICAgfVxuXG4gICAgZ2V0IGhlaWdodCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5ZO1xuICAgIH1cblxuICAgIGZvckVhY2hCbG9jayhjYWxsYmFjazogKGJsb2NrOiBCbG9jaywgeDogbnVtYmVyLCB5OiBudW1iZXIpID0+IHZvaWQpIHtcbiAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCB0aGlzLlk7IHkrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLlg7IHgrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGJsb2NrID0gdGhpcy5ncmlkW3ldW3hdO1xuICAgICAgICAgICAgICAgIGlmIChibG9jaykgY2FsbGJhY2soYmxvY2ssIHgsIHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVtb3ZlQmxvY2tzKGJsb2NrczogQmxvY2tbXSkge1xuICAgICAgICBmb3IgKGNvbnN0IGJsb2NrIG9mIGJsb2Nrcykge1xuICAgICAgICAgICAgaWYgKCFibG9jayB8fCAhY2MuaXNWYWxpZChibG9jay5ub2RlKSkgY29udGludWU7XG5cbiAgICAgICAgICAgIGNvbnN0IHsgZ3JpZFgsIGdyaWRZIH0gPSBibG9jaztcbiAgICAgICAgICAgIGlmICh0aGlzLmdyaWRbZ3JpZFldICYmIHRoaXMuZ3JpZFtncmlkWV1bZ3JpZFhdID09PSBibG9jaykge1xuICAgICAgICAgICAgICAgIHRoaXMuZ3JpZFtncmlkWV1bZ3JpZFhdID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJsb2NrLm5vZGUuZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVzb2x2ZUJvYXJkQWZ0ZXJDaGFuZ2UoKSB7XG4gICAgICAgIHRoaXMuZmFsbERvd24oKTtcbiAgICAgICAgdGhpcy5zcGF3bk5ld0Jsb2NrcygpO1xuICAgIH1cblxuICAgIEBwcm9wZXJ0eVxuICAgIFg6IG51bWJlciA9IDk7XG5cbiAgICBAcHJvcGVydHlcbiAgICBZOiBudW1iZXIgPSAxMDtcblxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXG4gICAgYmxvY2tQcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoW2NjLlNwcml0ZUZyYW1lXSlcbiAgICBzcHJpdGVzOiBjYy5TcHJpdGVGcmFtZVtdID0gW107XG5cbiAgICBAcHJvcGVydHlcbiAgICBjZWxsU2l6ZTogbnVtYmVyID0gNjQ7XG5cbiAgICBAcHJvcGVydHlcbiAgICBwYWRkaW5nOiBudW1iZXIgPSA4O1xuXG4gICAgZ3JpZDogKEJsb2NrIHwgbnVsbClbXVtdID0gW107XG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgdGhpcy5pbml0R3JpZCgpO1xuICAgICAgICB0aGlzLmdlbmVyYXRlR3JpZCgpO1xuICAgIH1cblxuICAgIGluaXRHcmlkKCkge1xuICAgICAgICB0aGlzLmdyaWQgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCB0aGlzLlk7IHkrKykge1xuICAgICAgICAgICAgdGhpcy5ncmlkW3ldID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMuWDsgeCsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ncmlkW3ldW3hdID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdlbmVyYXRlR3JpZCgpIHtcbiAgICAgICAgY29uc3Qgc3RlcCA9IHRoaXMuY2VsbFNpemUgKyB0aGlzLnBhZGRpbmc7XG5cbiAgICAgICAgY29uc3QgdG90YWxXaWR0aCA9IHRoaXMuWCAqIHN0ZXA7XG4gICAgICAgIGNvbnN0IHRvdGFsSGVpZ2h0ID0gdGhpcy5ZICogc3RlcDtcblxuICAgICAgICBjb25zdCBvZmZzZXRYID0gLXRvdGFsV2lkdGggLyAyICsgc3RlcCAvIDI7XG4gICAgICAgIGNvbnN0IG9mZnNldFkgPSAtdG90YWxIZWlnaHQgLyAyICsgc3RlcCAvIDI7XG5cbiAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCB0aGlzLlk7IHkrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLlg7IHgrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuc3Bhd25CbG9jayh4LCB5LCBvZmZzZXRYLCBvZmZzZXRZKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldEdyaWRPZmZzZXRzKCkge1xuICAgICAgICBjb25zdCBzdGVwID0gdGhpcy5jZWxsU2l6ZSArIHRoaXMucGFkZGluZztcbiAgICAgICAgY29uc3QgdG90YWxXaWR0aCA9IHRoaXMuWCAqIHN0ZXA7XG4gICAgICAgIGNvbnN0IHRvdGFsSGVpZ2h0ID0gdGhpcy5ZICogc3RlcDtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN0ZXAsXG4gICAgICAgICAgICBvZmZzZXRYOiAtdG90YWxXaWR0aCAvIDIgKyBzdGVwIC8gMixcbiAgICAgICAgICAgIG9mZnNldFk6IC10b3RhbEhlaWdodCAvIDIgKyBzdGVwIC8gMixcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBnZXRDZWxsUG9zaXRpb24oeDogbnVtYmVyLCB5OiBudW1iZXIpOiBjYy5WZWMyIHtcbiAgICAgICAgY29uc3QgeyBzdGVwLCBvZmZzZXRYLCBvZmZzZXRZIH0gPSB0aGlzLmdldEdyaWRPZmZzZXRzKCk7XG4gICAgICAgIHJldHVybiBjYy52MihvZmZzZXRYICsgeCAqIHN0ZXAsIG9mZnNldFkgKyB5ICogc3RlcCk7XG4gICAgfVxuXG4gICAgc25hcEJsb2NrVG9DZWxsKGJsb2NrOiBCbG9jaykge1xuICAgICAgICBpZiAoIWJsb2NrIHx8ICFjYy5pc1ZhbGlkKGJsb2NrLm5vZGUpKSByZXR1cm47XG4gICAgICAgIGNvbnN0IHBvcyA9IHRoaXMuZ2V0Q2VsbFBvc2l0aW9uKGJsb2NrLmdyaWRYLCBibG9jay5ncmlkWSk7XG4gICAgICAgIGJsb2NrLm5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcbiAgICAgICAgYmxvY2subm9kZS5zZXRQb3NpdGlvbihwb3MueCwgcG9zLnkpO1xuICAgICAgICBibG9jay5ub2RlLnNjYWxlID0gMTtcbiAgICB9XG5cbiAgICBzcGF3bkJsb2NrKHg6IG51bWJlciwgeTogbnVtYmVyLCBvZmZzZXRYPzogbnVtYmVyLCBvZmZzZXRZPzogbnVtYmVyLCBhbmltYXRlZDogYm9vbGVhbiA9IHRydWUpIHtcbiAgICAgICAgaWYgKCF0aGlzLmJsb2NrUHJlZmFiIHx8IHRoaXMuc3ByaXRlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGNjLndhcm4oXCJHcmlkR2VuZXJhdG9yOiBibG9ja1ByZWZhYiDQuNC70Lggc3ByaXRlcyDQvdC1INC30LDQtNCw0L3Ri1wiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGJsb2NrTm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuYmxvY2tQcmVmYWIpO1xuICAgICAgICBibG9ja05vZGUucGFyZW50ID0gdGhpcy5ub2RlO1xuXG4gICAgICAgIGNvbnN0IHsgc3RlcCwgb2Zmc2V0WDogZGVmT2Zmc2V0WCwgb2Zmc2V0WTogZGVmT2Zmc2V0WSB9ID0gdGhpcy5nZXRHcmlkT2Zmc2V0cygpO1xuICAgICAgICBpZiAob2Zmc2V0WCA9PT0gdW5kZWZpbmVkKSBvZmZzZXRYID0gZGVmT2Zmc2V0WDtcbiAgICAgICAgaWYgKG9mZnNldFkgPT09IHVuZGVmaW5lZCkgb2Zmc2V0WSA9IGRlZk9mZnNldFk7XG5cbiAgICAgICAgY29uc3QgZmluYWxYID0gb2Zmc2V0WCArIHggKiBzdGVwO1xuICAgICAgICBjb25zdCBmaW5hbFkgPSBvZmZzZXRZICsgeSAqIHN0ZXA7XG5cbiAgICAgICAgaWYgKGFuaW1hdGVkKSB7XG4gICAgICAgICAgICBibG9ja05vZGUuc2V0UG9zaXRpb24oZmluYWxYLCBmaW5hbFkgKyAzMDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYmxvY2tOb2RlLnNldFBvc2l0aW9uKGZpbmFsWCwgZmluYWxZKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGJsb2NrID0gYmxvY2tOb2RlLmdldENvbXBvbmVudChCbG9jayk7XG4gICAgICAgIGlmICghYmxvY2spIHtcbiAgICAgICAgICAgIGNjLndhcm4oXCJHcmlkR2VuZXJhdG9yOiDQvdCwINC/0YDQtdGE0LDQsdC1INC90LXRgiDQutC+0LzQv9C+0L3QtdC90YLQsCBCbG9ja1wiKTtcbiAgICAgICAgICAgIGJsb2NrTm9kZS5kZXN0cm95KCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwbGF5RnJhbWUgPSBjYy5maW5kKFwiQ2FudmFzL2JnX2ZyYW1lX3BsYXlcIik7XG4gICAgICAgIGlmIChwbGF5RnJhbWUpIHtcbiAgICAgICAgICAgIGNvbnN0IGhhbmRsZXIgPSBwbGF5RnJhbWUuZ2V0Q29tcG9uZW50KFwiR2FtZVN0YXJ0U3lzdGVtXCIpO1xuICAgICAgICAgICAgaWYgKGhhbmRsZXIpIGJsb2NrLmNsaWNrSGFuZGxlciA9IGhhbmRsZXI7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByYW5kb21JbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuc3ByaXRlcy5sZW5ndGgpO1xuICAgICAgICBibG9jay5zcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLnNwcml0ZXNbcmFuZG9tSW5kZXhdO1xuXG4gICAgICAgIGJsb2NrLmdyaWRYID0geDtcbiAgICAgICAgYmxvY2suZ3JpZFkgPSB5O1xuICAgICAgICBibG9jay5jb2xvcklkID0gcmFuZG9tSW5kZXg7XG5cbiAgICAgICAgdGhpcy5ncmlkW3ldW3hdID0gYmxvY2s7XG5cbiAgICAgICAgaWYgKGFuaW1hdGVkKSB7XG4gICAgICAgICAgICBibG9ja05vZGUucnVuQWN0aW9uKFxuICAgICAgICAgICAgICAgIGNjLm1vdmVUbygwLjI1LCBmaW5hbFgsIGZpbmFsWSkuZWFzaW5nKGNjLmVhc2VDdWJpY0FjdGlvbk91dCgpKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldEJsb2NrQXQoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBCbG9jayB8IG51bGwge1xuICAgICAgICBpZiAoeSA8IDAgfHwgeSA+PSB0aGlzLlkgfHwgeCA8IDAgfHwgeCA+PSB0aGlzLlgpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmdyaWRbeV1beF07XG4gICAgfVxuXG4gICAgLyoqINCS0YHQtSDRgtCw0LnQu9GLINCyINC60LLQsNC00YDQsNGC0LUg0YEg0YDQsNC00LjRg9GB0L7QvCBSICjRgNCw0YHRgdGC0L7Rj9C90LjQtSDQp9C10LHRi9GI0ZHQstCwKS4gKi9cbiAgICBnZXRCbG9ja3NJblJhZGl1cyhjZW50ZXJYOiBudW1iZXIsIGNlbnRlclk6IG51bWJlciwgcmFkaXVzOiBudW1iZXIpOiBCbG9ja1tdIHtcbiAgICAgICAgY29uc3QgcmVzdWx0OiBCbG9ja1tdID0gW107XG4gICAgICAgIGNvbnN0IHNlZW4gPSBuZXcgU2V0PEJsb2NrPigpO1xuXG4gICAgICAgIGZvciAobGV0IHkgPSBjZW50ZXJZIC0gcmFkaXVzOyB5IDw9IGNlbnRlclkgKyByYWRpdXM7IHkrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgeCA9IGNlbnRlclggLSByYWRpdXM7IHggPD0gY2VudGVyWCArIHJhZGl1czsgeCsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYmxvY2sgPSB0aGlzLmdldEJsb2NrQXQoeCwgeSk7XG4gICAgICAgICAgICAgICAgaWYgKGJsb2NrICYmICFzZWVuLmhhcyhibG9jaykpIHtcbiAgICAgICAgICAgICAgICAgICAgc2Vlbi5hZGQoYmxvY2spO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChibG9jayk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBzd2FwQmxvY2tzKGE6IEJsb2NrLCBiOiBCbG9jaykge1xuICAgICAgICBpZiAoIWEgfHwgIWIgfHwgYSA9PT0gYikgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IGF4ID0gYS5ncmlkWDtcbiAgICAgICAgY29uc3QgYXkgPSBhLmdyaWRZO1xuICAgICAgICBjb25zdCBieCA9IGIuZ3JpZFg7XG4gICAgICAgIGNvbnN0IGJ5ID0gYi5ncmlkWTtcblxuICAgICAgICB0aGlzLmdyaWRbYXldW2F4XSA9IGI7XG4gICAgICAgIHRoaXMuZ3JpZFtieV1bYnhdID0gYTtcblxuICAgICAgICBhLmdyaWRYID0gYng7XG4gICAgICAgIGEuZ3JpZFkgPSBieTtcbiAgICAgICAgYi5ncmlkWCA9IGF4O1xuICAgICAgICBiLmdyaWRZID0gYXk7XG5cbiAgICAgICAgdGhpcy5zbmFwQmxvY2tUb0NlbGwoYSk7XG4gICAgICAgIHRoaXMuc25hcEJsb2NrVG9DZWxsKGIpO1xuICAgIH1cblxuICAgIGdldE5laWdoYm9ycyh4OiBudW1iZXIsIHk6IG51bWJlcik6IEJsb2NrW10ge1xuICAgICAgICBjb25zdCByZXN1bHQ6IEJsb2NrW10gPSBbXTtcblxuICAgICAgICBjb25zdCBkaXJzID0gW1xuICAgICAgICAgICAgWzEsIDBdLCBbLTEsIDBdLFxuICAgICAgICAgICAgWzAsIDFdLCBbMCwgLTFdXG4gICAgICAgIF07XG5cbiAgICAgICAgZm9yIChsZXQgZCBvZiBkaXJzKSB7XG4gICAgICAgICAgICBjb25zdCBueCA9IHggKyBkWzBdO1xuICAgICAgICAgICAgY29uc3QgbnkgPSB5ICsgZFsxXTtcblxuICAgICAgICAgICAgaWYgKG55ID49IDAgJiYgbnkgPCB0aGlzLlkgJiYgbnggPj0gMCAmJiBueCA8IHRoaXMuWCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGIgPSB0aGlzLmdyaWRbbnldW254XTtcbiAgICAgICAgICAgICAgICBpZiAoYikgcmVzdWx0LnB1c2goYik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIC8qKiDQo9C/0LvQvtGC0L3Rj9C10YIg0YHQtdGC0LrRgzog0LLRgdC1INCx0LvQvtC60Lgg0LLQvdC40LcsINC/0YPRgdGC0YvQtSDRj9GH0LXQudC60Lgg0YHQstC10YDRhdGDLiAqL1xuICAgIGNvbXBhY3RHcmlkRGF0YSgpIHtcbiAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLlg7IHgrKykge1xuICAgICAgICAgICAgbGV0IHdyaXRlWSA9IDA7XG5cbiAgICAgICAgICAgIGZvciAobGV0IHJlYWRZID0gMDsgcmVhZFkgPCB0aGlzLlk7IHJlYWRZKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBibG9jayA9IHRoaXMuZ3JpZFtyZWFkWV1beF07XG4gICAgICAgICAgICAgICAgaWYgKCFibG9jaykgY29udGludWU7XG5cbiAgICAgICAgICAgICAgICBpZiAocmVhZFkgIT09IHdyaXRlWSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdyaWRbd3JpdGVZXVt4XSA9IGJsb2NrO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdyaWRbcmVhZFldW3hdID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgYmxvY2suZ3JpZFkgPSB3cml0ZVk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgd3JpdGVZKys7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAobGV0IHkgPSB3cml0ZVk7IHkgPCB0aGlzLlk7IHkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuZ3JpZFt5XVt4XSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmYWxsRG93bihhbmltYXRlZDogYm9vbGVhbiA9IHRydWUpIHtcbiAgICAgICAgY29uc3QgbW92ZWRCbG9ja3M6IEJsb2NrW10gPSBbXTtcblxuICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMuWDsgeCsrKSB7XG4gICAgICAgICAgICBsZXQgd3JpdGVZID0gMDtcblxuICAgICAgICAgICAgZm9yIChsZXQgcmVhZFkgPSAwOyByZWFkWSA8IHRoaXMuWTsgcmVhZFkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGJsb2NrID0gdGhpcy5ncmlkW3JlYWRZXVt4XTtcbiAgICAgICAgICAgICAgICBpZiAoIWJsb2NrKSBjb250aW51ZTtcblxuICAgICAgICAgICAgICAgIGlmIChyZWFkWSAhPT0gd3JpdGVZKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JpZFt3cml0ZVldW3hdID0gYmxvY2s7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JpZFtyZWFkWV1beF0gPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICBibG9jay5ncmlkWSA9IHdyaXRlWTtcbiAgICAgICAgICAgICAgICAgICAgbW92ZWRCbG9ja3MucHVzaChibG9jayk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgd3JpdGVZKys7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAobGV0IHkgPSB3cml0ZVk7IHkgPCB0aGlzLlk7IHkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuZ3JpZFt5XVt4XSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWFuaW1hdGVkKSB7XG4gICAgICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMuWTsgeSsrKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLlg7IHgrKykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBibG9jayA9IHRoaXMuZ3JpZFt5XVt4XTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJsb2NrKSB0aGlzLnNuYXBCbG9ja1RvQ2VsbChibG9jayk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChjb25zdCBibG9jayBvZiBtb3ZlZEJsb2Nrcykge1xuICAgICAgICAgICAgY29uc3QgcG9zID0gdGhpcy5nZXRDZWxsUG9zaXRpb24oYmxvY2suZ3JpZFgsIGJsb2NrLmdyaWRZKTtcbiAgICAgICAgICAgIGNvbnN0IGRpc3RhbmNlID0gTWF0aC5hYnMoYmxvY2subm9kZS55IC0gcG9zLnkpO1xuICAgICAgICAgICAgY29uc3QgZHVyYXRpb24gPSBNYXRoLm1pbigwLjI1LCBNYXRoLm1heCgwLjA1LCBkaXN0YW5jZSAvIDYwMCkpO1xuICAgICAgICAgICAgY29uc3QgZGVsYXkgPSBibG9jay5ncmlkWCAqIDAuMDI7XG5cbiAgICAgICAgICAgIGJsb2NrLm5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcbiAgICAgICAgICAgIGJsb2NrLm5vZGUucnVuQWN0aW9uKFxuICAgICAgICAgICAgICAgIGNjLnNlcXVlbmNlKFxuICAgICAgICAgICAgICAgICAgICBjYy5kZWxheVRpbWUoZGVsYXkpLFxuICAgICAgICAgICAgICAgICAgICBjYy5tb3ZlVG8oZHVyYXRpb24sIHBvcy54LCBwb3MueSkuZWFzaW5nKGNjLmVhc2VDdWJpY0FjdGlvbk91dCgpKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzcGF3bk5ld0Jsb2NrcyhhbmltYXRlZDogYm9vbGVhbiA9IHRydWUpIHtcbiAgICAgICAgY29uc3QgeyBvZmZzZXRYLCBvZmZzZXRZIH0gPSB0aGlzLmdldEdyaWRPZmZzZXRzKCk7XG5cbiAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCB0aGlzLlk7IHkrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLlg7IHgrKykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmdyaWRbeV1beF0gPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcGF3bkJsb2NrKHgsIHksIG9mZnNldFgsIG9mZnNldFksIGFuaW1hdGVkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQn9GA0LjQstC+0LTQuNGCINC/0L7Qu9C1INCyINGB0L7Qs9C70LDRgdC+0LLQsNC90L3QvtC1INGB0L7RgdGC0L7Rj9C90LjQtTog0YPQv9C70L7RgtC90LXQvdC40LUsINGB0LjQvdGF0YDQvtC90LjQt9Cw0YbQuNGPINC/0L7Qt9C40YbQuNC5LCDQtNC+0YHRi9C/0LDQvdC40LUuXG4gICAgICovXG4gICAgcmVzb2x2ZUdyaWQoYW5pbWF0ZWQ6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICB0aGlzLmNvbXBhY3RHcmlkRGF0YSgpO1xuXG4gICAgICAgIGlmIChhbmltYXRlZCkge1xuICAgICAgICAgICAgdGhpcy5mYWxsRG93bih0cnVlKTtcbiAgICAgICAgICAgIHRoaXMuc3Bhd25OZXdCbG9ja3ModHJ1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmZhbGxEb3duKGZhbHNlKTtcbiAgICAgICAgICAgIHRoaXMuc3Bhd25OZXdCbG9ja3MoZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqINCf0LXRgNC10LzQtdGI0LjQstCw0LXRgiDRhtCy0LXRgtCwINC90LAg0L/QvtC70LUuINCS0L7Qt9Cy0YDQsNGJ0LDQtdGCIHRydWUsINC10YHQu9C4INC/0L7RgdC70LUg0Y3RgtC+0LPQviDQtdGB0YLRjCDRhdC+0LQg4omlIDMuICovXG4gICAgc2h1ZmZsZUJsb2NrcyhtYXRjaEZpbmRlcjogeyBoYXNWYWxpZE1vdmVzKCk6IGJvb2xlYW4gfSk6IGJvb2xlYW4ge1xuICAgICAgICB0aGlzLnJlc29sdmVHcmlkKGZhbHNlKTtcblxuICAgICAgICBjb25zdCBibG9ja3M6IEJsb2NrW10gPSBbXTtcbiAgICAgICAgY29uc3QgY29sb3JzOiBudW1iZXJbXSA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgdGhpcy5ZOyB5KyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgdGhpcy5YOyB4KyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBibG9jayA9IHRoaXMuZ3JpZFt5XVt4XTtcbiAgICAgICAgICAgICAgICBpZiAoIWJsb2NrKSBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBibG9ja3MucHVzaChibG9jayk7XG4gICAgICAgICAgICAgICAgY29sb3JzLnB1c2goYmxvY2suY29sb3JJZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYmxvY2tzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbWF4VHJpZXMgPSA4MDtcbiAgICAgICAgZm9yIChsZXQgYXR0ZW1wdCA9IDA7IGF0dGVtcHQgPCBtYXhUcmllczsgYXR0ZW1wdCsrKSB7XG4gICAgICAgICAgICB0aGlzLnNodWZmbGVBcnJheShjb2xvcnMpO1xuICAgICAgICAgICAgdGhpcy5hcHBseUNvbG9yc1RvQmxvY2tzKGJsb2NrcywgY29sb3JzKTtcbiAgICAgICAgICAgIGlmIChtYXRjaEZpbmRlci5oYXNWYWxpZE1vdmVzKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXlTaHVmZmxlQW5pbWF0aW9uKGJsb2Nrcyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhcHBseUNvbG9yc1RvQmxvY2tzKGJsb2NrczogQmxvY2tbXSwgY29sb3JzOiBudW1iZXJbXSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJsb2Nrcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgY29sb3JJZCA9IGNvbG9yc1tpXTtcbiAgICAgICAgICAgIGNvbnN0IGJsb2NrID0gYmxvY2tzW2ldO1xuICAgICAgICAgICAgYmxvY2suY29sb3JJZCA9IGNvbG9ySWQ7XG4gICAgICAgICAgICBpZiAoYmxvY2suc3ByaXRlICYmIHRoaXMuc3ByaXRlc1tjb2xvcklkXSkge1xuICAgICAgICAgICAgICAgIGJsb2NrLnNwcml0ZS5zcHJpdGVGcmFtZSA9IHRoaXMuc3ByaXRlc1tjb2xvcklkXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc2h1ZmZsZUFycmF5PFQ+KGFycmF5OiBUW10pIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IGFycmF5Lmxlbmd0aCAtIDE7IGkgPiAwOyBpLS0pIHtcbiAgICAgICAgICAgIGNvbnN0IGogPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoaSArIDEpKTtcbiAgICAgICAgICAgIGNvbnN0IHRtcCA9IGFycmF5W2ldO1xuICAgICAgICAgICAgYXJyYXlbaV0gPSBhcnJheVtqXTtcbiAgICAgICAgICAgIGFycmF5W2pdID0gdG1wO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwbGF5U2h1ZmZsZUFuaW1hdGlvbihibG9ja3M6IEJsb2NrW10pIHtcbiAgICAgICAgZm9yIChjb25zdCBibG9jayBvZiBibG9ja3MpIHtcbiAgICAgICAgICAgIGlmICghYmxvY2sgfHwgIWNjLmlzVmFsaWQoYmxvY2subm9kZSkpIGNvbnRpbnVlO1xuICAgICAgICAgICAgdGhpcy5zbmFwQmxvY2tUb0NlbGwoYmxvY2spO1xuICAgICAgICAgICAgYmxvY2subm9kZS5ydW5BY3Rpb24oXG4gICAgICAgICAgICAgICAgY2Muc2VxdWVuY2UoXG4gICAgICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4wOCwgMC44NSksXG4gICAgICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4wOCwgMSlcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/GameSession.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b2eaau9mAxE1aIHIJ9pYiZx', 'GameSession');
// Script/GameSession.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameRules_1 = require("./GameRules");
var GameSession = /** @class */ (function () {
    function GameSession() {
        this.score = 0;
        this.steps = 0;
        this.targetScore = 200;
        this.shuffleAttempts = 0;
    }
    GameSession.prototype.reset = function (targetScore) {
        if (targetScore === void 0) { targetScore = 200; }
        this.targetScore = targetScore;
        this.score = 0;
        this.steps = GameRules_1.default.randomSteps();
        this.shuffleAttempts = 0;
    };
    GameSession.prototype.isWin = function () {
        return this.score >= this.targetScore;
    };
    GameSession.prototype.isLoseBySteps = function () {
        return this.steps <= 0 && this.score < this.targetScore;
    };
    GameSession.prototype.canSpendStep = function () {
        return this.steps > 0;
    };
    GameSession.prototype.spendStep = function () {
        this.steps--;
    };
    GameSession.prototype.addScore = function (points) {
        this.score += points;
    };
    GameSession.prototype.resetShuffleAttempts = function () {
        this.shuffleAttempts = 0;
    };
    return GameSession;
}());
exports.default = GameSession;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lU2Vzc2lvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlDQUFvQztBQUVwQztJQUFBO1FBRUksVUFBSyxHQUFXLENBQUMsQ0FBQztRQUNsQixVQUFLLEdBQVcsQ0FBQyxDQUFDO1FBQ2xCLGdCQUFXLEdBQVcsR0FBRyxDQUFDO1FBQzFCLG9CQUFlLEdBQVcsQ0FBQyxDQUFDO0lBZ0NoQyxDQUFDO0lBOUJHLDJCQUFLLEdBQUwsVUFBTSxXQUF5QjtRQUF6Qiw0QkFBQSxFQUFBLGlCQUF5QjtRQUMzQixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxLQUFLLEdBQUcsbUJBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQsMkJBQUssR0FBTDtRQUNJLE9BQU8sSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzFDLENBQUM7SUFFRCxtQ0FBYSxHQUFiO1FBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDNUQsQ0FBQztJQUVELGtDQUFZLEdBQVo7UUFDSSxPQUFPLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFRCwrQkFBUyxHQUFUO1FBQ0ksSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFRCw4QkFBUSxHQUFSLFVBQVMsTUFBYztRQUNuQixJQUFJLENBQUMsS0FBSyxJQUFJLE1BQU0sQ0FBQztJQUN6QixDQUFDO0lBRUQsMENBQW9CLEdBQXBCO1FBQ0ksSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUNMLGtCQUFDO0FBQUQsQ0FyQ0EsQUFxQ0MsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBHYW1lUnVsZXMgZnJvbSBcIi4vR2FtZVJ1bGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVTZXNzaW9uIHtcblxuICAgIHNjb3JlOiBudW1iZXIgPSAwO1xuICAgIHN0ZXBzOiBudW1iZXIgPSAwO1xuICAgIHRhcmdldFNjb3JlOiBudW1iZXIgPSAyMDA7XG4gICAgc2h1ZmZsZUF0dGVtcHRzOiBudW1iZXIgPSAwO1xuXG4gICAgcmVzZXQodGFyZ2V0U2NvcmU6IG51bWJlciA9IDIwMCkge1xuICAgICAgICB0aGlzLnRhcmdldFNjb3JlID0gdGFyZ2V0U2NvcmU7XG4gICAgICAgIHRoaXMuc2NvcmUgPSAwO1xuICAgICAgICB0aGlzLnN0ZXBzID0gR2FtZVJ1bGVzLnJhbmRvbVN0ZXBzKCk7XG4gICAgICAgIHRoaXMuc2h1ZmZsZUF0dGVtcHRzID0gMDtcbiAgICB9XG5cbiAgICBpc1dpbigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NvcmUgPj0gdGhpcy50YXJnZXRTY29yZTtcbiAgICB9XG5cbiAgICBpc0xvc2VCeVN0ZXBzKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGVwcyA8PSAwICYmIHRoaXMuc2NvcmUgPCB0aGlzLnRhcmdldFNjb3JlO1xuICAgIH1cblxuICAgIGNhblNwZW5kU3RlcCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RlcHMgPiAwO1xuICAgIH1cblxuICAgIHNwZW5kU3RlcCgpIHtcbiAgICAgICAgdGhpcy5zdGVwcy0tO1xuICAgIH1cblxuICAgIGFkZFNjb3JlKHBvaW50czogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuc2NvcmUgKz0gcG9pbnRzO1xuICAgIH1cblxuICAgIHJlc2V0U2h1ZmZsZUF0dGVtcHRzKCkge1xuICAgICAgICB0aGlzLnNodWZmbGVBdHRlbXB0cyA9IDA7XG4gICAgfVxufVxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/PlayabilityService.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '28bba4cTydP7oBk33Fcx7NL', 'PlayabilityService');
// Script/PlayabilityService.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayabilityResult = void 0;
var GameRules_1 = require("./GameRules");
var PlayabilityResult;
(function (PlayabilityResult) {
    PlayabilityResult[PlayabilityResult["Ok"] = 0] = "Ok";
    PlayabilityResult[PlayabilityResult["Shuffled"] = 1] = "Shuffled";
    PlayabilityResult[PlayabilityResult["NoMovesLeft"] = 2] = "NoMovesLeft";
})(PlayabilityResult = exports.PlayabilityResult || (exports.PlayabilityResult = {}));
var PlayabilityService = /** @class */ (function () {
    function PlayabilityService(grid, matchFinder) {
        this.grid = grid;
        this.matchFinder = matchFinder;
    }
    PlayabilityService.prototype.ensurePlayable = function (session) {
        if (!session.canSpendStep()) {
            return PlayabilityResult.Ok;
        }
        this.grid.resolveGrid(false);
        if (this.matchFinder.hasValidMoves()) {
            session.resetShuffleAttempts();
            return PlayabilityResult.Ok;
        }
        while (session.shuffleAttempts < GameRules_1.default.MAX_SHUFFLE_ATTEMPTS) {
            session.shuffleAttempts++;
            if (this.grid.shuffleBlocks(this.matchFinder)) {
                this.grid.resolveGrid(false);
                return PlayabilityResult.Shuffled;
            }
        }
        return PlayabilityResult.NoMovesLeft;
    };
    return PlayabilityService;
}());
exports.default = PlayabilityService;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxQbGF5YWJpbGl0eVNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseUNBQW9DO0FBS3BDLElBQVksaUJBSVg7QUFKRCxXQUFZLGlCQUFpQjtJQUN6QixxREFBTSxDQUFBO0lBQ04saUVBQVksQ0FBQTtJQUNaLHVFQUFlLENBQUE7QUFDbkIsQ0FBQyxFQUpXLGlCQUFpQixHQUFqQix5QkFBaUIsS0FBakIseUJBQWlCLFFBSTVCO0FBRUQ7SUFFSSw0QkFDcUIsSUFBbUIsRUFDbkIsV0FBd0I7UUFEeEIsU0FBSSxHQUFKLElBQUksQ0FBZTtRQUNuQixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtJQUMxQyxDQUFDO0lBRUosMkNBQWMsR0FBZCxVQUFlLE9BQW9CO1FBQy9CLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLEVBQUU7WUFDekIsT0FBTyxpQkFBaUIsQ0FBQyxFQUFFLENBQUM7U0FDL0I7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUU3QixJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLEVBQUU7WUFDbEMsT0FBTyxDQUFDLG9CQUFvQixFQUFFLENBQUM7WUFDL0IsT0FBTyxpQkFBaUIsQ0FBQyxFQUFFLENBQUM7U0FDL0I7UUFFRCxPQUFPLE9BQU8sQ0FBQyxlQUFlLEdBQUcsbUJBQVMsQ0FBQyxvQkFBb0IsRUFBRTtZQUM3RCxPQUFPLENBQUMsZUFBZSxFQUFFLENBQUM7WUFFMUIsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUU7Z0JBQzNDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUM3QixPQUFPLGlCQUFpQixDQUFDLFFBQVEsQ0FBQzthQUNyQztTQUNKO1FBRUQsT0FBTyxpQkFBaUIsQ0FBQyxXQUFXLENBQUM7SUFDekMsQ0FBQztJQUNMLHlCQUFDO0FBQUQsQ0E5QkEsQUE4QkMsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBHYW1lUnVsZXMgZnJvbSBcIi4vR2FtZVJ1bGVzXCI7XG5pbXBvcnQgTWF0Y2hGaW5kZXIgZnJvbSBcIi4vTWF0Y2hGaW5kZXJcIjtcbmltcG9ydCBHYW1lU2Vzc2lvbiBmcm9tIFwiLi9HYW1lU2Vzc2lvblwiO1xuaW1wb3J0IEdyaWRHZW5lcmF0b3IgZnJvbSBcIi4vR3JpZEdlbmVyYXRvclwiO1xuXG5leHBvcnQgZW51bSBQbGF5YWJpbGl0eVJlc3VsdCB7XG4gICAgT2sgPSAwLFxuICAgIFNodWZmbGVkID0gMSxcbiAgICBOb01vdmVzTGVmdCA9IDIsXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXlhYmlsaXR5U2VydmljZSB7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBncmlkOiBHcmlkR2VuZXJhdG9yLFxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IG1hdGNoRmluZGVyOiBNYXRjaEZpbmRlclxuICAgICkge31cblxuICAgIGVuc3VyZVBsYXlhYmxlKHNlc3Npb246IEdhbWVTZXNzaW9uKTogUGxheWFiaWxpdHlSZXN1bHQge1xuICAgICAgICBpZiAoIXNlc3Npb24uY2FuU3BlbmRTdGVwKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBQbGF5YWJpbGl0eVJlc3VsdC5PaztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZ3JpZC5yZXNvbHZlR3JpZChmYWxzZSk7XG5cbiAgICAgICAgaWYgKHRoaXMubWF0Y2hGaW5kZXIuaGFzVmFsaWRNb3ZlcygpKSB7XG4gICAgICAgICAgICBzZXNzaW9uLnJlc2V0U2h1ZmZsZUF0dGVtcHRzKCk7XG4gICAgICAgICAgICByZXR1cm4gUGxheWFiaWxpdHlSZXN1bHQuT2s7XG4gICAgICAgIH1cblxuICAgICAgICB3aGlsZSAoc2Vzc2lvbi5zaHVmZmxlQXR0ZW1wdHMgPCBHYW1lUnVsZXMuTUFYX1NIVUZGTEVfQVRURU1QVFMpIHtcbiAgICAgICAgICAgIHNlc3Npb24uc2h1ZmZsZUF0dGVtcHRzKys7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmdyaWQuc2h1ZmZsZUJsb2Nrcyh0aGlzLm1hdGNoRmluZGVyKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ3JpZC5yZXNvbHZlR3JpZChmYWxzZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFBsYXlhYmlsaXR5UmVzdWx0LlNodWZmbGVkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFBsYXlhYmlsaXR5UmVzdWx0Lk5vTW92ZXNMZWZ0O1xuICAgIH1cbn1cbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/MatchFinder.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '778f8xt8ZpDfqzdWkrLizXb', 'MatchFinder');
// Script/MatchFinder.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameRules_1 = require("./GameRules");
var MatchFinder = /** @class */ (function () {
    function MatchFinder(grid) {
        this.grid = grid;
    }
    MatchFinder.prototype.findGroup = function (startBlock) {
        var visited = new Set();
        var stack = [startBlock];
        var result = [];
        while (stack.length > 0) {
            var block = stack.pop();
            var key = this.cellKey(block.gridX, block.gridY);
            if (visited.has(key))
                continue;
            visited.add(key);
            if (block.colorId !== startBlock.colorId)
                continue;
            result.push(block);
            for (var _i = 0, _a = this.grid.getNeighbors(block.gridX, block.gridY); _i < _a.length; _i++) {
                var neighbor = _a[_i];
                var nKey = this.cellKey(neighbor.gridX, neighbor.gridY);
                if (!visited.has(nKey)) {
                    stack.push(neighbor);
                }
            }
        }
        return result;
    };
    MatchFinder.prototype.hasValidMoves = function () {
        var visited = new Set();
        for (var y = 0; y < this.grid.height; y++) {
            for (var x = 0; x < this.grid.width; x++) {
                var block = this.grid.getBlockAt(x, y);
                if (!block)
                    continue;
                var key = this.cellKey(x, y);
                if (visited.has(key))
                    continue;
                if (this.measureGroup(block, visited) >= GameRules_1.default.MIN_GROUP_SIZE) {
                    return true;
                }
            }
        }
        return false;
    };
    MatchFinder.prototype.measureGroup = function (startBlock, visited) {
        var stack = [startBlock];
        var size = 0;
        while (stack.length > 0) {
            var block = stack.pop();
            var key = this.cellKey(block.gridX, block.gridY);
            if (visited.has(key))
                continue;
            visited.add(key);
            if (block.colorId !== startBlock.colorId)
                continue;
            size++;
            for (var _i = 0, _a = this.grid.getNeighbors(block.gridX, block.gridY); _i < _a.length; _i++) {
                var neighbor = _a[_i];
                var nKey = this.cellKey(neighbor.gridX, neighbor.gridY);
                if (!visited.has(nKey)) {
                    stack.push(neighbor);
                }
            }
        }
        return size;
    };
    MatchFinder.prototype.cellKey = function (x, y) {
        return x + "_" + y;
    };
    return MatchFinder;
}());
exports.default = MatchFinder;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxNYXRjaEZpbmRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHlDQUFvQztBQUdwQztJQUVJLHFCQUE2QixJQUFpQjtRQUFqQixTQUFJLEdBQUosSUFBSSxDQUFhO0lBQUcsQ0FBQztJQUVsRCwrQkFBUyxHQUFULFVBQVUsVUFBaUI7UUFDdkIsSUFBTSxPQUFPLEdBQUcsSUFBSSxHQUFHLEVBQVUsQ0FBQztRQUNsQyxJQUFNLEtBQUssR0FBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3BDLElBQU0sTUFBTSxHQUFZLEVBQUUsQ0FBQztRQUUzQixPQUFPLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3JCLElBQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUMxQixJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRW5ELElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7Z0JBQUUsU0FBUztZQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRWpCLElBQUksS0FBSyxDQUFDLE9BQU8sS0FBSyxVQUFVLENBQUMsT0FBTztnQkFBRSxTQUFTO1lBRW5ELE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFbkIsS0FBdUIsVUFBZ0QsRUFBaEQsS0FBQSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBaEQsY0FBZ0QsRUFBaEQsSUFBZ0QsRUFBRTtnQkFBcEUsSUFBTSxRQUFRLFNBQUE7Z0JBQ2YsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDMUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7b0JBQ3BCLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7aUJBQ3hCO2FBQ0o7U0FDSjtRQUVELE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxtQ0FBYSxHQUFiO1FBQ0ksSUFBTSxPQUFPLEdBQUcsSUFBSSxHQUFHLEVBQVUsQ0FBQztRQUVsQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDdkMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUN0QyxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pDLElBQUksQ0FBQyxLQUFLO29CQUFFLFNBQVM7Z0JBRXJCLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUMvQixJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO29CQUFFLFNBQVM7Z0JBRS9CLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLElBQUksbUJBQVMsQ0FBQyxjQUFjLEVBQUU7b0JBQy9ELE9BQU8sSUFBSSxDQUFDO2lCQUNmO2FBQ0o7U0FDSjtRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFTyxrQ0FBWSxHQUFwQixVQUFxQixVQUFpQixFQUFFLE9BQW9CO1FBQ3hELElBQU0sS0FBSyxHQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDcEMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBRWIsT0FBTyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNyQixJQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDMUIsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUVuRCxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO2dCQUFFLFNBQVM7WUFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUVqQixJQUFJLEtBQUssQ0FBQyxPQUFPLEtBQUssVUFBVSxDQUFDLE9BQU87Z0JBQUUsU0FBUztZQUVuRCxJQUFJLEVBQUUsQ0FBQztZQUVQLEtBQXVCLFVBQWdELEVBQWhELEtBQUEsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQWhELGNBQWdELEVBQWhELElBQWdELEVBQUU7Z0JBQXBFLElBQU0sUUFBUSxTQUFBO2dCQUNmLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzFELElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUNwQixLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2lCQUN4QjthQUNKO1NBQ0o7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRU8sNkJBQU8sR0FBZixVQUFnQixDQUFTLEVBQUUsQ0FBUztRQUNoQyxPQUFPLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUFDTCxrQkFBQztBQUFELENBaEZBLEFBZ0ZDLElBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmxvY2sgZnJvbSBcIi4vQmxvY2tcIjtcbmltcG9ydCBHYW1lUnVsZXMgZnJvbSBcIi4vR2FtZVJ1bGVzXCI7XG5pbXBvcnQgSUdyaWRBY2Nlc3MgZnJvbSBcIi4vSUdyaWRBY2Nlc3NcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWF0Y2hGaW5kZXIge1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBncmlkOiBJR3JpZEFjY2Vzcykge31cblxuICAgIGZpbmRHcm91cChzdGFydEJsb2NrOiBCbG9jayk6IEJsb2NrW10ge1xuICAgICAgICBjb25zdCB2aXNpdGVkID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gICAgICAgIGNvbnN0IHN0YWNrOiBCbG9ja1tdID0gW3N0YXJ0QmxvY2tdO1xuICAgICAgICBjb25zdCByZXN1bHQ6IEJsb2NrW10gPSBbXTtcblxuICAgICAgICB3aGlsZSAoc3RhY2subGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3QgYmxvY2sgPSBzdGFjay5wb3AoKTtcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IHRoaXMuY2VsbEtleShibG9jay5ncmlkWCwgYmxvY2suZ3JpZFkpO1xuXG4gICAgICAgICAgICBpZiAodmlzaXRlZC5oYXMoa2V5KSkgY29udGludWU7XG4gICAgICAgICAgICB2aXNpdGVkLmFkZChrZXkpO1xuXG4gICAgICAgICAgICBpZiAoYmxvY2suY29sb3JJZCAhPT0gc3RhcnRCbG9jay5jb2xvcklkKSBjb250aW51ZTtcblxuICAgICAgICAgICAgcmVzdWx0LnB1c2goYmxvY2spO1xuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IG5laWdoYm9yIG9mIHRoaXMuZ3JpZC5nZXROZWlnaGJvcnMoYmxvY2suZ3JpZFgsIGJsb2NrLmdyaWRZKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5LZXkgPSB0aGlzLmNlbGxLZXkobmVpZ2hib3IuZ3JpZFgsIG5laWdoYm9yLmdyaWRZKTtcbiAgICAgICAgICAgICAgICBpZiAoIXZpc2l0ZWQuaGFzKG5LZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YWNrLnB1c2gobmVpZ2hib3IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgaGFzVmFsaWRNb3ZlcygpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3QgdmlzaXRlZCA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuXG4gICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgdGhpcy5ncmlkLmhlaWdodDsgeSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMuZ3JpZC53aWR0aDsgeCsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYmxvY2sgPSB0aGlzLmdyaWQuZ2V0QmxvY2tBdCh4LCB5KTtcbiAgICAgICAgICAgICAgICBpZiAoIWJsb2NrKSBjb250aW51ZTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGtleSA9IHRoaXMuY2VsbEtleSh4LCB5KTtcbiAgICAgICAgICAgICAgICBpZiAodmlzaXRlZC5oYXMoa2V5KSkgY29udGludWU7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tZWFzdXJlR3JvdXAoYmxvY2ssIHZpc2l0ZWQpID49IEdhbWVSdWxlcy5NSU5fR1JPVVBfU0laRSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBtZWFzdXJlR3JvdXAoc3RhcnRCbG9jazogQmxvY2ssIHZpc2l0ZWQ6IFNldDxzdHJpbmc+KTogbnVtYmVyIHtcbiAgICAgICAgY29uc3Qgc3RhY2s6IEJsb2NrW10gPSBbc3RhcnRCbG9ja107XG4gICAgICAgIGxldCBzaXplID0gMDtcblxuICAgICAgICB3aGlsZSAoc3RhY2subGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3QgYmxvY2sgPSBzdGFjay5wb3AoKTtcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IHRoaXMuY2VsbEtleShibG9jay5ncmlkWCwgYmxvY2suZ3JpZFkpO1xuXG4gICAgICAgICAgICBpZiAodmlzaXRlZC5oYXMoa2V5KSkgY29udGludWU7XG4gICAgICAgICAgICB2aXNpdGVkLmFkZChrZXkpO1xuXG4gICAgICAgICAgICBpZiAoYmxvY2suY29sb3JJZCAhPT0gc3RhcnRCbG9jay5jb2xvcklkKSBjb250aW51ZTtcblxuICAgICAgICAgICAgc2l6ZSsrO1xuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IG5laWdoYm9yIG9mIHRoaXMuZ3JpZC5nZXROZWlnaGJvcnMoYmxvY2suZ3JpZFgsIGJsb2NrLmdyaWRZKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5LZXkgPSB0aGlzLmNlbGxLZXkobmVpZ2hib3IuZ3JpZFgsIG5laWdoYm9yLmdyaWRZKTtcbiAgICAgICAgICAgICAgICBpZiAoIXZpc2l0ZWQuaGFzKG5LZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YWNrLnB1c2gobmVpZ2hib3IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzaXplO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2VsbEtleSh4OiBudW1iZXIsIHk6IG51bWJlcik6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB4ICsgXCJfXCIgKyB5O1xuICAgIH1cbn1cbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Block.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ee246FvyftDUoUgbG8DVm+0', 'Block');
// Script/Block.ts

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
var Block = /** @class */ (function (_super) {
    __extends(Block, _super);
    function Block() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sprite = null;
        _this.gridX = 0;
        _this.gridY = 0;
        _this.colorId = 0;
        _this.clickHandler = null;
        return _this;
    }
    Block.prototype.onLoad = function () {
        if (!this.clickHandler) {
            var playFrame = cc.find("Canvas/bg_frame_play");
            if (playFrame) {
                this.clickHandler = playFrame.getComponent("GameStartSystem");
            }
        }
        if (!this.clickHandler) {
            cc.warn("Block: не найден обработчик клика на Canvas/bg_frame_play");
        }
        this.node.on('touchend', this.onClick, this);
    };
    Block.prototype.onClick = function () {
        if (!this.clickHandler || !cc.isValid(this.node)) {
            return;
        }
        this.clickHandler.onBlockClicked(this);
    };
    __decorate([
        property(cc.Sprite)
    ], Block.prototype, "sprite", void 0);
    Block = __decorate([
        ccclass
    ], Block);
    return Block;
}(cc.Component));
exports.default = Block;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxCbG9jay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBTSxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUs1QztJQUFtQyx5QkFBWTtJQUEvQztRQUFBLHFFQWdDQztRQTdCRyxZQUFNLEdBQWMsSUFBSSxDQUFDO1FBRXpCLFdBQUssR0FBVyxDQUFDLENBQUM7UUFDbEIsV0FBSyxHQUFXLENBQUMsQ0FBQztRQUVsQixhQUFPLEdBQVcsQ0FBQyxDQUFDO1FBRXBCLGtCQUFZLEdBQXVCLElBQUksQ0FBQzs7SUFzQjVDLENBQUM7SUFwQkcsc0JBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3BCLElBQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQztZQUNsRCxJQUFJLFNBQVMsRUFBRTtnQkFDWCxJQUFJLENBQUMsWUFBWSxHQUFHLFNBQVMsQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQXVCLENBQUM7YUFDdkY7U0FDSjtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3BCLEVBQUUsQ0FBQyxJQUFJLENBQUMsMkRBQTJELENBQUMsQ0FBQztTQUN4RTtRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRCx1QkFBTyxHQUFQO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUM5QyxPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBNUJEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7eUNBQ0s7SUFIUixLQUFLO1FBRHpCLE9BQU87T0FDYSxLQUFLLENBZ0N6QjtJQUFELFlBQUM7Q0FoQ0QsQUFnQ0MsQ0FoQ2tDLEVBQUUsQ0FBQyxTQUFTLEdBZ0M5QztrQkFoQ29CLEtBQUsiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5pbXBvcnQgSUJsb2NrQ2xpY2tIYW5kbGVyIGZyb20gXCIuL0lCbG9ja0NsaWNrSGFuZGxlclwiO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmxvY2sgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcbiAgICBzcHJpdGU6IGNjLlNwcml0ZSA9IG51bGw7XG5cbiAgICBncmlkWDogbnVtYmVyID0gMDtcbiAgICBncmlkWTogbnVtYmVyID0gMDtcblxuICAgIGNvbG9ySWQ6IG51bWJlciA9IDA7XG5cbiAgICBjbGlja0hhbmRsZXI6IElCbG9ja0NsaWNrSGFuZGxlciA9IG51bGw7XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIGlmICghdGhpcy5jbGlja0hhbmRsZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IHBsYXlGcmFtZSA9IGNjLmZpbmQoXCJDYW52YXMvYmdfZnJhbWVfcGxheVwiKTtcbiAgICAgICAgICAgIGlmIChwbGF5RnJhbWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWNrSGFuZGxlciA9IHBsYXlGcmFtZS5nZXRDb21wb25lbnQoXCJHYW1lU3RhcnRTeXN0ZW1cIikgYXMgSUJsb2NrQ2xpY2tIYW5kbGVyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5jbGlja0hhbmRsZXIpIHtcbiAgICAgICAgICAgIGNjLndhcm4oXCJCbG9jazog0L3QtSDQvdCw0LnQtNC10L0g0L7QsdGA0LDQsdC+0YLRh9C40Log0LrQu9C40LrQsCDQvdCwIENhbnZhcy9iZ19mcmFtZV9wbGF5XCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5ub2RlLm9uKCd0b3VjaGVuZCcsIHRoaXMub25DbGljaywgdGhpcyk7XG4gICAgfVxuXG4gICAgb25DbGljaygpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNsaWNrSGFuZGxlciB8fCAhY2MuaXNWYWxpZCh0aGlzLm5vZGUpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jbGlja0hhbmRsZXIub25CbG9ja0NsaWNrZWQodGhpcyk7XG4gICAgfVxufVxuIl19
//------QC-SOURCE-SPLIT------
