export const ADD_COORDINATE_TO_GPS_TRACK = "ADD_COORDINATE_TO_GPS_TRACK";
export const UPDATE_CAR_LOCATION = "UPDATE_CAR_LOCATION";
export const UPDATE_GPS_MAP_CONTAINER_DIMENSIONS = "UPDATE_GPS_MAP_CONTAINER_DIMENSIONS";
export const UPDATE_GPS_MAP_SVG_DIMENSIONS = "UPDATE_GPS_MAP_SVG_DIMENSIONS";
export const UPDATE_FIRST_LAP = "UPDATE_FIRST_LAP";

export const addCoordinateToGPSTrack = coordinate => ({
    type: ADD_COORDINATE_TO_GPS_TRACK,
    payload: coordinate
});

export const updateCarLocation = coordinate => ({
    type: UPDATE_CAR_LOCATION,
    payload: coordinate
});

export const updateGPSMapContainerDimensions = dimensions => ({
    type: UPDATE_GPS_MAP_CONTAINER_DIMENSIONS,
    payload: dimensions
});

export const updateGPSMapSvgDimensions = dimensions => ({
    type: UPDATE_GPS_MAP_SVG_DIMENSIONS,
    payload: dimensions
});

export const updateFirstLap = firstLap => ({
    type: UPDATE_FIRST_LAP,
    payload: firstLap
});