import { GameObject } from "../../GameObject.ts";
import { Vector2 } from "../../Vector2.ts";
import { FRAME_SIZE, MOVES, ResourcesType } from "../../constants.ts";
import { isSpaceFree } from "../../helpers/grid.ts";
import { blocks } from "../../levels/level_01.ts";
import { Sprite } from "../../Sprite.ts";
import { resources } from "../../Resources.ts";
import { Animations } from "../../Animations.ts";
import { FrameIndexPattern } from "../../FrameIndexPattern.ts";
import {
  STAND_DOWN,
  STAND_LEFT,
  STAND_RIGHT,
  STAND_UP,
  WALK_DOWN,
  WALK_LEFT,
  WALK_RIGHT,
  WALK_UP,
} from "./hero.animations.ts";
import { moveTowards } from "../../helpers/moveTowards.ts";
import { events } from "../../Events.ts";
import { EventNames } from "../../EventNames.ts";

export enum HeroMoves {
  WALK_DOWN = "walkDown",
  WALK_UP = "walkUp",
  WALK_LEFT = "walkLeft",
  WALK_RIGHT = "walkRight",
  STAND_DOWN = "standDown",
  STAND_UP = "standUp",
  STAND_LEFT = "standLeft",
  STAND_RIGHT = "standRight",
}

export class Hero extends GameObject {
  private heroFacing: MOVES = MOVES.GO_DOWN;
  private destinationPosition = this.position.duplicate();
  private readonly body: Sprite;
  private lastHeroPosition = this.position.duplicate();

  constructor(ctx: CanvasRenderingContext2D, x: number, y: number) {
    super(ctx, {
      position: new Vector2(x, y),
    });

    const posOffset = new Vector2(-8, -18);

    const shadowSprite: Sprite = new Sprite(ctx, {
      resource: resources.images[ResourcesType.SHADOW],
      frameSize: new Vector2(FRAME_SIZE * 2, FRAME_SIZE * 2),
      position: posOffset,
    });

    this.body = new Sprite(ctx, {
      resource: resources.images[ResourcesType.HERO],
      frameSize: new Vector2(FRAME_SIZE * 2, FRAME_SIZE * 2),
      hFrames: 3,
      vFrames: 8,
      frame: 1,
      position: posOffset,
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
    });

    this.addChild(shadowSprite, this.body);
  }

  public step(delta: number, root: GameObject): void {
    const distance = moveTowards(this, this.destinationPosition, 1);
    const hasArrived = distance <= 1;

    // Attempt to move again if the hero is at this position
    if (hasArrived) {
      this.tryMove(root);
    }

    this.tryEmitPosition();
  }

  tryEmitPosition(): void {
    if (this.position.isEqual(this.lastHeroPosition)) {
      return;
    }
    this.lastHeroPosition = this.position.duplicate();

    events.emit(EventNames.HERO_POSITION, this.lastHeroPosition);
  }

  tryMove(root: GameObject): void {
    const { input } = root;

    if (!input?.direction) {
      if (this.heroFacing === MOVES.GO_DOWN) {
        this.body.animations?.play(HeroMoves.STAND_DOWN);
      }

      if (this.heroFacing === MOVES.GO_UP) {
        this.body.animations?.play(HeroMoves.STAND_UP);
      }

      if (this.heroFacing === MOVES.GO_LEFT) {
        this.body.animations?.play(HeroMoves.STAND_LEFT);
      }

      if (this.heroFacing === MOVES.GO_RIGHT) {
        this.body.animations?.play(HeroMoves.STAND_RIGHT);
      }

      return;
    }

    let nextX = this.destinationPosition.x;
    let nextY = this.destinationPosition.y;

    if (input.direction === MOVES.GO_DOWN) {
      nextY += FRAME_SIZE;
      this.body.animations?.play(HeroMoves.WALK_DOWN);
    }
    if (input.direction === MOVES.GO_UP) {
      nextY -= FRAME_SIZE;
      this.body.animations?.play(HeroMoves.WALK_UP);
    }
    if (input.direction === MOVES.GO_LEFT) {
      nextX -= FRAME_SIZE;
      this.body.animations?.play(HeroMoves.WALK_LEFT);
    }
    if (input.direction === MOVES.GO_RIGHT) {
      nextX += FRAME_SIZE;
      this.body.animations?.play(HeroMoves.WALK_RIGHT);
    }

    this.heroFacing = input.direction ?? this.heroFacing;

    // Validate that the next destination is free
    if (isSpaceFree(blocks, nextX, nextY)) {
      this.destinationPosition.x = nextX;
      this.destinationPosition.y = nextY;
    }
  }
}
