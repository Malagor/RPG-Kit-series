import { MOVES } from "./constants.ts";

export class Input {
  private readonly heldDirections: MOVES[] = [];

  constructor() {
    document.addEventListener("keydown", (e) => this.keyHandler(e, "keydown"));
    document.addEventListener("keyup", (e) => this.keyHandler(e, "keyup"));
  }

  get direction(): MOVES {
    return this.heldDirections[0];
  }

  private keyHandler(e: KeyboardEvent, phase: "keydown" | "keyup") {
    const handler =
      phase === "keydown" ? this.onArrowPressed : this.onArrowReleased;

    if (e.code === "ArrowUp" || e.code === "KeyW") {
      handler(MOVES.GO_UP);
    }
    if (e.code === "ArrowDown" || e.code === "KeyS") {
      handler(MOVES.GO_DOWN);
    }
    if (e.code === "ArrowLeft" || e.code === "KeyA") {
      handler(MOVES.GO_LEFT);
    }
    if (e.code === "ArrowRight" || e.code === "KeyD") {
      handler(MOVES.GO_RIGHT);
    }
  }

  private onArrowPressed = (direction: MOVES) => {
    if (this.heldDirections.indexOf(direction) === -1) {
      this.heldDirections.unshift(direction);
    }
  };

  private onArrowReleased = (direction: MOVES) => {
    const index = this.heldDirections.indexOf(direction);

    if (index === -1) return;

    this.heldDirections.splice(index, 1);
  };
}
