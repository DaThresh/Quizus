// React
import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';

function Message(props){
    const data = props.data;
    const date = new Date(data.date);
    const [elapsedTime, setElapsedTime] = useState(calculateElapsedTime(date, new Date()));

    useEffect(() => {
        let interval = setInterval(intervalLogic, 60000);
        return () => clearInterval(interval);
    }, []);

    var intervalLogic = () => setElapsedTime(calculateElapsedTime(date, new Date()));

    let color = props.getAnimalColor(data.animal);

    return (
        <div className="box">
            <article className="media">
                <div className="media-content">
                    <div className="content">
                        <p>
                            <strong style={{color}}>Anon {data.animal}</strong>  <small>{elapsedTime}</small>
                            <br />
                            {data.message}
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

export default hot(Message);