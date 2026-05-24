"use strict";
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