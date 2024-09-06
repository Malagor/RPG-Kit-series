import { FrameIndexPattern } from './FrameIndexPattern.ts';

export class Animations {
	private activeKey: string;

	constructor(private patterns: {[key: string]: FrameIndexPattern}) {
		this.activeKey = Object.keys(this.patterns)[0];
	}

	get frame() {
		return this.patterns[this.activeKey].frame;
	}

	play(key: string, startTime: number = 0) {
		if(this.activeKey === key) {
			return;
		}

		this.activeKey = key;
		this.patterns[this.activeKey].currentTime = startTime;
	}

	step(delta: number) {
		this.patterns[this.activeKey].step(delta);
	}
}
