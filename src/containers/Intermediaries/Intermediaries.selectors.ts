import {createSelector} from '@reduxjs/toolkit';

import {RootState} from '../../store';

const intermediariesSelectors = (state: RootState) => state.intermediaries;

export const intermediariesLoadingSelector = createSelector(
	intermediariesSelectors,
	(intermediaries) => intermediaries.loading,
);

export const intermediariesEntitiesSelector = createSelector(
	intermediariesSelectors,
	(intermediaries) => intermediaries.entities,
);
