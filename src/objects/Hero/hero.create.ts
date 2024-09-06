import { Sprite } from '../../Sprite.ts';
import { resources } from '../../Resources.ts';
import { FRAME_SIZE, ResourcesType } from '../../constants.ts';
import { Vector2 } from '../../Vector2.ts';
import { gridCell } from '../../helpers/grid.ts';
import { Animations } from '../../Animations.ts';
import { FrameIndexPattern } from '../../FrameIndexPattern.ts';
import {
	STAND_DOWN,
	STAND_LEFT,
	STAND_RIGHT,
	STAND_UP,
	WALK_DOWN,
	WALK_LEFT,
	WALK_RIGHT,
	WALK_UP,
} from './hero.animations.ts';

export enum HeroMoves {
	WALK_DOWN = 'walkDown',
	WALK_UP = 'walkUp',
	WALK_LEFT = 'walkLeft',
	WALK_RIGHT = 'walkRight',
	STAND_DOWN = 'standDown',
	STAND_UP = 'standUp',
	STAND_LEFT = 'standLeft',
	STAND_RIGHT = 'standRight'
}

export function createHero(ctx: CanvasRenderingContext2D): Sprite {
	return new Sprite(
		ctx,
		{
			resource: resources.images[ResourcesType.HERO],
			frameSize: new Vector2(FRAME_SIZE * 2, FRAME_SIZE * 2),
			hFrames: 3,
			vFrames: 8,
			frame: 1,
			position: new Vector2(gridCell(6), gridCell(5)),
			animations: new Animations({
				[HeroMoves.WALK_DOWN]: new FrameIndexPattern(WALK_DOWN),
				[HeroMoves.WALK_UP]: new FrameIndexPattern(WALK_UP),
				[HeroMoves.WALK_LEFT]: new FrameIndexPattern(WALK_LEFT),
				[HeroMoves.WALK_RIGHT]: new FrameIndexPattern(WALK_RIGHT),
				[HeroMoves.STAND_DOWN]: new FrameIndexPattern(STAND_DOWN),
				[HeroMoves.STAND_UP]: new FrameIndexPattern(STAND_UP),
				[HeroMoves.STAND_LEFT]: new FrameIndexPattern(STAND_LEFT),
				[HeroMoves.STAND_RIGHT]: new FrameIndexPattern(STAND_RIGHT),
			}),
		})
}
