// React
import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';

// Components
import ChatMessage from './Message';
import ChatJoin from './ChatJoin';

// API
import { subscribeMessages, unsubscribeMessages } from '../socket/api';

// Ads
import AdSense from 'react-adsense';

var box;

function Messages(props){
    const [messages, setMessages] = useState(global.messages);

    useEffect(() => {
        subscribeMessages(receiveMessage);
        return () => unsubscribeMessages(receiveMessage);
    })

    useEffect(() => {
        box = document.getElementById('chat-box');
    }, []);

    var receiveMessage = (type, data = {}) => {
        if(type === 'create'){
            setMessages(global.messages);
            box.scrollTop = box.scrollHeight;
        }
    }

    let ChatMessages = messages.map((m, i) => {
        let Component = m.join ? ChatJoin : ChatMessage;
        return (<Component message={m} key={i} last={i === messages.length - 1} id={i} />);
    });

    let mobileAd = <AdSense.Google client='' slot='' />;
    let desktopAdOne = <AdSense.Google client='' slot='' />;
    let desktopAdTwo = <AdSense.Google client='' slot='' />;

    return (
        <div className="columns">
            <div className="column is-12 is-hidden-desktop">
                {mobileAd}
            </div>
            <div className="column is-1 is-hidden-desktop-only is-hidden-touch">
                {desktopAdOne}
            </div>
            <div className="column">
                <div className="is-scrolling" id="chat-box">
                    {ChatMessages}
                </div>
            </div>
            <div className="column is-1 is-hidden-desktop-only is-hidden-touch">
                {desktopAdTwo}
            </div>
        </div>
    )
}

export default hot(Messages);