const { ccclass, property } = cc._decorator;

import Block from "./Block";
import IGridAccess from "./IGridAccess";

@ccclass
export default class GridGenerator extends cc.Component implements IGridAccess {

    get width(): number {
        return this.X;
    }

    get height(): number {
        return this.Y;
    }

    forEachBlock(callback: (block: Block, x: number, y: number) => void) {
        for (let y = 0; y < this.Y; y++) {
            for (let x = 0; x < this.X; x++) {
                const block = this.grid[y][x];
                if (block) callback(block, x, y);
            }
        }
    }

    removeBlocks(blocks: Block[]) {
        for (const block of blocks) {
            if (!block || !cc.isValid(block.node)) continue;

            const { gridX, gridY } = block;
            if (this.grid[gridY] && this.grid[gridY][gridX] === block) {
                this.grid[gridY][gridX] = null;
            }
            block.node.destroy();
        }
    }

    resolveBoardAfterChange() {
        this.fallDown();
        this.spawnNewBlocks();
    }

    @property
    X: number = 9;

    @property
    Y: number = 10;

    @property(cc.Prefab)
    blockPrefab: cc.Prefab = null;

    @property([cc.SpriteFrame])
    sprites: cc.SpriteFrame[] = [];

    @property
    cellSize: number = 64;

    @property
    padding: number = 8;

    grid: (Block | null)[][] = [];

    start() {
        this.initGrid();
        this.generateGrid();
    }

    initGrid() {
        this.grid = [];
        for (let y = 0; y < this.Y; y++) {
            this.grid[y] = [];
            for (let x = 0; x < this.X; x++) {
                this.grid[y][x] = null;
            }
        }
    }

    generateGrid() {
        const step = this.cellSize + this.padding;

        const totalWidth = this.X * step;
        const totalHeight = this.Y * step;

        const offsetX = -totalWidth / 2 + step / 2;
        const offsetY = -totalHeight / 2 + step / 2;

        for (let y = 0; y < this.Y; y++) {
            for (let x = 0; x < this.X; x++) {
                this.spawnBlock(x, y, offsetX, offsetY);
            }
        }
    }

    getGridOffsets() {
        const step = this.cellSize + this.padding;
        const totalWidth = this.X * step;
        const totalHeight = this.Y * step;
        return {
            step,
            offsetX: -totalWidth / 2 + step / 2,
            offsetY: -totalHeight / 2 + step / 2,
        };
    }

    getCellPosition(x: number, y: number): cc.Vec2 {
        const { step, offsetX, offsetY } = this.getGridOffsets();
        return cc.v2(offsetX + x * step, offsetY + y * step);
    }

    snapBlockToCell(block: Block) {
        if (!block || !cc.isValid(block.node)) return;
        const pos = this.getCellPosition(block.gridX, block.gridY);
        block.node.stopAllActions();
        block.node.setPosition(pos.x, pos.y);
        block.node.scale = 1;
    }

    spawnBlock(x: number, y: number, offsetX?: number, offsetY?: number, animated: boolean = true) {
        if (!this.blockPrefab || this.sprites.length === 0) {
            cc.warn("GridGenerator: blockPrefab или sprites не заданы");
            return;
        }

        const blockNode = cc.instantiate(this.blockPrefab);
        blockNode.parent = this.node;

        const { step, offsetX: defOffsetX, offsetY: defOffsetY } = this.getGridOffsets();
        if (offsetX === undefined) offsetX = defOffsetX;
        if (offsetY === undefined) offsetY = defOffsetY;

        const finalX = offsetX + x * step;
        const finalY = offsetY + y * step;

        if (animated) {
            blockNode.setPosition(finalX, finalY + 300);
        } else {
            blockNode.setPosition(finalX, finalY);
        }

        const block = blockNode.getComponent(Block);
        if (!block) {
            cc.warn("GridGenerator: на префабе нет компонента Block");
            blockNode.destroy();
            return;
        }

        const playFrame = cc.find("Canvas/bg_frame_play");
        if (playFrame) {
            const handler = playFrame.getComponent("GameStartSystem");
            if (handler) block.clickHandler = handler;
        }

        const randomIndex = Math.floor(Math.random() * this.sprites.length);
        block.sprite.spriteFrame = this.sprites[randomIndex];

        block.gridX = x;
        block.gridY = y;
        block.colorId = randomIndex;

        this.grid[y][x] = block;

        if (animated) {
            blockNode.runAction(
                cc.moveTo(0.25, finalX, finalY).easing(cc.easeCubicActionOut())
            );
        }
    }

    getBlockAt(x: number, y: number): Block | null {
        if (y < 0 || y >= this.Y || x < 0 || x >= this.X) {
            return null;
        }
        return this.grid[y][x];
    }

    /** Все тайлы в квадрате с радиусом R (расстояние Чебышёва). */
    getBlocksInRadius(centerX: number, centerY: number, radius: number): Block[] {
        const result: Block[] = [];
        const seen = new Set<Block>();

        for (let y = centerY - radius; y <= centerY + radius; y++) {
            for (let x = centerX - radius; x <= centerX + radius; x++) {
                const block = this.getBlockAt(x, y);
                if (block && !seen.has(block)) {
                    seen.add(block);
                    result.push(block);
                }
            }
        }

        return result;
    }

    swapBlocks(a: Block, b: Block) {
        if (!a || !b || a === b) return;

        const ax = a.gridX;
        const ay = a.gridY;
        const bx = b.gridX;
        const by = b.gridY;

        this.grid[ay][ax] = b;
        this.grid[by][bx] = a;

        a.gridX = bx;
        a.gridY = by;
        b.gridX = ax;
        b.gridY = ay;

        this.snapBlockToCell(a);
        this.snapBlockToCell(b);
    }

    getNeighbors(x: number, y: number): Block[] {
        const result: Block[] = [];

        const dirs = [
            [1, 0], [-1, 0],
            [0, 1], [0, -1]
        ];

        for (let d of dirs) {
            const nx = x + d[0];
            const ny = y + d[1];

            if (ny >= 0 && ny < this.Y && nx >= 0 && nx < this.X) {
                const b = this.grid[ny][nx];
                if (b) result.push(b);
            }
        }

        return result;
    }

    /** Уплотняет сетку: все блоки вниз, пустые ячейки сверху. */
    compactGridData() {
        for (let x = 0; x < this.X; x++) {
            let writeY = 0;

            for (let readY = 0; readY < this.Y; readY++) {
                const block = this.grid[readY][x];
                if (!block) continue;

                if (readY !== writeY) {
                    this.grid[writeY][x] = block;
                    this.grid[readY][x] = null;
                    block.gridY = writeY;
                }

                writeY++;
            }

            for (let y = writeY; y < this.Y; y++) {
                this.grid[y][x] = null;
            }
        }
    }

    fallDown(animated: boolean = true) {
        const movedBlocks: Block[] = [];

        for (let x = 0; x < this.X; x++) {
            let writeY = 0;

            for (let readY = 0; readY < this.Y; readY++) {
                const block = this.grid[readY][x];
                if (!block) continue;

                if (readY !== writeY) {
                    this.grid[writeY][x] = block;
                    this.grid[readY][x] = null;
                    block.gridY = writeY;
                    movedBlocks.push(block);
                }

                writeY++;
            }

            for (let y = writeY; y < this.Y; y++) {
                this.grid[y][x] = null;
            }
        }

        if (!animated) {
            for (let y = 0; y < this.Y; y++) {
                for (let x = 0; x < this.X; x++) {
                    const block = this.grid[y][x];
                    if (block) this.snapBlockToCell(block);
                }
            }
            return;
        }

        for (const block of movedBlocks) {
            const pos = this.getCellPosition(block.gridX, block.gridY);
            const distance = Math.abs(block.node.y - pos.y);
            const duration = Math.min(0.25, Math.max(0.05, distance / 600));
            const delay = block.gridX * 0.02;

            block.node.stopAllActions();
            block.node.runAction(
                cc.sequence(
                    cc.delayTime(delay),
                    cc.moveTo(duration, pos.x, pos.y).easing(cc.easeCubicActionOut())
                )
            );
        }
    }

    spawnNewBlocks(animated: boolean = true) {
        const { offsetX, offsetY } = this.getGridOffsets();

        for (let y = 0; y < this.Y; y++) {
            for (let x = 0; x < this.X; x++) {
                if (this.grid[y][x] === null) {
                    this.spawnBlock(x, y, offsetX, offsetY, animated);
                }
            }
        }
    }

    /**
     * Приводит поле в согласованное состояние: уплотнение, синхронизация позиций, досыпание.
     */
    resolveGrid(animated: boolean = false) {
        this.compactGridData();

        if (animated) {
            this.fallDown(true);
            this.spawnNewBlocks(true);
        } else {
            this.fallDown(false);
            this.spawnNewBlocks(false);
        }
    }

    /** Перемешивает цвета на поле. Возвращает true, если после этого есть ход ≥ 3. */
    shuffleBlocks(matchFinder: { hasValidMoves(): boolean }): boolean {
        this.resolveGrid(false);

        const blocks: Block[] = [];
        const colors: number[] = [];

        for (let y = 0; y < this.Y; y++) {
            for (let x = 0; x < this.X; x++) {
                const block = this.grid[y][x];
                if (!block) continue;
                blocks.push(block);
                colors.push(block.colorId);
            }
        }

        if (blocks.length === 0) {
            return false;
        }

        const maxTries = 80;
        for (let attempt = 0; attempt < maxTries; attempt++) {
            this.shuffleArray(colors);
            this.applyColorsToBlocks(blocks, colors);
            if (matchFinder.hasValidMoves()) {
                this.playShuffleAnimation(blocks);
                return true;
            }
        }

        return false;
    }

    private applyColorsToBlocks(blocks: Block[], colors: number[]) {
        for (let i = 0; i < blocks.length; i++) {
            const colorId = colors[i];
            const block = blocks[i];
            block.colorId = colorId;
            if (block.sprite && this.sprites[colorId]) {
                block.sprite.spriteFrame = this.sprites[colorId];
            }
        }
    }

    private shuffleArray<T>(array: T[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const tmp = array[i];
            array[i] = array[j];
            array[j] = tmp;
        }
    }

    private playShuffleAnimation(blocks: Block[]) {
        for (const block of blocks) {
            if (!block || !cc.isValid(block.node)) continue;
            this.snapBlockToCell(block);
            block.node.runAction(
                cc.sequence(
                    cc.scaleTo(0.08, 0.85),
                    cc.scaleTo(0.08, 1)
                )
            );
        }
    }
}
