export class Vector2 {
	constructor(public x = 0, public y = 0) {
	}

	duplicate(): Vector2 {
		return new Vector2(this.x, this.y);
	}
}
