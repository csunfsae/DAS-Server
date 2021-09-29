import React from 'react'
import {useForm, Controller} from 'react-hook-form';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {updateSearchedDriveDayBeginDate, updateSearchedDriveDayEndDate, addSearchedDriveDays, updateModalStepForward} from '../../../actions/historyPage/modalActions';
import {useDispatch} from 'react-redux';

function DateForm(props) {

    const {handleSubmit, control} = useForm();
    const dispatch = useDispatch();

    const onSubmit = async (data) => {
        const driveDayStartDateISO = new Date(data.startDate).toISOString();
        const driveDayEndDateISO = new Date(data.endDate).toISOString();

        const driveDayStartDate = driveDayStartDateISO.substr(0, driveDayStartDateISO.indexOf("T"));
        const driveDayEndDate = driveDayEndDateISO.substr(0, driveDayEndDateISO.indexOf("T"));

        dispatch(updateSearchedDriveDayBeginDate(driveDayStartDate));
        dispatch(updateSearchedDriveDayEndDate(driveDayEndDate));

        const driveDays = await axios.get(`http://localhost:4000/api/v1/drive-days?dates=${driveDayStartDate},${driveDayEndDate}`);

        dispatch(addSearchedDriveDays(driveDays.data));
        dispatch(updateModalStepForward());
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="d-flex">
                <div className="mr-2">
                    <p>Start Date</p>
                    <Controller name="startDate" control={control} render={ 
                        ( { onChange, value, defaultValue} ) => (
                        <DatePicker selected={value} placeholderText="Search Start Date"  onChange={onChange} showYearDropdown />
                    )} />
                </div>
                <div>
                    <p>End Date</p>
                    <Controller name="endDate" control={control} render={ 
                        ( { onChange, value } ) => (
                        <DatePicker placeholderText="Search End Date" selected={value} onChange={onChange} showYearDropdown />
                    )} /> 
                </div>
            </div>
            <button className="btn btn-primary" type="submit" className="d-block">Next</button>
        </form>
    )
}

export default DateForm;
