import Block from "./Block";

export default interface IGridAccess {
    readonly width: number;
    readonly height: number;
    getNeighbors(x: number, y: number): Block[];
    getBlockAt(x: number, y: number): Block | null;
    forEachBlock(callback: (block: Block, x: number, y: number) => void): void;
}
