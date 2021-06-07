import {DropdownItem, IntermediaryType, RangeState} from '../Intermediaries/Intermediaries.types';

export interface CreateIntermediaryRequestData {
	name: string;
	type: IntermediaryType;
	order: number;
	range?: RangeState;
	dropdown?: DropdownItem[];
}
