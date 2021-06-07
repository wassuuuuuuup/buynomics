import React from 'react';
import clsx from 'clsx';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import {NavLink} from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import BusinessIcon from '@material-ui/icons/Business';
import StoreIcon from '@material-ui/icons/Store';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';

import {mainNavStyles} from './MainNav.styles';

type MainNavProps = {
	open: boolean;
}

function MainNav({open}: MainNavProps): JSX.Element {
	const classes = mainNavStyles();
	return (
		<Drawer
			variant="permanent"
			className={clsx(classes.drawer, {
				[classes.drawerOpen]: open,
				[classes.drawerClose]: !open,
			})}
			classes={{
				paper: clsx({
					[classes.drawerOpen]: open,
					[classes.drawerClose]: !open,
				}),
			}}
		>
			<div className={classes.toolbar} />
			<Divider />
			<List className={classes.list}>
				<NavLink to="/intermediaries">
					<ListItem button className={classes.listItem}>
						<ListItemIcon><BusinessIcon /></ListItemIcon>
						<ListItemText primary="Intermediary list" />
					</ListItem>
				</NavLink>
				<ListItem button className={classes.listItem}>
					<ListItemIcon><StoreIcon /></ListItemIcon>
					<ListItemText primary="Product list" />
				</ListItem>
			</List>
		</Drawer>
	);
}

export default MainNav;