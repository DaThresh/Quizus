// React
import React, { useState } from 'react';
import { hot } from 'react-hot-loader/root';

function CreateRoom(props){
    const [submitting, setSubmitting] = useState(false);
    const [name, setName] = useState('');
    const [duration, setDuration] = useState("1");

    var updateName = (event) => setName(event.currentTarget.value);
    var updateDuration = (event) => setDuration(event.currentTarget.value);

    var submit = (event) => {
        event.preventDefault();
        if(submitting) return;
        setSubmitting(true);
    }

    return (
        <form autocomplete="off" onSubmit={submit}>
            <div class="field">
                <label class="label">Exam name</label>
                <div class="control">
                    <input class="input" name="name" id="name" value={name} onChange={updateName} />
                </div>
            </div>
            <div class="field">
                <div class="control">
                    <div class="select is-medium">
                        <select name="duration" value={duration} onChange={updateDuration}>
                            <option value="1">1 Hour</option>
                            <option value="2">2 Hours</option>
                            <option value="3">3 Hours</option>
                        </select>
                    </div>
                </div>
            </div>
            <button type="submit" class="button is-primary">Start!</button>
        </form>
    )
}

export default hot(CreateRoom);