import { GameObject } from "../../GameObject.ts";
import { Vector2 } from "../../Vector2.ts";
import { Sprite } from "../../Sprite.ts";
import { resources } from "../../Resources.ts";
import { ResourcesType } from "../../constants.ts";

export class Sky extends GameObject {
  constructor(ctx: CanvasRenderingContext2D) {
    super(ctx);

    const skySprite = new Sprite(ctx, {
      resource: resources.images[ResourcesType.SKY],
      frameSize: new Vector2(320, 180),
    });

    this.addChild(skySprite);
  }
}
