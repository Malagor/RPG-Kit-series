export class Vector2 {
  constructor(
    public x = 0,
    public y = 0,
  ) {}

  duplicate(): Vector2 {
    return new Vector2(this.x, this.y);
  }

  isEqual(p: Vector2): boolean {
    return this.x === p.x && this.y === p.y;
  }
}
