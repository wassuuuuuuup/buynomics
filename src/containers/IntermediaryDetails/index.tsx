import React, {SetStateAction, useCallback, useEffect, useState} from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import {useHistory, useRouteMatch} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import isEqual from 'lodash/isEqual';
import Big from 'big.js';

import {INTERMEDIARY_TYPE_LABEL} from '../Intermediaries/Intermadiaries.constants';
import {fetchIntermediaryDetails, updateIntermediaryDetails} from './IntermediateDetails.thunk';
import {intermediaryDetailsLoadingSelector} from './IntermediaryDetails.selectors';
import {DropdownItem, Intermediary, IntermediaryType} from '../Intermediaries/Intermediaries.types';
import {ROUTES} from '../../common/constants';
import {commonClasses} from '../../common/classes';
import {NAME_INPUT_MAX_LENGTH} from './IntermediaryDetails.constants';
import RangeComponent from './components/RangeComponent';
import DropdownComponent from './components/DropdownComponent';
import {RangeState} from '../Intermediaries/Intermediaries.types';
import {createIntermediary} from '../Intermediaries/Intermediaries.thunk';
import {useIntermediaryById} from './IntermediaryDetails.hooks';
import {intermediariesEntitiesSelector} from '../Intermediaries/Intermediaries.selectors';

interface MatchParams {
	id: string;
}

enum TextInputs {
	NAME,
	ORDER,
}

function IntermediaryDetails(): JSX.Element {
	const classes = commonClasses();
	const match = useRouteMatch<MatchParams>();
	const history = useHistory();
	const dispatch = useDispatch();
	const details: Intermediary | undefined = useIntermediaryById(match.params.id);
	const nextOrderNumber: string = (useSelector(intermediariesEntitiesSelector).length + 1).toString();
	const loading = useSelector(intermediaryDetailsLoadingSelector);
	const [type, setType] = useState(IntermediaryType.NONE);
	const [name, setName] = useState<string>('');
	const [order, setOrder] = useState<string>(nextOrderNumber);
	const [range, setRange] = useState<RangeState | undefined>({to: 0, from: 0, step: 0});
	const [dropdown, setDropdown] = useState<DropdownItem[] | undefined>([]);
	const [isRangeValid, setIsRangeValid] = useState(false);
	const createMode = match.params.id === 'new';

	const onTextInputChange = useCallback(({target: {value, name}}) => {
		switch (+name) {
		case TextInputs.NAME: return setName(value);
		case TextInputs.ORDER: return setOrder(value);
		}
	}, []);

	const onRangeChange = useCallback((data: RangeState) => {
		setRange(data);
	}, []);

	const onDropdownChange = useCallback((data: DropdownItem[]) => {
		setDropdown(data);
	}, []);

	const handleTypeChange = useCallback((event: React.ChangeEvent<{ value: unknown }>) =>
		setType(event.target.value as SetStateAction<IntermediaryType>), []);

	const toggleRangeValidity = useCallback((isValid) => setIsRangeValid(isValid), []);

	const goBack = useCallback(() => {
		history.push(ROUTES.ITERMEDIARIES);
	}, []);

	const onSave = useCallback(() => {
		if (details && !createMode) {
			dispatch(updateIntermediaryDetails({
				id: details.id,
				name,
				type,
				order: +order,
				range,
				createdAt: details.createdAt,
			}));
		} else {
			dispatch(createIntermediary({name, type, order: +order, range, dropdown}));
			history.push(ROUTES.ITERMEDIARIES);
		}
	}, [details, name, type, order, range, dropdown]);

	useEffect(() => {
		if (match && match.isExact && match.params.id && !createMode) {
			dispatch(fetchIntermediaryDetails(match.params.id));
		}
	}, [match.params.id]);

	useEffect(() => {
		if (details && !createMode) {
			setName(details.name);
			setType(details.type);
			setOrder(details.order.toString());
			setRange(details?.range);
			setDropdown(details?.dropdown);
		}
	}, [details]);

	const isSaveEnabled = details ? (
		(name && name !== details.name) ||
		(order && +order !== details.order) ||
		(type && type !== details.type) ||
		(
			details.range &&
			!isEqual(range, details.range) &&
			Big(details.range.from).gt(range ? range.from : 0)  &&
			isRangeValid
		)
	) : isRangeValid || dropdown?.length;

	return (
		<Container maxWidth="md" component={Paper} className={classes.container}>
			{loading && (<LinearProgress className={classes.loading} variant="indeterminate" />)}
			<Grid container direction="column" spacing={3}>
				<Grid item container direction="row" spacing={2}>
					<Grid item xs={6}>
						<TextField
							name={TextInputs.NAME.toString()}
							label="Name"
							value={name}
							variant="outlined"
							onChange={onTextInputChange}
							required
							inputProps={{maxLength: NAME_INPUT_MAX_LENGTH}}
							fullWidth
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							name={TextInputs.ORDER.toString()}
							label="Order"
							value={order}
							variant="outlined"
							onChange={onTextInputChange}
							required
							inputProps={{type: 'number', min: 1}}
							fullWidth
						/>
					</Grid>
				</Grid>
				<Grid item container direction="row" spacing={2}>
					<Grid item xs={6}>
						<FormControl
							variant="outlined"
							required
							fullWidth
						>
							<InputLabel>Type</InputLabel>
							<Select
								value={type}
								onChange={handleTypeChange}
								fullWidth
								disabled={!createMode}
								labelWidth={50}
							>
								{
									Object.entries(INTERMEDIARY_TYPE_LABEL).map(([value, label]) => (
										<MenuItem key={value} value={value}>
											{label}
										</MenuItem>
									))
								}
							</Select>
						</FormControl>
					</Grid>
				</Grid>
				{+type === IntermediaryType.RANGE && (
					<RangeComponent
						range={range}
						onChange={onRangeChange}
						toggleValid={toggleRangeValidity}
						initialRange={details?.range}
					/>
				)}
				{+type === IntermediaryType.DROPDOWN && (
					<DropdownComponent
						options={dropdown}
						onChange={onDropdownChange}
					/>
				)}
				<Grid item container direction="row" spacing={2}>
					<Grid item>
						<Button
							color="primary"
							onClick={onSave}
							variant="contained"
							disabled={!isSaveEnabled}
						>
							Save
						</Button>
					</Grid>
					<Grid item>
						<Button onClick={goBack}>Cancel</Button>
					</Grid>
				</Grid>
			</Grid>
		</Container>
	);
}

export default IntermediaryDetails;