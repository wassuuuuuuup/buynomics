import {createSelector} from '@reduxjs/toolkit';
import sortBy from 'lodash/sortBy';

import {RootState} from '../../store';
const sortIntermediariesByField = 'order';

const intermediariesSelectors = (state: RootState) => state.intermediaries;

export const intermediariesLoadingSelector = createSelector(
	intermediariesSelectors,
	(intermediaries) => intermediaries.loading,
);

export const intermediariesEntitiesSelector = createSelector(
	intermediariesSelectors,
	(intermediaries) => sortBy(intermediaries.entities, sortIntermediariesByField),
);
