// React
import React from 'react';
import { hot } from 'react-hot-loader/root';

function Join(props){
    const data = props.data;
    const animal = data.animal;
    const color = props.getAnimalColor(animal);
    
    let extraCharacter = '';
    switch(animal[0]){
        case 'A':
        case 'E':
        case 'I':
        case 'O':
        case 'U':
            extraCharacter = 'n'
    }

    return (
        <div className="content has-text-centered">
            <span style={{color}}>
                - A{extraCharacter} {animal} has joined your exam -
            </span>
        </div>
    )
}

export default hot(Join);