import Big from 'big.js';

export function isIntermediaryRangeValid(to: string | number, from: string | number, step: string | number): boolean {
	return (
		// all fields should be filled
		Boolean(from && to && step) &&
		// "from" field value should be less that "to"
		Big(from).lt(to) &&
		// step sould be positive number
		Big(step).gt(0) &&
		// should be constrained to formula
		Big(to).minus(from).div(+step || 1).mod(1).eq(0)
	);
}