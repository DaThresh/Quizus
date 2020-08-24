// React
import React from 'react';
import { hot } from 'react-hot-loader/root';

class Message extends React.Component {
    constructor(props){
        super(props);
        this.state = props.message;
        this.state.date = new Date(props.message.date);
        this.state.elapsedTime = elapsedTime(this.state.date, new Date());
        this.last = props.last;
    }

    componentDidMount(){
        this.interval = setInterval(this.intervalLogic, 60000);
        if(this.last) document.getElementById(this.props.id).scrollIntoView();
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }

    intervalLogic = () => this.setState({ elapsedTime: elapsedTime(this.state.date, new Date()) });

    render(){
        let color = {color: getAnimalColor(this.state.animal)};

        return(
            <div className="box" id={this.props.id}>
                <article className="media">
                    <div className="media-content">
                        <div className="content">
                            <p>
                                <strong style={color}>Anon {this.state.animal}</strong>  <small>{this.state.elapsedTime}</small>
                                <br />
                                {this.state.message}
                            </p>
                        </div>
                    </div>
                </article>
            </div>
        )
    }
}

function elapsedTime(start, end){
    let timeDiff = end - start;
    timeDiff = Math.round(timeDiff / 1000);
    if(timeDiff < 60) return 'less than a minute ago';
    timeDiff = Math.floor(timeDiff / 60);
    if(timeDiff < 60) return timeDiff + 'm';
    return Math.floor(timeDiff / 60) + 'h';
}

function getAnimalColor(name){
    if(global.animals && global.animals[name]) return global.animals[name]['color'];
    return 'black';
}

export default hot(Message);