// React
import React from 'react';
import { hot } from 'react-hot-loader/root';

// API
import { createQuestion } from '../socket/api';

var initialState = {
    answer: '',
    question: ''
}

class Modal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            question: '',
            answer: '',
        }
    }

    closeModal = () => {
        document.querySelector('.modal').classList.remove('is-active');
        this.setState(initialState);
    }

    updateQuestion = (event) => this.setState({ question: event.target.value });

    updateAnswer = (event) => this.setState({ answer: event.target.value });

    createQuestion = (event) => {
        event.preventDefault();
        if(this.state.question === '' || this.state.answer === '') return;
        createQuestion({
            question: this.state.question,
            answer: this.state.answer,
        });
        this.closeModal();
    }

    render(){
        return(
            <div className="modal">
                <div className="modal-background" onClick={this.closeModal}></div>
                <div className="modal-content">
                    <div className="box">
                        <form onSubmit={this.createQuestion} className="has-text-centered">
                            <div className="field">
                                <label className="label">Question</label>
                                <div className="control">
                                    <input className="input" type="text" placeholder="Type your question..." value={this.state.question} onChange={this.updateQuestion}></input>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Answer</label>
                                <div className="control">
                                    <input className="input" type="text" placeholder="Type the answer..." value={this.state.answer} onChange={this.updateAnswer}></input>
                                </div>
                            </div>
                            <input type="submit" className="button is-light" />
                        </form>
                    </div>
                </div>
                <button className="modal-close is-large" aria-label="close" onClick={this.closeModal}></button>
            </div>
        )
    }
}

export default hot(Modal);