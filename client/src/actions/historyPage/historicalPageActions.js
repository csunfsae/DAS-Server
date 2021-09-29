import axios from 'axios';

export const ADD_NEW_SENSOR_TO_DISPLAYED_SENSORS = "ADD_NEW_SENSOR_TO_DISPLAYED_SENSORS";
export const ADD_NEW_SESSION_TO_DISPLAYED_SESSIONS = "ADD_NEW_SESSION_TO_DISPLAYED_SESSIONS";
export const LOAD_SENSORS_FROM_DATABASE = "LOAD_SENSORS_FROM_DATABASE";
export const LOAD_DEFAULT_SENSOR_DATA = "LOAD_DEFAULT_SENSOR_DATA";
export const SET_SENSORS_DATA = "SET_SENSORS_DATA";

export const addNewSensorToDisplayedSensors = sensor => ({
    type: ADD_NEW_SENSOR_TO_DISPLAYED_SENSORS, 
    payload: sensor
})

export const addNewSessionToDisplayedSessions = session => ({
    type: ADD_NEW_SESSION_TO_DISPLAYED_SESSIONS, 
    payload: session
})

export const loadDefaultSensorData = () => async (dispatch, getState) => {
    const lastDriveDay = await axios.get("http://localhost:4000/api/v1/drive-days");
    const sensorsData = await axios.get(`http://localhost:4000/api/v1/data?dates=${lastDriveDay.data.date}&session_numbers=1&lap_numbers=1,2&sensors=throttlepositions,brakepositions,steeringangles,speeds,batteryvoltages,rltireloads`);
    dispatch(setSensorsData(sensorsData.data))
}

export const setSensorsData = sensorsData => ({
    type: SET_SENSORS_DATA,
    payload: sensorsData
})

