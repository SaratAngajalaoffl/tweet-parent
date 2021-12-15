import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LoginScreen from 'screens/auth/login';

function AuthRoutes() {
    return (
        <Switch>
            <Route exact path="*" component={LoginScreen} />
        </Switch>
    );
}

export default AuthRoutes;
