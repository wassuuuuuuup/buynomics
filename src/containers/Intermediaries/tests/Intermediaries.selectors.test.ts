import orderBy from 'lodash/orderBy';

import {intermediariesEntitiesSelector, intermediariesLoadingSelector} from '../Intermediaries.selectors';
import intermediariesSlice from '../Intermediaries.reducer';
import {intermediateDetailsSlice} from '../../IntermediaryDetails/IntermediaryDetails.reducer';
import {intermediariesStub} from '../../../stubs';
import {SORT_INTERMEDIARIES_BY} from '../Intermadiaries.constants';

const state = {
	intermediaries: intermediariesSlice.reducer({loading: true, entities: intermediariesStub}, {type: undefined}),
	intermediaryDetails: intermediateDetailsSlice.reducer({loading: false, entity: null}, {type: undefined}),
};

describe('Intermediaries selectors', function () {
	it('should select loading state', function () {
		expect(intermediariesLoadingSelector(state)).toEqual(true);
	});
	it('should select intermediate entities sorted by "order" field in descending order', function () {
		expect(intermediariesEntitiesSelector(state)).toEqual(orderBy(intermediariesStub, SORT_INTERMEDIARIES_BY));
	});
});