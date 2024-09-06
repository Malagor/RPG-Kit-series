import './style.css'
import { Vector2 } from './Vector2.ts';
import { FRAME_SIZE, MOVES, ResourcesType } from './constants.ts';
import { SpriteFabric } from './SpriteFabric.ts';
import { GameLoop } from './GameLoop.ts';
import { Input } from './Input.ts';
import { isSpaceFree } from './helpers/grid.ts';
import { moveTowards } from './helpers/moveTowards.ts';
import { blocks } from './levels/level_01.ts';
import { HeroMoves } from './objects/Hero/hero.create.ts';
import { Sprite } from './Sprite.ts';

const canvas: HTMLCanvasElement = document.querySelector('#game-canvas');
const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

const spriteFabric: SpriteFabric = new SpriteFabric(ctx);
const skySprite: Sprite = spriteFabric.create(ResourcesType.SKY);
const groundSprite: Sprite = spriteFabric.create(ResourcesType.GROUND);
const shadowSprite: Sprite = spriteFabric.create(ResourcesType.SHADOW);
const heroSprite: Sprite = spriteFabric.create(ResourcesType.HERO);

const input: Input = new Input();
const heroDestinationPosition = heroSprite.position.duplicate();
let heroFacing: MOVES = MOVES.GO_DOWN;

const update = (timeStep: number) => {
	const distance = moveTowards(heroSprite, heroDestinationPosition, 1);
	const hasArrived = distance <= 1;

	// Attempt to move again if the hero is at this position
	if(hasArrived) {
		tryMove();
	}

	// Work on hero animations
	heroSprite.step(timeStep);
}

const tryMove = () => {
	if(!input.direction) {
		if(heroFacing === MOVES.GO_DOWN) {
			heroSprite.animations?.play(HeroMoves.STAND_DOWN)
		}

		if(heroFacing === MOVES.GO_UP) {
			heroSprite.animations?.play(HeroMoves.STAND_UP)
		}

		if(heroFacing === MOVES.GO_LEFT) {
			heroSprite.animations?.play(HeroMoves.STAND_LEFT)
		}

		if(heroFacing === MOVES.GO_RIGHT) {
			heroSprite.animations?.play(HeroMoves.STAND_RIGHT)
		}

		return;
	}

	let nextX = heroDestinationPosition.x;
	let nextY = heroDestinationPosition.y;

	if(input.direction === MOVES.GO_DOWN) {
		nextY += FRAME_SIZE;
		heroSprite.animations?.play(HeroMoves.WALK_DOWN);
	}
	if(input.direction === MOVES.GO_UP) {
		nextY -= FRAME_SIZE;
		heroSprite.animations?.play(HeroMoves.WALK_UP);
	}
	if(input.direction === MOVES.GO_LEFT) {
		nextX -= FRAME_SIZE;
		heroSprite.animations?.play(HeroMoves.WALK_LEFT);
	}
	if(input.direction === MOVES.GO_RIGHT) {
		nextX += FRAME_SIZE;
		heroSprite.animations?.play(HeroMoves.WALK_RIGHT);
	}

	heroFacing = input.direction ?? heroFacing;

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

