
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/GameStartSystem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b80c9CDanVCxo+izmiRWFGz', 'GameStartSystem');
// Script/GameStartSystem.ts

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
var GameRules_1 = require("./GameRules");
var GameSession_1 = require("./GameSession");
var MatchFinder_1 = require("./MatchFinder");
var GridGenerator_1 = require("./GridGenerator");
var BoosterType_1 = require("./BoosterType");
var BoosterService_1 = require("./BoosterService");
var PlayabilityService_1 = require("./PlayabilityService");
var GameStartSystem = /** @class */ (function (_super) {
    __extends(GameStartSystem, _super);
    function GameStartSystem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.label2 = null;
        _this.targetScore = 200;
        _this.gridNode = null;
        _this.gridGenerator = null;
        _this.losePanel = null;
        _this.winPanel = null;
        _this.buttonYesLose = null;
        _this.buttonNoLose = null;
        _this.buttonYesWin = null;
        _this.buttonNoWin = null;
        _this.QuantityBooster = null;
        _this.QuantityBooster2 = null;
        _this.Booster = null;
        _this.Booster2 = null;
        _this.iconBoosterBomb = null;
        _this.iconBoosterTeleport = null;
        _this.bombRadius = 1;
        _this.session = new GameSession_1.default();
        _this.matchFinder = null;
        _this.boosterService = null;
        _this.playabilityService = null;
        return _this;
    }
    GameStartSystem.prototype.start = function () {
        var _this = this;
        this.initServices();
        this.session.reset(this.targetScore);
        this.boosterService.initCounts();
        this.resolveBoosterRefs();
        this.applyBoosterIcons();
        this.setupBoosterButtons();
        this.updateUI();
        this.updateBoosterUI();
        if (this.losePanel)
            this.losePanel.active = false;
        if (this.winPanel)
            this.winPanel.active = false;
        this.bindPanelButtons();
        this.scheduleOnce(function () { return _this.runPlayabilityCheck(); }, 0);
    };
    GameStartSystem.prototype.initServices = function () {
        if (this.gridGenerator) {
            this.matchFinder = new MatchFinder_1.default(this.gridGenerator);
            this.playabilityService = new PlayabilityService_1.default(this.gridGenerator, this.matchFinder);
        }
        this.boosterService = new BoosterService_1.default(this.bombRadius);
    };
    GameStartSystem.prototype.bindPanelButtons = function () {
        if (this.buttonYesLose)
            this.buttonYesLose.node.on('click', this.restartGame, this);
        if (this.buttonNoLose)
            this.buttonNoLose.node.on('click', this.exitGame, this);
        if (this.buttonYesWin)
            this.buttonYesWin.node.on('click', this.restartGame, this);
        if (this.buttonNoWin)
            this.buttonNoWin.node.on('click', this.exitGame, this);
    };
    GameStartSystem.prototype.onBlockClicked = function (block) {
        var _this = this;
        if (!this.gridGenerator || !block || !cc.isValid(block.node) || this.isGameOver()) {
            return;
        }
        if (this.boosterService.activeType !== BoosterType_1.BoosterType.None) {
            this.handleBoosterBlockClick(block);
            return;
        }
        if (!this.session.canSpendStep()) {
            return;
        }
        var group = this.matchFinder.findGroup(block);
        if (group.length < GameRules_1.default.MIN_GROUP_SIZE) {
            return;
        }
        this.session.spendStep();
        this.session.addScore(GameRules_1.default.scoreForGroup(group.length));
        this.gridGenerator.removeBlocks(group);
        this.gridGenerator.resolveBoardAfterChange();
        this.session.resetShuffleAttempts();
        this.refreshHud();
        this.applyEndState();
        if (!this.isGameOver()) {
            this.scheduleOnce(function () { return _this.runPlayabilityCheck(); }, 0.3);
        }
    };
    GameStartSystem.prototype.handleBoosterBlockClick = function (block) {
        var _this = this;
        var result = this.boosterService.handleBlockClick(block, this.gridGenerator);
        switch (result.action) {
            case BoosterService_1.BoosterAction.WaitSecondTile:
                this.highlightTeleportBlock(block, true);
                this.updateBoosterUI();
                return;
            case BoosterService_1.BoosterAction.CancelSelection:
                this.clearTeleportHighlight();
                this.updateBoosterUI();
                return;
            case BoosterService_1.BoosterAction.BombUsed:
                if (result.targets && result.targets.length > 0) {
                    this.session.addScore(GameRules_1.default.scoreForBombTiles(result.targets.length));
                    this.gridGenerator.removeBlocks(result.targets);
                    this.gridGenerator.resolveBoardAfterChange();
                    this.refreshHud();
                    this.applyEndState();
                    if (!this.isGameOver()) {
                        this.scheduleOnce(function () { return _this.runPlayabilityCheck(); }, 0.3);
                    }
                }
                this.updateBoosterUI();
                return;
            case BoosterService_1.BoosterAction.TeleportUsed:
                this.clearTeleportHighlight();
                this.updateBoosterUI();
                this.scheduleOnce(function () { return _this.runPlayabilityCheck(); }, 0.1);
                return;
            default:
                this.updateBoosterUI();
        }
    };
    GameStartSystem.prototype.runPlayabilityCheck = function () {
        if (!this.playabilityService || this.isGameOver())
            return;
        var result = this.playabilityService.ensurePlayable(this.session);
        if (result === PlayabilityService_1.PlayabilityResult.NoMovesLeft) {
            this.boosterService.resetActivation();
            if (this.losePanel)
                this.losePanel.active = true;
            this.updateBoosterUI();
        }
    };
    GameStartSystem.prototype.applyEndState = function () {
        if (this.session.isWin()) {
            this.boosterService.resetActivation();
            if (this.winPanel)
                this.winPanel.active = true;
            return;
        }
        if (this.session.isLoseBySteps()) {
            this.boosterService.resetActivation();
            if (this.losePanel)
                this.losePanel.active = true;
        }
    };
    GameStartSystem.prototype.refreshHud = function () {
        this.updateUI();
        this.updateBoosterUI();
    };
    GameStartSystem.prototype.updateUI = function () {
        if (this.label) {
            this.label.string = "<color=#ffffff>" + this.session.steps + "</color>";
        }
        if (this.label2) {
            this.label2.string =
                "<color=#ffffff>" + this.session.score + "/" + this.session.targetScore + "</color>";
        }
    };
    GameStartSystem.prototype.updateBoosterUI = function () {
        if (this.QuantityBooster) {
            this.QuantityBooster.string =
                "<color=#ffffff>" + this.boosterService.bombCount + "</color>";
        }
        if (this.QuantityBooster2) {
            this.QuantityBooster2.string =
                "<color=#ffffff>" + this.boosterService.teleportCount + "</color>";
        }
        this.setBoosterVisual(this.Booster, BoosterType_1.BoosterType.Bomb, this.boosterService.bombCount);
        this.setBoosterVisual(this.Booster2, BoosterType_1.BoosterType.Teleport, this.boosterService.teleportCount);
    };
    GameStartSystem.prototype.setBoosterVisual = function (node, type, count) {
        if (!node)
            return;
        node.opacity = count > 0 ? 255 : 120;
        node.scale = this.boosterService.activeType === type ? 1.15 : 1;
    };
    GameStartSystem.prototype.onBombBoosterClicked = function () {
        if (this.isGameOver() || this.boosterService.bombCount <= 0)
            return;
        if (this.boosterService.toggle(BoosterType_1.BoosterType.Bomb)) {
            this.clearTeleportHighlight();
            this.updateBoosterUI();
        }
    };
    GameStartSystem.prototype.onTeleportBoosterClicked = function () {
        if (this.isGameOver() || this.boosterService.teleportCount <= 0)
            return;
        if (this.boosterService.toggle(BoosterType_1.BoosterType.Teleport)) {
            this.clearTeleportHighlight();
            this.updateBoosterUI();
        }
    };
    GameStartSystem.prototype.highlightTeleportBlock = function (block, on) {
        if (!block || !cc.isValid(block.node))
            return;
        block.node.scale = on ? 1.15 : 1;
    };
    GameStartSystem.prototype.clearTeleportHighlight = function () {
        var first = this.boosterService.getTeleportFirst();
        if (first)
            this.highlightTeleportBlock(first, false);
    };
    GameStartSystem.prototype.resolveBoosterRefs = function () {
        var canvas = cc.find("Canvas");
        if (!canvas)
            return;
        if (!this.QuantityBooster) {
            var node = this.findNodeByName(canvas, "QuantityBooster");
            if (node)
                this.QuantityBooster = node.getComponent(cc.RichText);
        }
        if (!this.QuantityBooster2) {
            var node = this.findNodeByName(canvas, "QuantityBooster2");
            if (node)
                this.QuantityBooster2 = node.getComponent(cc.RichText);
        }
        if (!this.Booster || !this.Booster2) {
            var boosterNodes = this.findAllNodesByName(canvas, "Booster");
            if (!this.Booster && boosterNodes.length > 0)
                this.Booster = boosterNodes[0];
            if (!this.Booster2 && boosterNodes.length > 1)
                this.Booster2 = boosterNodes[1];
        }
    };
    GameStartSystem.prototype.findNodeByName = function (root, name) {
        if (root.name === name)
            return root;
        for (var i = 0; i < root.childrenCount; i++) {
            var found = this.findNodeByName(root.children[i], name);
            if (found)
                return found;
        }
        return null;
    };
    GameStartSystem.prototype.findAllNodesByName = function (root, name) {
        var result = [];
        if (root.name === name)
            result.push(root);
        for (var i = 0; i < root.childrenCount; i++) {
            result.push.apply(result, this.findAllNodesByName(root.children[i], name));
        }
        return result;
    };
    GameStartSystem.prototype.applyBoosterIcons = function () {
        this.applyIconToBoosterNode(this.Booster, this.iconBoosterBomb);
        this.applyIconToBoosterNode(this.Booster2, this.iconBoosterTeleport);
    };
    GameStartSystem.prototype.applyIconToBoosterNode = function (node, frame) {
        if (!node || !frame)
            return;
        var sprite = node.getComponent(cc.Sprite);
        if (!sprite)
            return;
        sprite.spriteFrame = frame;
        sprite.sizeMode = cc.Sprite.SizeMode.TRIMMED;
    };
    GameStartSystem.prototype.setupBoosterButtons = function () {
        if (this.Booster)
            this.Booster.on('touchend', this.onBombBoosterClicked, this);
        if (this.Booster2)
            this.Booster2.on('touchend', this.onTeleportBoosterClicked, this);
    };
    GameStartSystem.prototype.isGameOver = function () {
        return (this.winPanel && this.winPanel.active) ||
            (this.losePanel && this.losePanel.active);
    };
    GameStartSystem.prototype.restartGame = function () {
        cc.director.loadScene(cc.director.getScene().name);
    };
    GameStartSystem.prototype.exitGame = function () {
        cc.game.end();
    };
    __decorate([
        property(cc.RichText)
    ], GameStartSystem.prototype, "label", void 0);
    __decorate([
        property(cc.RichText)
    ], GameStartSystem.prototype, "label2", void 0);
    __decorate([
        property
    ], GameStartSystem.prototype, "targetScore", void 0);
    __decorate([
        property(cc.Node)
    ], GameStartSystem.prototype, "gridNode", void 0);
    __decorate([
        property(GridGenerator_1.default)
    ], GameStartSystem.prototype, "gridGenerator", void 0);
    __decorate([
        property(cc.Node)
    ], GameStartSystem.prototype, "losePanel", void 0);
    __decorate([
        property(cc.Node)
    ], GameStartSystem.prototype, "winPanel", void 0);
    __decorate([
        property(cc.Button)
    ], GameStartSystem.prototype, "buttonYesLose", void 0);
    __decorate([
        property(cc.Button)
    ], GameStartSystem.prototype, "buttonNoLose", void 0);
    __decorate([
        property(cc.Button)
    ], GameStartSystem.prototype, "buttonYesWin", void 0);
    __decorate([
        property(cc.Button)
    ], GameStartSystem.prototype, "buttonNoWin", void 0);
    __decorate([
        property(cc.RichText)
    ], GameStartSystem.prototype, "QuantityBooster", void 0);
    __decorate([
        property(cc.RichText)
    ], GameStartSystem.prototype, "QuantityBooster2", void 0);
    __decorate([
        property(cc.Node)
    ], GameStartSystem.prototype, "Booster", void 0);
    __decorate([
        property(cc.Node)
    ], GameStartSystem.prototype, "Booster2", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], GameStartSystem.prototype, "iconBoosterBomb", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], GameStartSystem.prototype, "iconBoosterTeleport", void 0);
    __decorate([
        property({
            tooltip: "Радиус бомбы в клетках (1 = квадрат 3×3)"
        })
    ], GameStartSystem.prototype, "bombRadius", void 0);
    GameStartSystem = __decorate([
        ccclass
    ], GameStartSystem);
    return GameStartSystem;
}(cc.Component));
exports.default = GameStartSystem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lU3RhcnRTeXN0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQU0sSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUMseUNBQW9DO0FBQ3BDLDZDQUF3QztBQUN4Qyw2Q0FBd0M7QUFDeEMsaURBQTRDO0FBQzVDLDZDQUE0QztBQUU1QyxtREFBaUU7QUFDakUsMkRBQTZFO0FBRzdFO0lBQTZDLG1DQUFZO0lBQXpEO1FBQUEscUVBaVVDO1FBOVRHLFdBQUssR0FBZ0IsSUFBSSxDQUFDO1FBRzFCLFlBQU0sR0FBZ0IsSUFBSSxDQUFDO1FBRzNCLGlCQUFXLEdBQVcsR0FBRyxDQUFDO1FBRzFCLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFHekIsbUJBQWEsR0FBa0IsSUFBSSxDQUFDO1FBR3BDLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFHMUIsY0FBUSxHQUFZLElBQUksQ0FBQztRQUd6QixtQkFBYSxHQUFjLElBQUksQ0FBQztRQUdoQyxrQkFBWSxHQUFjLElBQUksQ0FBQztRQUcvQixrQkFBWSxHQUFjLElBQUksQ0FBQztRQUcvQixpQkFBVyxHQUFjLElBQUksQ0FBQztRQUc5QixxQkFBZSxHQUFnQixJQUFJLENBQUM7UUFHcEMsc0JBQWdCLEdBQWdCLElBQUksQ0FBQztRQUdyQyxhQUFPLEdBQVksSUFBSSxDQUFDO1FBR3hCLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFHekIscUJBQWUsR0FBbUIsSUFBSSxDQUFDO1FBR3ZDLHlCQUFtQixHQUFtQixJQUFJLENBQUM7UUFLM0MsZ0JBQVUsR0FBVyxDQUFDLENBQUM7UUFFTixhQUFPLEdBQUcsSUFBSSxxQkFBVyxFQUFFLENBQUM7UUFDckMsaUJBQVcsR0FBZ0IsSUFBSSxDQUFDO1FBQ2hDLG9CQUFjLEdBQW1CLElBQUksQ0FBQztRQUN0Qyx3QkFBa0IsR0FBdUIsSUFBSSxDQUFDOztJQW9RMUQsQ0FBQztJQWxRRywrQkFBSyxHQUFMO1FBQUEsaUJBZ0JDO1FBZkcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBRWpDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFFdkIsSUFBSSxJQUFJLENBQUMsU0FBUztZQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNsRCxJQUFJLElBQUksQ0FBQyxRQUFRO1lBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBRWhELElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxtQkFBbUIsRUFBRSxFQUExQixDQUEwQixFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFTyxzQ0FBWSxHQUFwQjtRQUNJLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUNwQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUkscUJBQVcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDdkQsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksNEJBQWtCLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDMUY7UUFDRCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksd0JBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVPLDBDQUFnQixHQUF4QjtRQUNJLElBQUksSUFBSSxDQUFDLGFBQWE7WUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDcEYsSUFBSSxJQUFJLENBQUMsWUFBWTtZQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMvRSxJQUFJLElBQUksQ0FBQyxZQUFZO1lBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2xGLElBQUksSUFBSSxDQUFDLFdBQVc7WUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDakYsQ0FBQztJQUVELHdDQUFjLEdBQWQsVUFBZSxLQUFZO1FBQTNCLGlCQStCQztRQTlCRyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRTtZQUMvRSxPQUFPO1NBQ1Y7UUFFRCxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxLQUFLLHlCQUFXLENBQUMsSUFBSSxFQUFFO1lBQ3JELElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNwQyxPQUFPO1NBQ1Y7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsRUFBRTtZQUM5QixPQUFPO1NBQ1Y7UUFFRCxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoRCxJQUFJLEtBQUssQ0FBQyxNQUFNLEdBQUcsbUJBQVMsQ0FBQyxjQUFjLEVBQUU7WUFDekMsT0FBTztTQUNWO1FBRUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxtQkFBUyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUM3RCxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsYUFBYSxDQUFDLHVCQUF1QixFQUFFLENBQUM7UUFFN0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFFckIsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRTtZQUNwQixJQUFJLENBQUMsWUFBWSxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsbUJBQW1CLEVBQUUsRUFBMUIsQ0FBMEIsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUM1RDtJQUNMLENBQUM7SUFFTyxpREFBdUIsR0FBL0IsVUFBZ0MsS0FBWTtRQUE1QyxpQkFxQ0M7UUFwQ0csSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRS9FLFFBQVEsTUFBTSxDQUFDLE1BQU0sRUFBRTtZQUNuQixLQUFLLDhCQUFhLENBQUMsY0FBYztnQkFDN0IsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDekMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO2dCQUN2QixPQUFPO1lBRVgsS0FBSyw4QkFBYSxDQUFDLGVBQWU7Z0JBQzlCLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO2dCQUM5QixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7Z0JBQ3ZCLE9BQU87WUFFWCxLQUFLLDhCQUFhLENBQUMsUUFBUTtnQkFDdkIsSUFBSSxNQUFNLENBQUMsT0FBTyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtvQkFDN0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsbUJBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7b0JBQzFFLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDaEQsSUFBSSxDQUFDLGFBQWEsQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO29CQUM3QyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7b0JBQ2xCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztvQkFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRTt3QkFDcEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLG1CQUFtQixFQUFFLEVBQTFCLENBQTBCLEVBQUUsR0FBRyxDQUFDLENBQUM7cUJBQzVEO2lCQUNKO2dCQUNELElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztnQkFDdkIsT0FBTztZQUVYLEtBQUssOEJBQWEsQ0FBQyxZQUFZO2dCQUMzQixJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztnQkFDOUIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO2dCQUN2QixJQUFJLENBQUMsWUFBWSxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsbUJBQW1CLEVBQUUsRUFBMUIsQ0FBMEIsRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDekQsT0FBTztZQUVYO2dCQUNJLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUM5QjtJQUNMLENBQUM7SUFFTyw2Q0FBbUIsR0FBM0I7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFBRSxPQUFPO1FBRTFELElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRXBFLElBQUksTUFBTSxLQUFLLHNDQUFpQixDQUFDLFdBQVcsRUFBRTtZQUMxQyxJQUFJLENBQUMsY0FBYyxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ3RDLElBQUksSUFBSSxDQUFDLFNBQVM7Z0JBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ2pELElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUMxQjtJQUNMLENBQUM7SUFFTyx1Q0FBYSxHQUFyQjtRQUNJLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUN0QixJQUFJLENBQUMsY0FBYyxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ3RDLElBQUksSUFBSSxDQUFDLFFBQVE7Z0JBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQy9DLE9BQU87U0FDVjtRQUVELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsRUFBRTtZQUM5QixJQUFJLENBQUMsY0FBYyxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ3RDLElBQUksSUFBSSxDQUFDLFNBQVM7Z0JBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1NBQ3BEO0lBQ0wsQ0FBQztJQUVPLG9DQUFVLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsa0NBQVEsR0FBUjtRQUNJLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNaLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLG9CQUFrQixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssYUFBVSxDQUFDO1NBQ3RFO1FBQ0QsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNO2dCQUNkLG9CQUFrQixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssU0FBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsYUFBVSxDQUFDO1NBQ2xGO0lBQ0wsQ0FBQztJQUVELHlDQUFlLEdBQWY7UUFDSSxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDdEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNO2dCQUN2QixvQkFBa0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLGFBQVUsQ0FBQztTQUNqRTtRQUNELElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBQ3ZCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNO2dCQUN4QixvQkFBa0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLGFBQVUsQ0FBQztTQUNyRTtRQUVELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLHlCQUFXLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDckYsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUseUJBQVcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNsRyxDQUFDO0lBRU8sMENBQWdCLEdBQXhCLFVBQXlCLElBQWEsRUFBRSxJQUFpQixFQUFFLEtBQWE7UUFDcEUsSUFBSSxDQUFDLElBQUk7WUFBRSxPQUFPO1FBQ2xCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDckMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFTyw4Q0FBb0IsR0FBNUI7UUFDSSxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsSUFBSSxDQUFDO1lBQUUsT0FBTztRQUNwRSxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLHlCQUFXLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDOUMsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7WUFDOUIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQzFCO0lBQ0wsQ0FBQztJQUVPLGtEQUF3QixHQUFoQztRQUNJLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxJQUFJLENBQUM7WUFBRSxPQUFPO1FBQ3hFLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMseUJBQVcsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNsRCxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztZQUM5QixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7U0FDMUI7SUFDTCxDQUFDO0lBRU8sZ0RBQXNCLEdBQTlCLFVBQStCLEtBQVksRUFBRSxFQUFXO1FBQ3BELElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7WUFBRSxPQUFPO1FBQzlDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVPLGdEQUFzQixHQUE5QjtRQUNJLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUNyRCxJQUFJLEtBQUs7WUFBRSxJQUFJLENBQUMsc0JBQXNCLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFTyw0Q0FBa0IsR0FBMUI7UUFDSSxJQUFNLE1BQU0sR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxNQUFNO1lBQUUsT0FBTztRQUVwQixJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUN2QixJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1lBQzVELElBQUksSUFBSTtnQkFBRSxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ25FO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUN4QixJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1lBQzdELElBQUksSUFBSTtnQkFBRSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDcEU7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakMsSUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQztZQUNoRSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUM7Z0JBQUUsSUFBSSxDQUFDLE9BQU8sR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0UsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDO2dCQUFFLElBQUksQ0FBQyxRQUFRLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2xGO0lBQ0wsQ0FBQztJQUVPLHdDQUFjLEdBQXRCLFVBQXVCLElBQWEsRUFBRSxJQUFZO1FBQzlDLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJO1lBQUUsT0FBTyxJQUFJLENBQUM7UUFDcEMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDekMsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzFELElBQUksS0FBSztnQkFBRSxPQUFPLEtBQUssQ0FBQztTQUMzQjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFTyw0Q0FBa0IsR0FBMUIsVUFBMkIsSUFBYSxFQUFFLElBQVk7UUFDbEQsSUFBTSxNQUFNLEdBQWMsRUFBRSxDQUFDO1FBQzdCLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJO1lBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN6QyxNQUFNLENBQUMsSUFBSSxPQUFYLE1BQU0sRUFBUyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRTtTQUNuRTtRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFFTywyQ0FBaUIsR0FBekI7UUFDSSxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDaEUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDekUsQ0FBQztJQUVPLGdEQUFzQixHQUE5QixVQUErQixJQUFhLEVBQUUsS0FBcUI7UUFDL0QsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUs7WUFBRSxPQUFPO1FBQzVCLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxNQUFNO1lBQUUsT0FBTztRQUNwQixNQUFNLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztRQUMzQixNQUFNLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztJQUNqRCxDQUFDO0lBRU8sNkNBQW1CLEdBQTNCO1FBQ0ksSUFBSSxJQUFJLENBQUMsT0FBTztZQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDL0UsSUFBSSxJQUFJLENBQUMsUUFBUTtZQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsd0JBQXdCLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDekYsQ0FBQztJQUVELG9DQUFVLEdBQVY7UUFDSSxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztZQUMxQyxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQscUNBQVcsR0FBWDtRQUNJLEVBQUUsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVELGtDQUFRLEdBQVI7UUFDSSxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUE3VEQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQztrREFDSTtJQUcxQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDO21EQUNLO0lBRzNCO1FBREMsUUFBUTt3REFDaUI7SUFHMUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztxREFDTztJQUd6QjtRQURDLFFBQVEsQ0FBQyx1QkFBYSxDQUFDOzBEQUNZO0lBR3BDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7c0RBQ1E7SUFHMUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztxREFDTztJQUd6QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOzBEQUNZO0lBR2hDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7eURBQ1c7SUFHL0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzt5REFDVztJQUcvQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO3dEQUNVO0lBRzlCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUM7NERBQ2M7SUFHcEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQzs2REFDZTtJQUdyQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO29EQUNNO0lBR3hCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7cURBQ087SUFHekI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQzs0REFDYztJQUd2QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDO2dFQUNrQjtJQUszQztRQUhDLFFBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRSwwQ0FBMEM7U0FDdEQsQ0FBQzt1REFDcUI7SUF4RE4sZUFBZTtRQURuQyxPQUFPO09BQ2EsZUFBZSxDQWlVbkM7SUFBRCxzQkFBQztDQWpVRCxBQWlVQyxDQWpVNEMsRUFBRSxDQUFDLFNBQVMsR0FpVXhEO2tCQWpVb0IsZUFBZSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5pbXBvcnQgQmxvY2sgZnJvbSBcIi4vQmxvY2tcIjtcbmltcG9ydCBHYW1lUnVsZXMgZnJvbSBcIi4vR2FtZVJ1bGVzXCI7XG5pbXBvcnQgR2FtZVNlc3Npb24gZnJvbSBcIi4vR2FtZVNlc3Npb25cIjtcbmltcG9ydCBNYXRjaEZpbmRlciBmcm9tIFwiLi9NYXRjaEZpbmRlclwiO1xuaW1wb3J0IEdyaWRHZW5lcmF0b3IgZnJvbSBcIi4vR3JpZEdlbmVyYXRvclwiO1xuaW1wb3J0IHsgQm9vc3RlclR5cGUgfSBmcm9tIFwiLi9Cb29zdGVyVHlwZVwiO1xuaW1wb3J0IElCbG9ja0NsaWNrSGFuZGxlciBmcm9tIFwiLi9JQmxvY2tDbGlja0hhbmRsZXJcIjtcbmltcG9ydCBCb29zdGVyU2VydmljZSwgeyBCb29zdGVyQWN0aW9uIH0gZnJvbSBcIi4vQm9vc3RlclNlcnZpY2VcIjtcbmltcG9ydCBQbGF5YWJpbGl0eVNlcnZpY2UsIHsgUGxheWFiaWxpdHlSZXN1bHQgfSBmcm9tIFwiLi9QbGF5YWJpbGl0eVNlcnZpY2VcIjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVTdGFydFN5c3RlbSBleHRlbmRzIGNjLkNvbXBvbmVudCBpbXBsZW1lbnRzIElCbG9ja0NsaWNrSGFuZGxlciB7XG5cbiAgICBAcHJvcGVydHkoY2MuUmljaFRleHQpXG4gICAgbGFiZWw6IGNjLlJpY2hUZXh0ID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5SaWNoVGV4dClcbiAgICBsYWJlbDI6IGNjLlJpY2hUZXh0ID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eVxuICAgIHRhcmdldFNjb3JlOiBudW1iZXIgPSAyMDA7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBncmlkTm9kZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoR3JpZEdlbmVyYXRvcilcbiAgICBncmlkR2VuZXJhdG9yOiBHcmlkR2VuZXJhdG9yID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGxvc2VQYW5lbDogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICB3aW5QYW5lbDogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuQnV0dG9uKVxuICAgIGJ1dHRvblllc0xvc2U6IGNjLkJ1dHRvbiA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuQnV0dG9uKVxuICAgIGJ1dHRvbk5vTG9zZTogY2MuQnV0dG9uID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5CdXR0b24pXG4gICAgYnV0dG9uWWVzV2luOiBjYy5CdXR0b24gPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkJ1dHRvbilcbiAgICBidXR0b25Ob1dpbjogY2MuQnV0dG9uID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5SaWNoVGV4dClcbiAgICBRdWFudGl0eUJvb3N0ZXI6IGNjLlJpY2hUZXh0ID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5SaWNoVGV4dClcbiAgICBRdWFudGl0eUJvb3N0ZXIyOiBjYy5SaWNoVGV4dCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBCb29zdGVyOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIEJvb3N0ZXIyOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGVGcmFtZSlcbiAgICBpY29uQm9vc3RlckJvbWI6IGNjLlNwcml0ZUZyYW1lID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGVGcmFtZSlcbiAgICBpY29uQm9vc3RlclRlbGVwb3J0OiBjYy5TcHJpdGVGcmFtZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoe1xuICAgICAgICB0b29sdGlwOiBcItCg0LDQtNC40YPRgSDQsdC+0LzQsdGLINCyINC60LvQtdGC0LrQsNGFICgxID0g0LrQstCw0LTRgNCw0YIgM8OXMylcIlxuICAgIH0pXG4gICAgYm9tYlJhZGl1czogbnVtYmVyID0gMTtcblxuICAgIHByaXZhdGUgcmVhZG9ubHkgc2Vzc2lvbiA9IG5ldyBHYW1lU2Vzc2lvbigpO1xuICAgIHByaXZhdGUgbWF0Y2hGaW5kZXI6IE1hdGNoRmluZGVyID0gbnVsbDtcbiAgICBwcml2YXRlIGJvb3N0ZXJTZXJ2aWNlOiBCb29zdGVyU2VydmljZSA9IG51bGw7XG4gICAgcHJpdmF0ZSBwbGF5YWJpbGl0eVNlcnZpY2U6IFBsYXlhYmlsaXR5U2VydmljZSA9IG51bGw7XG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgdGhpcy5pbml0U2VydmljZXMoKTtcbiAgICAgICAgdGhpcy5zZXNzaW9uLnJlc2V0KHRoaXMudGFyZ2V0U2NvcmUpO1xuICAgICAgICB0aGlzLmJvb3N0ZXJTZXJ2aWNlLmluaXRDb3VudHMoKTtcblxuICAgICAgICB0aGlzLnJlc29sdmVCb29zdGVyUmVmcygpO1xuICAgICAgICB0aGlzLmFwcGx5Qm9vc3Rlckljb25zKCk7XG4gICAgICAgIHRoaXMuc2V0dXBCb29zdGVyQnV0dG9ucygpO1xuICAgICAgICB0aGlzLnVwZGF0ZVVJKCk7XG4gICAgICAgIHRoaXMudXBkYXRlQm9vc3RlclVJKCk7XG5cbiAgICAgICAgaWYgKHRoaXMubG9zZVBhbmVsKSB0aGlzLmxvc2VQYW5lbC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgaWYgKHRoaXMud2luUGFuZWwpIHRoaXMud2luUGFuZWwuYWN0aXZlID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5iaW5kUGFuZWxCdXR0b25zKCk7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHRoaXMucnVuUGxheWFiaWxpdHlDaGVjaygpLCAwKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRTZXJ2aWNlcygpIHtcbiAgICAgICAgaWYgKHRoaXMuZ3JpZEdlbmVyYXRvcikge1xuICAgICAgICAgICAgdGhpcy5tYXRjaEZpbmRlciA9IG5ldyBNYXRjaEZpbmRlcih0aGlzLmdyaWRHZW5lcmF0b3IpO1xuICAgICAgICAgICAgdGhpcy5wbGF5YWJpbGl0eVNlcnZpY2UgPSBuZXcgUGxheWFiaWxpdHlTZXJ2aWNlKHRoaXMuZ3JpZEdlbmVyYXRvciwgdGhpcy5tYXRjaEZpbmRlcik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ib29zdGVyU2VydmljZSA9IG5ldyBCb29zdGVyU2VydmljZSh0aGlzLmJvbWJSYWRpdXMpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYmluZFBhbmVsQnV0dG9ucygpIHtcbiAgICAgICAgaWYgKHRoaXMuYnV0dG9uWWVzTG9zZSkgdGhpcy5idXR0b25ZZXNMb3NlLm5vZGUub24oJ2NsaWNrJywgdGhpcy5yZXN0YXJ0R2FtZSwgdGhpcyk7XG4gICAgICAgIGlmICh0aGlzLmJ1dHRvbk5vTG9zZSkgdGhpcy5idXR0b25Ob0xvc2Uubm9kZS5vbignY2xpY2snLCB0aGlzLmV4aXRHYW1lLCB0aGlzKTtcbiAgICAgICAgaWYgKHRoaXMuYnV0dG9uWWVzV2luKSB0aGlzLmJ1dHRvblllc1dpbi5ub2RlLm9uKCdjbGljaycsIHRoaXMucmVzdGFydEdhbWUsIHRoaXMpO1xuICAgICAgICBpZiAodGhpcy5idXR0b25Ob1dpbikgdGhpcy5idXR0b25Ob1dpbi5ub2RlLm9uKCdjbGljaycsIHRoaXMuZXhpdEdhbWUsIHRoaXMpO1xuICAgIH1cblxuICAgIG9uQmxvY2tDbGlja2VkKGJsb2NrOiBCbG9jaykge1xuICAgICAgICBpZiAoIXRoaXMuZ3JpZEdlbmVyYXRvciB8fCAhYmxvY2sgfHwgIWNjLmlzVmFsaWQoYmxvY2subm9kZSkgfHwgdGhpcy5pc0dhbWVPdmVyKCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmJvb3N0ZXJTZXJ2aWNlLmFjdGl2ZVR5cGUgIT09IEJvb3N0ZXJUeXBlLk5vbmUpIHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlQm9vc3RlckJsb2NrQ2xpY2soYmxvY2spO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLnNlc3Npb24uY2FuU3BlbmRTdGVwKCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGdyb3VwID0gdGhpcy5tYXRjaEZpbmRlci5maW5kR3JvdXAoYmxvY2spO1xuICAgICAgICBpZiAoZ3JvdXAubGVuZ3RoIDwgR2FtZVJ1bGVzLk1JTl9HUk9VUF9TSVpFKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNlc3Npb24uc3BlbmRTdGVwKCk7XG4gICAgICAgIHRoaXMuc2Vzc2lvbi5hZGRTY29yZShHYW1lUnVsZXMuc2NvcmVGb3JHcm91cChncm91cC5sZW5ndGgpKTtcbiAgICAgICAgdGhpcy5ncmlkR2VuZXJhdG9yLnJlbW92ZUJsb2Nrcyhncm91cCk7XG4gICAgICAgIHRoaXMuZ3JpZEdlbmVyYXRvci5yZXNvbHZlQm9hcmRBZnRlckNoYW5nZSgpO1xuXG4gICAgICAgIHRoaXMuc2Vzc2lvbi5yZXNldFNodWZmbGVBdHRlbXB0cygpO1xuICAgICAgICB0aGlzLnJlZnJlc2hIdWQoKTtcbiAgICAgICAgdGhpcy5hcHBseUVuZFN0YXRlKCk7XG5cbiAgICAgICAgaWYgKCF0aGlzLmlzR2FtZU92ZXIoKSkge1xuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4gdGhpcy5ydW5QbGF5YWJpbGl0eUNoZWNrKCksIDAuMyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGhhbmRsZUJvb3N0ZXJCbG9ja0NsaWNrKGJsb2NrOiBCbG9jaykge1xuICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLmJvb3N0ZXJTZXJ2aWNlLmhhbmRsZUJsb2NrQ2xpY2soYmxvY2ssIHRoaXMuZ3JpZEdlbmVyYXRvcik7XG5cbiAgICAgICAgc3dpdGNoIChyZXN1bHQuYWN0aW9uKSB7XG4gICAgICAgICAgICBjYXNlIEJvb3N0ZXJBY3Rpb24uV2FpdFNlY29uZFRpbGU6XG4gICAgICAgICAgICAgICAgdGhpcy5oaWdobGlnaHRUZWxlcG9ydEJsb2NrKGJsb2NrLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUJvb3N0ZXJVSSgpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgY2FzZSBCb29zdGVyQWN0aW9uLkNhbmNlbFNlbGVjdGlvbjpcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyVGVsZXBvcnRIaWdobGlnaHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUJvb3N0ZXJVSSgpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgY2FzZSBCb29zdGVyQWN0aW9uLkJvbWJVc2VkOlxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQudGFyZ2V0cyAmJiByZXN1bHQudGFyZ2V0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2Vzc2lvbi5hZGRTY29yZShHYW1lUnVsZXMuc2NvcmVGb3JCb21iVGlsZXMocmVzdWx0LnRhcmdldHMubGVuZ3RoKSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JpZEdlbmVyYXRvci5yZW1vdmVCbG9ja3MocmVzdWx0LnRhcmdldHMpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdyaWRHZW5lcmF0b3IucmVzb2x2ZUJvYXJkQWZ0ZXJDaGFuZ2UoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoSHVkKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwbHlFbmRTdGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNHYW1lT3ZlcigpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB0aGlzLnJ1blBsYXlhYmlsaXR5Q2hlY2soKSwgMC4zKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUJvb3N0ZXJVSSgpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgY2FzZSBCb29zdGVyQWN0aW9uLlRlbGVwb3J0VXNlZDpcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyVGVsZXBvcnRIaWdobGlnaHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUJvb3N0ZXJVSSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHRoaXMucnVuUGxheWFiaWxpdHlDaGVjaygpLCAwLjEpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUJvb3N0ZXJVSSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBydW5QbGF5YWJpbGl0eUNoZWNrKCkge1xuICAgICAgICBpZiAoIXRoaXMucGxheWFiaWxpdHlTZXJ2aWNlIHx8IHRoaXMuaXNHYW1lT3ZlcigpKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5wbGF5YWJpbGl0eVNlcnZpY2UuZW5zdXJlUGxheWFibGUodGhpcy5zZXNzaW9uKTtcblxuICAgICAgICBpZiAocmVzdWx0ID09PSBQbGF5YWJpbGl0eVJlc3VsdC5Ob01vdmVzTGVmdCkge1xuICAgICAgICAgICAgdGhpcy5ib29zdGVyU2VydmljZS5yZXNldEFjdGl2YXRpb24oKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmxvc2VQYW5lbCkgdGhpcy5sb3NlUGFuZWwuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQm9vc3RlclVJKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGFwcGx5RW5kU3RhdGUoKSB7XG4gICAgICAgIGlmICh0aGlzLnNlc3Npb24uaXNXaW4oKSkge1xuICAgICAgICAgICAgdGhpcy5ib29zdGVyU2VydmljZS5yZXNldEFjdGl2YXRpb24oKTtcbiAgICAgICAgICAgIGlmICh0aGlzLndpblBhbmVsKSB0aGlzLndpblBhbmVsLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5zZXNzaW9uLmlzTG9zZUJ5U3RlcHMoKSkge1xuICAgICAgICAgICAgdGhpcy5ib29zdGVyU2VydmljZS5yZXNldEFjdGl2YXRpb24oKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmxvc2VQYW5lbCkgdGhpcy5sb3NlUGFuZWwuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgcmVmcmVzaEh1ZCgpIHtcbiAgICAgICAgdGhpcy51cGRhdGVVSSgpO1xuICAgICAgICB0aGlzLnVwZGF0ZUJvb3N0ZXJVSSgpO1xuICAgIH1cblxuICAgIHVwZGF0ZVVJKCkge1xuICAgICAgICBpZiAodGhpcy5sYWJlbCkge1xuICAgICAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSBgPGNvbG9yPSNmZmZmZmY+JHt0aGlzLnNlc3Npb24uc3RlcHN9PC9jb2xvcj5gO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmxhYmVsMikge1xuICAgICAgICAgICAgdGhpcy5sYWJlbDIuc3RyaW5nID1cbiAgICAgICAgICAgICAgICBgPGNvbG9yPSNmZmZmZmY+JHt0aGlzLnNlc3Npb24uc2NvcmV9LyR7dGhpcy5zZXNzaW9uLnRhcmdldFNjb3JlfTwvY29sb3I+YDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZUJvb3N0ZXJVSSgpIHtcbiAgICAgICAgaWYgKHRoaXMuUXVhbnRpdHlCb29zdGVyKSB7XG4gICAgICAgICAgICB0aGlzLlF1YW50aXR5Qm9vc3Rlci5zdHJpbmcgPVxuICAgICAgICAgICAgICAgIGA8Y29sb3I9I2ZmZmZmZj4ke3RoaXMuYm9vc3RlclNlcnZpY2UuYm9tYkNvdW50fTwvY29sb3I+YDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5RdWFudGl0eUJvb3N0ZXIyKSB7XG4gICAgICAgICAgICB0aGlzLlF1YW50aXR5Qm9vc3RlcjIuc3RyaW5nID1cbiAgICAgICAgICAgICAgICBgPGNvbG9yPSNmZmZmZmY+JHt0aGlzLmJvb3N0ZXJTZXJ2aWNlLnRlbGVwb3J0Q291bnR9PC9jb2xvcj5gO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRCb29zdGVyVmlzdWFsKHRoaXMuQm9vc3RlciwgQm9vc3RlclR5cGUuQm9tYiwgdGhpcy5ib29zdGVyU2VydmljZS5ib21iQ291bnQpO1xuICAgICAgICB0aGlzLnNldEJvb3N0ZXJWaXN1YWwodGhpcy5Cb29zdGVyMiwgQm9vc3RlclR5cGUuVGVsZXBvcnQsIHRoaXMuYm9vc3RlclNlcnZpY2UudGVsZXBvcnRDb3VudCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRCb29zdGVyVmlzdWFsKG5vZGU6IGNjLk5vZGUsIHR5cGU6IEJvb3N0ZXJUeXBlLCBjb3VudDogbnVtYmVyKSB7XG4gICAgICAgIGlmICghbm9kZSkgcmV0dXJuO1xuICAgICAgICBub2RlLm9wYWNpdHkgPSBjb3VudCA+IDAgPyAyNTUgOiAxMjA7XG4gICAgICAgIG5vZGUuc2NhbGUgPSB0aGlzLmJvb3N0ZXJTZXJ2aWNlLmFjdGl2ZVR5cGUgPT09IHR5cGUgPyAxLjE1IDogMTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQm9tYkJvb3N0ZXJDbGlja2VkKCkge1xuICAgICAgICBpZiAodGhpcy5pc0dhbWVPdmVyKCkgfHwgdGhpcy5ib29zdGVyU2VydmljZS5ib21iQ291bnQgPD0gMCkgcmV0dXJuO1xuICAgICAgICBpZiAodGhpcy5ib29zdGVyU2VydmljZS50b2dnbGUoQm9vc3RlclR5cGUuQm9tYikpIHtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJUZWxlcG9ydEhpZ2hsaWdodCgpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVCb29zdGVyVUkoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgb25UZWxlcG9ydEJvb3N0ZXJDbGlja2VkKCkge1xuICAgICAgICBpZiAodGhpcy5pc0dhbWVPdmVyKCkgfHwgdGhpcy5ib29zdGVyU2VydmljZS50ZWxlcG9ydENvdW50IDw9IDApIHJldHVybjtcbiAgICAgICAgaWYgKHRoaXMuYm9vc3RlclNlcnZpY2UudG9nZ2xlKEJvb3N0ZXJUeXBlLlRlbGVwb3J0KSkge1xuICAgICAgICAgICAgdGhpcy5jbGVhclRlbGVwb3J0SGlnaGxpZ2h0KCk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUJvb3N0ZXJVSSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoaWdobGlnaHRUZWxlcG9ydEJsb2NrKGJsb2NrOiBCbG9jaywgb246IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKCFibG9jayB8fCAhY2MuaXNWYWxpZChibG9jay5ub2RlKSkgcmV0dXJuO1xuICAgICAgICBibG9jay5ub2RlLnNjYWxlID0gb24gPyAxLjE1IDogMTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNsZWFyVGVsZXBvcnRIaWdobGlnaHQoKSB7XG4gICAgICAgIGNvbnN0IGZpcnN0ID0gdGhpcy5ib29zdGVyU2VydmljZS5nZXRUZWxlcG9ydEZpcnN0KCk7XG4gICAgICAgIGlmIChmaXJzdCkgdGhpcy5oaWdobGlnaHRUZWxlcG9ydEJsb2NrKGZpcnN0LCBmYWxzZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZXNvbHZlQm9vc3RlclJlZnMoKSB7XG4gICAgICAgIGNvbnN0IGNhbnZhcyA9IGNjLmZpbmQoXCJDYW52YXNcIik7XG4gICAgICAgIGlmICghY2FudmFzKSByZXR1cm47XG5cbiAgICAgICAgaWYgKCF0aGlzLlF1YW50aXR5Qm9vc3Rlcikge1xuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IHRoaXMuZmluZE5vZGVCeU5hbWUoY2FudmFzLCBcIlF1YW50aXR5Qm9vc3RlclwiKTtcbiAgICAgICAgICAgIGlmIChub2RlKSB0aGlzLlF1YW50aXR5Qm9vc3RlciA9IG5vZGUuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuUXVhbnRpdHlCb29zdGVyMikge1xuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IHRoaXMuZmluZE5vZGVCeU5hbWUoY2FudmFzLCBcIlF1YW50aXR5Qm9vc3RlcjJcIik7XG4gICAgICAgICAgICBpZiAobm9kZSkgdGhpcy5RdWFudGl0eUJvb3N0ZXIyID0gbm9kZS5nZXRDb21wb25lbnQoY2MuUmljaFRleHQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5Cb29zdGVyIHx8ICF0aGlzLkJvb3N0ZXIyKSB7XG4gICAgICAgICAgICBjb25zdCBib29zdGVyTm9kZXMgPSB0aGlzLmZpbmRBbGxOb2Rlc0J5TmFtZShjYW52YXMsIFwiQm9vc3RlclwiKTtcbiAgICAgICAgICAgIGlmICghdGhpcy5Cb29zdGVyICYmIGJvb3N0ZXJOb2Rlcy5sZW5ndGggPiAwKSB0aGlzLkJvb3N0ZXIgPSBib29zdGVyTm9kZXNbMF07XG4gICAgICAgICAgICBpZiAoIXRoaXMuQm9vc3RlcjIgJiYgYm9vc3Rlck5vZGVzLmxlbmd0aCA+IDEpIHRoaXMuQm9vc3RlcjIgPSBib29zdGVyTm9kZXNbMV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGZpbmROb2RlQnlOYW1lKHJvb3Q6IGNjLk5vZGUsIG5hbWU6IHN0cmluZyk6IGNjLk5vZGUgfCBudWxsIHtcbiAgICAgICAgaWYgKHJvb3QubmFtZSA9PT0gbmFtZSkgcmV0dXJuIHJvb3Q7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcm9vdC5jaGlsZHJlbkNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGZvdW5kID0gdGhpcy5maW5kTm9kZUJ5TmFtZShyb290LmNoaWxkcmVuW2ldLCBuYW1lKTtcbiAgICAgICAgICAgIGlmIChmb3VuZCkgcmV0dXJuIGZvdW5kO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHByaXZhdGUgZmluZEFsbE5vZGVzQnlOYW1lKHJvb3Q6IGNjLk5vZGUsIG5hbWU6IHN0cmluZyk6IGNjLk5vZGVbXSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdDogY2MuTm9kZVtdID0gW107XG4gICAgICAgIGlmIChyb290Lm5hbWUgPT09IG5hbWUpIHJlc3VsdC5wdXNoKHJvb3QpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJvb3QuY2hpbGRyZW5Db3VudDsgaSsrKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaCguLi50aGlzLmZpbmRBbGxOb2Rlc0J5TmFtZShyb290LmNoaWxkcmVuW2ldLCBuYW1lKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFwcGx5Qm9vc3Rlckljb25zKCkge1xuICAgICAgICB0aGlzLmFwcGx5SWNvblRvQm9vc3Rlck5vZGUodGhpcy5Cb29zdGVyLCB0aGlzLmljb25Cb29zdGVyQm9tYik7XG4gICAgICAgIHRoaXMuYXBwbHlJY29uVG9Cb29zdGVyTm9kZSh0aGlzLkJvb3N0ZXIyLCB0aGlzLmljb25Cb29zdGVyVGVsZXBvcnQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXBwbHlJY29uVG9Cb29zdGVyTm9kZShub2RlOiBjYy5Ob2RlLCBmcmFtZTogY2MuU3ByaXRlRnJhbWUpIHtcbiAgICAgICAgaWYgKCFub2RlIHx8ICFmcmFtZSkgcmV0dXJuO1xuICAgICAgICBjb25zdCBzcHJpdGUgPSBub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xuICAgICAgICBpZiAoIXNwcml0ZSkgcmV0dXJuO1xuICAgICAgICBzcHJpdGUuc3ByaXRlRnJhbWUgPSBmcmFtZTtcbiAgICAgICAgc3ByaXRlLnNpemVNb2RlID0gY2MuU3ByaXRlLlNpemVNb2RlLlRSSU1NRUQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXR1cEJvb3N0ZXJCdXR0b25zKCkge1xuICAgICAgICBpZiAodGhpcy5Cb29zdGVyKSB0aGlzLkJvb3N0ZXIub24oJ3RvdWNoZW5kJywgdGhpcy5vbkJvbWJCb29zdGVyQ2xpY2tlZCwgdGhpcyk7XG4gICAgICAgIGlmICh0aGlzLkJvb3N0ZXIyKSB0aGlzLkJvb3N0ZXIyLm9uKCd0b3VjaGVuZCcsIHRoaXMub25UZWxlcG9ydEJvb3N0ZXJDbGlja2VkLCB0aGlzKTtcbiAgICB9XG5cbiAgICBpc0dhbWVPdmVyKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gKHRoaXMud2luUGFuZWwgJiYgdGhpcy53aW5QYW5lbC5hY3RpdmUpIHx8XG4gICAgICAgICAgICAodGhpcy5sb3NlUGFuZWwgJiYgdGhpcy5sb3NlUGFuZWwuYWN0aXZlKTtcbiAgICB9XG5cbiAgICByZXN0YXJ0R2FtZSgpIHtcbiAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKGNjLmRpcmVjdG9yLmdldFNjZW5lKCkubmFtZSk7XG4gICAgfVxuXG4gICAgZXhpdEdhbWUoKSB7XG4gICAgICAgIGNjLmdhbWUuZW5kKCk7XG4gICAgfVxufVxuIl19