// React
import React, { useState, useEffect } from 'react';

// Styles
import './sass/Notifications.scss';

// Services
import { subscribe, unsubscribe } from './services/notifications';

const size = window.innerWidth > 1024 ? 'normal' : 'small';

function Notifications(){
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        subscribe(receiveNotificationEvent);
        return () => unsubscribe(receiveNotificationEvent);
    }, [notifications]);
    
    useEffect(() => {
        let now = new Date().getTime();
        let timeouts = [];
        notifications.forEach(notification => {
            if(notification.created + 15 * 1000 < now) destructNotification(notification.id);
            else {
                let left = (notification.created + 15 * 1000) - now;
                timeouts.push(setTimeout(() => destructNotification(notification.id), left));
            }
        });
        return () => timeouts.forEach(timeout => clearTimeout(timeout));
    }, [notifications]);

    var receiveNotificationEvent = (data) => {
        if(data.event === 'deliver') setNotifications([...notifications, data.notification]);
    }

    var destructNotification = (id) => {
        let index = notifications.findIndex(notification => notification.id === id);
        if(index === -1) return;
        let copy = notifications;
        copy.splice(index, 1);
        setNotifications([...copy]);
    }

    return (
        <div id="notifications">
            {notifications.map(notification => <Message key={notification.id - 1} notification={notification} destructNotification={destructNotification} />)}
        </div>
    )
}

function Message(props){
    let notification = props.notification;

    var destroy = () => props.destructNotification(notification.id);

    return (
        <div className={'message is-' + size + ' is-' + notification.type}>
            <div className="message-header">
                <p>{notification.header}</p>
                <button className="delete" aira-label="delete" onClick={destroy}></button>
            </div>
            <div className="message-body">
                {notification.message}
            </div>
        </div>
    )
}

export default Notifications;