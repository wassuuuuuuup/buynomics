import { configureStore } from '@reduxjs/toolkit';

import {intermediariesSlice} from './containers/Intermediaries/Intermediaries.reducer';
import {intermediateDetailsSlice} from './containers/IntermediaryDetails/IntermediaryDetails.reducer';

const store = configureStore({
	reducer: {
		intermediaries: intermediariesSlice.reducer,
		intermediaryDetails: intermediateDetailsSlice.reducer,
	},
});
export type RootState = ReturnType<typeof store.getState>

export default store;