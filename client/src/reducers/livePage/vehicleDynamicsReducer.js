import {UPDATE_STEERING_ANGLE, UPDATE_THROTTLE_POSITION, UPDATE_BRAKE_POSITION, UPDATE_GG_DIAGRAM} from '../../actions/livePage/vehicleDynamicsActions';

const initalState = {
    steeringAngle: {
        min: -54.961,
        max: 48.945,
        value: -54.961
    },
    throttlePosition: {
        min: 0,
        max: 100,
        value: 0
    },
    brakePosition: {
        min: 0,
        max: 100,
        value: 0
    },
    gForceData: []
}

function vehicleDynamicsReducer (state = initalState, action) {
    switch(action.type) { 

        case UPDATE_STEERING_ANGLE:
            return {
                ...state,
                steeringAngle: { ...state.steeringAngle, value: action.payload }
            }

        case UPDATE_THROTTLE_POSITION:
            return {
                ...state,
                throttlePosition: { ...state.throttlePosition, value: action.payload }
            }
        
        case UPDATE_BRAKE_POSITION:
            return {
                ...state,
                brakePosition: { ...state.brakePosition, value: action.payload }
            }

        case UPDATE_GG_DIAGRAM:
            return {
                ...state, 
                gForceData: [...state.gForceData, action.payload]
            }
        default:
            return state;
    }
}

export default vehicleDynamicsReducer;
