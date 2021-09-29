import React from 'react';
import {useForm} from 'react-hook-form';
import {useSelector, useDispatch} from 'react-redux';
import { updateModalStepBackwards } from '../../../../../actions/historyPage/graphicalViewActions/graphicalViewModalActions';


function ReviewForm(props) {
    const dispatch = useDispatch();
    const {handleSubmit} = useForm();

    const onSubmit = async (data) => {
        // dispatch(updateModalStepForward());
    }

    return (
        <div>
            <h2>
                Review 
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="drive-day__date">
                    Sensor: {props.selectedSensor}
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
