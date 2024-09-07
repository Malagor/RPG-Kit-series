import { GameObject } from "./GameObject.ts";
import { events } from "./Events.ts";
import { EventNames } from "./EventNames.ts";
import { Vector2 } from "./Vector2.ts";
import { FRAME_SIZE } from "./constants.ts";

export class Camera extends GameObject {
  constructor(ctx: CanvasRenderingContext2D) {
    super(ctx);

    events.on(EventNames.HERO_POSITION, this, (heroPosition: Vector2): void => {
      // Create a new position based on the hero position
      const personHalf = FRAME_SIZE / 2;
      const canvasWidth = 320;
      const canvasHeight = 180;
      const halfWidth = -personHalf + canvasWidth / 2;
      const halfHeight = -personHalf + canvasHeight / 2;

      this.position = new Vector2(
        -heroPosition.x + halfWidth,
        -heroPosition.y + halfHeight,
      );
    });
  }
}
