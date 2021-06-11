import React, {useCallback, useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import {RangeState} from '../../Intermediaries/Intermediaries.types';
import {countDecimals} from '../../../utils/numberUtils';
import {MAX_DECIMALS_COUNT} from '../../../common/constants';
import {isIntermediaryRangeValid} from '../../../utils/formValidation';

interface RangeProps {
	range?: RangeState;
	onChange: (data: RangeState) => void;
	toggleValid: (isValid: boolean) => void;
	initialRange?: RangeState;
}

function RangeComponent({range, initialRange, onChange, toggleValid}: RangeProps) {
	const [from, setFrom] = useState<string>(range?.from.toString() || '');
	const [to, setTo] = useState<string>(range?.to.toString() || '');
	const [step, setStep] = useState<string>(range?.step.toString() || '');

	const onFromChange = useCallback((e) => {
		let value = e.target.value;
		if (countDecimals(e.target.value) >= MAX_DECIMALS_COUNT) {
			value = parseFloat(value).toFixed(MAX_DECIMALS_COUNT);
		}
		setFrom(value);
	}, []);
	const onToChange = useCallback((e) => {
		let value = e.target.value;
		if (countDecimals(e.target.value) >= MAX_DECIMALS_COUNT) {
			value = parseFloat(value).toFixed(MAX_DECIMALS_COUNT);
		}
		setTo(value);
	}, []);
	const onStepChange = useCallback((e) => {
		let value = e.target.value;
		if (countDecimals(e.target.value) >= MAX_DECIMALS_COUNT) {
			value = parseFloat(value).toFixed(MAX_DECIMALS_COUNT);
		}
		setStep(value);
	}, [step]);

	useEffect(() => {
		toggleValid(isIntermediaryRangeValid(initialRange?.from || to, from, step));
	}, [from, to, step]);

	useEffect(() => {
		onChange({from: +from, to: +to, step: +step});
	}, [onChange, from, to, step]);

	return (
		<Grid item container spacing={2}>
			<Grid item xs={4}>
				<TextField
					value={from}
					label="From"
					variant="outlined"
					onChange={onFromChange}
					fullWidth
					inputProps={{type: 'number', min: 0}}
				/>
			</Grid>
			<Grid item xs={4}>
				<TextField
					value={to}
					label="To"
					variant="outlined"
					onChange={onToChange}
					fullWidth
					inputProps={{type: 'number', min: 0}}
				/>
			</Grid>
			<Grid item xs={4}>
				<TextField
					value={step}
					label="Step"
					variant="outlined"
					onChange={onStepChange}
					fullWidth
					inputProps={{type: 'number', min: 0}}
				/>
			</Grid>
		</Grid>
	);
}

export default React.memo(RangeComponent);
