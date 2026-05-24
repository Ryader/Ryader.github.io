import GameRules from "./GameRules";
import MatchFinder from "./MatchFinder";
import GameSession from "./GameSession";
import GridGenerator from "./GridGenerator";

export enum PlayabilityResult {
    Ok = 0,
    Shuffled = 1,
    NoMovesLeft = 2,
}

export default class PlayabilityService {

    constructor(
        private readonly grid: GridGenerator,
        private readonly matchFinder: MatchFinder
    ) {}

    ensurePlayable(session: GameSession): PlayabilityResult {
        if (!session.canSpendStep()) {
            return PlayabilityResult.Ok;
        }

        this.grid.resolveGrid(false);

        if (this.matchFinder.hasValidMoves()) {
            session.resetShuffleAttempts();
            return PlayabilityResult.Ok;
        }

        while (session.shuffleAttempts < GameRules.MAX_SHUFFLE_ATTEMPTS) {
            session.shuffleAttempts++;

            if (this.grid.shuffleBlocks(this.matchFinder)) {
                this.grid.resolveGrid(false);
                return PlayabilityResult.Shuffled;
            }
        }

        return PlayabilityResult.NoMovesLeft;
    }
}
