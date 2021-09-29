import {UPDATE_BATTERY_VOLTAGE, UPDATE_MOTOR_TEMP, UPDATE_MOTOR_CONTROLLER_AIR_TEMP, UPDATE_SPEED} from '../../actions/livePage/monitoringActions';

const initalState = {
    batteryVoltage: {
        min: 13.703,
        max: 14.754,
        value: 13.703
    },
    motorTemp: {
        min: 168.799,
        max: 188.597,
        value: 168.799
    },
    motorControllerAirTemp: {
        min: 57.316,
        max: 72.361,
        value: 57.316
    },
    speed: 0
}

function monitoringReducer(state = initalState, action) {
    switch (action.type) {
        case UPDATE_BATTERY_VOLTAGE:
            return {
                ...state,
                batteryVoltage: { ...state.batteryVoltage, value: action.payload }
            }

        case UPDATE_MOTOR_TEMP:
            return {
                ...state,
                motorTemp:{ ...state.motorTemp, value: action.payload }
            }
            
        case UPDATE_MOTOR_CONTROLLER_AIR_TEMP:
            return {
                ...state,
                motorControllerAirTemp: { ...state.motorControllerAirTemp, value: action.payload }
            }

        case UPDATE_SPEED:
            return {
                ...state,
                speed: action.payload
            }
        default:
            return state;
    }
}

export default monitoringReducer;