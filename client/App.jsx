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

// Router
import {
    Switch,
    Route,
    Link
} from 'react-router-dom';

function App(props){
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
        </span>
    )
}

export default hot(App);