// React
import React from 'react';
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

class Wrapper extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            tab: global.tab,
            unRead: global.unRead,
            progress: -1,
        }
    }

    componentDidMount(){
        this.timeout = setTimeout(this.updateProgress, 100);
    }

    componentWillUnmount(){
        clearTimeout(this.timeout);
    }

    changeTab = (event) => {
        let tabName = event.currentTarget.id;
        global.tab = tabName;
        let update = { tab: tabName };
        if(tabName === 'chat') Object.assign(update, { unRead: 0 });
        this.setState(update);
        document.getElementById('tab-list').childNodes.forEach(node => {
            node.classList.remove('is-active');
        })
        document.getElementById(tabName).classList.add('is-active');
    }

    copyLink = () => navigator.clipboard.writeText(window.location.href);

    updateProgress = () => {
        let progress = fetchProgress();
        this.setState({ progress: progress });
        if(progress !== -1) this.timeout = setTimeout(this.updateProgress, 1000 * 60);
        else this.timeout = setTimeout(this.updateProgress, 300);
    }

    render(){
        let CurrentTab = componentMapper[this.state.tab];
        let progressClass = 'progress is-small has-tooltip';
        if(this.state.progress > 66) progressClass += ' is-success';
        else if(this.state.progress > 25) progressClass += ' is-warning';
        else progressClass += ' is-danger';
        if(this.state.progress < 10) progressClass += ' blink-me';

        return (
            <div>
                <section className="section" id="wrapper">
                    <div className="container">
                        <div className="tabs is-centered is-boxed is-medium">
                            <ul id="tab-list" className="is-relative">
                                <li className="is-active" onClick={this.changeTab} id="chat">
                                    <a>
                                        <span className="icon is-small">
                                            <FontAwesomeIcon icon={faComments} />
                                        </span>
                                        <span>Chat</span>
                                    </a>
                                </li>
                                <li onClick={this.changeTab} id="questions">
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
                                            value={this.state.progress}
                                            max="100">
                                    </progress>
                                    <span className="tooltip-text">
                                        <span onClick={this.copyLink} className="copy-link">Copy the link <FontAwesomeIcon icon={faLink} className="copy-link-icon" /></span>
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
}

function fetchProgress(){
    if(!global.exam.createdAt) return -1;
    let createdAt = new Date(global.exam.createdAt).getTime();
    let now = new Date().getTime();
    let timeDiff = now - createdAt;
    return Math.round(100 - (timeDiff / global.exam.duration * 100));
}

export default hot(Wrapper);