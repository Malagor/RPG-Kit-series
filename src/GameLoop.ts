export class GameLoop {
  private readonly TIME_STEP: number = 1000 / 60; // 60 frames per second
  private lastFrameTime: number = 0;
  private accumulatedTime: number = 0;

  private rafId: number | null = null; // Request Animation frame ID
  private isRunning = false;

  constructor(
    private update: (timeStamp: number) => void,
    private render: () => void,
  ) {}

  private mainLoop = (timestamp: number): void => {
    if (!this.isRunning) return;

    let deltaTime = timestamp - this.lastFrameTime;
    this.lastFrameTime = timestamp;

    // Accumulate all the time since the last frame
    this.accumulatedTime += deltaTime;

    // Fixed time step updates.
    // If there's enough accumulated time to run one or more fixed updates
    while (this.accumulatedTime >= this.TIME_STEP) {
      this.update(this.TIME_STEP); // Here, we pass the fixed time step size.
      this.accumulatedTime -= this.TIME_STEP;
    }

    this.render();
    this.rafId = requestAnimationFrame(this.mainLoop);
  };

  start(): void {
    if (!this.isRunning) {
      this.isRunning = true;
      this.rafId = requestAnimationFrame(this.mainLoop);
    }
  }

  stop(): void {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }

    this.isRunning = false;
  }
}
