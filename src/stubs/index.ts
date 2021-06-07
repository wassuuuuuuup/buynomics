import {Intermediary, IntermediaryType} from '../containers/Intermediaries/Intermediaries.types';

export const intermediariesStub: Intermediary[] = [
	{id: 'intermediary_0', name: 'Retailers: Whole Foods', type: IntermediaryType.NONE, order: 5, createdAt: 1622162892246, fake: true },
	{id: 'intermediary_1', name: 'Distributor: US Foods', type: IntermediaryType.NONE, order: 1, createdAt: 1622562813764, fake: true},
	{id: 'intermediary_2', name: 'Retailers: Costco', type: IntermediaryType.NONE, order: 4, createdAt: 1622662869964, fake: true },
	{id: 'intermediary_3', name: 'Distributor: Gordon Food Service', type: IntermediaryType.NONE, order: 2, createdAt: 1622652856370, fake: true },
	{id: 'intermediary_4', name: 'Retailers: Walmart', type: IntermediaryType.NONE, order: 3, createdAt: 1622661866841, fake: true }
];

export function getIntermediaryDetailsStub(id: string): Intermediary {
	const item = intermediariesStub.find((stub) => stub.id === id);
	return {...item} as Intermediary;
}
