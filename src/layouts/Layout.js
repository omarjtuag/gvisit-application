import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AuthLayout from './auth/AuthLayout';
import DashboardLayout from './dashboard/DashboardLayout';

const Layout = () => {
    const isLogged = useSelector(state => state.auth.isLogged);

    if (isLogged) {
        return (
            <Router>
                <Switch>
                    <Route path="/dashboard" component={DashboardLayout} />
                    <Redirect to="/dashboard" />
                </Switch>
            </Router>
        );
    } else {
        return (
            <Router>
                <Switch>
                    <Route path="/auth" component={AuthLayout} />
                    <Redirect to="/auth" />
                </Switch>
            </Router>
        );
    }
}

export default Layout;