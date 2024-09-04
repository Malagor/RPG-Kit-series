import { resources } from './Resources.ts';
import { FRAME_SIZE, ResourcesType } from './constants.ts';
import { Sprite } from './Sprite.ts';
import { Vector2 } from './Vector2.ts';

export class SpriteFabric {
	private resourcesCreatorMap: Map<ResourcesType, Sprite> = new Map();

	constructor(private ctx: CanvasRenderingContext2D) {
		this.resourcesCreatorMap = new Map([
			[ ResourcesType.SKY, this.createSky() ],
			[ ResourcesType.GROUND, this.createGround() ],
			[ ResourcesType.HERO, this.createHero() ],
			[ ResourcesType.SHADOW, this.createShadow() ],
		]);
	}

	create(resourceType: ResourcesType): Sprite {
		const sprite: Sprite = this.resourcesCreatorMap.get(resourceType);
		if(!sprite) {
			throw new Error(`No sprite of resource type: ${ resourceType }`);
		}

		return sprite;
	}

	private createSky(): Sprite {
		return new Sprite(
			this.ctx,
			{
				resource: resources.images[ResourcesType.SKY],
				frameSize: new Vector2(320, 180),
			})
	}

	private createGround(): Sprite {
		return new Sprite(
			this.ctx,
			{
				resource: resources.images[ResourcesType.GROUND],
				frameSize: new Vector2(320, 180),
			})
	}

	private createHero(): Sprite {
		return new Sprite(
			this.ctx,
			{
				resource: resources.images[ResourcesType.HERO],
				frameSize: new Vector2(FRAME_SIZE * 2, FRAME_SIZE * 2),
				hFrames: 3,
				vFrames: 8,
				frame: 1,
			})
	}

	private createShadow(): Sprite {
		return new Sprite(
			this.ctx,
			{
				resource: resources.images[ResourcesType.SHADOW],
				frameSize: new Vector2(FRAME_SIZE * 2, FRAME_SIZE * 2),
			})
	}
}
