var subscriptions = [];

var questions = [];

function injectQuestions(injectableQuestions){
    questions = injectableQuestions;
}

function receiveQuestion(question){
    questions.push(question);
    deliver();
}

function receiveVote(votedQuestion){
    let index = questions.findIndex(question => question._id === votedQuestion._id);
    questions[index]['votes'] = votedQuestion['votes'];
    deliver();
}

function getQuestions(){
    return questions;
}

function subscribe(callback){
    if(!subscriptions.includes(callback)) subscriptions.push(callback);
}

function unsubscribe(callback){
    if(subscriptions.includes(callback)) subscriptions.splice(subscriptions.indexOf(callback), 1);
}

export {
    injectQuestions,
    receiveQuestion,
    receiveVote,
    getQuestions,
    subscribe,
    unsubscribe,
}

function deliver(){
    subscriptions.forEach(callback => callback({
        event: 'deliver',
        questions,
    }));
}