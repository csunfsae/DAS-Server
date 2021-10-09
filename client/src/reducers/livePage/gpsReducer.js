import {ADD_COORDINATE_TO_GPS_TRACK, UPDATE_CAR_LOCATION, UPDATE_GPS_MAP_CONTAINER_DIMENSIONS, UPDATE_GPS_MAP_SVG_DIMENSIONS, UPDATE_FIRST_LAP} from '../../actions/livePage/gpsActions';
import proj4 from 'proj4';

const initalStartPosition = (latitude, longitude) => {
    const [x,y] = proj4("EPSG:4326", "EPSG:3857", [ parseFloat(longitude.toFixed(7)),  parseFloat(latitude.toFixed(7))] );
    
    return {
        x: x,
        y: y
    }
}

const initalState = {
    gpsTrackCoordinates: [],
    startLocation: initalStartPosition(34.876530909858, -118.257521724907),
    carLocation: {x: -118.257521724907, y: 34.876530909858, verticalDisplacement: 0},
    GPSMapContainerDimensions: { height: 0, width: 0},
    GPSMapSvgPathDimensions: {x: 0, y: 0, width: 0, height: 0},
    firstLap: true
}

function gpsReducer(state = initalState, action) {
    switch(action.type) {
        
        case ADD_COORDINATE_TO_GPS_TRACK:
            return {
                ...state,
                gpsTrackCoordinates: [...state.gpsTrackCoordinates, action.payload]
            }

        case UPDATE_CAR_LOCATION:
            return {
                ...state,
                carLocation: action.payload
            }

        case UPDATE_GPS_MAP_CONTAINER_DIMENSIONS:
            return {
                ...state,
                GPSMapContainerDimensions: action.payload
            }

        case UPDATE_GPS_MAP_SVG_DIMENSIONS:
            return {
                ...state,
                GPSMapSvgPathDimensions: action.payload
            }
        
        case UPDATE_FIRST_LAP:
            return {
                ...state,
                firstLap: action.payload
            }

        default: 
            return state;
    }
}

export default gpsReducer;