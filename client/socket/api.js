import io from 'socket.io-client';
import init from './init';

var socket;
var subscriptions = {
    messages: [],
    questions: []
}

function setup(){
    socket = io(window.location.href);

    // Events
    socket.on('init', exam => init(exam, socket));

    socket.on('room.join', (animal) => {
        global.messages.push({
            join: true,
            name: animal.name,
            color: animal.color,
        });
        subscriptions.messages.forEach(subscription => subscription('create'));
    });

    socket.on('questions.create', (question) => {
        global.questions.push(question);
        subscriptions.questions.forEach(subscription => subscription('create', question));
    });
    
    socket.on('messages.create', (message) => {
        if(global.tab !== 'chat') global.unRead += 1;
        global.messages.push(message);
        subscriptions.messages.forEach(subscription => subscription('create'))
    })

    socket.on('questions.vote', (question) => {
        for(let i = 0; i < global.questions.length; i++){
            let current = global.questions[i];
            if(current._id === question._id){
                current.votes = question.votes;
                break;
            }
        }
        subscriptions.questions.forEach(subscription => subscription('vote'));
    });

    socket.on('disconnect', (reason) => {
        if(reason === 'io server disconnect') alert('This exam room has been closed.');
    });
}

function subscribeQuestions(cb){
    subscriptions.questions.push(cb);
}

function unsubscribeQuestions(cb){
    if(subscriptions.questions.includes(cb)){
        subscriptions.questions.splice(subscriptions.questions.indexOf(cb), 1);
    }
}

function createQuestion(question){
    socket.emit('questions.create', question);
}

function subscribeMessages(cb){
    subscriptions.messages.push(cb);
}

function unsubscribeMessages(cb){
    if(subscriptions.messages.includes(cb)){
        subscriptions.messages.splice(subscriptions.messages.indexOf(cb), 1);
    }
}

function createMessage(message){
    socket.emit('messages.create', message);
}

function castVote(vote){
    socket.emit('questions.vote', vote);
}

export {subscribeQuestions,
        createQuestion,
        subscribeMessages,
        createMessage,
        unsubscribeMessages,
        unsubscribeQuestions,
        castVote,
    };
export default setup;