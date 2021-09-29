import React from 'react';
import {useForm} from 'react-hook-form';
import {useSelector, useDispatch} from 'react-redux';
import {updateSelectedLapNumber, updateModalStepForward, updateModalStepBackwards} from '../../../actions/historyPage/modalActions';

function LapSelectionForm(props) {

    const {handleSubmit, register} = useForm();
    
    const allDriveDays = useSelector( (state) => state.historyModal.driveDays);

    const selectedDriveDateIndex = useSelector( (state) => state.historyModal.selectedDriveDateIndex);

    const sessionNumber = useSelector( (state) => state.historyModal.selectedSessionNumber);

    const dispatch = useDispatch();
    
    const onSubmit = async (data) => {
        // console.log(data.lap);
        dispatch(updateSelectedLapNumber(data.lap));
        dispatch (updateModalStepForward());
    }

    return (
        <div>
            <h2>Select Lap: </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <select defaultValue={props.lapData} className="form-control" name="lap" ref={register}>
                        {allDriveDays[selectedDriveDateIndex]["sessions"][sessionNumber -1]["laps"].map( (lap, index) =>
                            <option key={index + 1} value={lap.lap_number}>{lap.lap_number}</option>
                        )}
                    </select>
                </div>
                <div className="d-flex">
                    <button type="button" onClick={() => {dispatch(updateModalStepBackwards() )}} className="d-block"> Back </button>
                    <button className="btn btn-primary" type="submit" className="d-block">Next</button>
                </div>
            </form>
        </div>
    )
}




export default LapSelectionForm;
