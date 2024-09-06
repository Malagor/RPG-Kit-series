import { FRAME_SIZE } from "../constants.ts";

export function gridCell(n: number): number {
  return n * FRAME_SIZE;
}

export function isSpaceFree(
  blocks: Set<string>,
  x: number,
  y: number,
): boolean {
  const str = `${x},${y}`;
  const isBlocked = blocks.has(str);

  return !isBlocked;
}

/**
 * Draw the grid with cell numbers
 * Helps mark impassable blocks
 * @param {CanvasRenderingContext2D} ctx
 */
export function drawGreed(ctx: CanvasRenderingContext2D): void {
  ctx.beginPath(); // Start a new path
  ctx.lineWidth = 1;
  ctx.font = "9px serif";

  for (let h = 0; h < 320; h += FRAME_SIZE) {
    for (let v = 0; v < 180; v += FRAME_SIZE) {
      const x = h / FRAME_SIZE;
      const y = v / FRAME_SIZE;
      ctx.rect(h, v, FRAME_SIZE, FRAME_SIZE);
      ctx.fillText(`${x},${y}`, h, v + FRAME_SIZE / 2);
    }
  }
  ctx.stroke(); // Render the path
}
