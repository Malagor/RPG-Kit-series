import { Vector2 } from "./Vector2.ts";
import { Input } from "./Input.ts";

interface IGameObjectOptions {
  position?: Vector2;
}

export class GameObject {
  position: Vector2;
  children: GameObject[] = [];
  input: Input | null = null;

  constructor(
    private ctx: CanvasRenderingContext2D,
    { position }: IGameObjectOptions = {},
  ) {
    this.position = position ?? new Vector2(0, 0);
  }

  stepEntry(delta: number, root: GameObject): void {
    this.children.forEach((child: GameObject) => child.stepEntry(delta, root));

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

  // Other Game Object are nestable inside this one
  addChild(...gameObjects: GameObject[]): void {
    this.children.push(...gameObjects);
  }

  removeChild(gameObject: GameObject): void {
    this.children = this.children.filter((child) => child !== gameObject);
  }
}
