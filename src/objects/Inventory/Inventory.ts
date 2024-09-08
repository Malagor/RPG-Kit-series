import { GameObject } from "../../GameObject.ts";
import { Sprite } from "../../Sprite.ts";
import { IResource, resources } from "../../Resources.ts";
import { ResourcesType } from "../../constants.ts";
import { Vector2 } from "../../Vector2.ts";
import { events } from "../../Events.ts";
import { EventNames } from "../../EventNames.ts";
import { IPickUpItemData } from "../../types.ts";
import { gridCell } from "../../helpers/grid.ts";
import { i } from "vite/dist/node/types.d-aGj9QkWt";

interface IInventoryItem {
  id: number;
  image: IResource;
}

export class Inventory extends GameObject {
  private items: IInventoryItem[] = [
    {
      id: -1,
      image: resources.images[ResourcesType.ROD],
    },
    {
      id: -2,
      image: resources.images[ResourcesType.ROD],
    },
  ];
  private nextId: number = 0;

  constructor(ctx: CanvasRenderingContext2D) {
    super(ctx, {
      position: new Vector2(0, 2),
    });

    // React to Hero picking up item
    events.on(EventNames.HERO_PICKS_UP_ITEM, this, (data: IPickUpItemData) => {
      this.addItem(data);
    });

    // Demo removing item from the inventory
    // setTimeout(() => {
    //   this.removeItem(-2);
    // }, 2000);

    this.renderInventory();
  }

  addItem({ image }: IPickUpItemData): number {
    this.nextId += 1;

    this.items.push({
      id: this.nextId,
      image,
    });

    this.renderInventory();

    return this.nextId;
  }

  removeItem(id: number): void {
    this.items = this.items.filter((item) => item.id !== id);
    this.renderInventory();
  }

  renderInventory(): void {
    this.children.forEach((child) => child.destroy());

    this.items.forEach((item: IInventoryItem, index: number) => {
      const sprite = new Sprite(this.ctx, {
        resource: item.image,
        position: new Vector2(gridCell(index), 0),
      });

      this.addChild(sprite);
    });
  }
}
