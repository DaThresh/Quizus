// React
import React from 'react';
import { hot } from 'react-hot-loader/root';

// Search
import { Search } from 'js-search';

// Child import
import Modal from './Modal';
import Question from './Question';

// CSS
import '../css/questions.css';

// API
import { subscribeQuestions, unsubscribeQuestions, castVote } from '../socket/api';

// Ads
import AdSense from 'react-adsense';

class Questions extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            questions: global.questions,
            search: ''
        }
        this.setupSearch();
    }
    
    componentDidMount(){
        subscribeQuestions(this.receiveQuestion);
    }

    componentWillUnmount(){
        unsubscribeQuestions(this.receiveQuestion);
    }

    setupSearch = () => {
        this.jsSearch = new Search('_id');
        this.jsSearch.addIndex('answer');
        this.jsSearch.addIndex('question');
        this.jsSearch.addDocuments(this.state.questions);
    }

    openModal = () => document.querySelector('.modal').classList.add('is-active');

    search = (event) => this.setState({ search: event.target.value });

    receiveQuestion = (type, data = {}) => {
        this.setState({ questions: global.questions })
        if(type === 'create') this.jsSearch.addDocument(data);
        else if(type === 'vote') this.setupSearch();
    }

    vote = (vote) => {
        let response = canVote(vote);
        if(response[0] === false) return;
        if(response[1]) Object.assign(vote, { revoke: true });
        else Object.assign(vote, { revoke: false });
        castVote(vote);
    }

    render(){
        var questions = this.state.questions;
        if(this.state.search !== '') questions = this.jsSearch.search(this.state.search);
        var renderQuestions = questions.map(question => <Question question={question} key={question._id} vote={this.vote} />)
        if(questions.length === 0 && this.state.questions.length !== 0) renderQuestions = <NotFound />

        let mobileAd = <AdSense.Google client='' slot='' />;
        let desktopAdOne = <AdSense.Google client='' slot='' />;
        let desktopAdTwo = <AdSense.Google client='' slot='' />;

        return(
            <div className="columns">
                <div className="column is-12 is-hidden-desktop">
                    {mobileAd}
                </div>
                <div className="column is-hidden-touch is-hidden-desktop-only is-1">
                    {desktopAdOne}
                </div>
                <div className="column">
                    <div className="columns">
                        <div className="column has-text-left has-text-centered-mobile">
                            <button className="button is-link is-hidden-mobile" onClick={this.openModal}>
                                Create Question
                            </button>
                            <button className="button is-link is-fullwidth is-hidden-tablet" onClick={this.openModal}>
                                Create Question
                            </button>
                        </div>
                        <div className="column  is-offset-one-third has-text-right has-text-centered-mobile">
                            <input
                                className="input"
                                type="text"
                                name="search"
                                value={this.state.search}
                                onChange={this.search}
                                placeholder="Search questions..." />
                        </div>
                    </div>
                    {renderQuestions}
                    <Modal />
                </div>
                <div className="column is-1 is-hidden-touch is-hidden-desktop-only">
                    {desktopAdTwo}
                </div>
            </div>
        )
    }
}

function NotFound(){
    return (
        <div className="columns">
            <div className="column has-text-centered">
                <p>
                    No results
                </p>
            </div>
        </div>
    )
}

function canVote(vote){
    let sessionValue = sessionStorage.getItem(vote.question);
    if(sessionValue === vote.direction) return [false];
    sessionStorage.setItem(vote.question, vote.direction);
    return [true, sessionValue];
}

export default hot(Questions);