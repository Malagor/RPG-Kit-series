import "./style.css";
import { Vector2 } from "./Vector2.ts";
import { GameLoop } from "./GameLoop.ts";
import { Input } from "./Input.ts";
import { GameObject } from "./GameObject.ts";
import { Hero } from "./objects/Hero/Hero.ts";
import { gridCell } from "./helpers/grid.ts";
import { Sky } from "./objects/Sky/Sky.ts";
import { Ground } from "./objects/Ground/Ground.ts";
import { Camera } from "./Camera.ts";

const canvas: HTMLCanvasElement = document.querySelector("#game-canvas");
const ctx: CanvasRenderingContext2D = canvas.getContext("2d");

const mainScene = new GameObject(ctx, {
  position: new Vector2(0, 0),
});

mainScene.input = new Input();

const sky = new Sky(ctx);
const ground = new Ground(ctx);
const camera = new Camera(ctx);
const hero = new Hero(ctx, gridCell(6), gridCell(5));

mainScene.addChild(ground, hero, camera);

const update = (timeStep: number): void => {
  mainScene.stepEntry(timeStep, mainScene);
};

const draw = (): void => {
  // Clear everything
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  sky.draw(0, 0);

  // Save the current state (for camera offset)
  ctx.save();

  // Offset by camera position
  ctx.translate(camera.position.x, camera.position.y);

  // Draw object in the mounted scene
  mainScene.draw(0, 0);

  // Restore to original state
  ctx.restore();
};

const gameLoop = new GameLoop(update, draw);

gameLoop.start();
