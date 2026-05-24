
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/GridGenerator.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHcmlkR2VuZXJhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFNLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRTVDLGlDQUE0QjtBQUk1QjtJQUEyQyxpQ0FBWTtJQUF2RDtRQUFBLHFFQTJZQztRQXRXRyxPQUFDLEdBQVcsQ0FBQyxDQUFDO1FBR2QsT0FBQyxHQUFXLEVBQUUsQ0FBQztRQUdmLGlCQUFXLEdBQWMsSUFBSSxDQUFDO1FBRzlCLGFBQU8sR0FBcUIsRUFBRSxDQUFDO1FBRy9CLGNBQVEsR0FBVyxFQUFFLENBQUM7UUFHdEIsYUFBTyxHQUFXLENBQUMsQ0FBQztRQUVwQixVQUFJLEdBQXVCLEVBQUUsQ0FBQzs7SUFxVmxDLENBQUM7SUF6WUcsc0JBQUksZ0NBQUs7YUFBVDtZQUNJLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNsQixDQUFDOzs7T0FBQTtJQUVELHNCQUFJLGlDQUFNO2FBQVY7WUFDSSxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDbEIsQ0FBQzs7O09BQUE7SUFFRCxvQ0FBWSxHQUFaLFVBQWEsUUFBc0Q7UUFDL0QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDN0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQzdCLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzlCLElBQUksS0FBSztvQkFBRSxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzthQUNwQztTQUNKO0lBQ0wsQ0FBQztJQUVELG9DQUFZLEdBQVosVUFBYSxNQUFlO1FBQ3hCLEtBQW9CLFVBQU0sRUFBTixpQkFBTSxFQUFOLG9CQUFNLEVBQU4sSUFBTSxFQUFFO1lBQXZCLElBQU0sS0FBSyxlQUFBO1lBQ1osSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztnQkFBRSxTQUFTO1lBRXhDLElBQUEsS0FBSyxHQUFZLEtBQUssTUFBakIsRUFBRSxLQUFLLEdBQUssS0FBSyxNQUFWLENBQVc7WUFDL0IsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxFQUFFO2dCQUN2RCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQzthQUNsQztZQUNELEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDeEI7SUFDTCxDQUFDO0lBRUQsK0NBQXVCLEdBQXZCO1FBQ0ksSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBc0JELDZCQUFLLEdBQUw7UUFDSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFRCxnQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7UUFDZixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUM3QixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUNsQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDN0IsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7YUFDMUI7U0FDSjtJQUNMLENBQUM7SUFFRCxvQ0FBWSxHQUFaO1FBQ0ksSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBRTFDLElBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ2pDLElBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBRWxDLElBQU0sT0FBTyxHQUFHLENBQUMsVUFBVSxHQUFHLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQzNDLElBQU0sT0FBTyxHQUFHLENBQUMsV0FBVyxHQUFHLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBRTVDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzdCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUM3QixJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO2FBQzNDO1NBQ0o7SUFDTCxDQUFDO0lBRUQsc0NBQWMsR0FBZDtRQUNJLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUMxQyxJQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUNqQyxJQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUNsQyxPQUFPO1lBQ0gsSUFBSSxNQUFBO1lBQ0osT0FBTyxFQUFFLENBQUMsVUFBVSxHQUFHLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQztZQUNuQyxPQUFPLEVBQUUsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDO1NBQ3ZDLENBQUM7SUFDTixDQUFDO0lBRUQsdUNBQWUsR0FBZixVQUFnQixDQUFTLEVBQUUsQ0FBUztRQUMxQixJQUFBLEtBQTZCLElBQUksQ0FBQyxjQUFjLEVBQUUsRUFBaEQsSUFBSSxVQUFBLEVBQUUsT0FBTyxhQUFBLEVBQUUsT0FBTyxhQUEwQixDQUFDO1FBQ3pELE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxHQUFHLElBQUksRUFBRSxPQUFPLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFRCx1Q0FBZSxHQUFmLFVBQWdCLEtBQVk7UUFDeEIsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztZQUFFLE9BQU87UUFDOUMsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzRCxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQzVCLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBRUQsa0NBQVUsR0FBVixVQUFXLENBQVMsRUFBRSxDQUFTLEVBQUUsT0FBZ0IsRUFBRSxPQUFnQixFQUFFLFFBQXdCO1FBQXhCLHlCQUFBLEVBQUEsZUFBd0I7UUFDekYsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ2hELEVBQUUsQ0FBQyxJQUFJLENBQUMsa0RBQWtELENBQUMsQ0FBQztZQUM1RCxPQUFPO1NBQ1Y7UUFFRCxJQUFNLFNBQVMsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNuRCxTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFFdkIsSUFBQSxLQUFxRCxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQXhFLElBQUksVUFBQSxFQUFXLFVBQVUsYUFBQSxFQUFXLFVBQVUsYUFBMEIsQ0FBQztRQUNqRixJQUFJLE9BQU8sS0FBSyxTQUFTO1lBQUUsT0FBTyxHQUFHLFVBQVUsQ0FBQztRQUNoRCxJQUFJLE9BQU8sS0FBSyxTQUFTO1lBQUUsT0FBTyxHQUFHLFVBQVUsQ0FBQztRQUVoRCxJQUFNLE1BQU0sR0FBRyxPQUFPLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUNsQyxJQUFNLE1BQU0sR0FBRyxPQUFPLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUVsQyxJQUFJLFFBQVEsRUFBRTtZQUNWLFNBQVMsQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQztTQUMvQzthQUFNO1lBQ0gsU0FBUyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDekM7UUFFRCxJQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsWUFBWSxDQUFDLGVBQUssQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDUixFQUFFLENBQUMsSUFBSSxDQUFDLGdEQUFnRCxDQUFDLENBQUM7WUFDMUQsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3BCLE9BQU87U0FDVjtRQUVELElBQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUNsRCxJQUFJLFNBQVMsRUFBRTtZQUNYLElBQU0sT0FBTyxHQUFHLFNBQVMsQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUMxRCxJQUFJLE9BQU87Z0JBQUUsS0FBSyxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUM7U0FDN0M7UUFFRCxJQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BFLEtBQUssQ0FBQyxNQUFNLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFckQsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDaEIsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDaEIsS0FBSyxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUM7UUFFNUIsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7UUFFeEIsSUFBSSxRQUFRLEVBQUU7WUFDVixTQUFTLENBQUMsU0FBUyxDQUNmLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLGtCQUFrQixFQUFFLENBQUMsQ0FDbEUsQ0FBQztTQUNMO0lBQ0wsQ0FBQztJQUVELGtDQUFVLEdBQVYsVUFBVyxDQUFTLEVBQUUsQ0FBUztRQUMzQixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRTtZQUM5QyxPQUFPLElBQUksQ0FBQztTQUNmO1FBQ0QsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFRCwrREFBK0Q7SUFDL0QseUNBQWlCLEdBQWpCLFVBQWtCLE9BQWUsRUFBRSxPQUFlLEVBQUUsTUFBYztRQUM5RCxJQUFNLE1BQU0sR0FBWSxFQUFFLENBQUM7UUFDM0IsSUFBTSxJQUFJLEdBQUcsSUFBSSxHQUFHLEVBQVMsQ0FBQztRQUU5QixLQUFLLElBQUksQ0FBQyxHQUFHLE9BQU8sR0FBRyxNQUFNLEVBQUUsQ0FBQyxJQUFJLE9BQU8sR0FBRyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDdkQsS0FBSyxJQUFJLENBQUMsR0FBRyxPQUFPLEdBQUcsTUFBTSxFQUFFLENBQUMsSUFBSSxPQUFPLEdBQUcsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUN2RCxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDcEMsSUFBSSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUMzQixJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUN0QjthQUNKO1NBQ0o7UUFFRCxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBRUQsa0NBQVUsR0FBVixVQUFXLENBQVEsRUFBRSxDQUFRO1FBQ3pCLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7WUFBRSxPQUFPO1FBRWhDLElBQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDbkIsSUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUNuQixJQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ25CLElBQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFFbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFdEIsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDYixDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNiLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2IsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFFYixJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVELG9DQUFZLEdBQVosVUFBYSxDQUFTLEVBQUUsQ0FBUztRQUM3QixJQUFNLE1BQU0sR0FBWSxFQUFFLENBQUM7UUFFM0IsSUFBTSxJQUFJLEdBQUc7WUFDVCxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNmLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ2xCLENBQUM7UUFFRixLQUFjLFVBQUksRUFBSixhQUFJLEVBQUosa0JBQUksRUFBSixJQUFJLEVBQUU7WUFBZixJQUFJLENBQUMsYUFBQTtZQUNOLElBQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEIsSUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVwQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsRUFBRTtnQkFDbEQsSUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDNUIsSUFBSSxDQUFDO29CQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDekI7U0FDSjtRQUVELE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFFRCw2REFBNkQ7SUFDN0QsdUNBQWUsR0FBZjtRQUNJLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzdCLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztZQUVmLEtBQUssSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFO2dCQUN6QyxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNsQyxJQUFJLENBQUMsS0FBSztvQkFBRSxTQUFTO2dCQUVyQixJQUFJLEtBQUssS0FBSyxNQUFNLEVBQUU7b0JBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO29CQUM3QixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztvQkFDM0IsS0FBSyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7aUJBQ3hCO2dCQUVELE1BQU0sRUFBRSxDQUFDO2FBQ1o7WUFFRCxLQUFLLElBQUksQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7YUFDMUI7U0FDSjtJQUNMLENBQUM7SUFFRCxnQ0FBUSxHQUFSLFVBQVMsUUFBd0I7UUFBeEIseUJBQUEsRUFBQSxlQUF3QjtRQUM3QixJQUFNLFdBQVcsR0FBWSxFQUFFLENBQUM7UUFFaEMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDN0IsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO1lBRWYsS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUU7Z0JBQ3pDLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xDLElBQUksQ0FBQyxLQUFLO29CQUFFLFNBQVM7Z0JBRXJCLElBQUksS0FBSyxLQUFLLE1BQU0sRUFBRTtvQkFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7b0JBQzdCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO29CQUMzQixLQUFLLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQztvQkFDckIsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDM0I7Z0JBRUQsTUFBTSxFQUFFLENBQUM7YUFDWjtZQUVELEtBQUssSUFBSSxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNsQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQzthQUMxQjtTQUNKO1FBRUQsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNYLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUM3QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDN0IsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDOUIsSUFBSSxLQUFLO3dCQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQzFDO2FBQ0o7WUFDRCxPQUFPO1NBQ1Y7UUFFRCxLQUFvQixVQUFXLEVBQVgsMkJBQVcsRUFBWCx5QkFBVyxFQUFYLElBQVcsRUFBRTtZQUE1QixJQUFNLEtBQUssb0JBQUE7WUFDWixJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzNELElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hELElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFFBQVEsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ2hFLElBQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBRWpDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDNUIsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQ2hCLEVBQUUsQ0FBQyxRQUFRLENBQ1AsRUFBRSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFDbkIsRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLENBQ3BFLENBQ0osQ0FBQztTQUNMO0lBQ0wsQ0FBQztJQUVELHNDQUFjLEdBQWQsVUFBZSxRQUF3QjtRQUF4Qix5QkFBQSxFQUFBLGVBQXdCO1FBQzdCLElBQUEsS0FBdUIsSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUExQyxPQUFPLGFBQUEsRUFBRSxPQUFPLGFBQTBCLENBQUM7UUFFbkQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDN0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQzdCLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLEVBQUU7b0JBQzFCLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2lCQUNyRDthQUNKO1NBQ0o7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxtQ0FBVyxHQUFYLFVBQVksUUFBeUI7UUFBekIseUJBQUEsRUFBQSxnQkFBeUI7UUFDakMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBRXZCLElBQUksUUFBUSxFQUFFO1lBQ1YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNwQixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzdCO2FBQU07WUFDSCxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDOUI7SUFDTCxDQUFDO0lBRUQsa0ZBQWtGO0lBQ2xGLHFDQUFhLEdBQWIsVUFBYyxXQUF5QztRQUNuRCxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXhCLElBQU0sTUFBTSxHQUFZLEVBQUUsQ0FBQztRQUMzQixJQUFNLE1BQU0sR0FBYSxFQUFFLENBQUM7UUFFNUIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDN0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQzdCLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzlCLElBQUksQ0FBQyxLQUFLO29CQUFFLFNBQVM7Z0JBQ3JCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ25CLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQzlCO1NBQ0o7UUFFRCxJQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ3JCLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBRUQsSUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLEtBQUssSUFBSSxPQUFPLEdBQUcsQ0FBQyxFQUFFLE9BQU8sR0FBRyxRQUFRLEVBQUUsT0FBTyxFQUFFLEVBQUU7WUFDakQsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ3pDLElBQUksV0FBVyxDQUFDLGFBQWEsRUFBRSxFQUFFO2dCQUM3QixJQUFJLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ2xDLE9BQU8sSUFBSSxDQUFDO2FBQ2Y7U0FDSjtRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFTywyQ0FBbUIsR0FBM0IsVUFBNEIsTUFBZSxFQUFFLE1BQWdCO1FBQ3pELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3BDLElBQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQixJQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEIsS0FBSyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7WUFDeEIsSUFBSSxLQUFLLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ3ZDLEtBQUssQ0FBQyxNQUFNLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDcEQ7U0FDSjtJQUNMLENBQUM7SUFFTyxvQ0FBWSxHQUFwQixVQUF3QixLQUFVO1FBQzlCLEtBQUssSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN2QyxJQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlDLElBQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyQixLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7U0FDbEI7SUFDTCxDQUFDO0lBRU8sNENBQW9CLEdBQTVCLFVBQTZCLE1BQWU7UUFDeEMsS0FBb0IsVUFBTSxFQUFOLGlCQUFNLEVBQU4sb0JBQU0sRUFBTixJQUFNLEVBQUU7WUFBdkIsSUFBTSxLQUFLLGVBQUE7WUFDWixJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO2dCQUFFLFNBQVM7WUFDaEQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM1QixLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FDaEIsRUFBRSxDQUFDLFFBQVEsQ0FDUCxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFDdEIsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQ3RCLENBQ0osQ0FBQztTQUNMO0lBQ0wsQ0FBQztJQXJXRDtRQURDLFFBQVE7NENBQ0s7SUFHZDtRQURDLFFBQVE7NENBQ007SUFHZjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO3NEQUNVO0lBRzlCO1FBREMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2tEQUNJO0lBRy9CO1FBREMsUUFBUTttREFDYTtJQUd0QjtRQURDLFFBQVE7a0RBQ1c7SUFwREgsYUFBYTtRQURqQyxPQUFPO09BQ2EsYUFBYSxDQTJZakM7SUFBRCxvQkFBQztDQTNZRCxBQTJZQyxDQTNZMEMsRUFBRSxDQUFDLFNBQVMsR0EyWXREO2tCQTNZb0IsYUFBYSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbmltcG9ydCBCbG9jayBmcm9tIFwiLi9CbG9ja1wiO1xuaW1wb3J0IElHcmlkQWNjZXNzIGZyb20gXCIuL0lHcmlkQWNjZXNzXCI7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcmlkR2VuZXJhdG9yIGV4dGVuZHMgY2MuQ29tcG9uZW50IGltcGxlbWVudHMgSUdyaWRBY2Nlc3Mge1xuXG4gICAgZ2V0IHdpZHRoKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLlg7XG4gICAgfVxuXG4gICAgZ2V0IGhlaWdodCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5ZO1xuICAgIH1cblxuICAgIGZvckVhY2hCbG9jayhjYWxsYmFjazogKGJsb2NrOiBCbG9jaywgeDogbnVtYmVyLCB5OiBudW1iZXIpID0+IHZvaWQpIHtcbiAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCB0aGlzLlk7IHkrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLlg7IHgrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGJsb2NrID0gdGhpcy5ncmlkW3ldW3hdO1xuICAgICAgICAgICAgICAgIGlmIChibG9jaykgY2FsbGJhY2soYmxvY2ssIHgsIHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVtb3ZlQmxvY2tzKGJsb2NrczogQmxvY2tbXSkge1xuICAgICAgICBmb3IgKGNvbnN0IGJsb2NrIG9mIGJsb2Nrcykge1xuICAgICAgICAgICAgaWYgKCFibG9jayB8fCAhY2MuaXNWYWxpZChibG9jay5ub2RlKSkgY29udGludWU7XG5cbiAgICAgICAgICAgIGNvbnN0IHsgZ3JpZFgsIGdyaWRZIH0gPSBibG9jaztcbiAgICAgICAgICAgIGlmICh0aGlzLmdyaWRbZ3JpZFldICYmIHRoaXMuZ3JpZFtncmlkWV1bZ3JpZFhdID09PSBibG9jaykge1xuICAgICAgICAgICAgICAgIHRoaXMuZ3JpZFtncmlkWV1bZ3JpZFhdID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJsb2NrLm5vZGUuZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVzb2x2ZUJvYXJkQWZ0ZXJDaGFuZ2UoKSB7XG4gICAgICAgIHRoaXMuZmFsbERvd24oKTtcbiAgICAgICAgdGhpcy5zcGF3bk5ld0Jsb2NrcygpO1xuICAgIH1cblxuICAgIEBwcm9wZXJ0eVxuICAgIFg6IG51bWJlciA9IDk7XG5cbiAgICBAcHJvcGVydHlcbiAgICBZOiBudW1iZXIgPSAxMDtcblxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXG4gICAgYmxvY2tQcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoW2NjLlNwcml0ZUZyYW1lXSlcbiAgICBzcHJpdGVzOiBjYy5TcHJpdGVGcmFtZVtdID0gW107XG5cbiAgICBAcHJvcGVydHlcbiAgICBjZWxsU2l6ZTogbnVtYmVyID0gNjQ7XG5cbiAgICBAcHJvcGVydHlcbiAgICBwYWRkaW5nOiBudW1iZXIgPSA4O1xuXG4gICAgZ3JpZDogKEJsb2NrIHwgbnVsbClbXVtdID0gW107XG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgdGhpcy5pbml0R3JpZCgpO1xuICAgICAgICB0aGlzLmdlbmVyYXRlR3JpZCgpO1xuICAgIH1cblxuICAgIGluaXRHcmlkKCkge1xuICAgICAgICB0aGlzLmdyaWQgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCB0aGlzLlk7IHkrKykge1xuICAgICAgICAgICAgdGhpcy5ncmlkW3ldID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMuWDsgeCsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ncmlkW3ldW3hdID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdlbmVyYXRlR3JpZCgpIHtcbiAgICAgICAgY29uc3Qgc3RlcCA9IHRoaXMuY2VsbFNpemUgKyB0aGlzLnBhZGRpbmc7XG5cbiAgICAgICAgY29uc3QgdG90YWxXaWR0aCA9IHRoaXMuWCAqIHN0ZXA7XG4gICAgICAgIGNvbnN0IHRvdGFsSGVpZ2h0ID0gdGhpcy5ZICogc3RlcDtcblxuICAgICAgICBjb25zdCBvZmZzZXRYID0gLXRvdGFsV2lkdGggLyAyICsgc3RlcCAvIDI7XG4gICAgICAgIGNvbnN0IG9mZnNldFkgPSAtdG90YWxIZWlnaHQgLyAyICsgc3RlcCAvIDI7XG5cbiAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCB0aGlzLlk7IHkrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLlg7IHgrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuc3Bhd25CbG9jayh4LCB5LCBvZmZzZXRYLCBvZmZzZXRZKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldEdyaWRPZmZzZXRzKCkge1xuICAgICAgICBjb25zdCBzdGVwID0gdGhpcy5jZWxsU2l6ZSArIHRoaXMucGFkZGluZztcbiAgICAgICAgY29uc3QgdG90YWxXaWR0aCA9IHRoaXMuWCAqIHN0ZXA7XG4gICAgICAgIGNvbnN0IHRvdGFsSGVpZ2h0ID0gdGhpcy5ZICogc3RlcDtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN0ZXAsXG4gICAgICAgICAgICBvZmZzZXRYOiAtdG90YWxXaWR0aCAvIDIgKyBzdGVwIC8gMixcbiAgICAgICAgICAgIG9mZnNldFk6IC10b3RhbEhlaWdodCAvIDIgKyBzdGVwIC8gMixcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBnZXRDZWxsUG9zaXRpb24oeDogbnVtYmVyLCB5OiBudW1iZXIpOiBjYy5WZWMyIHtcbiAgICAgICAgY29uc3QgeyBzdGVwLCBvZmZzZXRYLCBvZmZzZXRZIH0gPSB0aGlzLmdldEdyaWRPZmZzZXRzKCk7XG4gICAgICAgIHJldHVybiBjYy52MihvZmZzZXRYICsgeCAqIHN0ZXAsIG9mZnNldFkgKyB5ICogc3RlcCk7XG4gICAgfVxuXG4gICAgc25hcEJsb2NrVG9DZWxsKGJsb2NrOiBCbG9jaykge1xuICAgICAgICBpZiAoIWJsb2NrIHx8ICFjYy5pc1ZhbGlkKGJsb2NrLm5vZGUpKSByZXR1cm47XG4gICAgICAgIGNvbnN0IHBvcyA9IHRoaXMuZ2V0Q2VsbFBvc2l0aW9uKGJsb2NrLmdyaWRYLCBibG9jay5ncmlkWSk7XG4gICAgICAgIGJsb2NrLm5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcbiAgICAgICAgYmxvY2subm9kZS5zZXRQb3NpdGlvbihwb3MueCwgcG9zLnkpO1xuICAgICAgICBibG9jay5ub2RlLnNjYWxlID0gMTtcbiAgICB9XG5cbiAgICBzcGF3bkJsb2NrKHg6IG51bWJlciwgeTogbnVtYmVyLCBvZmZzZXRYPzogbnVtYmVyLCBvZmZzZXRZPzogbnVtYmVyLCBhbmltYXRlZDogYm9vbGVhbiA9IHRydWUpIHtcbiAgICAgICAgaWYgKCF0aGlzLmJsb2NrUHJlZmFiIHx8IHRoaXMuc3ByaXRlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGNjLndhcm4oXCJHcmlkR2VuZXJhdG9yOiBibG9ja1ByZWZhYiDQuNC70Lggc3ByaXRlcyDQvdC1INC30LDQtNCw0L3Ri1wiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGJsb2NrTm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuYmxvY2tQcmVmYWIpO1xuICAgICAgICBibG9ja05vZGUucGFyZW50ID0gdGhpcy5ub2RlO1xuXG4gICAgICAgIGNvbnN0IHsgc3RlcCwgb2Zmc2V0WDogZGVmT2Zmc2V0WCwgb2Zmc2V0WTogZGVmT2Zmc2V0WSB9ID0gdGhpcy5nZXRHcmlkT2Zmc2V0cygpO1xuICAgICAgICBpZiAob2Zmc2V0WCA9PT0gdW5kZWZpbmVkKSBvZmZzZXRYID0gZGVmT2Zmc2V0WDtcbiAgICAgICAgaWYgKG9mZnNldFkgPT09IHVuZGVmaW5lZCkgb2Zmc2V0WSA9IGRlZk9mZnNldFk7XG5cbiAgICAgICAgY29uc3QgZmluYWxYID0gb2Zmc2V0WCArIHggKiBzdGVwO1xuICAgICAgICBjb25zdCBmaW5hbFkgPSBvZmZzZXRZICsgeSAqIHN0ZXA7XG5cbiAgICAgICAgaWYgKGFuaW1hdGVkKSB7XG4gICAgICAgICAgICBibG9ja05vZGUuc2V0UG9zaXRpb24oZmluYWxYLCBmaW5hbFkgKyAzMDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYmxvY2tOb2RlLnNldFBvc2l0aW9uKGZpbmFsWCwgZmluYWxZKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGJsb2NrID0gYmxvY2tOb2RlLmdldENvbXBvbmVudChCbG9jayk7XG4gICAgICAgIGlmICghYmxvY2spIHtcbiAgICAgICAgICAgIGNjLndhcm4oXCJHcmlkR2VuZXJhdG9yOiDQvdCwINC/0YDQtdGE0LDQsdC1INC90LXRgiDQutC+0LzQv9C+0L3QtdC90YLQsCBCbG9ja1wiKTtcbiAgICAgICAgICAgIGJsb2NrTm9kZS5kZXN0cm95KCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwbGF5RnJhbWUgPSBjYy5maW5kKFwiQ2FudmFzL2JnX2ZyYW1lX3BsYXlcIik7XG4gICAgICAgIGlmIChwbGF5RnJhbWUpIHtcbiAgICAgICAgICAgIGNvbnN0IGhhbmRsZXIgPSBwbGF5RnJhbWUuZ2V0Q29tcG9uZW50KFwiR2FtZVN0YXJ0U3lzdGVtXCIpO1xuICAgICAgICAgICAgaWYgKGhhbmRsZXIpIGJsb2NrLmNsaWNrSGFuZGxlciA9IGhhbmRsZXI7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByYW5kb21JbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuc3ByaXRlcy5sZW5ndGgpO1xuICAgICAgICBibG9jay5zcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLnNwcml0ZXNbcmFuZG9tSW5kZXhdO1xuXG4gICAgICAgIGJsb2NrLmdyaWRYID0geDtcbiAgICAgICAgYmxvY2suZ3JpZFkgPSB5O1xuICAgICAgICBibG9jay5jb2xvcklkID0gcmFuZG9tSW5kZXg7XG5cbiAgICAgICAgdGhpcy5ncmlkW3ldW3hdID0gYmxvY2s7XG5cbiAgICAgICAgaWYgKGFuaW1hdGVkKSB7XG4gICAgICAgICAgICBibG9ja05vZGUucnVuQWN0aW9uKFxuICAgICAgICAgICAgICAgIGNjLm1vdmVUbygwLjI1LCBmaW5hbFgsIGZpbmFsWSkuZWFzaW5nKGNjLmVhc2VDdWJpY0FjdGlvbk91dCgpKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldEJsb2NrQXQoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBCbG9jayB8IG51bGwge1xuICAgICAgICBpZiAoeSA8IDAgfHwgeSA+PSB0aGlzLlkgfHwgeCA8IDAgfHwgeCA+PSB0aGlzLlgpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmdyaWRbeV1beF07XG4gICAgfVxuXG4gICAgLyoqINCS0YHQtSDRgtCw0LnQu9GLINCyINC60LLQsNC00YDQsNGC0LUg0YEg0YDQsNC00LjRg9GB0L7QvCBSICjRgNCw0YHRgdGC0L7Rj9C90LjQtSDQp9C10LHRi9GI0ZHQstCwKS4gKi9cbiAgICBnZXRCbG9ja3NJblJhZGl1cyhjZW50ZXJYOiBudW1iZXIsIGNlbnRlclk6IG51bWJlciwgcmFkaXVzOiBudW1iZXIpOiBCbG9ja1tdIHtcbiAgICAgICAgY29uc3QgcmVzdWx0OiBCbG9ja1tdID0gW107XG4gICAgICAgIGNvbnN0IHNlZW4gPSBuZXcgU2V0PEJsb2NrPigpO1xuXG4gICAgICAgIGZvciAobGV0IHkgPSBjZW50ZXJZIC0gcmFkaXVzOyB5IDw9IGNlbnRlclkgKyByYWRpdXM7IHkrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgeCA9IGNlbnRlclggLSByYWRpdXM7IHggPD0gY2VudGVyWCArIHJhZGl1czsgeCsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYmxvY2sgPSB0aGlzLmdldEJsb2NrQXQoeCwgeSk7XG4gICAgICAgICAgICAgICAgaWYgKGJsb2NrICYmICFzZWVuLmhhcyhibG9jaykpIHtcbiAgICAgICAgICAgICAgICAgICAgc2Vlbi5hZGQoYmxvY2spO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChibG9jayk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBzd2FwQmxvY2tzKGE6IEJsb2NrLCBiOiBCbG9jaykge1xuICAgICAgICBpZiAoIWEgfHwgIWIgfHwgYSA9PT0gYikgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IGF4ID0gYS5ncmlkWDtcbiAgICAgICAgY29uc3QgYXkgPSBhLmdyaWRZO1xuICAgICAgICBjb25zdCBieCA9IGIuZ3JpZFg7XG4gICAgICAgIGNvbnN0IGJ5ID0gYi5ncmlkWTtcblxuICAgICAgICB0aGlzLmdyaWRbYXldW2F4XSA9IGI7XG4gICAgICAgIHRoaXMuZ3JpZFtieV1bYnhdID0gYTtcblxuICAgICAgICBhLmdyaWRYID0gYng7XG4gICAgICAgIGEuZ3JpZFkgPSBieTtcbiAgICAgICAgYi5ncmlkWCA9IGF4O1xuICAgICAgICBiLmdyaWRZID0gYXk7XG5cbiAgICAgICAgdGhpcy5zbmFwQmxvY2tUb0NlbGwoYSk7XG4gICAgICAgIHRoaXMuc25hcEJsb2NrVG9DZWxsKGIpO1xuICAgIH1cblxuICAgIGdldE5laWdoYm9ycyh4OiBudW1iZXIsIHk6IG51bWJlcik6IEJsb2NrW10ge1xuICAgICAgICBjb25zdCByZXN1bHQ6IEJsb2NrW10gPSBbXTtcblxuICAgICAgICBjb25zdCBkaXJzID0gW1xuICAgICAgICAgICAgWzEsIDBdLCBbLTEsIDBdLFxuICAgICAgICAgICAgWzAsIDFdLCBbMCwgLTFdXG4gICAgICAgIF07XG5cbiAgICAgICAgZm9yIChsZXQgZCBvZiBkaXJzKSB7XG4gICAgICAgICAgICBjb25zdCBueCA9IHggKyBkWzBdO1xuICAgICAgICAgICAgY29uc3QgbnkgPSB5ICsgZFsxXTtcblxuICAgICAgICAgICAgaWYgKG55ID49IDAgJiYgbnkgPCB0aGlzLlkgJiYgbnggPj0gMCAmJiBueCA8IHRoaXMuWCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGIgPSB0aGlzLmdyaWRbbnldW254XTtcbiAgICAgICAgICAgICAgICBpZiAoYikgcmVzdWx0LnB1c2goYik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIC8qKiDQo9C/0LvQvtGC0L3Rj9C10YIg0YHQtdGC0LrRgzog0LLRgdC1INCx0LvQvtC60Lgg0LLQvdC40LcsINC/0YPRgdGC0YvQtSDRj9GH0LXQudC60Lgg0YHQstC10YDRhdGDLiAqL1xuICAgIGNvbXBhY3RHcmlkRGF0YSgpIHtcbiAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLlg7IHgrKykge1xuICAgICAgICAgICAgbGV0IHdyaXRlWSA9IDA7XG5cbiAgICAgICAgICAgIGZvciAobGV0IHJlYWRZID0gMDsgcmVhZFkgPCB0aGlzLlk7IHJlYWRZKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBibG9jayA9IHRoaXMuZ3JpZFtyZWFkWV1beF07XG4gICAgICAgICAgICAgICAgaWYgKCFibG9jaykgY29udGludWU7XG5cbiAgICAgICAgICAgICAgICBpZiAocmVhZFkgIT09IHdyaXRlWSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdyaWRbd3JpdGVZXVt4XSA9IGJsb2NrO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdyaWRbcmVhZFldW3hdID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgYmxvY2suZ3JpZFkgPSB3cml0ZVk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgd3JpdGVZKys7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAobGV0IHkgPSB3cml0ZVk7IHkgPCB0aGlzLlk7IHkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuZ3JpZFt5XVt4XSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmYWxsRG93bihhbmltYXRlZDogYm9vbGVhbiA9IHRydWUpIHtcbiAgICAgICAgY29uc3QgbW92ZWRCbG9ja3M6IEJsb2NrW10gPSBbXTtcblxuICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMuWDsgeCsrKSB7XG4gICAgICAgICAgICBsZXQgd3JpdGVZID0gMDtcblxuICAgICAgICAgICAgZm9yIChsZXQgcmVhZFkgPSAwOyByZWFkWSA8IHRoaXMuWTsgcmVhZFkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGJsb2NrID0gdGhpcy5ncmlkW3JlYWRZXVt4XTtcbiAgICAgICAgICAgICAgICBpZiAoIWJsb2NrKSBjb250aW51ZTtcblxuICAgICAgICAgICAgICAgIGlmIChyZWFkWSAhPT0gd3JpdGVZKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JpZFt3cml0ZVldW3hdID0gYmxvY2s7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JpZFtyZWFkWV1beF0gPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICBibG9jay5ncmlkWSA9IHdyaXRlWTtcbiAgICAgICAgICAgICAgICAgICAgbW92ZWRCbG9ja3MucHVzaChibG9jayk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgd3JpdGVZKys7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAobGV0IHkgPSB3cml0ZVk7IHkgPCB0aGlzLlk7IHkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuZ3JpZFt5XVt4XSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWFuaW1hdGVkKSB7XG4gICAgICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMuWTsgeSsrKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLlg7IHgrKykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBibG9jayA9IHRoaXMuZ3JpZFt5XVt4XTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJsb2NrKSB0aGlzLnNuYXBCbG9ja1RvQ2VsbChibG9jayk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChjb25zdCBibG9jayBvZiBtb3ZlZEJsb2Nrcykge1xuICAgICAgICAgICAgY29uc3QgcG9zID0gdGhpcy5nZXRDZWxsUG9zaXRpb24oYmxvY2suZ3JpZFgsIGJsb2NrLmdyaWRZKTtcbiAgICAgICAgICAgIGNvbnN0IGRpc3RhbmNlID0gTWF0aC5hYnMoYmxvY2subm9kZS55IC0gcG9zLnkpO1xuICAgICAgICAgICAgY29uc3QgZHVyYXRpb24gPSBNYXRoLm1pbigwLjI1LCBNYXRoLm1heCgwLjA1LCBkaXN0YW5jZSAvIDYwMCkpO1xuICAgICAgICAgICAgY29uc3QgZGVsYXkgPSBibG9jay5ncmlkWCAqIDAuMDI7XG5cbiAgICAgICAgICAgIGJsb2NrLm5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcbiAgICAgICAgICAgIGJsb2NrLm5vZGUucnVuQWN0aW9uKFxuICAgICAgICAgICAgICAgIGNjLnNlcXVlbmNlKFxuICAgICAgICAgICAgICAgICAgICBjYy5kZWxheVRpbWUoZGVsYXkpLFxuICAgICAgICAgICAgICAgICAgICBjYy5tb3ZlVG8oZHVyYXRpb24sIHBvcy54LCBwb3MueSkuZWFzaW5nKGNjLmVhc2VDdWJpY0FjdGlvbk91dCgpKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzcGF3bk5ld0Jsb2NrcyhhbmltYXRlZDogYm9vbGVhbiA9IHRydWUpIHtcbiAgICAgICAgY29uc3QgeyBvZmZzZXRYLCBvZmZzZXRZIH0gPSB0aGlzLmdldEdyaWRPZmZzZXRzKCk7XG5cbiAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCB0aGlzLlk7IHkrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLlg7IHgrKykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmdyaWRbeV1beF0gPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcGF3bkJsb2NrKHgsIHksIG9mZnNldFgsIG9mZnNldFksIGFuaW1hdGVkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQn9GA0LjQstC+0LTQuNGCINC/0L7Qu9C1INCyINGB0L7Qs9C70LDRgdC+0LLQsNC90L3QvtC1INGB0L7RgdGC0L7Rj9C90LjQtTog0YPQv9C70L7RgtC90LXQvdC40LUsINGB0LjQvdGF0YDQvtC90LjQt9Cw0YbQuNGPINC/0L7Qt9C40YbQuNC5LCDQtNC+0YHRi9C/0LDQvdC40LUuXG4gICAgICovXG4gICAgcmVzb2x2ZUdyaWQoYW5pbWF0ZWQ6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICB0aGlzLmNvbXBhY3RHcmlkRGF0YSgpO1xuXG4gICAgICAgIGlmIChhbmltYXRlZCkge1xuICAgICAgICAgICAgdGhpcy5mYWxsRG93bih0cnVlKTtcbiAgICAgICAgICAgIHRoaXMuc3Bhd25OZXdCbG9ja3ModHJ1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmZhbGxEb3duKGZhbHNlKTtcbiAgICAgICAgICAgIHRoaXMuc3Bhd25OZXdCbG9ja3MoZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqINCf0LXRgNC10LzQtdGI0LjQstCw0LXRgiDRhtCy0LXRgtCwINC90LAg0L/QvtC70LUuINCS0L7Qt9Cy0YDQsNGJ0LDQtdGCIHRydWUsINC10YHQu9C4INC/0L7RgdC70LUg0Y3RgtC+0LPQviDQtdGB0YLRjCDRhdC+0LQg4omlIDMuICovXG4gICAgc2h1ZmZsZUJsb2NrcyhtYXRjaEZpbmRlcjogeyBoYXNWYWxpZE1vdmVzKCk6IGJvb2xlYW4gfSk6IGJvb2xlYW4ge1xuICAgICAgICB0aGlzLnJlc29sdmVHcmlkKGZhbHNlKTtcblxuICAgICAgICBjb25zdCBibG9ja3M6IEJsb2NrW10gPSBbXTtcbiAgICAgICAgY29uc3QgY29sb3JzOiBudW1iZXJbXSA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgdGhpcy5ZOyB5KyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgdGhpcy5YOyB4KyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBibG9jayA9IHRoaXMuZ3JpZFt5XVt4XTtcbiAgICAgICAgICAgICAgICBpZiAoIWJsb2NrKSBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBibG9ja3MucHVzaChibG9jayk7XG4gICAgICAgICAgICAgICAgY29sb3JzLnB1c2goYmxvY2suY29sb3JJZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYmxvY2tzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbWF4VHJpZXMgPSA4MDtcbiAgICAgICAgZm9yIChsZXQgYXR0ZW1wdCA9IDA7IGF0dGVtcHQgPCBtYXhUcmllczsgYXR0ZW1wdCsrKSB7XG4gICAgICAgICAgICB0aGlzLnNodWZmbGVBcnJheShjb2xvcnMpO1xuICAgICAgICAgICAgdGhpcy5hcHBseUNvbG9yc1RvQmxvY2tzKGJsb2NrcywgY29sb3JzKTtcbiAgICAgICAgICAgIGlmIChtYXRjaEZpbmRlci5oYXNWYWxpZE1vdmVzKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXlTaHVmZmxlQW5pbWF0aW9uKGJsb2Nrcyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhcHBseUNvbG9yc1RvQmxvY2tzKGJsb2NrczogQmxvY2tbXSwgY29sb3JzOiBudW1iZXJbXSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJsb2Nrcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgY29sb3JJZCA9IGNvbG9yc1tpXTtcbiAgICAgICAgICAgIGNvbnN0IGJsb2NrID0gYmxvY2tzW2ldO1xuICAgICAgICAgICAgYmxvY2suY29sb3JJZCA9IGNvbG9ySWQ7XG4gICAgICAgICAgICBpZiAoYmxvY2suc3ByaXRlICYmIHRoaXMuc3ByaXRlc1tjb2xvcklkXSkge1xuICAgICAgICAgICAgICAgIGJsb2NrLnNwcml0ZS5zcHJpdGVGcmFtZSA9IHRoaXMuc3ByaXRlc1tjb2xvcklkXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc2h1ZmZsZUFycmF5PFQ+KGFycmF5OiBUW10pIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IGFycmF5Lmxlbmd0aCAtIDE7IGkgPiAwOyBpLS0pIHtcbiAgICAgICAgICAgIGNvbnN0IGogPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoaSArIDEpKTtcbiAgICAgICAgICAgIGNvbnN0IHRtcCA9IGFycmF5W2ldO1xuICAgICAgICAgICAgYXJyYXlbaV0gPSBhcnJheVtqXTtcbiAgICAgICAgICAgIGFycmF5W2pdID0gdG1wO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwbGF5U2h1ZmZsZUFuaW1hdGlvbihibG9ja3M6IEJsb2NrW10pIHtcbiAgICAgICAgZm9yIChjb25zdCBibG9jayBvZiBibG9ja3MpIHtcbiAgICAgICAgICAgIGlmICghYmxvY2sgfHwgIWNjLmlzVmFsaWQoYmxvY2subm9kZSkpIGNvbnRpbnVlO1xuICAgICAgICAgICAgdGhpcy5zbmFwQmxvY2tUb0NlbGwoYmxvY2spO1xuICAgICAgICAgICAgYmxvY2subm9kZS5ydW5BY3Rpb24oXG4gICAgICAgICAgICAgICAgY2Muc2VxdWVuY2UoXG4gICAgICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4wOCwgMC44NSksXG4gICAgICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4wOCwgMSlcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19