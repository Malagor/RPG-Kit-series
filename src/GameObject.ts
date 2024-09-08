import { Vector2 } from "./Vector2.ts";
import { Input } from "./Input.ts";
import { events } from "./Events.ts";

interface IGameObjectOptions {
  position?: Vector2;
}

export class GameObject {
  private hasReadyBeenCalled = false;

  position: Vector2;
  children: GameObject[] = [];
  parent: GameObject | null = null;
  input: Input | null = null;

  constructor(
    protected ctx: CanvasRenderingContext2D,
    { position }: IGameObjectOptions = {},
  ) {
    this.position = position ?? new Vector2(0, 0);
  }

  // Call before the first "step"
  ready(): void {
    // ..
  }

  stepEntry(delta: number, root: GameObject): void {
    this.children.forEach((child: GameObject) => child.stepEntry(delta, root));

    // Call ready on the first frame
    if (!this.hasReadyBeenCalled) {
      this.hasReadyBeenCalled = true;
      this.ready();
    }

    // Call once every frame
    this.step(delta, root);
  }

  step(delta: number, root: GameObject): void {
    // ...
  }

  draw(x: number, y: number): void {
    const drawPosX = x + this.position.x;
    const drawPosY = y + this.position.y;

    this.drawImage(drawPosX, drawPosY);

    this.children.forEach((child) => child.draw(drawPosX, drawPosY));
  }

  drawImage(drawPosX: number, drawPosY: number): void {
    // ...
  }

  destroy(): void {
    this.children.forEach((child: GameObject) => child.destroy());
    this.parent?.removeChild(this);
  }

  // Other Game Object are nestable inside this one
  addChild(...gameObjects: GameObject[]): void {
    gameObjects.forEach((gObject: GameObject): void => {
      gObject.parent = this;
      this.children.push(gObject);
    });
  }

  removeChild(gameObject: GameObject): void {
    events.unsubscribe(gameObject);
    this.children = this.children.filter((child) => child !== gameObject);
  }
}
