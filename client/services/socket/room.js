import { injectQuestions } from './questions';
import { pushNotification } from '../notifications';

var subscriptions = [];

var animals = {};

function init(exam, socket){
    injectQuestions(exam.questions);
    exam.animals.forEach(animal => animals[animal.name] = animal);
    global.animal = exam.animal.name;
    delete exam.questions;
    delete exam.animals;
    socket.emit('room.join', exam.animal.name);
    global.exam = exam;
    delete exam.animal;
}

function receiveDisconnect(reason = ''){
    pushNotification({header: 'Disconnected', type: 'danger', message: 'You have been disconnected from the server'})
    subscriptions.forEach(callback => callback({
        event: 'disconnect',
        reason
    }));
}

function getAnimals(){
    return animals ? animals : [];
}

function subscribe(callback){
    if(!subscriptions.includes(callback)) subscriptions.push(callback);
}

function unsubscribe(callback){
    if(subscriptions.includes(callback)) subscriptions.splice(subscriptions.indexOf(callback), 1);
}

export {
    init,
    receiveDisconnect,
    getAnimals,
    subscribe,
    unsubscribe,
}