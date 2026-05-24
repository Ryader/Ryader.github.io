"use strict";
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