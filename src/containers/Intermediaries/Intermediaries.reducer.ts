import {createSlice} from '@reduxjs/toolkit';
import sortBy from 'lodash/sortBy';

import {deleteIntermediary, fetchIntermediaries, createIntermediary} from './Intermediaries.thunk';
import {Intermediary} from './Intermediaries.types';

const sortIntermediariesByField = 'order';

interface IntermediariesState {
	loading: boolean;
	entities: Intermediary[],
}

const initialState: IntermediariesState = {
	loading: false,
	entities: [],
};

export const intermediariesSlice = createSlice({
	name: 'intermediaries',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchIntermediaries.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchIntermediaries.rejected, (state) => {
				state.loading = false;
			})
			.addCase(fetchIntermediaries.fulfilled, (state, action): void => {
				state.loading = false;
				const realEntities = state.entities.slice().filter((entity) => !entity.fake);
				state.entities = [
					...sortBy(action.payload, sortIntermediariesByField),
					...realEntities
				] as Intermediary[];
			})
			.addCase(deleteIntermediary.pending, (state) => {
				state.loading = true;
			})
			.addCase(deleteIntermediary.fulfilled, (state, action) => {
				const index = state.entities.findIndex((entity) => entity.id === action.payload);
				const newEntities = state.entities.slice();

				newEntities.splice(index, 1);

				state.loading = false;
				state.entities = newEntities;
			})
			.addCase(createIntermediary.pending, (state) => {
				state.loading = true;
			})
			.addCase(createIntermediary.fulfilled, (state, action) => {
				state.loading = false;
				const newIntermediary = {
					...action.payload,
					id: 'intermediary_' + state.entities.length,
					createdAt: +Date.now()
				};
				state.entities = [...state.entities, newIntermediary];
			});
	}
});

export default intermediariesSlice;
