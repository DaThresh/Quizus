// React
import React from 'react';
import { hot } from 'react-hot-loader/root';

// Components
import ChatMessage from './Message';
import ChatJoin from './ChatJoin';

// API
import { subscribeMessages, unsubscribeMessages } from '../socket/api';

// Ads
import AdSense from 'react-adsense';

class Messages extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            messages: global.messages
        };
    }

    componentDidMount(){
        this.box = document.getElementById('chat-box');
        subscribeMessages(this.receiveMessage);
    }

    componentWillUnmount(){
        unsubscribeMessages(this.receiveMessage);
    }

    receiveMessage = (type, data = {}) => {
        if(type === 'create'){
            this.setState({ messages: global.messages })
            this.box.scrollTop = this.box.scrollHeight;
        }
    }

    render(){
        const ChatMessages = this.state.messages.map((m, i) => {
            let Component = m.join ? ChatJoin : ChatMessage;
            return (<Component message={m} key={i} last={i === this.state.messages.length - 1} id={i} />);
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
}

export default hot(Messages);