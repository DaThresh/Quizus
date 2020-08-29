// React
import React, { useState } from 'react';
import { hot } from 'react-hot-loader/root';

// Services
import { createExam } from '../services/http/api';
import { closeModal } from '../services/modal';
import { pushNotification } from '../services/notifications';

// Router
import { useHistory } from 'react-router-dom';

function CreateRoom(props){
    const [submitting, setSubmitting] = useState(false);
    const [name, setName] = useState('');
    const [duration, setDuration] = useState("1");
    const history = useHistory();

    var updateName = (event) => setName(event.currentTarget.value);
    var updateDuration = (event) => setDuration(event.currentTarget.value);

    var submit = (event) => {
        event.preventDefault();
        if(submitting) return;
        setSubmitting(true);
        createExam(name, duration)
        .then(code => history.push('/join/' + code))
        .catch(error => handleError(error))
        .finally(() => closeModal());
    }

    var handleError = (error) => {
        pushNotification({type: 'danger', header: 'Error', message: 'An error occured while trying to create the exam room.'});
        console.error(error);
    }

    return (
        <form autoComplete="off" onSubmit={submit}>
            <div className="field">
                <label className="label">Exam name</label>
                <div className="control">
                    <input className="input" name="name" id="name" value={name} onChange={updateName} />
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <div className="select is-medium">
                        <select name="duration" value={duration} onChange={updateDuration}>
                            <option value="1">1 Hour</option>
                            <option value="2">2 Hours</option>
                            <option value="3">3 Hours</option>
                        </select>
                    </div>
                </div>
            </div>
            <button type="submit" className="button is-primary">Start!</button>
        </form>
    )
}

export default hot(CreateRoom);