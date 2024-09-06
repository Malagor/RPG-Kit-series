export interface IWalkingFramesConfig {
	duration: number,
	frames: Array<{
		time: number,
		frame: number
	}>
}

export class FrameIndexPattern {
	private readonly duration: number;

	currentTime: number = 0;

	constructor(private animationConfig: IWalkingFramesConfig) {
		this.duration = animationConfig.duration ?? 500;
	}

	get frame() {
		const {frames} = this.animationConfig;

		for (let i = frames.length - 1; i >= 0; i--) {
			if(this.currentTime >= frames[i].time) {
				return frames[i].frame;
			}
		}

		throw new Error('Time is before the first keyframe');
	}

	step(delta: number): void {
		this.currentTime += delta;
		if(this.currentTime >= this.duration) {
			this.currentTime = 0;
		}
	}
}
