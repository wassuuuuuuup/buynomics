import {createSlice} from '@reduxjs/toolkit';

import {deleteIntermediary, fetchIntermediaries, createIntermediary} from './Intermediaries.thunk';
import {Intermediary} from './Intermediaries.types';
import {updateIntermediaryDetails} from '../IntermediaryDetails/IntermediateDetails.thunk';

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
			// Redux Toolkit's createSlice API uses Immer internally automatically.
			// So, it's already safe to "mutate" state inside of any case reducer function that is passed to createReducer
			.addCase(fetchIntermediaries.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchIntermediaries.rejected, (state) => {
				state.loading = false;
			})
			.addCase(fetchIntermediaries.fulfilled, (state, action): void => {
				state.loading = false;
				if (!state.entities.length) {
					state.entities = action.payload as Intermediary[];
				}
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
			})
			.addCase(updateIntermediaryDetails.fulfilled, (state, action) => {
				const index = state.entities.findIndex((entity) => entity.id === action.payload.id);
				const entities = state.entities.slice();
				entities.splice(index, 1, action.payload);
				state.entities = entities;
			});
	}
});

export default intermediariesSlice;
