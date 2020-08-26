import io from 'socket.io-client';
import { init, receiveDisconnect } from './room';
import { receiveJoin, receiveMessage } from './feed';
import { receiveQuestion, receiveVote } from './questions';

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
}

function createQuestion(question){
    socket.emit('questions.create', question);
}

function castVote(vote){
    socket.emit('questions.vote', vote);
}

export default setup;
export {
    createMessage,
    createQuestion,
    castVote,
}