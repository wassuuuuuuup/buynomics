import {createAsyncThunk} from '@reduxjs/toolkit';

import {sleep} from '../../utils/httpUtils';
import {getIntermediaryDetailsStub} from '../../stubs';
import {Intermediary} from '../Intermediaries/Intermediaries.types';

export const fetchIntermediaryDetails = createAsyncThunk(
	'intermediaryDetails/getEntity',
	async (id: string) => {
		// simulate api call
		await sleep(200);
		return getIntermediaryDetailsStub(id);
	}
);

export const updateIntermediaryDetails = createAsyncThunk(
	'intermediaryDetails/updateEntity',
	async (data: Intermediary) => {
		// simulate api call
		await sleep(500);
		return data;
	}
);
