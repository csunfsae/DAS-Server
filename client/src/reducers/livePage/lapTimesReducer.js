import { UPDATE_LAP_TIME, UPDATE_LAP_TIMES, UPDATE_BEST_LAP_TIME, UPDATE_LAP_COUNT, UPDATE_SPEEDOMETER } from "../../actions/livePage/lapTimesActions";

const initalState = {
    lapTime: "00:00",
    lapTimes: [],
    lapCount: 1,
    speedometer: 0,
    bestLapTime: {
        time: "00:00",
        lapNumber: 1
    },
}

function lapTimesReducer(state = initalState, action) {
    switch (action.type) {
        case UPDATE_LAP_TIME:
            return {
                ...state,
                lapTime: action.payload
            }

        case UPDATE_LAP_COUNT:
            return {
                ...state,
                lapCount: state.lapCount + 1
            }

        case UPDATE_LAP_TIMES:
            return {
                ...state,
                lapTimes: [...state.lapTimes, action.payload]
            }

        case UPDATE_BEST_LAP_TIME:
            return {
                ...state,
                bestLapTime: action.payload
            }

        case UPDATE_SPEEDOMETER:
            return {
                ...state,
                speedometer: action.payload
            }

        default:
            return state;
    }
}

export default lapTimesReducer;