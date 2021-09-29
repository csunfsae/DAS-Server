import React, {useRef, useLayoutEffect, memo, useEffect, useContext} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import './GPSMap.css';
import CarLocation from '../CarLocation/CarLocation';
import TrackPath from '../TrackPath/TrackPath';
import {SocketContext} from '../../../SocketContext';

function GPSMap () {

    const dispatch = useDispatch();

    const socket = useContext(SocketContext);

    const GPSMapSvgPathDimensions = useSelector( (state) => state.gps.GPSMapSvgPathDimensions);
    
    const GPSMapContainer = useRef(null);

    const speed = useSelector( (state) => state.monitoring.speed);

    useLayoutEffect( () => {
        if (GPSMapContainer.current) {
            const dimensions = {height: GPSMapContainer.current.offsetHeight, width: GPSMapContainer.current.offsetWidth };
            dispatch( {type: "update-gps-map-container-dimensions", payload: dimensions } );
        }
        GPSMapContainer.current = false;
    }, [GPSMapContainer, GPSMapSvgPathDimensions])

    useLayoutEffect(() => {
        socket.on('speed', (data) => {
            dispatch({type: "update-speed", payload: data});
          });
    }, [])

    return (
        <>
            <div className="gps-container d-flex" ref={GPSMapContainer}>
                <div className="car-speed align-self-start p-2 mt-3" style={{fontWeight: 700}}>
                    {GPSMapSvgPathDimensions.x === 0 ? "" : `${parseInt(speed)} mph`}
                </div>
                {GPSMapSvgPathDimensions.x === 0 ? <h2>Need More Data... </h2> : ""}
                    <svg style={{width: "100%", height: "100%"}} viewBox={`${GPSMapSvgPathDimensions.x} ${GPSMapSvgPathDimensions.y - 5} ${GPSMapSvgPathDimensions.width} ${GPSMapSvgPathDimensions.height + 10}`}  >
                        <TrackPath/>
                        <CarLocation/>
                    </svg>
            </div>
        </>
    ); 
}

export default memo(GPSMap);