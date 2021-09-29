import React from 'react';
import LapTimes from './LapTimes/LapTimes';
import ModalControls from './ModalControls/ModalControls';
import {useSelector} from 'react-redux';

function SessionView() {
    const displayedSessions = useSelector(state => state.historyModal.displayedSessions);

    return (
        <>
            { Object.keys(displayedSessions).map((session, index) => {
                    return (
                        <div>
                            {/* <LapTimes /> */}
                            <ModalControls date={session} sessionData={displayedSessions[session]}/>
                        </div>
                    )
                })
            }
        </>
    )
}

export default SessionView;
