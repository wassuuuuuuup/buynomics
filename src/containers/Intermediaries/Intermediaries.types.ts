export enum IntermediaryType {
	NONE,
	RANGE,
	DROPDOWN
}

export interface Intermediary {
	id: string;
	name: string;
	type: IntermediaryType;
	fake?: boolean;
	order: number;
	range?: { from: number, to: number, step: number };
	createdAt: number;
}
