import { Sprite } from "../../Sprite.ts";
import { resources } from "../../Resources.ts";
import { ResourcesType } from "../../constants.ts";
import { Vector2 } from "../../Vector2.ts";

export function createGround(ctx: CanvasRenderingContext2D): Sprite {
  return new Sprite(ctx, {
    resource: resources.images[ResourcesType.GROUND],
    frameSize: new Vector2(320, 180),
  });
}
