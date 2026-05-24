
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Block.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ee246FvyftDUoUgbG8DVm+0', 'Block');
// Script/Block.ts

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
var Block = /** @class */ (function (_super) {
    __extends(Block, _super);
    function Block() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sprite = null;
        _this.gridX = 0;
        _this.gridY = 0;
        _this.colorId = 0;
        _this.clickHandler = null;
        return _this;
    }
    Block.prototype.onLoad = function () {
        if (!this.clickHandler) {
            var playFrame = cc.find("Canvas/bg_frame_play");
            if (playFrame) {
                this.clickHandler = playFrame.getComponent("GameStartSystem");
            }
        }
        if (!this.clickHandler) {
            cc.warn("Block: не найден обработчик клика на Canvas/bg_frame_play");
        }
        this.node.on('touchend', this.onClick, this);
    };
    Block.prototype.onClick = function () {
        if (!this.clickHandler || !cc.isValid(this.node)) {
            return;
        }
        this.clickHandler.onBlockClicked(this);
    };
    __decorate([
        property(cc.Sprite)
    ], Block.prototype, "sprite", void 0);
    Block = __decorate([
        ccclass
    ], Block);
    return Block;
}(cc.Component));
exports.default = Block;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxCbG9jay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBTSxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUs1QztJQUFtQyx5QkFBWTtJQUEvQztRQUFBLHFFQWdDQztRQTdCRyxZQUFNLEdBQWMsSUFBSSxDQUFDO1FBRXpCLFdBQUssR0FBVyxDQUFDLENBQUM7UUFDbEIsV0FBSyxHQUFXLENBQUMsQ0FBQztRQUVsQixhQUFPLEdBQVcsQ0FBQyxDQUFDO1FBRXBCLGtCQUFZLEdBQXVCLElBQUksQ0FBQzs7SUFzQjVDLENBQUM7SUFwQkcsc0JBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3BCLElBQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQztZQUNsRCxJQUFJLFNBQVMsRUFBRTtnQkFDWCxJQUFJLENBQUMsWUFBWSxHQUFHLFNBQVMsQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQXVCLENBQUM7YUFDdkY7U0FDSjtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3BCLEVBQUUsQ0FBQyxJQUFJLENBQUMsMkRBQTJELENBQUMsQ0FBQztTQUN4RTtRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRCx1QkFBTyxHQUFQO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUM5QyxPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBNUJEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7eUNBQ0s7SUFIUixLQUFLO1FBRHpCLE9BQU87T0FDYSxLQUFLLENBZ0N6QjtJQUFELFlBQUM7Q0FoQ0QsQUFnQ0MsQ0FoQ2tDLEVBQUUsQ0FBQyxTQUFTLEdBZ0M5QztrQkFoQ29CLEtBQUsiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5pbXBvcnQgSUJsb2NrQ2xpY2tIYW5kbGVyIGZyb20gXCIuL0lCbG9ja0NsaWNrSGFuZGxlclwiO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmxvY2sgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcbiAgICBzcHJpdGU6IGNjLlNwcml0ZSA9IG51bGw7XG5cbiAgICBncmlkWDogbnVtYmVyID0gMDtcbiAgICBncmlkWTogbnVtYmVyID0gMDtcblxuICAgIGNvbG9ySWQ6IG51bWJlciA9IDA7XG5cbiAgICBjbGlja0hhbmRsZXI6IElCbG9ja0NsaWNrSGFuZGxlciA9IG51bGw7XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIGlmICghdGhpcy5jbGlja0hhbmRsZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IHBsYXlGcmFtZSA9IGNjLmZpbmQoXCJDYW52YXMvYmdfZnJhbWVfcGxheVwiKTtcbiAgICAgICAgICAgIGlmIChwbGF5RnJhbWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWNrSGFuZGxlciA9IHBsYXlGcmFtZS5nZXRDb21wb25lbnQoXCJHYW1lU3RhcnRTeXN0ZW1cIikgYXMgSUJsb2NrQ2xpY2tIYW5kbGVyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5jbGlja0hhbmRsZXIpIHtcbiAgICAgICAgICAgIGNjLndhcm4oXCJCbG9jazog0L3QtSDQvdCw0LnQtNC10L0g0L7QsdGA0LDQsdC+0YLRh9C40Log0LrQu9C40LrQsCDQvdCwIENhbnZhcy9iZ19mcmFtZV9wbGF5XCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5ub2RlLm9uKCd0b3VjaGVuZCcsIHRoaXMub25DbGljaywgdGhpcyk7XG4gICAgfVxuXG4gICAgb25DbGljaygpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNsaWNrSGFuZGxlciB8fCAhY2MuaXNWYWxpZCh0aGlzLm5vZGUpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jbGlja0hhbmRsZXIub25CbG9ja0NsaWNrZWQodGhpcyk7XG4gICAgfVxufVxuIl19