var subscriptions = [];

var feed = [];

function receiveMessage(message){
    feed.push(message);
    deliver();
}

function receiveJoin(animal){
    feed.push({animal});
    deliver();
}

function getFeed(){
    return feed;
}

function subscribe(callback){
    if(!subscriptions.includes(callback)) subscriptions.push(callback);
}

function unsubscribe(callback){
    if(subscriptions.includes(callback)) subscriptions.splice(subscriptions.indexOf(callback), 1);
}

export {
    receiveMessage,
    receiveJoin,
    getFeed,
    subscribe,
    unsubscribe,
}

function deliver(){
    subscriptions.forEach(callback => callback({
        event: 'deliver',
        feed
    }));
}