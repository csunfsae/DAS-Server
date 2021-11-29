import proj4 from 'proj4';

const initialCarLocation = () => {
    return window.localStorage.getItem('car-location') || JSON.stringify({ x: -118.257521724907, y: 34.876530909858, verticalDisplacement: 0 });
}

const initalJetsonConnection = () => {
    return window.localStorage.getItem('jetson-connecton') || "Not Connected";
}

const initalStartPosition = (latitude, longitude) => {
    const [x, y] = proj4("EPSG:4326", "EPSG:3857", [parseFloat(longitude.toFixed(7)), parseFloat(latitude.toFixed(7))]);

    return {
        x: x,
        y: y
    }
}

const initalState = {
    batteryVoltage: {
        min: 13.703,
        max: 14.754,
        value: 13.703
    },
    steeringAngle: {
        min: -54.961,
        max: 48.945,
        value: -54.961
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
        value: -76.5
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
    },
    lapTime: "00:00",
    lapTimes: [],
    bestLapTime: { time: "00:00", lapNumber: 1 },
    speed: 0,
    gForceData: [],
    startLocation: initalStartPosition(34.876530909858, -118.257521724907),
    carLocation: { x: -118.257521724907, y: 34.876530909858, verticalDisplacement: 0 },
    gpsTrackCoordinates: [],
    jetsonConnection: initalJetsonConnection(),
    firstLap: true,
    lapCount: 1,
    speedometer: 0,
    GPSMapContainerDimensions: { height: 0, width: 0 },
    GPSMapSvgPathDimensions: { x: 0, y: 0, width: 0, height: 0 }

};

function rootReducer(state = initalState, action) {

    switch (action.type) {
        case "update-battery_voltage-value":
            return {
                ...state,
                batteryVoltage: { ...state.batteryVoltage, value: action.payload }
            }

        case "update-steering_angle-value":
            return {
                ...state,
                steeringAngle: { ...state.steeringAngle, value: action.payload }
            }

        case "update-motor_temp-value":
            return {
                ...state,
                motorTemp: { ...state.motorTemp, value: action.payload }
            }

        case "update-motor_controller_air_temp-value":
            return {
                ...state,
                motorControllerAirTemp: { ...state.motorControllerAirTemp, value: action.payload }
            }

        case "update-throttle_position":
            return {
                ...state,
                throttlePosition: { ...state.throttlePosition, value: action.payload }
            }

        case "update-brake_position":
            return {
                ...state,
                brakePosition: { ...state.brakePosition, value: action.payload }
            }

        case "update-fl_tire_load":
            return {
                ...state,
                FLTireLoad: { ...state.FLTireLoad, value: action.payload }
            }

        case "update-fl_tire_temp":
            return {
                ...state,
                FLTireTemp: { ...state.FLTireTemp, value: action.payload }
            }

        case "update-fr_tire_load":
            return {
                ...state,
                FRTireLoad: { ...state.FRTireLoad, value: action.payload }
            }

        case "update-fr_tire_temp":
            return {
                ...state,
                FRTireTemp: { ...state.FRTireTemp, value: action.payload }
            }

        case "update-rl_tire_load":
            return {
                ...state,
                RLTireLoad: { ...state.RLTireLoad, value: action.payload }
            }

        case "update-rl_tire_temp":
            return {
                ...state,
                RLTireTemp: { ...state.RLTireTemp, value: action.payload }
            }

        case "update-rr_tire_load":
            return {
                ...state,
                RRTireLoad: { ...state.RRTireLoad, value: action.payload }
            }

        case "update-rr_tire_temp":
            return {
                ...state,
                RRTireTemp: { ...state.RRTireTemp, value: action.payload }
            }

        case "update-gg-diagram":
            return {
                ...state,
                gForceData: [...state.gForceData, action.payload]
            }
        case "update-gps-track-coordinates":
            return {
                ...state,
                gpsTrackCoordinates: [...state.gpsTrackCoordinates, action.payload]
            }
        case "update-car-location":
            return {
                ...state,
                carLocation: action.payload
            }
        case "update-gps-map-container-dimensions":
            return {
                ...state,
                GPSMapContainerDimensions: action.payload
            }

        case "update-gps-map-svg-path-dimensions":
            return {
                ...state,
                GPSMapSvgPathDimensions: action.payload
            }

        case "update-speed":
            return {
                ...state,
                speed: action.payload
            }

        case "update-first-lap":
            return {
                ...state,
                firstLap: action.payload
            }

        case "update-lap-count":
            return {
                ...state,
                lapCount: state.lapCount + 1
            }

        case "update-lap-time":
            return {
                ...state,
                lapTime: action.payload
            }

        case "update-lap-times":
            return {
                ...state,
                lapTimes: [...state.lapTimes, action.payload]
            }

        case "update-best-lap-time":
            return {
                ...state,
                bestLapTime: action.payload
            }

        case "update-speedometer":
            return {
                ...state,
                speedometer: action.payload
            }

        case "update-jetson-connection":
            return {
                ...state,
                jetsonConnection: action.payload
            }

        default:
            return state;
    }

}

export default rootReducer;