// React
import React from 'react';
import { hot } from 'react-hot-loader/root';

// Styles
import './sass/App.scss';

// Components
import Landing from './Landing';
import Topbar from './Topbar';
import Wrapper from './Wrapper';
import Notifications from './Notifications';
import Modal from './Modal';

// Router
import { Switch, Route } from 'react-router-dom';

function App(){
    const room = (
        <span id="room">
            <Topbar fetchProgress={fetchProgress} />
            <Wrapper fetchProgress={fetchProgress} />
        </span>
    )

    return (
        <span id="app">
            <Switch>
                <Route path="/join/:examName">
                    {room}
                </Route>
                <Route path="/">
                    <Landing />
                </Route>
            </Switch>
            <Notifications />
            <Modal />
        </span>
    )
}

function fetchProgress(){
    if(!global.exam.createdAt) return -1;
    let createdAt = new Date(global.exam.createdAt).getTime();
    let now = new Date().getTime();
    let timeDiff = now - createdAt;
    return 100 - (timeDiff / global.exam.duration * 100);
}

export default hot(App);