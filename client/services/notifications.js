var subscriptions = [];
var id = 1;

const notificationTypes = ['dark', 'link', 'info', 'success', 'warning', 'danger'];

function pushNotification(notification){
    if(typeof notification !== 'object' || !notification.header || !notification.message || !notification.type) return;
    if(!notificationTypes.includes(notification.type)) return;
    notification.id = id;
    notification.created = new Date().getTime();
    id++;
    deliver(notification);
    return notification.id;
}

function subscribe(callback){
    if(!subscriptions.includes(callback)) subscriptions.push(callback);
}

function unsubscribe(callback){
    if(subscriptions.includes(callback)) subscriptions.splice(subscriptions.indexOf(callback), 1);
}

export {
    pushNotification,
    subscribe,
    unsubscribe,
}

function deliver(notification){
    subscriptions.forEach(callback => callback({
        event: 'deliver',
        notification,
    }));
}