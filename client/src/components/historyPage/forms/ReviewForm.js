import React from 'react'
import {useForm} from 'react-hook-form';
import {useSelector, useDispatch} from 'react-redux';
import {updateModalStepBackwards, closeModal} from '../../../actions/historyPage/modalActions';
import axios from 'axios';

function ReviewForm() {
    const allDriveDays = useSelector( (state) => state.historyModal.driveDays);
    const selectedDriveDateIndex = useSelector( (state) => state.historyModal.selectedDriveDateIndex);
    const selectedDriveDate = useSelector( (state) => state.historyModal.selectedDriveDate);
    const sessionNumber = useSelector( (state) => state.historyModal.selectedSessionNumber);
    const lapNumber = useSelector( (state) => state.historyModal.selectedLapNumber);
    const displayedSessions = useSelector( (state) => state.historyModal.displayedSessions);
    const dispatch = useDispatch();
    const {handleSubmit, errors} = useForm();

    const onSubmit = async (data) => {
        const sensorData = await axios.get(`http://localhost:4000/api/v1/data?dates=${selectedDriveDate}&session_numbers=${sessionNumber}&lap_numbers=${lapNumber}&sensors=speeds`);
        
        addNewDateToDisplayedSessions();

        // console.log(displayedSessions);

        const availableLaps =  allDriveDays[selectedDriveDateIndex]["sessions"][0]["laps"].filter( (lap) => {
            return !displayedSessions[selectedDriveDate]["sessions"][0]["laps"].includes(lap.lap_number);
        });

        // console.log(availableLaps);

        dispatch(closeModal());
        // console.log(sensorData.data);
    }

    const addNewDateToDisplayedSessions = () => {

        if ( !(selectedDriveDate in displayedSessions) ) {
            const newSession = { sessions: [ { number: Number(sessionNumber), laps: [ Number(lapNumber)] } ] }
            displayedSessions[selectedDriveDate] = newSession;
            return
        }

        addNewSessionToDateSessions();
    }

    const addNewSessionToDateSessions = () => {
        const sessionIndex = displayedSessions[selectedDriveDate]["sessions"].findIndex(session => session.number == sessionNumber);

        if (sessionIndex === -1) {
            displayedSessions[selectedDriveDate]["sessions"].push({ number: Number(sessionNumber), laps: [Number(lapNumber)]});
            return
        }

        addNewLapToDateSessions(sessionIndex);
    }

    const addNewLapToDateSessions = (sessionIndex) => {
        const lapIndex = displayedSessions[selectedDriveDate]["sessions"][sessionIndex]["laps"].findIndex(lap => lap === Number(lapNumber));
       
        if (lapIndex === -1) {
             displayedSessions[selectedDriveDate]["sessions"][sessionIndex]["laps"].push(Number(lapNumber));
             return
         }
    }

    return (
        <div>
            <h2>Review</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="drive-day-data">
                    <div className="drive-day__date">
                        Drive Day: {new Date(selectedDriveDate + " ").toDateString("en-us") }
                    </div>
                    <div className="drive-day__session_number">
                        Session Number: {sessionNumber}
                    </div>
                    <div className="drive-day__lap_number">
                        Lap Number: {lapNumber}
                    </div>
                </div>
                <div className="d-flex">
                    <button type="button" onClick={() => {dispatch(updateModalStepBackwards() )}} className="d-block">Back</button>
                    <button className="btn btn-primary" type="submit" className="d-block">Submit</button>
                </div>
            </form>
    </div>
    )
}

export default ReviewForm;
