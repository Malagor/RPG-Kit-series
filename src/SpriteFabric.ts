import { ResourcesType } from './constants.ts';
import { Sprite } from './Sprite.ts';
import { createHero } from './objects/Hero/hero.create.ts';
import { createSky } from './objects/Sky/sky.create.ts';
import { createGround } from './objects/Ground/ground.create.ts';
import { createShadow } from './objects/Shadow/shadow.create.ts';

export class SpriteFabric {
	private resourcesCreatorMap: Map<ResourcesType, Sprite> = new Map();

	constructor(private ctx: CanvasRenderingContext2D) {
		this.resourcesCreatorMap = new Map([
			[ ResourcesType.SKY, createSky(this.ctx) ],
			[ ResourcesType.GROUND, createGround(this.ctx) ],
			[ ResourcesType.HERO, createHero(this.ctx) ],
			[ ResourcesType.SHADOW, createShadow(this.ctx) ],
		]);
	}

	create(resourceType: ResourcesType): Sprite {
		const sprite: Sprite = this.resourcesCreatorMap.get(resourceType);
		if(!sprite) {
			throw new Error(`No sprite of resource type: ${ resourceType }`);
		}

		return sprite;
	}
}
