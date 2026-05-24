"use strict";
cc._RF.push(module, '778f8xt8ZpDfqzdWkrLizXb', 'MatchFinder');
// Script/MatchFinder.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameRules_1 = require("./GameRules");
var MatchFinder = /** @class */ (function () {
    function MatchFinder(grid) {
        this.grid = grid;
    }
    MatchFinder.prototype.findGroup = function (startBlock) {
        var visited = new Set();
        var stack = [startBlock];
        var result = [];
        while (stack.length > 0) {
            var block = stack.pop();
            var key = this.cellKey(block.gridX, block.gridY);
            if (visited.has(key))
                continue;
            visited.add(key);
            if (block.colorId !== startBlock.colorId)
                continue;
            result.push(block);
            for (var _i = 0, _a = this.grid.getNeighbors(block.gridX, block.gridY); _i < _a.length; _i++) {
                var neighbor = _a[_i];
                var nKey = this.cellKey(neighbor.gridX, neighbor.gridY);
                if (!visited.has(nKey)) {
                    stack.push(neighbor);
                }
            }
        }
        return result;
    };
    MatchFinder.prototype.hasValidMoves = function () {
        var visited = new Set();
        for (var y = 0; y < this.grid.height; y++) {
            for (var x = 0; x < this.grid.width; x++) {
                var block = this.grid.getBlockAt(x, y);
                if (!block)
                    continue;
                var key = this.cellKey(x, y);
                if (visited.has(key))
                    continue;
                if (this.measureGroup(block, visited) >= GameRules_1.default.MIN_GROUP_SIZE) {
                    return true;
                }
            }
        }
        return false;
    };
    MatchFinder.prototype.measureGroup = function (startBlock, visited) {
        var stack = [startBlock];
        var size = 0;
        while (stack.length > 0) {
            var block = stack.pop();
            var key = this.cellKey(block.gridX, block.gridY);
            if (visited.has(key))
                continue;
            visited.add(key);
            if (block.colorId !== startBlock.colorId)
                continue;
            size++;
            for (var _i = 0, _a = this.grid.getNeighbors(block.gridX, block.gridY); _i < _a.length; _i++) {
                var neighbor = _a[_i];
                var nKey = this.cellKey(neighbor.gridX, neighbor.gridY);
                if (!visited.has(nKey)) {
                    stack.push(neighbor);
                }
            }
        }
        return size;
    };
    MatchFinder.prototype.cellKey = function (x, y) {
        return x + "_" + y;
    };
    return MatchFinder;
}());
exports.default = MatchFinder;

cc._RF.pop();