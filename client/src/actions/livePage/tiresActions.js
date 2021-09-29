export const UPDATE_FL_TIRE_LOAD = "UPDATE_FL_TIRE_LOAD";
export const UPDATE_FL_TIRE_TEMP = "UPDATE_FL_TIRE_TEMP";

export const UPDATE_FR_TIRE_LOAD = "UPDATE_FR_TIRE_LOAD";
export const UPDATE_FR_TIRE_TEMP = "UPDATE_FR_TIRE_TEMP";

export const UPDATE_RL_TIRE_LOAD = "UPDATE_RL_TIRE_LOAD";
export const UPDATE_RL_TIRE_TEMP = "UPDATE_RL_TIRE_TEMP";

export const UPDATE_RR_TIRE_LOAD = "UPDATE_RR_TIRE_LOAD";
export const UPDATE_RR_TIRE_TEMP = "UPDATE_RR_TIRE_TEMP";

export const updateFLTireLoad = value => ({
    type: UPDATE_FL_TIRE_LOAD, 
    payload: {value}
});

export const updateFLTireTemp = value => ({
    type: UPDATE_FL_TIRE_TEMP, 
    payload: {value}
});

export const updateFRTireLoad = value => ({
    type: UPDATE_FR_TIRE_LOAD, 
    payload: {value}
});

export const updateFRTireTemp = value => ({
    type: UPDATE_FR_TIRE_TEMP, 
    payload: {value}
});

export const updateRLTireLoad = value => ({
    type: UPDATE_RL_TIRE_LOAD, 
    payload: {value}
});

export const updateRLTireTemp = value => ({
    type: UPDATE_RL_TIRE_TEMP, 
    payload: {value}
});

export const updateRRTireLoad = value => ({
    type: UPDATE_RR_TIRE_LOAD, 
    payload: {value}
});

export const updateRRTireTemp = value => ({
    type: UPDATE_RR_TIRE_TEMP, 
    payload: {value}
});