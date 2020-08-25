// React
import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';

// Search
import { Search } from 'js-search';

// Child import
import Modal from './Modal';
import Question from './Question';

// Styles
import '../sass/questions.scss';

// API
import { subscribeQuestions, unsubscribeQuestions, castVote } from '../socket/api';

// Ads
import AdSense from 'react-adsense';

var jsSearch;

function Questions(props){
    const [questions, setQuestions] = useState(global.questions);
    const [search, setSearch] = useState('');

    useEffect(() => {
        subscribeQuestions(receiveQuestion);
        return () => unsubscribeQuestions(receiveQuestion);
    });

    var setupSearch = () => {
        jsSearch = new Search('_id');
        jsSearch.addIndex('answer');
        jsSearch.addIndex('question');
        jsSearch.addDocuments(questions);
    }

    var openModal = () => document.querySelector('.modal').classList.add('is-active');

    var handleChange = (event) => setSearch(event.currentTarget.value);

    var receiveQuestion = (type, data = {}) => {
        setQuestions(global.questions);
        if(type === 'create') jsSearch.addDocument(data);
        else if(type === 'vote') setupSearch();
    }

    var vote = (vote) => {
        let response = canVote(vote);
        if(response[0] === false) return;
        if(response[1]) Object.assign(vote, { revoke: true });
        else Object.assign(vote, { revoke: false });
        castVote(vote);
    }

    let questionsCopy = questions;
    if(search !== '') questionsCopy = jsSearch.search(search);
    let renderQuestions = questionsCopy.map(question => <Question question={question} key={question._id} vote={vote} />);
    if(questionsCopy.length === 0 && questions.length !== 0) renderQuestions = <NotFound />

    let mobileAd = <AdSense.Google client='' slot='' />;
    let desktopAdOne = <AdSense.Google client='' slot='' />;
    let desktopAdTwo = <AdSense.Google client='' slot='' />;

    return (
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
                        <button className="button is-link is-hidden-mobile" onClick={openModal}>
                            Create Question
                        </button>
                        <button className="button is-link is-fullwidth is-hidden-tablet" onClick={openModal}>
                            Create Question
                        </button>
                    </div>
                    <div className="column  is-offset-one-third has-text-right has-text-centered-mobile">
                        <input
                            className="input"
                            type="text"
                            name="search"
                            value={search}
                            onChange={handleChange}
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