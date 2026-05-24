"use strict";
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