export function countDecimals(value: number): number {
	const text = value.toString();
	// verify if number 0.000005 is represented as "5e-6"
	if (text.indexOf('e-') > -1) {
		const [, trail] = text.split('e-');
		return parseInt(trail, 10);
	}
	// count decimals for number in representation like "0.123456"
	if (Math.floor(value) !== value) {
		return value.toString().split('.')[1].length || 0;
	}
	return 0;
}
