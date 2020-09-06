// React
import React, { useState, useEffect } from 'react';

// Services
import { subscribe, unsubscribe, closeModal } from './services/modal';

function Modal(){
    const [modal, setModal] = useState(null);

    useEffect(() => {
        subscribe(receiveModalEvent);
        return () => unsubscribe(receiveModalEvent);
    }, []);

    var receiveModalEvent = (data) => {
        if(data.event === 'open') setModal(data.component);
        if(data.event === 'close') setModal(null);
    }

    return (
        <div className="modal">
            <div className="modal-background" onClick={closeModal}></div>
            <div className="modal-content">
                <div className="box">
                    {modal}
                </div>
            </div>
            <button className="modal-close is-large" aria-label="close" onClick={closeModal}></button>
        </div>
    )
}

export default Modal;