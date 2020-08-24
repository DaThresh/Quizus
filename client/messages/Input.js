// React
import React from 'react';
import { hot } from 'react-hot-loader/root';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare } from '@fortawesome/free-solid-svg-icons';

// API
import { createMessage } from '../socket/api';

class Input extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: ''
        }
    }

    componentDidMount(){
        this.input = document.getElementById('chat-input')
    }

    handleChange = (event) => this.setState({ value: event.currentTarget.value });

    submitMessage = (event) => {
        if(this.state.value !== ''){
            let message = this.state.value;
            createMessage({message: message, animal: global.animal, date: new Date()});
            this.setState({value: ''});
        }
        event.preventDefault();
        if(document.activeElement === this.input) this.input.focus();
    }
    
    render(){
        return (
            <div id="messages-form" className="section">
                <div className="container">
                    <form onSubmit={this.submitMessage} autoComplete="off">
                        <div className="field">
                            <p className="control has-icons-right">
                                <input 
                                    id="chat-input"
                                    className="input is-rounded" 
                                    type="text" name="chat" 
                                    placeholder="Enter your message" 
                                    value={this.state.value} 
                                    onChange={this.handleChange} />
                                <span className="icon is-right is-pointable" onClick={this.submitMessage}>
                                    <FontAwesomeIcon icon={faShare} />
                                </span>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default hot(Input);