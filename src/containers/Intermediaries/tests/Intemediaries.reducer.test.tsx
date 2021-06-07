// import { render, screen } from '@testing-library/react';
import tail from 'lodash/tail';
import intermediariesSlice from '../Intermediaries.reducer';
import {deleteIntermediary, fetchIntermediaries} from '../Intermediaries.thunk';
import {intermediariesStub} from '../../../stubs';

// TODO Describe the rest reducers the same way
describe('Itermediaries reducer', function () {
	it('Should return initial state', function() {
		expect(intermediariesSlice.reducer(undefined, {type: undefined}))
			.toEqual({loading: false, entities: []});
	});
	it('fetchIntermediaries', () => {
		expect(intermediariesSlice.reducer(undefined, fetchIntermediaries.pending))
			.toEqual({loading: true, entities: []});
		expect(intermediariesSlice.reducer(undefined, fetchIntermediaries.rejected))
			.toEqual({loading: false, entities: []});
		expect(intermediariesSlice.reducer(undefined, {
			type: fetchIntermediaries.fulfilled.type,
			payload: intermediariesStub,
		}))
			.toEqual({loading: false, entities: intermediariesStub});
	});
	it('deleteIntermediary', () => {
		expect(intermediariesSlice.reducer(
			{loading: false, entities: intermediariesStub},
			deleteIntermediary.pending)
		)
			.toEqual({loading: true, entities: intermediariesStub});

		const idToBeDeleted = 'intermediary_0';

		expect(intermediariesSlice.reducer(
			{loading: true, entities: intermediariesStub},
			{
				type: deleteIntermediary.fulfilled.type,
				payload: idToBeDeleted,
			}
		)).toEqual({loading: false, entities: tail(intermediariesStub)});
	});
	// TODO add test for creating entity
});
