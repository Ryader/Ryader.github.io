
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