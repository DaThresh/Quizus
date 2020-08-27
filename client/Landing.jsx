// React
import React, { useEffect } from 'react';
import { hot } from 'react-hot-loader/root';

// Styles
import './sass/Landing.scss';

// Components
import CreateRoom from './modals/CreateRoom';

// Services
import { openModal } from './services/modal';
import { getStats } from './services/http/api';
import { disconnect } from './services/socket/api';

// Modules
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faUsers, faAward } from '@fortawesome/free-solid-svg-icons';
import { CountUp } from 'countup.js';

function Landing(props){
    disconnect();

    useEffect(() => {
        let statElements = document.querySelectorAll('[is-stat]');
        getStats()
        .then(stats => startCounting(statElements, stats))
        .catch(error => console.error(error));
    }, []);

    var startCounting = (elements, stats) => {
        let keys = Object.keys(stats);
        elements.forEach(element => {
            let name = element.getAttribute('name');
            if(keys.includes(name)) new CountUp(element.id, stats[name]).start();
        })
    }

    var modal = () => openModal(<CreateRoom />);

    return (
        <span id="landing">
            <section className="hero is-fullheight is-primary is-bold">
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <img src="/svg/logo.svg" alt="Quizus" height="100" width="250" />
                        <h2 className="subtitle">Pass Exams Together</h2>
                        <button className="button is-primary is-inverted create-exam has-text-weight-semibold" onClick={modal}>
                            Create Exam
                        </button>
                    </div>
                </div>
                <div className="hero-foot">
                    <div className="container" id="hero-footer-container">
                        <div className="box" id="hero-footer-box">
                            <div className="level">
                                <div className="level-item has-text-centered">
                                    <div>
                                        <p className="heading">Exams</p>
                                        <p className="title has-text-grey" id="exams-stat" name="exams" is-stat="true">0</p>
                                    </div>
                                </div>
                                <div className="level-item has-text-centered">
                                    <div>
                                        <p className="heading">Questions</p>
                                        <p className="title has-text-grey" id="questions-stat" name="questions" is-stat="true">0</p>
                                    </div>
                                </div>
                                <div className="level-item has-text-centered">
                                    <div>
                                        <p className="heading">Messages</p>
                                        <p className="title has-text-grey" id="messages-stat" name="messages" is-stat="true">0</p>
                                    </div>
                                </div>
                                <div className="level-item has-text-centered">
                                    <div>
                                        <p className="heading">Hours</p>
                                        <p className="title has-text-grey" id="hours-stat" name="hours" is-stat="true">0</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container has-text-centered">
                    <div className="columns is-vcentered">
                        <div className="column">
                            <img src="/svg/cap.svg" alt="Graduation cap" height="300" width="300" />
                            <h2 className="title">Collaborative Exams</h2>
                        </div>
                        <div className="column">
                            <div className="content image-holder">
                                <img src="/img/questions.png" alt="Questions example" className="image image-front" />
                                <img src="/img/chat.png" alt="Chat example" className="image image-back" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="content has-text-centered">
                        <h2 className="title">How does it work?</h2>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <ul className="steps has-content-centered is-hollow has-gaps">
                        <li className="step-item is-info is-completed">
                            <div className="step-marker">
                                <FontAwesomeIcon icon={faPlus} />
                            </div>
                            <div className="step-details">
                                <p className="step-title">Create Exam</p>
                                <p>enter exam name and time</p>
                            </div>
                        </li>
                        <li className="step-item is-info is-completed">
                            <div className="step-marker">
                                <FontAwesomeIcon icon={faUsers} />
                            </div>
                            <div className="step-details">
                                <p className="step-title">Invite Peers</p>
                                <p>with your unique link</p>
                            </div>
                        </li>
                        <li className="step-item is-info is-completed">
                            <div className="step-marker">
                                <FontAwesomeIcon icon={faAward} />
                            </div>
                            <div className="step-details">
                                <p className="step-title">Ace Exams</p>
                                <p>collaboratively</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="content has-text-centered">
                        <h3 className="subtitle has-text-weight-medium">Once time's up, the <strong>anonymous</strong> entries are gone forever.</h3>
                        <h4 className="subtitle has-text-weight-medium">Simple as can be.</h4>
                        <button className="button is-primary create-exam has-text-weight-semibold" onClick={modal}>Create Exam</button>
                    </div>
                </div>
            </section>

            <footer className="footer">
                <div className="content has-text-centered">
                    <p>Created by the Quizus Team.</p>
                    <p>Special thanks to the technologies that we're built with.</p>
                    <p className="has-text-centered">
                        <a href="https://socket.io" alt="SocketIO Website">SocketIO</a> | <a href="https://bulma.io" alt="Bulma Website">Bulma</a>
                    </p>
                </div>
            </footer>
        </span>
    )
}

export default hot(Landing);