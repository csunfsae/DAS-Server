export const UPDATE_BATTERY_VOLTAGE = "UPDATE_BATTERY_VOLTAGE";
export const UPDATE_MOTOR_TEMP = "UPDATE_MOTOR_TEMP";
export const UPDATE_MOTOR_CONTROLLER_AIR_TEMP = "UPDATE_MOTOR_CONTROLLER_AIR_TEMP";
export const UPDATE_SPEED = "UPDATE_SPEED";

export const updateBatteryVoltage = value => ( {
    type: UPDATE_BATTERY_VOLTAGE, 
    payload: {value}
});

export const updateMotorTemp = value => ( {
    type: UPDATE_MOTOR_TEMP, 
    payload: {value}
});

export const updateMotorControllerAirTemp = value => ( {
    type: UPDATE_MOTOR_CONTROLLER_AIR_TEMP, 
    payload: {value}
});

export const updateSpeed = value => ( {
    type: UPDATE_SPEED, 
    payload: {value}
});

