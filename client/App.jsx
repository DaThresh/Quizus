// React
import React, { useState } from 'react';
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
    // Create room service where you fetch to see if you are in the room
    const [inRoom, setInRoom] = useState(false);

    const room = (
        <span id="room">
            <Topbar />
            <Wrapper />
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

export default hot(App);