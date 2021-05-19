import React from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { ReadUser, CreateUser, UpdateUser } from './views/User';
import { ReadMotive, CreateMotive, UpdateMotive } from './views/Motive';
import { ReadSetting } from './views/Setting';
import { ReadSelection, ReadAlready, ReadEntry, ReadExit, ReadFirsttime, ReadUpdate } from './views/Access';
import { ReadEntrys } from './views/Entrys';

const DashboardRouter = ({ match: { url } }) => (
    <Switch>
        <Route path={`${url}/users`} exact component={ReadUser} />
        <Route path={`${url}/users/create`} exact component={CreateUser} />
        <Route path={`${url}/users/:id`} exact component={UpdateUser} />
        <Route path={`${url}/motives`} exact component={ReadMotive} />
        <Route path={`${url}/motives/create`} exact component={CreateMotive} />
        <Route path={`${url}/motives/:id`} exact component={UpdateMotive} />
        <Route path={`${url}/settings`} exact component={ReadSetting} />
        <Route path={`${url}/access`} exact component={ReadSelection} />
        <Route path={`${url}/access/already`} exact component={ReadAlready} />
        <Route path={`${url}/access/entry`} exact component={ReadEntry} />
        <Route path={`${url}/access/exit`} exact component={ReadExit} />
        <Route path={`${url}/access/firsttime`} exact component={ReadFirsttime} />
        <Route path={`${url}/access/update`} exact component={ReadUpdate} />
        <Route path={`${url}/visits`} exact component={ReadEntrys} />
        <Redirect to="/dashboard/access" />
    </Switch>
);

export default withRouter(DashboardRouter);