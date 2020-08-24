// React
import React, { useState } from 'react';
import { hot } from 'react-hot-loader/root';

// API
import { createQuestion } from '../socket/api';

function Modal(props){
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    var closeModal = () => {
        document.querySelector('.modal').classList.remove('is-active');
        setQuestion('');
        setAnswer('');
    }

    var updateQuestion = (event) => setQuestion(event.currentTarget.value);
    var updateAnswer = (event) => setAnswer(event.currentTarget.value);

    var submitQuestion = (event) => {
        event.preventDefault();
        if(question === '' || answer === '') return;
        createQuestion({question, answer});
        closeModal();
    }

    return (
        <div className="modal">
            <div className="modal-background" onClick={closeModal}></div>
            <div className="modal-content">
                <div className="box">
                    <form onSubmit={submitQuestion} className="has-text-centered">
                        <div className="field">
                            <label className="label">Question</label>
                            <div className="control">
                                <input className="input" type="text" placeholder="Type your question..." value={question} onChange={updateQuestion}></input>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Answer</label>
                            <div className="control">
                                <input className="input" type="text" placeholder="Type the answer..." value={answer} onChange={updateAnswer}></input>
                            </div>
                        </div>
                        <input type="submit" className="button is-light" />
                    </form>
                </div>
            </div>
            <button className="modal-close is-large" aria-label="close" onClick={closeModal}></button>
        </div>
    )
}

export default hot(Modal);