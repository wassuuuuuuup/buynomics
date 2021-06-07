import {createAsyncThunk} from '@reduxjs/toolkit';

import {sleep} from '../../utils/httpUtils';
import {intermediariesStub} from '../../stubs';
import {Intermediary} from './Intermediaries.types';
import {CreateIntermediaryRequestData} from '../IntermediaryDetails/IntermediaryDetails.types';

export const fetchIntermediaries = createAsyncThunk<Intermediary[]>(
	'intermediaries/fetchList',
	async () => {
		// simulate heavy api call
		await sleep(1000);
		return intermediariesStub;
	}
);

export const deleteIntermediary = createAsyncThunk(
	'intermediaries/delete',
	async (id: string) => {
		// simulate api call
		await sleep(200);
		return id;
	}
);

export const createIntermediary = createAsyncThunk(
	'intermediaries/create',
	async (data: CreateIntermediaryRequestData) => {
		// simulate api call
		await sleep(500);
		return data;
	}
);
