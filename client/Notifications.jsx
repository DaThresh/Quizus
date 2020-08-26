// React
import React from 'react';
import { hot } from 'react-hot-loader/root';

// Styles
import './sass/Notifications.scss';

function Notifications(props){
    return (
        <div id="notifications" className="is-hidden-mobile">
            <div className="message is-danger">
                <div className="message-header">
                    <p>Error</p>
                    <button className="delete" aria-label="delete"></button>
                </div>
                <div className="message-body">
                    Testing123
                </div>
            </div>
        </div>
    )
}

export default hot(Notifications);