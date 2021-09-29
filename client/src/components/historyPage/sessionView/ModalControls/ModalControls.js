import React from 'react'
import {updateModalStep, openModal} from '../../../../actions/historyPage/modalActions';
import {useDispatch} from 'react-redux';

function ModalControls({date, sessionData}) {
    const dispatch =  useDispatch();

    function openModalStep(step) {
        dispatch(updateModalStep(step));
        dispatch(openModal());
    }

    
    return (
        <div>
            <div>
                <button onClick={() => openModalStep(1)}>
                    {`Date: ${new Date(date + " ").toLocaleDateString("en-us")}`} 
                </button>
            </div>
            {  sessionData["sessions"].map( (session, index) => 
                <>
                <div>
                    <button onClick={() => openModalStep(3)}>
                        Session: { session.number }
                    </button> 
                </div>
                <div>
                    <button onClick={() => openModalStep(4)}>
                        Laps: { session["laps"].join(', ') }
                    </button> 
                </div>
                </>
            )}

        </div>
    )
}


export default ModalControls;
