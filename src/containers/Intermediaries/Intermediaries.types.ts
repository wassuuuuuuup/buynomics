export interface RangeState {
	to: number;
	from: number;
	step: number;
}

export interface DropdownItem {
	option: string;
	value: number;
}

export enum IntermediaryType {
	NONE,
	RANGE,
	DROPDOWN
}
// TODO create interface for Intermediary list item then extend it to create Intermediary with details
// I left it as is for simplicity
export interface Intermediary {
	id: string;
	name: string;
	type: IntermediaryType;
	order: number;
	range?: RangeState;
	dropdown?: DropdownItem[];
	createdAt: number;
}
