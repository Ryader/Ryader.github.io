
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