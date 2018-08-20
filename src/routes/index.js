import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Forecast from 'pages/forecast';
import Main from 'pages/main';
const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/forecast/:id" component={Forecast} />
            <Route exact path="/" component={Main} />
        </Switch>
    </BrowserRouter>
);

export default Routes;
