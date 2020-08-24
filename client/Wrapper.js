// React
import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';

// Components
import Chat from './messages/Messages';
import Questions from './questions/Questions';
import Input from './messages/Input';

// CSS
import './css/progress.css';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faQuestion, faLink } from '@fortawesome/free-solid-svg-icons';

var componentMapper = {
    'chat': Chat,
    'questions': Questions
}

global.tab = 'chat';

function Wrapper(props){
    const [tab, setTab] = useState(global.tab);
    const [unRead, setUnRead] = useState(global.unRead);
    const [progress, setProgress] = useState(-1);
    const [timeout, updateTimeout] = useState(0);

    useEffect(() => {
        updateTimeout(setTimeout(updateProgress, 100));
        return () => clearTimeout(timeout);
    }, []);

    var changeTab = (event) => {
        let tabName = event.currentTarget.id;
        global.tab = tabName;
        setTab(tabName);
        if(tabName === 'chat') setUnRead(0);
        document.getElementById('tab-list').childNodes.forEach(node => {
            node.classList.remove('is-active');
        })
        document.getElementById(tabName).classList.add('is-active');
    }
    
    var copyLink = () => navigator.clipboard.writeText(window.location.href);

    var updateProgress = () => {
        let time;
        let progress = fetchProgress();
        setProgress(progress);
        if(progres !== -1) time = 1000 * 60;
        else time = 300;
        updateTimeout(updateProgress, time);
    }

    let CurrentTab = componentMapper[tab];
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
                            <li className="is-active" onClick={changeTab} id="chat">
                                <a>
                                    <span className="icon is-small">
                                        <FontAwesomeIcon icon={faComments} />
                                    </span>
                                    <span>Chat</span>
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
                                        style={{marginBottom: '0'}}
                                        value={progress}
                                        max="100">
                                </progress>
                                <span className="tooltip-text">
                                    <span onClick={copyLink} className="copy-link">Copy the link <FontAwesomeIcon icon={faLink} className="copy-link-icon" /></span>
                                    <br />
                                    Invite your peers
                                </span>
                            </div>
                        </ul>
                    </div>
                </div>
            </section>
            <section className="section" id="content-section" style={{paddingTop: 0}}>
                <CurrentTab />
            </section>
            <Input />
        </div>
    )
}

function fetchProgress(){
    if(!global.exam.createdAt) return -1;
    let createdAt = new Date(global.exam.createdAt).getTime();
    let now = new Date().getTime();
    let timeDiff = now - createdAt;
    return Math.round(100 - (timeDiff / global.exam.duration * 100));
}

export default hot(Wrapper);