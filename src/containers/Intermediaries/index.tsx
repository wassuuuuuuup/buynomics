import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {useHistory} from 'react-router-dom';

import {deleteIntermediary, fetchIntermediaries} from './Intermediaries.thunk';
import {intermediariesEntitiesSelector, intermediariesLoadingSelector} from './Intermediaries.selectors';
import {intermediariesStyles} from './Intermediaries.styles';
import IntermediaryListItemComponent from './components/IntermediaryListItem';
import Prompt from '../../shared_components/Prompt';
import {Intermediary} from './Intermediaries.types';
import {ROUTES} from '../../common/constants';

function Intermediaries(): JSX.Element {
	const history = useHistory();
	const dispatch = useDispatch();
	const [deletePromptData, setHowDeletePromptData] = useState<Intermediary | null>(null);
	const classes = intermediariesStyles();
	const loading = useSelector(intermediariesLoadingSelector);
	const intermediaries = useSelector(intermediariesEntitiesSelector);

	const onCloseDeletePrompt = useCallback(() => {
		setHowDeletePromptData(null);
	}, []);

	const onAcceptDeletePrompt = useCallback(() => {
		if (deletePromptData) {
			dispatch(deleteIntermediary(deletePromptData.id));
			setHowDeletePromptData(null);
		}
	}, [deletePromptData]);

	const onCreateNew = useCallback(() => {
		history.push(ROUTES.ITERMEDIARIES + '/new');
	}, []);

	useEffect(() => {
		dispatch(fetchIntermediaries());
	}, []);

	return (
		<>
			<Grid container justify="space-between">
				<Grid item>
					<Typography variant="h4" paragraph>Intermediary list</Typography>
				</Grid>
				<Grid item>
					<Button
						color="secondary"
						variant="contained"
						onClick={onCreateNew}
					>
						Create new
					</Button>
				</Grid>
			</Grid>
			<TableContainer className={classes.tableContainer} component={Paper}>
				{loading && (
					<LinearProgress className={classes.tableLoadingProgress} variant="indeterminate"/>
				)}
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Created at</TableCell>
							<TableCell>Name</TableCell>
							<TableCell>Order</TableCell>
							<TableCell />
						</TableRow>
					</TableHead>
					<TableBody>
						{intermediaries.map((item) => (
							<IntermediaryListItemComponent
								key={item.id}
								item={item}
								onDelete={setHowDeletePromptData}
							/>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<Prompt
				show={Boolean(deletePromptData)}
				title={`Do you really want to delete ${deletePromptData?.name}`}
				onClose={onCloseDeletePrompt}
				onAccept={onAcceptDeletePrompt}
			/>
		</>
	);
}

export default Intermediaries;