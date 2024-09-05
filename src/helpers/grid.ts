import { FRAME_SIZE } from '../constants.ts';

export function gridCell(n: number): number {
	return n * FRAME_SIZE;
}
