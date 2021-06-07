import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

type PromptProps = {
	show: boolean;
	title: string;
	onClose: () => void;
	onAccept: () => void;
}

function Prompt({title, show, onClose, onAccept}: PromptProps) {
	return (
		<Dialog open={show} onClose={onClose}>
			<DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
			<DialogActions>
				<Button onClick={onClose} color="primary">
					Cancel
				</Button>
				<Button onClick={onAccept} color="primary">
					Agree
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default React.memo(Prompt);
