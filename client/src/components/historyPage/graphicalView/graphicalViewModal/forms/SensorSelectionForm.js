import React from 'react';
import {useForm} from 'react-hook-form';
import {useSelector, useDispatch} from 'react-redux';
import { updateModalStepForward, updateSelectedSensor } from '../../../../../actions/historyPage/graphicalViewActions/graphicalViewModalActions';


function SensorSelectionForm(props) {
    
    const dispatch = useDispatch();
    const {handleSubmit, register} = useForm();

    const allSensors = useSelector( (state) => state.generalHistoricalData.allSensors);
    const displayedSensors = useSelector( (state) => state.generalHistoricalData.displayedSensors);

    const availableSensors = allSensors.filter( (sensor) => {
        return !displayedSensors.includes(sensor);
    });

    const onSubmit = async (data) => {
        dispatch(updateSelectedSensor(data.sensor))
        dispatch(updateModalStepForward());
    }

    return (
        <>
        <h2>
            Select Sensor: 
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <select className="form-control" name="sensor" ref={register}>
                    {availableSensors.map( (sensor, index) =>
                        <option key={index} value={sensor}>{sensor}</option>
                    )}
                </select>
            </div>
        
            <div className="d-flex">
                <button className="btn btn-primary" type="submit" className="d-block">Next</button>
            </div>
        </form>
        </>
    )
}

export default SensorSelectionForm;
