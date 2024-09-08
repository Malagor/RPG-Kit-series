import { GameObject } from "../../GameObject.ts";
import { Vector2 } from "../../Vector2.ts";
import { Sprite } from "../../Sprite.ts";
import { resources } from "../../Resources.ts";
import { ResourcesType } from "../../constants.ts";
import { events } from "../../Events.ts";
import { EventNames } from "../../EventNames.ts";
import { IPickUpItemData } from "../../types.ts";

export class Rod extends GameObject {
  constructor(
    private ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
  ) {
    super(ctx, {
      position: new Vector2(x, y),
    });

    const sprite = new Sprite(this.ctx, {
      resource: resources.images[ResourcesType.ROD],
      position: new Vector2(0, -4),
    });

    this.addChild(sprite);
  }

  public ready(): void {
    events.on(EventNames.HERO_POSITION, this, (pos) => {
      if (!this.position.isEqual(pos)) return;

      this.onCollideWithHero();
    });
  }

  onCollideWithHero(): void {
    // Remove the instance from the scene
    this.destroy();
    // Alert other things that we picked up a rod
    const itemValue: IPickUpItemData = {
      image: resources.images[ResourcesType.ROD],
      position: this.position,
    };
    events.emit(EventNames.HERO_PICKS_UP_ITEM, itemValue);
  }
}
