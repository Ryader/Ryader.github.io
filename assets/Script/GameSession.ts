import GameRules from "./GameRules";

export default class GameSession {

    score: number = 0;
    steps: number = 0;
    targetScore: number = 200;
    shuffleAttempts: number = 0;

    reset(targetScore: number = 200) {
        this.targetScore = targetScore;
        this.score = 0;
        this.steps = GameRules.randomSteps();
        this.shuffleAttempts = 0;
    }

    isWin(): boolean {
        return this.score >= this.targetScore;
    }

    isLoseBySteps(): boolean {
        return this.steps <= 0 && this.score < this.targetScore;
    }

    canSpendStep(): boolean {
        return this.steps > 0;
    }

    spendStep() {
        this.steps--;
    }

    addScore(points: number) {
        this.score += points;
    }

    resetShuffleAttempts() {
        this.shuffleAttempts = 0;
    }
}
