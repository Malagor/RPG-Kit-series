import { Vector2 } from "../Vector2.ts";
import { gridCell } from "../helpers/grid.ts";
import { FRAME_SIZE } from "../constants.ts";

export const blocks: Set<string> = new Set();

function getCoordStr(x: number, y: number): string {
  return `${x * FRAME_SIZE},${y * FRAME_SIZE}`;
}

// trees
blocks.add(getCoordStr(4, 3));
blocks.add(getCoordStr(14, 2));
blocks.add(getCoordStr(13, 4));

// rocks
blocks.add(getCoordStr(12, 6));
blocks.add(getCoordStr(13, 6));
blocks.add(getCoordStr(14, 6));

// squares
blocks.add(getCoordStr(4, 4));
blocks.add(getCoordStr(5, 4));
blocks.add(getCoordStr(4, 5));
blocks.add(getCoordStr(5, 5));

blocks.add(getCoordStr(8, 3));
blocks.add(getCoordStr(9, 3));

// water
blocks.add(getCoordStr(7, 5));
blocks.add(getCoordStr(8, 5));
blocks.add(getCoordStr(9, 5));
blocks.add(getCoordStr(10, 5));

// house
blocks.add(getCoordStr(14, 4));

// end of ground
blocks.add(getCoordStr(6, 2));
blocks.add(getCoordStr(15, 2));
// bottom
for (let i = 3; i <= 15; i++) {
  blocks.add(getCoordStr(i, 7));
}
// left
for (let i = 3; i <= 6; i++) {
  blocks.add(getCoordStr(2, i));
}
// right
for (let i = 3; i <= 6; i++) {
  blocks.add(getCoordStr(16, i));
}
// top
for (let i = 7; i <= 14; i++) {
  blocks.add(getCoordStr(i, 1));
}
// top-left
for (let i = 3; i <= 6; i++) {
  blocks.add(getCoordStr(i, 2));
}
