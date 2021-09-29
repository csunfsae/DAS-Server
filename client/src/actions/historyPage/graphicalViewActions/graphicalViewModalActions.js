export const UPDATE_MODAL_STEP_FORWARD = "UPDATE_MODAL_STEP_FORWARD";
export const UPDATE_MODAL_STEP_BACKWARDS = "UPDATE_MODAL_STEP_BACKWARDS";
export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";
export const UPDATE_SELECTED_SENSOR = "UPDATE_SELECTED_SENSOR";

export const updateModalStepForward = () => ({
    type: UPDATE_MODAL_STEP_FORWARD
});

export const updateModalStepBackwards = () => ({
    type: UPDATE_MODAL_STEP_BACKWARDS
});

export const openModal = () => ({
    type: OPEN_MODAL
});

export const closeModal = () => ({
    type: CLOSE_MODAL
});

export const updateSelectedSensor = sensor => ({
    type: UPDATE_SELECTED_SENSOR,
    payload: sensor
});