import {createSelector} from '@reduxjs/toolkit';

import {RootState} from '../../store';

const intermediaryDetailsSelector = (state: RootState) => state.intermediaryDetails;

export const intermediaryDetailsEntitySelector = createSelector(
	intermediaryDetailsSelector,
	(intermediaryDetails) => intermediaryDetails.entity,
);

export const intermediaryDetailsLoadingSelector = createSelector(
	intermediaryDetailsSelector,
	(intermediaryDetails) => intermediaryDetails.loading,
);