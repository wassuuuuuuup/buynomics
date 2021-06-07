import React, {useCallback, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import {DropdownItem} from '../../Intermediaries/Intermediaries.types';

enum TextInputs {
	OPTION,
	VALUE,
}

interface DropdownComponentProps {
	options?: DropdownItem[];
	onChange: (data: DropdownItem[]) => void;
}

function DropdownComponent({options = [], onChange}: DropdownComponentProps) {
	const [option, setOption] = useState('');
	const [value, setValue] = useState('');

	const handleChange = useCallback(({target: {name, value}}) => {
		switch (+name) {
		case TextInputs.OPTION: setOption(value);
			break;
		case TextInputs.VALUE: setValue(value);
			break;
		}
	}, []);

	const onAdd = useCallback(() => {
		onChange([...options, {option, value: parseFloat(value)}]);
		setOption('');
		setValue('');
	}, [option, value, onChange, options]);

	const onDelete = useCallback(({currentTarget: {dataset: {index}}}) => {
		const newOptions = options.slice();
		newOptions.splice(+index, 1);
		onChange(newOptions);
	}, [options, onChange]);

	const onEdit = useCallback(() => {
		// TODO edit option
	}, []);

	return (
		<Grid item container spacing={2} alignItems="center">
			{
				options.map((option, index) => (
					<>
						<Grid item xs={4}>
							<TextField
								value={option.option}
								label="Option"
								variant="outlined"
								disabled
								fullWidth
							/>
						</Grid>
						<Grid item xs={4}>
							<TextField
								value={option.value}
								label="Value"
								variant="outlined"
								disabled
								fullWidth
								inputProps={{type: 'number', min: 0}}
							/>
						</Grid>
						<Grid item xs={4}>
							<Button data-index={index} onClick={onEdit}>Edit</Button>
							<Button data-index={index} onClick={onDelete}>Delete</Button>
						</Grid>
					</>
				))
			}
			<Grid item xs={4}>
				<TextField
					name={TextInputs.OPTION.toString()}
					value={option}
					label="Option"
					variant="outlined"
					onChange={handleChange}
					fullWidth
				/>
			</Grid>
			<Grid item xs={4}>
				<TextField
					name={TextInputs.VALUE.toString()}
					value={value}
					label="Value"
					variant="outlined"
					onChange={handleChange}
					fullWidth
					inputProps={{type: 'number', min: 0}}
				/>
			</Grid>

			<Grid item xs={4}>
				<Button fullWidth variant="outlined" onClick={onAdd}>Add</Button>
			</Grid>
		</Grid>
	);
}

export default React.memo(DropdownComponent);
