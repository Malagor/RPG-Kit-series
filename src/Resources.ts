import { ResourcesType } from './constants.ts';

export interface IResource {
	image: HTMLImageElement,
	isLoaded: boolean,
}

class Resources {
	// Everything we plan to download
	private toLoad: {[key in ResourcesType]: string} = {
		[ResourcesType.SKY]: '/sprites/sky.png',
		[ResourcesType.GROUND]: '/sprites/ground.png',
		[ResourcesType.HERO]: '/sprites/hero-sheet.png',
		[ResourcesType.SHADOW]: '/sprites/shadow.png',
		[ResourcesType.SPRITE_SHEET]: '/sprites/spritesheet.png',
		[ResourcesType.ROD]: '/sprites/rod.png'
	}

	// A bucket to keep all our images
	public images: {key: ResourcesType, IResource} = {};

	constructor() {
		// Load each image
		Object.keys(this.toLoad).forEach(key => {
			const img: HTMLImageElement = new Image();
			img.src = this.toLoad[key];
			this.images[key] = {
				image: img,
				isLoaded: false,
			}
			img.onload = () => {
				this.images[key].isLoaded = true;
			}
		})


	}
}

export const resources = new Resources();
