import io from 'socket.io-client';
import { init, receiveDisconnect } from './room';
import { receiveJoin, receiveMessage, injectFeed } from './feed';
import { receiveQuestion, receiveVote, injectQuestions } from './questions';
import { isLive } from '../../utilities/environment';
import ReactGA from 'react-ga';

var socket;

function setup(){
    socket = io(window.location.href);

    // Events
    socket.on('init', exam => init(exam, socket));

    socket.on('room.join', receiveJoin);
    socket.on('messages.create', receiveMessage);
    
    socket.on('questions.create', receiveQuestion);
    socket.on('questions.vote', receiveVote);

    socket.on('disconnect', receiveDisconnect);
}

function createMessage(message){
    socket.emit('messages.create', message);
    if(isLive()) ReactGA.event({
        category: 'Messages',
        action: 'Create',
    });
}

function createQuestion(question){
    socket.emit('questions.create', question);
    if(isLive()) ReactGA.event({
        category: 'Questions',
        action: 'Create',
    });
}

function castVote(vote){
    socket.emit('questions.vote', vote);
    if(isLive()) ReactGA.event({
        category: 'Questions',
        action: 'Vote',
        value: vote.direction === 'up' ? 1 : 2,
    });
}

function disconnect(){
    if(global.exam) global.exam = {};
    global.animal = '';
    if(socket) socket.disconnect();
    injectFeed([]);
    injectQuestions([]);

}

export default setup;
export {
    createMessage,
    createQuestion,
    castVote,
    disconnect,
}