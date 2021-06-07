import {createSelector} from '@reduxjs/toolkit';
import sortBy from 'lodash/sortBy';

import {RootState} from '../../store';
import {SORT_INTERMEDIARIES_BY} from './Intermadiaries.constants';

const intermediariesSelectors = (state: RootState) => state.intermediaries;

export const intermediariesLoadingSelector = createSelector(
	intermediariesSelectors,
	(intermediaries) => intermediaries.loading,
);

export const intermediariesEntitiesSelector = createSelector(
	intermediariesSelectors,
	(intermediaries) => sortBy(intermediaries.entities, SORT_INTERMEDIARIES_BY),
);
