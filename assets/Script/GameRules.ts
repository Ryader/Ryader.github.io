export default class GameRules {

    static readonly MIN_STEPS = 20;
    static readonly MAX_STEPS = 40;
    static readonly MIN_BOOSTER_COUNT = 1;
    static readonly MAX_BOOSTER_COUNT = 5;
    static readonly MIN_GROUP_SIZE = 3;
    static readonly MAX_SHUFFLE_ATTEMPTS = 3;

    static randomSteps(): number {
        return Math.floor(
            Math.random() * (GameRules.MAX_STEPS - GameRules.MIN_STEPS + 1) + GameRules.MIN_STEPS
        );
    }

    static randomBoosterCount(): number {
        return Math.floor(
            Math.random() * (GameRules.MAX_BOOSTER_COUNT - GameRules.MIN_BOOSTER_COUNT + 1) +
            GameRules.MIN_BOOSTER_COUNT
        );
    }

    static scoreForGroup(size: number): number {
        if (size === 3) return 10;
        if (size === 4) return 15;
        if (size >= 5) return 20;
        return 0;
    }

    static scoreForBombTiles(destroyedCount: number): number {
        return destroyedCount * 10;
    }
}
