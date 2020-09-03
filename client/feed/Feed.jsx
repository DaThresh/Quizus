// React
import React, { useState, useEffect } from 'react';

// Components
import Message from './Message';
import Join from './Join';

// API
import { subscribe, unsubscribe, getFeed } from '../services/socket/feed';

// Ads
import AdSense from 'react-adsense';

function Feed(props){
    const [feed, setFeed] = useState(getFeed());

    useEffect(() => {
        subscribe(receiveFeedEvent);
        return () => unsubscribe(receiveFeedEvent);
    }, [feed]);

    var receiveFeedEvent = (data) => {
        if(data.event === 'deliver') setFeed([...data.feed]);
    }

    let renderedFeed = feed.map((feedObj, i) => {
        let passProps = {key: i, id: i, data: feedObj, last: i === feed.length - 1, getAnimalColor: props.getAnimalColor};
        return feedObj.message ? <Message {...passProps} /> : <Join {...passProps} />;
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
                    {renderedFeed}
                </div>
            </div>
            <div className="column is-1 is-hidden-desktop-only is-hidden-touch">
                {desktopAdTwo}
            </div>
        </div>
    )
}

export default Feed;