import Block from "./Block";
import GameRules from "./GameRules";
import IGridAccess from "./IGridAccess";

export default class MatchFinder {

    constructor(private readonly grid: IGridAccess) {}

    findGroup(startBlock: Block): Block[] {
        const visited = new Set<string>();
        const stack: Block[] = [startBlock];
        const result: Block[] = [];

        while (stack.length > 0) {
            const block = stack.pop();
            const key = this.cellKey(block.gridX, block.gridY);

            if (visited.has(key)) continue;
            visited.add(key);

            if (block.colorId !== startBlock.colorId) continue;

            result.push(block);

            for (const neighbor of this.grid.getNeighbors(block.gridX, block.gridY)) {
                const nKey = this.cellKey(neighbor.gridX, neighbor.gridY);
                if (!visited.has(nKey)) {
                    stack.push(neighbor);
                }
            }
        }

        return result;
    }

    hasValidMoves(): boolean {
        const visited = new Set<string>();

        for (let y = 0; y < this.grid.height; y++) {
            for (let x = 0; x < this.grid.width; x++) {
                const block = this.grid.getBlockAt(x, y);
                if (!block) continue;

                const key = this.cellKey(x, y);
                if (visited.has(key)) continue;

                if (this.measureGroup(block, visited) >= GameRules.MIN_GROUP_SIZE) {
                    return true;
                }
            }
        }

        return false;
    }

    private measureGroup(startBlock: Block, visited: Set<string>): number {
        const stack: Block[] = [startBlock];
        let size = 0;

        while (stack.length > 0) {
            const block = stack.pop();
            const key = this.cellKey(block.gridX, block.gridY);

            if (visited.has(key)) continue;
            visited.add(key);

            if (block.colorId !== startBlock.colorId) continue;

            size++;

            for (const neighbor of this.grid.getNeighbors(block.gridX, block.gridY)) {
                const nKey = this.cellKey(neighbor.gridX, neighbor.gridY);
                if (!visited.has(nKey)) {
                    stack.push(neighbor);
                }
            }
        }

        return size;
    }

    private cellKey(x: number, y: number): string {
        return x + "_" + y;
    }
}
