// React
import React, { useState } from 'react';

// Services
import { createExam } from '../services/http/api';
import { closeModal } from '../services/modal';
import { pushNotification } from '../services/notifications';

// Router
import { useHistory } from 'react-router-dom';

function CreateRoom(){
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
            <div className="field is-horizontal">
                <div className="field-label is-normal">
                    <label className="label">Exam</label>
                </div>
                <div className="field-body">
                    <div className="field">
                        <div className="control">
                            <input className="input" name="name" id="name" value={name} onChange={updateName} placeholder="Mr Smith's Exam" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="field is-horizontal">
                <div className="field-label is-normal">
                    <label className="label">Length</label>
                </div>
                <div className="field-body">
                    <div className="field">
                        <div className="control">
                            <div className="select is-fullwidth">
                                <select name="duration" value={duration} onChange={updateDuration}>
                                    <option value="1">1 Hour</option>
                                    <option value="2">2 Hours</option>
                                    <option value="3">3 Hours</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="field is-grouped is-grouped-centered">
                <div className="control">
                    <button type="submit" className="button is-primary">Start!</button>
                </div>
            </div>
        </form>
    )
}

export default CreateRoom;