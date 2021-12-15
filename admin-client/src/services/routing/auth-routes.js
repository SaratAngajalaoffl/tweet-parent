import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LoginScreen from 'screens/auth/login';
import SignupScreen from 'screens/auth/signup';

function AuthRoutes() {
	return (
		<Switch>
			<Route exact path='/signup' component={SignupScreen} />
			<Route exact path='*' component={LoginScreen} />
		</Switch>
	);
}

export default AuthRoutes;
