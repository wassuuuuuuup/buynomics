import React from 'react';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import { Provider } from 'react-redux';

import {appStyles} from './App.styles';
import MainNav from './components/MainNav';
import store from '../../store';
import Intermediaries from '../Intermediaries';
import IntermediaryDetails from '../IntermediaryDetails';
import {ROUTES} from '../../common/constants';

function App(): JSX.Element {
	const classes = appStyles();
	const [open, setOpen] = React.useState(false);

	const toggleDrawer = () => setOpen(!open);

	return (
		<Router>
			<Provider store={store}>
				<div className={classes.root}>
					<CssBaseline />
					<AppBar
						position="fixed"
						className={clsx(classes.appBar, {
							[classes.appBarShift]: open,
						})}
					>
						<Toolbar>
							<IconButton
								color="inherit"
								onClick={toggleDrawer}
								edge="start"
							>
								<MenuIcon />
							</IconButton>
							<Typography variant="h6" noWrap>Buynomics</Typography>
						</Toolbar>
					</AppBar>
					<MainNav open={open} />
					<main className={classes.content}>
						<div className={classes.toolbar} />
						<Switch>
							<Route exact path={ROUTES.ITERMEDIARIES}><Intermediaries /></Route>
							<Route exact path={ROUTES.ITERMEDIARY_DETAILS}><IntermediaryDetails /></Route>
							<Redirect from="*" to={ROUTES.ITERMEDIARIES} />
						</Switch>
					</main>
				</div>
			</Provider>
		</Router>
	);
}

export default App;
