import { Vector2 } from './Vector2.ts';
import { FRAME_SIZE } from './constants.ts';
import { IResource } from './Resources.ts';

interface SpriteOptions {
	resource: IResource;
	frameSize?: Vector2;
	hFrames?: number;
	vFrames?: number;
	frame?: number;
	scale?: number;
	position?: Vector2;
}

interface ISprite {
	constructor(ctx: CanvasRenderingContext2D, options: SpriteOptions): ISprite,
}

export interface IDrawImage {
	drawImage(x: number, y: number): void;
}

export class Sprite implements ISprite, IDrawImage {
	private readonly resources: IResource;
	private readonly frameSize: Vector2;
	private readonly hFrames: number;
	private readonly vFrames: number;
	private readonly scale: number;

	private frameMap: Map<number, any>;

	frame: number;
	position: Vector2;

	constructor(
		private readonly ctx: CanvasRenderingContext2D,
		{
			resource,	// image we want to draw
			frameSize,	// size of the crop of the image
			hFrames,	// how the sprite arranged horizontally
			vFrames,	// how the sprite arranged vertically
			frame,		// witch frame we want to show
			scale,		// how large to draw this image
			position,	// where to draw the image (top left corner)
		}: SpriteOptions) {
		this.resources = resource;
		this.frameSize = frameSize ?? new Vector2(FRAME_SIZE, FRAME_SIZE);
		this.hFrames = hFrames ?? 1;
		this.vFrames = vFrames ?? 1;
		this.frame = frame ?? 0;
		this.scale = scale ?? 1;
		this.position = position ?? new Vector2(0, 0);
		this.frameMap = new Map();

		this.buildFrameMap();
	}

	private buildFrameMap() {
		let frameCount = 0;

		for (let v = 0; v < this.vFrames; v++) {
			for (let h = 0; h < this.hFrames; h++) {
				this.frameMap.set(
					frameCount,
					new Vector2(
						this.frameSize.x * h,
						this.frameSize.y * v,
					),
				);

				frameCount += 1;
			}
		}
	}

	drawImage( x: number, y: number) {
		if(!this.resources.isLoaded) {
			return;
		}

		let frameCoordX: number = 0;
		let frameCoordY: number = 0;
		const frame = this.frameMap.get(this.frame);

		if(frame) {
			frameCoordX = frame.x;
			frameCoordY = frame.y;
		}

		const frameSizeX = this.frameSize.x;
		const frameSizeY = this.frameSize.y;

		this.ctx.drawImage(
			this.resources.image,
			frameCoordX, // Left X corner of frame
			frameCoordY, // Top Y corner of frame
			frameSizeX, // How much to crop from the sprite sheet (X)
			frameSizeY, // How much to crop from the sprite sheet (Y)
			x, // Where to place this on canvas tag X (0)
			y, // Where to place this on canvas tag Y (0)
			frameSizeX * this.scale, // How large to scale it (X)
			frameSizeY * this.scale, // How large to scale it (Y)
		);
	}
}
