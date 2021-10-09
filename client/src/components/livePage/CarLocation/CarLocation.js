import React, {useEffect, useLayoutEffect, useRef, useContext} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {select} from 'd3';
import {SocketContext} from '../../../SocketContext';
import proj4 from 'proj4';
import {updateCarLocation, updateFirstLap, addCoordinateToGPSTrack} from '../../../actions/livePage/gpsActions'
import {updateLapCount}  from '../../../actions/livePage/lapTimesActions'

function CarLocation() {  

    const GPSMapSvgPathDimensions = useSelector( (state) => state.gps.GPSMapSvgPathDimensions);

    const firstLap = useSelector( (state) => state.gps.firstLap);

    const GPSMapContainerDimensions = useSelector( (state) => state.gps.GPSMapContainerDimensions);

    const socket = useContext(SocketContext);

    const carLocation = useSelector( (state) => state.gps.carLocation);

    const dispatch = useDispatch();

    const carCircleRef = useRef(null);
    
    const oldCarLocation = useRef();

    const startLocation = useSelector( (state) => state.gps.startLocation);


    useEffect( () => {
        oldCarLocation.current = carLocation;
    })

    const previousCarLocation = oldCarLocation.current;


    useLayoutEffect( () => { 
        if(carCircleRef.current) {
            const carCircle = select(carCircleRef.current);
            carCircle.attr("cx", carLocation.x).attr("cy", carLocation.y).attr("fill", "red").attr("r", 7);
        }
    }, [carCircleRef]);

    useEffect( () => {
        if(carCircleRef.current) {
            const carCircle = select(carCircleRef.current);
            carCircle.attr("cx", carLocation.x).attr("cy", carLocation.y);
        }

    }, [carLocation])

    useEffect( () => {
        socket.on('gps_data', (data) => {
            
            if (GPSMapContainerDimensions.height !== 0) { 

                const carCoordinates = getCarXYCoordinates(data);

                if(firstLap) {
                    dispatch(addCoordinateToGPSTrack({x: carCoordinates.x, y: carCoordinates.y}))
                }

                dispatch(updateCarLocation(carCoordinates))
            }
        });

    }, [GPSMapContainerDimensions, GPSMapSvgPathDimensions])

    useEffect( () => {

        if(oldCarLocation.current && previousCarLocation !== undefined) {
            const isNewLap = checkIfNewLap();

            if(firstLap && isNewLap) {
                dispatch(updateFirstLap(false))
                dispatch(updateLapCount())
            } else if (isNewLap) {
                dispatch(updateLapCount())
            }
        }
       
    }, [carLocation])

    function checkIfNewLap() {
        if (previousCarLocation.verticalDisplacement < 0 && carLocation.verticalDisplacement >= 0) {
            return true;
        } 

        return false;
    }

    function getCarXYCoordinates (carCoordinates) {

        if (GPSMapContainerDimensions.height !== 0 ) {
      
          const [x1,y1] = proj4("EPSG:4326", "EPSG:3857", [ parseFloat(carCoordinates.x.toFixed(7)),  parseFloat(carCoordinates.y.toFixed(7))] );
          
          const verticalOffset = (GPSMapContainerDimensions.height);
                    
          const horizontalOffset = parseFloat(GPSMapContainerDimensions.width / 2);
         
          const verticalDisplacement = parseFloat(parseFloat(y1).toFixed(2) - parseFloat(startLocation.y)).toFixed(2);
          
          const horizontalDisplacement = parseFloat(parseFloat(x1).toFixed(2) - parseFloat(startLocation.x)).toFixed(2);
        
          const x = parseFloat(parseFloat(horizontalOffset) + parseFloat(horizontalDisplacement)).toFixed(2);
          
          const y = parseFloat(parseFloat(verticalOffset) - (parseFloat(horizontalOffset) + parseFloat(verticalDisplacement))).toFixed(2);
        
          return  {
            x: x,
            y: y,
            verticalDisplacement: verticalDisplacement
          }
        }
      }

    return (
        <circle ref={carCircleRef}></circle>
    )
}

export default CarLocation;
