import React from 'react';
import {useForm} from 'react-hook-form';
import {useSelector, useDispatch} from 'react-redux';
import {updateSelectedSessionNumber, updateModalStepForward, updateModalStepBackwards} from '../../../actions/historyPage/modalActions';

function SessionSelectionForm(props) {

    const {handleSubmit, register} = useForm();
    
    const allDriveDays = useSelector( (state) => state.historyModal.driveDays);

    const selectedDriveDateIndex = useSelector( (state) => state.historyModal.selectedDriveDateIndex);

    const displayedSessions = useSelector( (state) => state.historyModal.displayedSessions);

    const selectedDriveDate = allDriveDays[selectedDriveDateIndex].date;
    
    const getAvailableSessions = () => {

        if( !(selectedDriveDate in displayedSessions) ) {
            return allDriveDays[selectedDriveDateIndex]["sessions"];
        }

        const sessions = allDriveDays[selectedDriveDateIndex]["sessions"].filter( (session) => {
            return !displayedSessions[selectedDriveDate]["sessions"].some( (displayedSession) => {
                return displayedSession.number === session.number
            }); 
        });

        return sessions;
    }
    
    const availableSessions = getAvailableSessions();

    const dispatch = useDispatch();
    
    const onSubmit = async (data) => {
        dispatch(updateSelectedSessionNumber(data.driveDateSession)) 
        dispatch ( updateModalStepForward() )       
    }
    
    const renderSessionSelection = () => {
        if (availableSessions.length <= 0) {
            return (
                <>
                    <p>There are no other sessions on {new Date(selectedDriveDate + " ").toDateString("en-us")} </p>
                    <button type="button" onClick={() => {dispatch(updateModalStepBackwards() )}}>Back</button>
                </>
            )
        }

        return (
            <>
                <div className="form-group">
                    <select defaultValue={props.sessionData} className="form-control" name="driveDateSession" ref={register}>
                        {availableSessions.map( (session, index) =>
                            <option key={index + 1} value={session.number}>{session.number}</option>
                        )}
                    </select>
                </div>
                <div>
                    <button type="button" onClick={() => {dispatch(updateModalStepBackwards() )}}>Back</button>
                    <button className="btn btn-primary" type="submit">Next</button>
                </div>
            </>
        )
    }

    return (
        <div>
            <h2>Select Session:</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                { renderSessionSelection() }
            </form>
        </div>
    )
}




export default SessionSelectionForm;
