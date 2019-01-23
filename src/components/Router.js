import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Navigation from './Navigation';
import NotFound from './NotFound';
import Content from './Content';
import Day from './Day';

const Routering = () => (
	<Router history={browserHistory}>
		<Route path='/'component={Navigation}>
			<IndexRoute component={Content}/>
			<Route path='/day/:dayId' component={Day}/>
		</Route>
		<Route path="*" component={NotFound}/>
	</Router>
);

export default Routering;