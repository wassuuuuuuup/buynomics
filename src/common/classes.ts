import {makeStyles} from '@material-ui/core/styles';

export const commonClasses = makeStyles((theme) => ({
	container: {
		paddingTop: theme.spacing(2.5),
		position: 'relative',
	},
	loading: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
	}
}));
