// React
import React, { useState, useRef } from 'react';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare } from '@fortawesome/free-solid-svg-icons';

// API
import { createMessage } from '../services/socket/api';

function Input(){
    const [message, setMessage] = useState('');
    const inputRef = useRef();

    var handleChange = (event) => setMessage(event.currentTarget.value);

    var submitMessage = (event) => {
        if(message !== ''){
            createMessage({message, animal: global.animal, date: new Date()});
            setMessage('');
        }
        event.preventDefault();
        if(document.activeElement === inputRef.current) inputRef.current.focus();
    }

    return (
        <div id="messages-form" className="section">
            <div className="container">
                <form onSubmit={submitMessage} autoComplete="off">
                    <div className="field">
                        <p className="control has-icons-right">
                            <input 
                                ref={inputRef}
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

export default Input;