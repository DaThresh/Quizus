// React
import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';

function Message(props){
    const date = new Date(props.message.date);
    const [elapsedTime, setElapsedTime] = useState(calculateElapsedTime(date, new Date()));

    useEffect(() => {
        let interval = setInterval(intervalLogic, 60000);
        if(props.last) document.getElementById(props.id).scrollIntoView();
        return () => clearInterval(interval);
    }, []);

    var intervalLogic = () => setElapsedTime(calculateElapsedTime(date, new Date()));

    let color = {color: getAnimalColor(props.message.animal)};

    return (
        <div className="box" id={props.id}>
            <article className="media">
                <div className="media-content">
                    <div className="content">
                        <p>
                            <strong style={color}>Anon {props.message.animal}</strong>  <small>{elapsedTime}</small>
                            <br />
                            {props.message.message}
                        </p>
                    </div>
                </div>
            </article>
        </div>
    )
}

function calculateElapsedTime(start, end){
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