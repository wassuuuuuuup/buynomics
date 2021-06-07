import React, {useCallback} from 'react';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import TableRow from '@material-ui/core/TableRow';
import {useHistory} from 'react-router-dom';

import {Intermediary} from '../Intermediaries.types';

type ItermediaryListItemComponentProps = {
	item: Intermediary;
	onDelete: (item: Intermediary) => void;
}

function IntermediaryListItemComponent({item, onDelete}: ItermediaryListItemComponentProps) {
	const {id, order, createdAt, name} = item;
	const history = useHistory();
	const goToDetails = useCallback(() => history.push('/intermediaries/' + id), [history, id]);
	const handleDelete = useCallback((e) => {
		e.stopPropagation();
		onDelete(item);
	}, [onDelete, item]);

	return (
		<TableRow hover onClick={goToDetails}>
			<TableCell component="th" scope="row">
				{/*TODO use library to format dates to any format (day.js for ex.)*/}
				{new Date(createdAt).toLocaleString()}
			</TableCell>
			<TableCell>{name}</TableCell>
			<TableCell>{order}</TableCell>
			<TableCell>
				<Button>Edit</Button>
				<Button onClick={handleDelete}>Delete</Button>
			</TableCell>
		</TableRow>
	);
}

export default React.memo(IntermediaryListItemComponent);