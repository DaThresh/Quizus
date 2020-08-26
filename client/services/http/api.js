import axios from 'axios';

const hostName = window.location.origin;

function createExam(name, duration){
    return new Promise((resolve, reject) => {
        axios.post(hostName + '/create', {name, duration})
        .then(response => {
            if(response.status === 201) resolve(response.data.code);
            else reject(response);
        })
        .catch(error => reject(error));
    });
}

export {
    createExam,
}