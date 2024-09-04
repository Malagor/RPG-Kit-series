import './style.css'
import { Vector2 } from './Vector2.ts';
import { FRAME_SIZE, MOVES, ResourcesType } from './constants.ts';
import { SpriteFabric } from './Sprite_Fabric.ts';
import { GameLoop } from './Game_Loop.ts';
import { Input } from './Input.ts';

const canvas: HTMLCanvasElement = document.querySelector('#game-canvas');
const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

const spriteFabric = new SpriteFabric(ctx);

const skySprite = spriteFabric.create(ResourcesType.SKY);

const groundSprite = spriteFabric.create(ResourcesType.GROUND);

const shadowSprite = spriteFabric.create(ResourcesType.SHADOW);

const heroSprite = spriteFabric.create(ResourcesType.HERO);

const heroPos = new Vector2(FRAME_SIZE * 6, FRAME_SIZE * 5);

const input = new Input();

const update = (timeStep: number) => {
	// Update entities in the game
	if(input.direction === MOVES.GO_DOWN) {
		heroPos.y += 1;
		heroSprite.frame = 0;
	}
	if(input.direction === MOVES.GO_UP) {
		heroPos.y -= 1;
		heroSprite.frame = 6;
	}
	if(input.direction === MOVES.GO_LEFT) {
		heroPos.x -= 1;
		heroSprite.frame = 9;
	}
	if(input.direction === MOVES.GO_RIGHT) {
		heroPos.x += 1;
		heroSprite.frame = 3;
	}
}

const draw = () => {
	skySprite.drawImage(0, 0);
	groundSprite.drawImage(0, 0);

	// Center the Hero in the cell
	// TODO: Почему нужно делать "-21 + 1"?
	// const heroOffset = new Vector2(-8,-21);
	const heroOffset = new Vector2(-8, -20);
	const heroPosX = heroPos.x + heroOffset.x;
	// const heroPosY = heroPos.y + heroOffset.y + 1;
	const heroPosY = heroPos.y + heroOffset.y;

	shadowSprite.drawImage(heroPosX, heroPosY);
	heroSprite.drawImage(heroPosX, heroPosY);
}

const gameLoop = new GameLoop(update, draw);

gameLoop.start();

