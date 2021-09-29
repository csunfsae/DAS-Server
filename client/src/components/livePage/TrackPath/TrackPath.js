import React, {useRef, useLayoutEffect, memo} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {select, line, curveCardinalClosed} from 'd3';

function TrackPath() {

    const trackPath = useRef(null);
    const dispatch = useDispatch();

    const GPSTrackCoordinates = useSelector( (state) => state.gps.gpsTrackCoordinates);
    const firstLap = useSelector( (state) => state.gps.firstLap);
    const trackLine = line().x( (p) => p.x).y( (p) => p.y).curve(curveCardinalClosed);

    useLayoutEffect( () => {

        if (trackPath.current) {
            const path = select(trackPath.current);
            path.data([GPSTrackCoordinates]).join("path").attr("d", value => trackLine(value)).attr("fill", "none").attr("stroke", "black").attr("stroke-width", "2px");
            const {x,y,width,height} = path._groups[0][0].getBBox();
            const pathDimensions = {x: x, y: y, width: width, height: height};
            
            if (pathDimensions.x !== 0 ) {
                dispatch({type: 'update-gps-map-svg-path-dimensions', payload: pathDimensions})
            }
        }
    }, [trackPath, firstLap])
  

    return (
        <path ref={trackPath}></path>
    ) 
}

export default memo(TrackPath);