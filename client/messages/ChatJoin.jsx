// React
import React from 'react';
import { hot } from 'react-hot-loader/root';

function ChatJoin(props){
    const message = props.message;
    
    let extraCharacter = '';
    switch(message.name[0]){
        case 'A':
        case 'E':
        case 'I':
        case 'O':
        case 'U':
            extraCharacter = 'n'
    }

    return (
        <div className="content has-text-centered">
            <span style={{color: message.color}}>
                - A{extraCharacter} {message.name} has joined your exam -
            </span>
        </div>
    )
}

export default hot(ChatJoin);