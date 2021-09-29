import React from 'react';
import {useForm} from 'react-hook-form';
import {useSelector, useDispatch} from 'react-redux';
import {updateSelectedDriveDate, updateSelectedDriveDateIndex, updateModalStepForward,  updateModalStepBackwards} from '../../../actions/historyPage/modalActions';

function DriveDaySelectionForm(props) {
    
    const allDriveDays = useSelector( (state) => state.historyModal.driveDays);
    const dispatch = useDispatch();
    const {handleSubmit, register} = useForm();
    
    const onSubmit = async (data) => {
        const [driveDate, driveDateIndex] = data.driveDate.split(" ");
        dispatch(updateSelectedDriveDateIndex(Number(driveDateIndex)));
        dispatch(updateSelectedDriveDate(driveDate));
        dispatch (updateModalStepForward());
    }

    return (
        <div>
            <h2>Select Drive Date</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <select defaultValue={props.driveDateData.selectedDriveDate + " " + props.driveDateData.selectedDriveDateIndex} className="form-control" name="driveDate" ref={register}>
                        {allDriveDays.map( (searchDay, index) =>
                            <option key={index} value={searchDay.date  + " " + index}>{new Date(searchDay.date + " ").toDateString("en-us")}</option>
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


export default DriveDaySelectionForm;
