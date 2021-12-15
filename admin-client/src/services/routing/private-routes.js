import React from 'react';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import DashboardScreen from 'screens/private/dashboard';

function PrivateRoutes() {
    return (
        <Switch>
            <Route path="*" component={DashboardScreen} />
        </Switch>
    );
}

export default PrivateRoutes;
