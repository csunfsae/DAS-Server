export const UPDATE_STEERING_ANGLE = "UPDATE_STEERING_ANGLE";
export const UPDATE_THROTTLE_POSITION = "UPDATE_THROTTLE_POSITION";
export const UPDATE_BRAKE_POSITION = "UPDATE_BRAKE_POSITION";
export const UPDATE_GG_DIAGRAM = "UPDATE_GG_DIAGRAM";
export const UPDATE_JETSON_CONNECTION = "UPDATE_JETSON_CONNECTION";

export const updateSteeringAngle = steeringAngle => ({
    type: UPDATE_STEERING_ANGLE, 
    payload: steeringAngle
});

export const updateThrottlePosition = throttlePosition => ({
    type: UPDATE_THROTTLE_POSITION, 
    payload: throttlePosition
});

export const updateBrakePosition = brakePosition => ({
    type: UPDATE_BRAKE_POSITION, 
    payload: brakePosition
});

export const updateGGDiagram = GGValue => ({
    type: UPDATE_GG_DIAGRAM, 
    payload: GGValue
});

export const updateJetsonConnection = connection => ({
    type: UPDATE_JETSON_CONNECTION,
    payload: connection
})