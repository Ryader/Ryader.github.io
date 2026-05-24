"use strict";
cc._RF.push(module, 'df031ErxMlCyryu41niHe//', 'GridGenerator');
// Script/GridGenerator.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Block_1 = require("./Block");
var GridGenerator = /** @class */ (function (_super) {
    __extends(GridGenerator, _super);
    function GridGenerator() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.X = 9;
        _this.Y = 10;
        _this.blockPrefab = null;
        _this.sprites = [];
        _this.cellSize = 64;
        _this.padding = 8;
        _this.grid = [];
        return _this;
    }
    Object.defineProperty(GridGenerator.prototype, "width", {
        get: function () {
            return this.X;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GridGenerator.prototype, "height", {
        get: function () {
            return this.Y;
        },
        enumerable: false,
        configurable: true
    });
    GridGenerator.prototype.forEachBlock = function (callback) {
        for (var y = 0; y < this.Y; y++) {
            for (var x = 0; x < this.X; x++) {
                var block = this.grid[y][x];
                if (block)
                    callback(block, x, y);
            }
        }
    };
    GridGenerator.prototype.removeBlocks = function (blocks) {
        for (var _i = 0, blocks_1 = blocks; _i < blocks_1.length; _i++) {
            var block = blocks_1[_i];
            if (!block || !cc.isValid(block.node))
                continue;
            var gridX = block.gridX, gridY = block.gridY;
            if (this.grid[gridY] && this.grid[gridY][gridX] === block) {
                this.grid[gridY][gridX] = null;
            }
            block.node.destroy();
        }
    };
    GridGenerator.prototype.resolveBoardAfterChange = function () {
        this.fallDown();
        this.spawnNewBlocks();
    };
    GridGenerator.prototype.start = function () {
        this.initGrid();
        this.generateGrid();
    };
    GridGenerator.prototype.initGrid = function () {
        this.grid = [];
        for (var y = 0; y < this.Y; y++) {
            this.grid[y] = [];
            for (var x = 0; x < this.X; x++) {
                this.grid[y][x] = null;
            }
        }
    };
    GridGenerator.prototype.generateGrid = function () {
        var step = this.cellSize + this.padding;
        var totalWidth = this.X * step;
        var totalHeight = this.Y * step;
        var offsetX = -totalWidth / 2 + step / 2;
        var offsetY = -totalHeight / 2 + step / 2;
        for (var y = 0; y < this.Y; y++) {
            for (var x = 0; x < this.X; x++) {
                this.spawnBlock(x, y, offsetX, offsetY);
            }
        }
    };
    GridGenerator.prototype.getGridOffsets = function () {
        var step = this.cellSize + this.padding;
        var totalWidth = this.X * step;
        var totalHeight = this.Y * step;
        return {
            step: step,
            offsetX: -totalWidth / 2 + step / 2,
            offsetY: -totalHeight / 2 + step / 2,
        };
    };
    GridGenerator.prototype.getCellPosition = function (x, y) {
        var _a = this.getGridOffsets(), step = _a.step, offsetX = _a.offsetX, offsetY = _a.offsetY;
        return cc.v2(offsetX + x * step, offsetY + y * step);
    };
    GridGenerator.prototype.snapBlockToCell = function (block) {
        if (!block || !cc.isValid(block.node))
            return;
        var pos = this.getCellPosition(block.gridX, block.gridY);
        block.node.stopAllActions();
        block.node.setPosition(pos.x, pos.y);
        block.node.scale = 1;
    };
    GridGenerator.prototype.spawnBlock = function (x, y, offsetX, offsetY, animated) {
        if (animated === void 0) { animated = true; }
        if (!this.blockPrefab || this.sprites.length === 0) {
            cc.warn("GridGenerator: blockPrefab или sprites не заданы");
            return;
        }
        var blockNode = cc.instantiate(this.blockPrefab);
        blockNode.parent = this.node;
        var _a = this.getGridOffsets(), step = _a.step, defOffsetX = _a.offsetX, defOffsetY = _a.offsetY;
        if (offsetX === undefined)
            offsetX = defOffsetX;
        if (offsetY === undefined)
            offsetY = defOffsetY;
        var finalX = offsetX + x * step;
        var finalY = offsetY + y * step;
        if (animated) {
            blockNode.setPosition(finalX, finalY + 300);
        }
        else {
            blockNode.setPosition(finalX, finalY);
        }
        var block = blockNode.getComponent(Block_1.default);
        if (!block) {
            cc.warn("GridGenerator: на префабе нет компонента Block");
            blockNode.destroy();
            return;
        }
        var playFrame = cc.find("Canvas/bg_frame_play");
        if (playFrame) {
            var handler = playFrame.getComponent("GameStartSystem");
            if (handler)
                block.clickHandler = handler;
        }
        var randomIndex = Math.floor(Math.random() * this.sprites.length);
        block.sprite.spriteFrame = this.sprites[randomIndex];
        block.gridX = x;
        block.gridY = y;
        block.colorId = randomIndex;
        this.grid[y][x] = block;
        if (animated) {
            blockNode.runAction(cc.moveTo(0.25, finalX, finalY).easing(cc.easeCubicActionOut()));
        }
    };
    GridGenerator.prototype.getBlockAt = function (x, y) {
        if (y < 0 || y >= this.Y || x < 0 || x >= this.X) {
            return null;
        }
        return this.grid[y][x];
    };
    /** Все тайлы в квадрате с радиусом R (расстояние Чебышёва). */
    GridGenerator.prototype.getBlocksInRadius = function (centerX, centerY, radius) {
        var result = [];
        var seen = new Set();
        for (var y = centerY - radius; y <= centerY + radius; y++) {
            for (var x = centerX - radius; x <= centerX + radius; x++) {
                var block = this.getBlockAt(x, y);
                if (block && !seen.has(block)) {
                    seen.add(block);
                    result.push(block);
                }
            }
        }
        return result;
    };
    GridGenerator.prototype.swapBlocks = function (a, b) {
        if (!a || !b || a === b)
            return;
        var ax = a.gridX;
        var ay = a.gridY;
        var bx = b.gridX;
        var by = b.gridY;
        this.grid[ay][ax] = b;
        this.grid[by][bx] = a;
        a.gridX = bx;
        a.gridY = by;
        b.gridX = ax;
        b.gridY = ay;
        this.snapBlockToCell(a);
        this.snapBlockToCell(b);
    };
    GridGenerator.prototype.getNeighbors = function (x, y) {
        var result = [];
        var dirs = [
            [1, 0], [-1, 0],
            [0, 1], [0, -1]
        ];
        for (var _i = 0, dirs_1 = dirs; _i < dirs_1.length; _i++) {
            var d = dirs_1[_i];
            var nx = x + d[0];
            var ny = y + d[1];
            if (ny >= 0 && ny < this.Y && nx >= 0 && nx < this.X) {
                var b = this.grid[ny][nx];
                if (b)
                    result.push(b);
            }
        }
        return result;
    };
    /** Уплотняет сетку: все блоки вниз, пустые ячейки сверху. */
    GridGenerator.prototype.compactGridData = function () {
        for (var x = 0; x < this.X; x++) {
            var writeY = 0;
            for (var readY = 0; readY < this.Y; readY++) {
                var block = this.grid[readY][x];
                if (!block)
                    continue;
                if (readY !== writeY) {
                    this.grid[writeY][x] = block;
                    this.grid[readY][x] = null;
                    block.gridY = writeY;
                }
                writeY++;
            }
            for (var y = writeY; y < this.Y; y++) {
                this.grid[y][x] = null;
            }
        }
    };
    GridGenerator.prototype.fallDown = function (animated) {
        if (animated === void 0) { animated = true; }
        var movedBlocks = [];
        for (var x = 0; x < this.X; x++) {
            var writeY = 0;
            for (var readY = 0; readY < this.Y; readY++) {
                var block = this.grid[readY][x];
                if (!block)
                    continue;
                if (readY !== writeY) {
                    this.grid[writeY][x] = block;
                    this.grid[readY][x] = null;
                    block.gridY = writeY;
                    movedBlocks.push(block);
                }
                writeY++;
            }
            for (var y = writeY; y < this.Y; y++) {
                this.grid[y][x] = null;
            }
        }
        if (!animated) {
            for (var y = 0; y < this.Y; y++) {
                for (var x = 0; x < this.X; x++) {
                    var block = this.grid[y][x];
                    if (block)
                        this.snapBlockToCell(block);
                }
            }
            return;
        }
        for (var _i = 0, movedBlocks_1 = movedBlocks; _i < movedBlocks_1.length; _i++) {
            var block = movedBlocks_1[_i];
            var pos = this.getCellPosition(block.gridX, block.gridY);
            var distance = Math.abs(block.node.y - pos.y);
            var duration = Math.min(0.25, Math.max(0.05, distance / 600));
            var delay = block.gridX * 0.02;
            block.node.stopAllActions();
            block.node.runAction(cc.sequence(cc.delayTime(delay), cc.moveTo(duration, pos.x, pos.y).easing(cc.easeCubicActionOut())));
        }
    };
    GridGenerator.prototype.spawnNewBlocks = function (animated) {
        if (animated === void 0) { animated = true; }
        var _a = this.getGridOffsets(), offsetX = _a.offsetX, offsetY = _a.offsetY;
        for (var y = 0; y < this.Y; y++) {
            for (var x = 0; x < this.X; x++) {
                if (this.grid[y][x] === null) {
                    this.spawnBlock(x, y, offsetX, offsetY, animated);
                }
            }
        }
    };
    /**
     * Приводит поле в согласованное состояние: уплотнение, синхронизация позиций, досыпание.
     */
    GridGenerator.prototype.resolveGrid = function (animated) {
        if (animated === void 0) { animated = false; }
        this.compactGridData();
        if (animated) {
            this.fallDown(true);
            this.spawnNewBlocks(true);
        }
        else {
            this.fallDown(false);
            this.spawnNewBlocks(false);
        }
    };
    /** Перемешивает цвета на поле. Возвращает true, если после этого есть ход ≥ 3. */
    GridGenerator.prototype.shuffleBlocks = function (matchFinder) {
        this.resolveGrid(false);
        var blocks = [];
        var colors = [];
        for (var y = 0; y < this.Y; y++) {
            for (var x = 0; x < this.X; x++) {
                var block = this.grid[y][x];
                if (!block)
                    continue;
                blocks.push(block);
                colors.push(block.colorId);
            }
        }
        if (blocks.length === 0) {
            return false;
        }
        var maxTries = 80;
        for (var attempt = 0; attempt < maxTries; attempt++) {
            this.shuffleArray(colors);
            this.applyColorsToBlocks(blocks, colors);
            if (matchFinder.hasValidMoves()) {
                this.playShuffleAnimation(blocks);
                return true;
            }
        }
        return false;
    };
    GridGenerator.prototype.applyColorsToBlocks = function (blocks, colors) {
        for (var i = 0; i < blocks.length; i++) {
            var colorId = colors[i];
            var block = blocks[i];
            block.colorId = colorId;
            if (block.sprite && this.sprites[colorId]) {
                block.sprite.spriteFrame = this.sprites[colorId];
            }
        }
    };
    GridGenerator.prototype.shuffleArray = function (array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = array[i];
            array[i] = array[j];
            array[j] = tmp;
        }
    };
    GridGenerator.prototype.playShuffleAnimation = function (blocks) {
        for (var _i = 0, blocks_2 = blocks; _i < blocks_2.length; _i++) {
            var block = blocks_2[_i];
            if (!block || !cc.isValid(block.node))
                continue;
            this.snapBlockToCell(block);
            block.node.runAction(cc.sequence(cc.scaleTo(0.08, 0.85), cc.scaleTo(0.08, 1)));
        }
    };
    __decorate([
        property
    ], GridGenerator.prototype, "X", void 0);
    __decorate([
        property
    ], GridGenerator.prototype, "Y", void 0);
    __decorate([
        property(cc.Prefab)
    ], GridGenerator.prototype, "blockPrefab", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], GridGenerator.prototype, "sprites", void 0);
    __decorate([
        property
    ], GridGenerator.prototype, "cellSize", void 0);
    __decorate([
        property
    ], GridGenerator.prototype, "padding", void 0);
    GridGenerator = __decorate([
        ccclass
    ], GridGenerator);
    return GridGenerator;
}(cc.Component));
exports.default = GridGenerator;

cc._RF.pop();