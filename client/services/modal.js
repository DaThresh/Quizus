// Analytics
import ReactGA from 'react-ga';

// Utilities
import { isLive } from '../utilities/environment';

const openEventName = 'open';
const closeEventName = 'close';

var subscriptions = [];
var modal = null;

function openModal(component, label){
    notify(openEventName, {component});
    getModal().classList.add('is-active');
    if(!isLive()) return;
    ReactGA.event({ category: 'Modal', action: 'Open', label: label });
}

function closeModal(){
    notify(closeEventName);
    getModal().classList.remove('is-active');
}

function getModal(){
    if(!modal) modal = document.querySelector('.modal');
    return modal;
}

function notify(event, extraData = {}){
    subscriptions.forEach(callback => {
        callback(Object.assign({event}, extraData))
    })
}

function subscribe(callback){
    if(!subscriptions.includes(callback)) subscriptions.push(callback);
}

function unsubscribe(callback){
    if(subscriptions.includes(callback)) subscriptions.splice(subscriptions.indexOf(callback), 1);
}

export {
    openModal,
    closeModal,
    subscribe,
    unsubscribe,
}