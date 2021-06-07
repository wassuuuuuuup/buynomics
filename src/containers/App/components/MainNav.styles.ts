import {makeStyles} from '@material-ui/core/styles';

import {DRAWER_WIDTH} from '../App.constants';

export const mainNavStyles = makeStyles((theme) => ({
	drawer: {
		width: DRAWER_WIDTH,
		flexShrink: 0,
		whiteSpace: 'nowrap',
	},
	drawerOpen: {
		width: DRAWER_WIDTH,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerClose: {
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		overflowX: 'hidden',
		width: theme.spacing(7) + 1,
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing(9) + 1,
		},
	},
	list: {
		'& a': {
			textDecoration: 'none',
			color: 'inherit',
		},
		'& .active > *': {
			backgroundColor: theme.palette.grey[300]
		}
	},
	listItem: {
		paddingLeft: theme.spacing(3),
	},
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
	},
}));
