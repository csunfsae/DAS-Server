import {UPDATE_FL_TIRE_LOAD, UPDATE_FL_TIRE_TEMP, UPDATE_FR_TIRE_LOAD, UPDATE_FR_TIRE_TEMP, 
    UPDATE_RL_TIRE_LOAD, UPDATE_RL_TIRE_TEMP,  UPDATE_RR_TIRE_LOAD, UPDATE_RR_TIRE_TEMP} from "../../actions/livePage/tiresActions";

const initalState = {
    FLTireLoad: {
        min: -87.25,
        max: 101.25,
        value: -87.25
    },
    FLTireTemp: {
        min: -87.25,
        max: 101.25,
        value: -87.25
    },
    FRTireLoad: {
        min: -76.5,
        max: 112.25,
        value:  -76.5
    },
    FRTireTemp: {
        min: -76.5,
        max: 112.25,
        value: -76.5
    },
    RLTireLoad: {
        min: -82.75,
        max: 146,
        value: -82.75
    },
    RLTireTemp: {
        min: -82.75,
        max: 146,
        value: -82.75
    },
    RRTireLoad: {
        min: -52.75,
        max: 249.25,
        value: -52.75
    },
    RRTireTemp: {
        min: -52.75,
        max: 249.25,
        value: -52.75
    } 
}

function tiresReducer(state = initalState, action) {
    switch (action.type) {
        case UPDATE_FL_TIRE_LOAD:
            return {
                ...state,
                FLTireLoad: { ...state.FLTireLoad, value: action.payload }
            }

        case UPDATE_FL_TIRE_TEMP:
            return {
                ...state,
                FLTireTemp: { ...state.FLTireTemp, value: action.payload }
            }

        case UPDATE_FR_TIRE_LOAD:
            return {
                ...state,
                FRTireLoad: { ...state.FRTireLoad, value: action.payload }
            }

        case UPDATE_FR_TIRE_TEMP:
            return {
                ...state,
                FRTireTemp: { ...state.FRTireTemp, value: action.payload }
            }

        case UPDATE_RL_TIRE_LOAD:
            return {
                ...state,
                RLTireLoad: { ...state.RLTireLoad, value: action.payload }
            }

        case UPDATE_RL_TIRE_TEMP:
            return {
                ...state,
                RLTireTemp: { ...state.RLTireTemp, value: action.payload }
            } 

        case UPDATE_RR_TIRE_LOAD:
            return {
                ...state,
                RRTireLoad: { ...state.RRTireLoad, value: action.payload }
            }

        case UPDATE_RR_TIRE_TEMP:
            return {
                ...state,
                RRTireTemp: { ...state.RRTireTemp, value: action.payload }
            }   
        default:
            return state;
    }
}

export default tiresReducer;