import axios from 'axios';
import ReactGA from 'react-ga';
import { isLive } from '../../utilities/environment';

const hostName = window.location.origin;

function createExam(name, duration){
    return new Promise((resolve, reject) => {
        axios.post(hostName + '/create', {name, duration})
        .then(response => {
            if(response.status === 201) resolve(response.data.code);
            else reject(response);
        })
        .catch(error => reject(error));
        if(isLive()) ReactGA.event({
            category: 'Room',
            action: 'Create',
            value: parseInt(duration),
        });
    });
}

function getStats(){
    return new Promise((resolve, reject) => {
        axios.get(hostName + '/stats')
        .then(response => {
            if(response.status === 200) resolve(response.data.server);
            else reject(response);
        })
        .catch(error => reject(error));
    })
}

export {
    createExam,
    getStats,
}