import { Sprite } from '../Sprite.ts';
import { Vector2 } from '../Vector2.ts';

export function moveTowards(entity: Sprite, destinationPosition: Vector2, speed: number): number {
	let [distanceToTravelX, distanceToTravelY] = getDeltas(destinationPosition, entity.position);
	let distance = calculateDistance(distanceToTravelX, distanceToTravelY);

	if(distance <= speed) {
		// If we're close enough, just move directly to the destination
		entity.position.x = destinationPosition.x;
		entity.position.y = destinationPosition.y;
	} else {
		// Otherwise, move by specific speed in the direction of the destination
		let normalizedX = distanceToTravelX / distance;
		let normalizedY = distanceToTravelY / distance;

		entity.position.x = entity.position.x + normalizedX * speed;
		entity.position.y = entity.position.y + normalizedY * speed;

		// Recalculate remaining distance after the move
		[distanceToTravelX, distanceToTravelY] = getDeltas(destinationPosition, entity.position);
		distance = calculateDistance(distanceToTravelX, distanceToTravelY);
	}

	return distance;
}

function calculateDistance(deltaX: number, deltaY: number): number {
	return Math.sqrt(deltaX ** 2 + deltaY ** 2);
}

/**
 *
 * @param {Vector2} p1 Destination point
 * @param {Vector2} p2 Start point
 * @return {[number, number]} Returns array of 2 numbers [0: deltaX, 1: deltaY]
 */
function getDeltas(p1: Vector2, p2: Vector2): [number, number] {
	return [
		p1.x - p2.x,
		p1.y - p2.y
	]
}
