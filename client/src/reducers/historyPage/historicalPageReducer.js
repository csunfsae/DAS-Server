import {ADD_NEW_SENSOR_TO_DISPLAYED_SENSORS, ADD_NEW_SESSION_TO_DISPLAYED_SESSIONS, SET_SENSORS_DATA} from '../../actions/historyPage/historicalPageActions';

const initialState = {
    allSensors: ["Throttle Position", "Brake Position"],
    displayedSensors: [],
    displayedSessions: [],
    sensorsData: {}
}

function historicalPageReducer (state = initialState, action) {
    switch (action.type) {
        case ADD_NEW_SENSOR_TO_DISPLAYED_SENSORS:
            return {
                ...state,
                displayedSensors: [...state.displayedSensors, action.payload]
            }

        case ADD_NEW_SESSION_TO_DISPLAYED_SESSIONS:
            return {
                ...state,
                displayedSessions: [...state.displayedSessions, action.payload]
            }
         case SET_SENSORS_DATA:
            return {
               ...state,
               sensorsData: action.payload
         }

        default:
            return state;
    }

}

export default historicalPageReducer;