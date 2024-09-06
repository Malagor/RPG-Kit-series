import './style.css'
import { Vector2 } from './Vector2.ts';
import { GameLoop } from './GameLoop.ts';
import { Input } from './Input.ts';
import { GameObject } from './GameObject.ts';
import { Hero } from './objects/Hero/Hero.ts';
import { gridCell } from './helpers/grid.ts';
import { Sky } from './objects/Sky/Sky.ts';
import { Ground } from './objects/Ground/Ground.ts';

const canvas: HTMLCanvasElement = document.querySelector('#game-canvas');
const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

const mainScene = new GameObject(ctx, {
	position: new Vector2(0, 0)
})

mainScene.input = new Input();

const sky = new Sky(ctx);
const ground = new Ground(ctx);
const hero = new Hero(ctx, gridCell(6), gridCell(5));

mainScene.addChild(sky, ground, hero);

const update = (timeStep: number): void => {
	mainScene.stepEntry(timeStep, mainScene);
}

const draw = (): void => {
	mainScene.draw(0, 0);
}

const gameLoop = new GameLoop(update, draw);

gameLoop.start();

