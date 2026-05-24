
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/MatchFinder.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxNYXRjaEZpbmRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHlDQUFvQztBQUdwQztJQUVJLHFCQUE2QixJQUFpQjtRQUFqQixTQUFJLEdBQUosSUFBSSxDQUFhO0lBQUcsQ0FBQztJQUVsRCwrQkFBUyxHQUFULFVBQVUsVUFBaUI7UUFDdkIsSUFBTSxPQUFPLEdBQUcsSUFBSSxHQUFHLEVBQVUsQ0FBQztRQUNsQyxJQUFNLEtBQUssR0FBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3BDLElBQU0sTUFBTSxHQUFZLEVBQUUsQ0FBQztRQUUzQixPQUFPLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3JCLElBQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUMxQixJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRW5ELElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7Z0JBQUUsU0FBUztZQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRWpCLElBQUksS0FBSyxDQUFDLE9BQU8sS0FBSyxVQUFVLENBQUMsT0FBTztnQkFBRSxTQUFTO1lBRW5ELE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFbkIsS0FBdUIsVUFBZ0QsRUFBaEQsS0FBQSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBaEQsY0FBZ0QsRUFBaEQsSUFBZ0QsRUFBRTtnQkFBcEUsSUFBTSxRQUFRLFNBQUE7Z0JBQ2YsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDMUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7b0JBQ3BCLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7aUJBQ3hCO2FBQ0o7U0FDSjtRQUVELE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxtQ0FBYSxHQUFiO1FBQ0ksSUFBTSxPQUFPLEdBQUcsSUFBSSxHQUFHLEVBQVUsQ0FBQztRQUVsQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDdkMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUN0QyxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pDLElBQUksQ0FBQyxLQUFLO29CQUFFLFNBQVM7Z0JBRXJCLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUMvQixJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO29CQUFFLFNBQVM7Z0JBRS9CLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLElBQUksbUJBQVMsQ0FBQyxjQUFjLEVBQUU7b0JBQy9ELE9BQU8sSUFBSSxDQUFDO2lCQUNmO2FBQ0o7U0FDSjtRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFTyxrQ0FBWSxHQUFwQixVQUFxQixVQUFpQixFQUFFLE9BQW9CO1FBQ3hELElBQU0sS0FBSyxHQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDcEMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBRWIsT0FBTyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNyQixJQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDMUIsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUVuRCxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO2dCQUFFLFNBQVM7WUFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUVqQixJQUFJLEtBQUssQ0FBQyxPQUFPLEtBQUssVUFBVSxDQUFDLE9BQU87Z0JBQUUsU0FBUztZQUVuRCxJQUFJLEVBQUUsQ0FBQztZQUVQLEtBQXVCLFVBQWdELEVBQWhELEtBQUEsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQWhELGNBQWdELEVBQWhELElBQWdELEVBQUU7Z0JBQXBFLElBQU0sUUFBUSxTQUFBO2dCQUNmLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzFELElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUNwQixLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2lCQUN4QjthQUNKO1NBQ0o7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRU8sNkJBQU8sR0FBZixVQUFnQixDQUFTLEVBQUUsQ0FBUztRQUNoQyxPQUFPLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUFDTCxrQkFBQztBQUFELENBaEZBLEFBZ0ZDLElBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmxvY2sgZnJvbSBcIi4vQmxvY2tcIjtcbmltcG9ydCBHYW1lUnVsZXMgZnJvbSBcIi4vR2FtZVJ1bGVzXCI7XG5pbXBvcnQgSUdyaWRBY2Nlc3MgZnJvbSBcIi4vSUdyaWRBY2Nlc3NcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWF0Y2hGaW5kZXIge1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBncmlkOiBJR3JpZEFjY2Vzcykge31cblxuICAgIGZpbmRHcm91cChzdGFydEJsb2NrOiBCbG9jayk6IEJsb2NrW10ge1xuICAgICAgICBjb25zdCB2aXNpdGVkID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gICAgICAgIGNvbnN0IHN0YWNrOiBCbG9ja1tdID0gW3N0YXJ0QmxvY2tdO1xuICAgICAgICBjb25zdCByZXN1bHQ6IEJsb2NrW10gPSBbXTtcblxuICAgICAgICB3aGlsZSAoc3RhY2subGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3QgYmxvY2sgPSBzdGFjay5wb3AoKTtcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IHRoaXMuY2VsbEtleShibG9jay5ncmlkWCwgYmxvY2suZ3JpZFkpO1xuXG4gICAgICAgICAgICBpZiAodmlzaXRlZC5oYXMoa2V5KSkgY29udGludWU7XG4gICAgICAgICAgICB2aXNpdGVkLmFkZChrZXkpO1xuXG4gICAgICAgICAgICBpZiAoYmxvY2suY29sb3JJZCAhPT0gc3RhcnRCbG9jay5jb2xvcklkKSBjb250aW51ZTtcblxuICAgICAgICAgICAgcmVzdWx0LnB1c2goYmxvY2spO1xuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IG5laWdoYm9yIG9mIHRoaXMuZ3JpZC5nZXROZWlnaGJvcnMoYmxvY2suZ3JpZFgsIGJsb2NrLmdyaWRZKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5LZXkgPSB0aGlzLmNlbGxLZXkobmVpZ2hib3IuZ3JpZFgsIG5laWdoYm9yLmdyaWRZKTtcbiAgICAgICAgICAgICAgICBpZiAoIXZpc2l0ZWQuaGFzKG5LZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YWNrLnB1c2gobmVpZ2hib3IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgaGFzVmFsaWRNb3ZlcygpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3QgdmlzaXRlZCA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuXG4gICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgdGhpcy5ncmlkLmhlaWdodDsgeSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMuZ3JpZC53aWR0aDsgeCsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYmxvY2sgPSB0aGlzLmdyaWQuZ2V0QmxvY2tBdCh4LCB5KTtcbiAgICAgICAgICAgICAgICBpZiAoIWJsb2NrKSBjb250aW51ZTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGtleSA9IHRoaXMuY2VsbEtleSh4LCB5KTtcbiAgICAgICAgICAgICAgICBpZiAodmlzaXRlZC5oYXMoa2V5KSkgY29udGludWU7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tZWFzdXJlR3JvdXAoYmxvY2ssIHZpc2l0ZWQpID49IEdhbWVSdWxlcy5NSU5fR1JPVVBfU0laRSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBtZWFzdXJlR3JvdXAoc3RhcnRCbG9jazogQmxvY2ssIHZpc2l0ZWQ6IFNldDxzdHJpbmc+KTogbnVtYmVyIHtcbiAgICAgICAgY29uc3Qgc3RhY2s6IEJsb2NrW10gPSBbc3RhcnRCbG9ja107XG4gICAgICAgIGxldCBzaXplID0gMDtcblxuICAgICAgICB3aGlsZSAoc3RhY2subGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3QgYmxvY2sgPSBzdGFjay5wb3AoKTtcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IHRoaXMuY2VsbEtleShibG9jay5ncmlkWCwgYmxvY2suZ3JpZFkpO1xuXG4gICAgICAgICAgICBpZiAodmlzaXRlZC5oYXMoa2V5KSkgY29udGludWU7XG4gICAgICAgICAgICB2aXNpdGVkLmFkZChrZXkpO1xuXG4gICAgICAgICAgICBpZiAoYmxvY2suY29sb3JJZCAhPT0gc3RhcnRCbG9jay5jb2xvcklkKSBjb250aW51ZTtcblxuICAgICAgICAgICAgc2l6ZSsrO1xuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IG5laWdoYm9yIG9mIHRoaXMuZ3JpZC5nZXROZWlnaGJvcnMoYmxvY2suZ3JpZFgsIGJsb2NrLmdyaWRZKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5LZXkgPSB0aGlzLmNlbGxLZXkobmVpZ2hib3IuZ3JpZFgsIG5laWdoYm9yLmdyaWRZKTtcbiAgICAgICAgICAgICAgICBpZiAoIXZpc2l0ZWQuaGFzKG5LZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YWNrLnB1c2gobmVpZ2hib3IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzaXplO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2VsbEtleSh4OiBudW1iZXIsIHk6IG51bWJlcik6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB4ICsgXCJfXCIgKyB5O1xuICAgIH1cbn1cbiJdfQ==