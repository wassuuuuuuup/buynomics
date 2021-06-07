import {IntermediaryType} from '../Intermediaries/Intermediaries.types';

export interface RangeState {
	to: number;
	from: number;
	step: number;
}

export interface CreateIntermediaryRequestData {
	name: string;
	type: IntermediaryType;
	order: number;
	range?: RangeState;
}
