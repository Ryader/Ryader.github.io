
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