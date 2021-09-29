export const UPDATE_LAP_TIME = "UPDATE_LAP_TIME";
export const UPDATE_LAP_TIMES = "UPDATE_LAP_TIMES";
export const UPDATE_BEST_LAP_TIME = "UPDATE_BEST_LAP_TIME";

export const updateLapTime = lapTime => ({
    type: UPDATE_LAP_TIME,
    payload: {lapTime}
});

export const updateLapTimes = lapTimes => ({
    type: UPDATE_LAP_TIMES,
    payload: {lapTimes}
});

export const updateBestLapTime = bestLapTime => ({
    type: UPDATE_BEST_LAP_TIME,
    payload: {bestLapTime}
});