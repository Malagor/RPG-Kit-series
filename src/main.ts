import './style.css'
import { Vector2 } from './Vector2.ts';
import { FRAME_SIZE, MOVES, ResourcesType } from './constants.ts';
import { SpriteFabric } from './Sprite_Fabric.ts';
import { GameLoop } from './Game_Loop.ts';
import { Input } from './Input.ts';
import { isSpaceFree } from './helpers/grid.ts';
import { moveTowards } from './helpers/moveTowards.ts';
import { blocks } from './levels/level_01.ts';

const canvas: HTMLCanvasElement = document.querySelector('#game-canvas');
const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

const spriteFabric = new SpriteFabric(ctx);
const skySprite = spriteFabric.create(ResourcesType.SKY);
const groundSprite = spriteFabric.create(ResourcesType.GROUND);
const shadowSprite = spriteFabric.create(ResourcesType.SHADOW);
const heroSprite = spriteFabric.create(ResourcesType.HERO);

const input = new Input();
const heroDestinationPosition = heroSprite.position.duplicate();

const update = (timeStep: number) => {
	const distance = moveTowards(heroSprite, heroDestinationPosition, 1);
	const hasArrived = distance <= 1;

	if(hasArrived) {
		tryMove();
	}
}

const tryMove = () => {
	if(!input.direction) {
		return;
	}

	let nextX = heroDestinationPosition.x;
	let nextY = heroDestinationPosition.y;

	if(input.direction === MOVES.GO_DOWN) {
		nextY += FRAME_SIZE;
		heroSprite.frame = 0;
	}
	if(input.direction === MOVES.GO_UP) {
		nextY -= FRAME_SIZE;
		heroSprite.frame = 6;
	}
	if(input.direction === MOVES.GO_LEFT) {
		nextX -= FRAME_SIZE;
		heroSprite.frame = 9;
	}
	if(input.direction === MOVES.GO_RIGHT) {
		nextX += FRAME_SIZE;
		heroSprite.frame = 3;
	}

	// Validate that the next destination is free
	if(isSpaceFree(blocks, nextX, nextY)) {
		heroDestinationPosition.x = nextX;
		heroDestinationPosition.y = nextY
	}
}

const draw = () => {
	skySprite.drawImage(0, 0);
	groundSprite.drawImage(0, 0);

	// Center the Hero in the cell
	const heroOffset = new Vector2(-8, -18);
	const heroPosX = heroSprite.position.x + heroOffset.x;
	const heroPosY = heroSprite.position.y + heroOffset.y;

	shadowSprite.drawImage(heroPosX, heroPosY);
	heroSprite.drawImage(heroPosX, heroPosY);
}

const gameLoop = new GameLoop(update, draw);

gameLoop.start();

