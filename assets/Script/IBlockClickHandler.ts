import Block from "./Block";

export default interface IBlockClickHandler {
    onBlockClicked(block: Block): void;
}
