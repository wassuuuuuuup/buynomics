import {isIntermediaryRangeValid} from '../formValidation';

describe('isIntermediaryRangeValid tests', function () {
	it('should check if all values were populated', function () {
		expect(isIntermediaryRangeValid('', 1, 2)).toEqual(false);
		expect(isIntermediaryRangeValid(1, '', 2)).toEqual(false);
		expect(isIntermediaryRangeValid(1, 2, '')).toEqual(false);
		expect(isIntermediaryRangeValid(3, 2, 1)).toEqual(true);
	});
	it('should check if "to" field more that "from" field', function () {
		expect(isIntermediaryRangeValid(3, 2, 1)).toEqual(true);
		expect(isIntermediaryRangeValid(1.0001, 1, 0.0001)).toEqual(true);
		expect(isIntermediaryRangeValid(0, 1e-324, 1)).toEqual(false);
	});
	it('should check if "step" is positive number', function () {
		expect(isIntermediaryRangeValid(3, 2, -1)).toEqual(false);
		expect(isIntermediaryRangeValid(3, 2, 0)).toEqual(false);
		expect(isIntermediaryRangeValid(3, 2, 1e-324)).toEqual(false);
		expect(isIntermediaryRangeValid(3, 2, 0.00001)).toEqual(true);
	});
	it('should check if values are constrained to formula', function () {
		expect(isIntermediaryRangeValid(1.1, 1, 0.1)).toEqual(true);
		expect(isIntermediaryRangeValid(1.000001, 1, 0.000001)).toEqual(true);
		expect(isIntermediaryRangeValid(1.000001, 1, 0.000003)).toEqual(false);
		expect(isIntermediaryRangeValid(2.3, 1, 0.3)).toEqual(false);
	});
});