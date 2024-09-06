import { Sprite } from '../../Sprite.ts';
import { resources } from '../../Resources.ts';
import { FRAME_SIZE, ResourcesType } from '../../constants.ts';
import { Vector2 } from '../../Vector2.ts';

export function createShadow(ctx: CanvasRenderingContext2D): Sprite {
	return new Sprite(
		ctx,
		{
			resource: resources.images[ResourcesType.SHADOW],
			frameSize: new Vector2(FRAME_SIZE * 2, FRAME_SIZE * 2),
		})
}
