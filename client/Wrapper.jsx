// React
import React, { useState, useEffect } from 'react';

// Components
import Feed from './feed/Feed';
import Questions from './questions/Questions';
import Input from './feed/Input';

// Styles
import './sass/progress.scss';
import './sass/Wrapper.scss';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faQuestion, faLink } from '@fortawesome/free-solid-svg-icons';

// Services
import { subscribe, unsubscribe } from './services/socket/feed';
import { getAnimals } from './services/socket/room';

// Modules
import ClipboardJS from 'clipboard';

const animals = getAnimals();

function Wrapper(props){
    const [tab, setTab] = useState('chat');
    const [unRead, setUnRead] = useState(0);
    const [progress, setProgress] = useState(-1);

    useEffect(() => {
        new ClipboardJS('.copy-url');
    }, []);

    useEffect(() => {
        let time = progress === -1 ? 200 : 30 * 1000;
        let timeout = setTimeout(() => setProgress(props.fetchProgress()), time);
        return () => clearTimeout(timeout);
    }, [progress]);

    useEffect(() => {
        subscribe(receiveFeedEvent);
        return () => unsubscribe(receiveFeedEvent);
    }, [tab, unRead]);

    useEffect(() => {
        document.title = 'Quizus' + (unRead > 0 ? ' (' + unRead + ')' : '');
    }, [unRead]);

    var changeTab = (event) => {
        let tabName = event.currentTarget.id;
        if(tabName === 'chat' && unRead > 0) setUnRead(0);
        document.getElementById('tab-list').childNodes.forEach(node => {
            node.classList.remove('is-active');
        })
        document.getElementById(tabName).classList.add('is-active');
        setTab(tabName);
    }

    var receiveFeedEvent = (data) => {
        if(data.event === 'deliver' && tab !== 'chat') setUnRead(unRead + 1);
    }

    let progressClass = 'progress is-small has-tooltip';
    if(progress > 66) progressClass += ' is-success';
    else if(progress > 25) progressClass += ' is-warning';
    else progressClass += ' is-danger';
    if(progress < 10) progressClass += ' blink-me';

    return (
        <div>
            <section className="section" id="wrapper">
                <div className="container">
                    <div className="tabs is-centered is-boxed is-medium">
                        <ul id="tab-list" className="is-relative">
                            <div id="room-animal" style={{color: getAnimalColor(global.animal)}}>
                                {global.animal}
                            </div>
                            <li className="is-active" onClick={changeTab} id="chat">
                                <a>
                                    <span className="icon is-small">
                                        <FontAwesomeIcon icon={faComments} />
                                    </span>
                                    <span>Chat</span>
                                    {unRead > 0 ? <span class="tag is-info is-rounded" style={{marginLeft: '5px'}}>{unRead}</span> : null}
                                </a>
                            </li>
                            <li onClick={changeTab} id="questions">
                                <a>
                                    <span className="icon is-small">
                                        <FontAwesomeIcon icon={faQuestion} />
                                    </span>
                                    <span>Questions</span>
                                </a>
                            </li>
                            <div id="room-info">
                                <span className="up-right">Time left</span>
                                <progress id="room-progress-desktop"
                                        className={progressClass}
                                        value={progress}
                                        max="100">
                                </progress>
                                <span className="tooltip-text">
                                    <span className="copy-link copy-url" data-clipboard-text={window.location.href}>Copy the link <FontAwesomeIcon icon={faLink} className="copy-link-icon" /></span>
                                    <br />
                                    Invite your peers
                                </span>
                            </div>
                        </ul>
                    </div>
                </div>
            </section>
            <section className="section" id="content-section" style={{paddingTop: 0}}>
                {tab === 'chat' ? <Feed getAnimalColor={getAnimalColor} /> : <Questions />}
            </section>
            <Input />
        </div>
    )
}

function getAnimalColor(animal){
    if(animals[animal]) return animals[animal]['color'];
    return 'black';
}

export default Wrapper;