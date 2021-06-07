import {createSlice} from '@reduxjs/toolkit';
import {Intermediary} from '../Intermediaries/Intermediaries.types';
import {fetchIntermediaryDetails, updateIntermediaryDetails} from './IntermediateDetails.thunk';

interface IntermediariesDetailsState {
	loading: boolean;
	entity: Intermediary | null,
}

const initialState: IntermediariesDetailsState = {
	loading: false,
	entity: null,
};

export const intermediateDetailsSlice = createSlice({
	name: 'intermediateDetails',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchIntermediaryDetails.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchIntermediaryDetails.fulfilled, (state, action) => {
				state.loading = false;
				state.entity = action.payload;
			})
			.addCase(updateIntermediaryDetails.pending, (state) => {
				state.loading = true;
			})
			.addCase(updateIntermediaryDetails.fulfilled, (state, action) => {
				state.loading = false;
				state.entity = action.payload;
			});
	}
});
