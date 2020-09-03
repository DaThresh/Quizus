// React
import React from 'react';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleUp, faArrowCircleDown } from '@fortawesome/free-solid-svg-icons';

function Question(props){
    let question = props.question;

    var progressClass = 'progress is-small';
    let totalVotes = question.votes.up + question.votes.down;
    if(totalVotes === 0) progressClass += ' is-gray';
    else {
        let upPercent = question.votes.up / totalVotes * 100;
        let classNumber = Math.round(upPercent / 5) * 5;
        progressClass += ' question-progress-' + classNumber;
    }

    let upVoteClass = '', downVoteClass = '';
    let votingDirection = sessionStorage.getItem(question._id);
    if(votingDirection === 'up') upVoteClass = 'has-text-success';
    else if(votingDirection === 'down') downVoteClass = 'has-text-danger';
    
    function vote(event) {
        let direction = event.currentTarget.attributes.getNamedItem('direction').value;
        props.vote({ question: question._id, direction: direction });
    }

    return(
        <div className="question" key={question._id}>
            <div className="box is-hidden-mobile">
                <article className="media">
                    <div className="media-content">
                        <div className="content">
                            <p>
                                <small>Q: </small> <strong>{question.question}</strong>
                                <br />
                                {question.answer}
                            </p>
                        </div>
                        <div className="level">
                            <div className="level-left">
                                <span className="level-item">
                                    <FontAwesomeIcon className={'vote-icon ' + upVoteClass} icon={faArrowCircleUp} onClick={vote} direction="up" />
                                </span>
                                <span className="level-item">
                                    <FontAwesomeIcon className={'vote-icon ' + downVoteClass} icon={faArrowCircleDown} onClick={vote} direction="down" />
                                </span>
                                <span className="level-item">
                                    <progress className={progressClass} value="100"></progress>
                                </span>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
            <div className="columns is-hidden-tablet">
                <div className="column">
                    <div className="card is-hidden-tablet">
                        <header className="card-header">
                            <p className="card-header-title">
                                {question.question}
                            </p>
                        </header>
                        <div className="card-content question-card-content">
                            <div className="content">
                                {question.answer}
                            </div>
                            <div className="content">
                                <progress className={'progress-full-width ' + progressClass} value="100"></progress>
                            </div>
                        </div>
                        <div className="card-footer">
                            <span className="card-footer-item" onClick={vote} direction="up">
                                <FontAwesomeIcon icon={faArrowCircleUp} className={upVoteClass} />
                            </span>
                            <span className="card-footer-item" onClick={vote} direction="down">
                                <FontAwesomeIcon icon={faArrowCircleDown} className={downVoteClass} />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Question;