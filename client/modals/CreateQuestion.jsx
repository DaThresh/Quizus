// React
import React, { useState } from 'react';

// Services
import { createQuestion } from '../services/socket/api';
import { closeModal } from '../services/modal';

function CreateQuestion(){
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    var updateQuestion = (event) => setQuestion(event.currentTarget.value);
    var updateAnswer = (event) => setAnswer(event.currentTarget.value);

    var submitQuestion = (event) => {
        event.preventDefault();
        if(question === '' || answer === '') return;
        createQuestion({question, answer});
        closeModal();
    }

    return (
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
    )
}

export default CreateQuestion;