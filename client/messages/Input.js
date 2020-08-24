// React
import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare } from '@fortawesome/free-solid-svg-icons';

// API
import { createMessage } from '../socket/api';

var input;

function Input(props){
    const [message, setMessage] = useState('');

    useEffect(() => {
        input = document.getElementById('chat-input');
    }, []);

    handleChange = (event) => setMessage(event.currentTarget.value);

    submitMessage = (event) => {
        if(message !== ''){
            createMessage({message, animal: global.animal, date: new Date()});
            setMessage('');
        }
        event.preventDefault();
        if(document.activeElement === input) input.focus();
    }

    return (
        <div id="messages-form" className="section">
            <div className="container">
                <form onSubmit={submitMessage} autoComplete="off">
                    <div className="field">
                        <p className="control has-icons-right">
                            <input 
                                id="chat-input"
                                className="input is-rounded" 
                                type="text" name="chat" 
                                placeholder="Enter your message" 
                                value={message} 
                                onChange={handleChange} />
                            <span className="icon is-right is-pointable" onClick={submitMessage}>
                                <FontAwesomeIcon icon={faShare} />
                            </span>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default hot(Input);