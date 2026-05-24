const { ccclass, property } = cc._decorator;

import IBlockClickHandler from "./IBlockClickHandler";

@ccclass
export default class Block extends cc.Component {

    @property(cc.Sprite)
    sprite: cc.Sprite = null;

    gridX: number = 0;
    gridY: number = 0;

    colorId: number = 0;

    clickHandler: IBlockClickHandler = null;

    onLoad() {
        if (!this.clickHandler) {
            const playFrame = cc.find("Canvas/bg_frame_play");
            if (playFrame) {
                this.clickHandler = playFrame.getComponent("GameStartSystem") as IBlockClickHandler;
            }
        }
        if (!this.clickHandler) {
            cc.warn("Block: не найден обработчик клика на Canvas/bg_frame_play");
        }

        this.node.on('touchend', this.onClick, this);
    }

    onClick() {
        if (!this.clickHandler || !cc.isValid(this.node)) {
            return;
        }
        this.clickHandler.onBlockClicked(this);
    }
}
