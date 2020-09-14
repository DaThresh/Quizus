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

// Services
import { pushNotification } from './services/notifications';

// Router
import { Switch, Route } from 'react-router-dom';

function App(){
    const room = (
        <span id="room">
            <Topbar fetchProgress={fetchProgress} notifyCopy={notifyCopy} />
            <Wrapper fetchProgress={fetchProgress} notifyCopy={notifyCopy} />
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

function fetchProgress(current){
    if(!global.exam.createdAt) return current - 1;
    let createdAt = new Date(global.exam.createdAt).getTime();
    let now = new Date().getTime();
    let timeDiff = now - createdAt;
    return 100 - (timeDiff / global.exam.duration * 100);
}

function notifyCopy(){
    pushNotification({header: 'Copied', message: 'Link copied to clipboard', type: 'info'});
}

export default hot(App);