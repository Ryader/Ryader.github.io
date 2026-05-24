"use strict";
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