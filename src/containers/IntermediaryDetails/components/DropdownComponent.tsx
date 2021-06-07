import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function RangeComponent() {
	return (
		<Grid item container spacing={2} alignItems="center">
			<Grid item xs={4}>
				<TextField
					label="Option"
					variant="outlined"
					fullWidth
				/>
			</Grid>
			<Grid item xs={4}>
				<TextField
					label="Value"
					variant="outlined"
					fullWidth
					inputProps={{type: 'number', min: 0, pattern: '\\d+(\\.\\d{,6})?'}}
				/>
			</Grid>
			<Grid item xs={4}>
				<Button variant="outlined">Add</Button>
			</Grid>
		</Grid>
	);
}

export default React.memo(RangeComponent);
