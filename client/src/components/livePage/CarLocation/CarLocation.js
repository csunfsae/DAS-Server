import React, {useEffect, useLayoutEffect, useRef, useContext} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {select} from 'd3';
import {SocketContext} from '../../../SocketContext';
import proj4 from 'proj4';

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
                    dispatch({type: "update-gps-track-coordinates", payload: {x: carCoordinates.x, y: carCoordinates.y}});
                }

                dispatch({type: "update-car-location", payload: carCoordinates});
            }
        });

    }, [GPSMapContainerDimensions, GPSMapSvgPathDimensions])

    useEffect( () => {

        if(oldCarLocation.current && previousCarLocation !== undefined) {
            const isNewLap = checkIfNewLap();

            if(firstLap && isNewLap) {
                dispatch({type: "update-first-lap", payload: false});
                dispatch({type: "update-lap-count"});

            } else if (isNewLap) {
                dispatch({type: "update-lap-count"});
            }
        }
       
    }, [carLocation])

    function checkIfNewLap() {

        // console.log(previousCarLocation.verticalDisplacement);
        // console.log(carLocation.verticalDisplacement);

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





    // useEffect( () => {
    //     socket.on('gps_data', (data) => {
    //         const carCoordinates = getCarXYCoordinates(data);
    //         if (carCoordinates !== undefined) {
    //             if (test.length < 418){
    //                 test = [...test, {x: carCoordinates.x, y: carCoordinates.y}];
    //             } else if (firstLap) {
    //                     window.localStorage.setItem('track-path', JSON.stringify(test));
    //                     window.localStorage.setItem('car-location', JSON.stringify(carCoordinates));
    //                     dispatch({type: "update-gps-track-coordinates", payload: test});
    //                     dispatch({type: "update-first-lap", payload: false});
    //                     dispatch({type: "update-car-location", payload: carCoordinates});
    //                 } else {
    //                     window.localStorage.setItem('car-location', JSON.stringify(carCoordinates));
    //                     dispatch({type: "update-car-location", payload: carCoordinates});
    //                 }
    //             }
    //     });
    // }, [GPSMapContainerDimensions])

    // useEffect( () => {
    //     socket.on('gps_data', (data) => {

    //         if (GPSMapContainerDimensions.height !== 0) {

    //             const carCoordinates = getCarXYCoordinates(data);
    //             // console.log(carCoordinates);

    //             const isNewLap = checkIfNewLap(carCoordinates);
    //             // console.log(isNewLap);


    //             if( (firstLap) && (isNewLap) ) {
    //                 // console.log(`lap 2`)
    //                 // dispatch({type: "update-gps-track-coordinates", payload: gpsTrackCoordinates});
    //                 dispatch({type: "update-first-lap", payload: false});
    //             } else if (isNewLap) {
    //                 dispatch({type: "update-lap-count"});
    //             } else if (firstLap) {
    //                 // console.log({x: carCoordinates.x, y: carCoordinates.y})
    //                 dispatch({type: "update-gps-track-coordinates", payload: {x: carCoordinates.x, y: carCoordinates.y}});
    //             }
                 
    //             dispatch({type: "update-car-location", payload: carCoordinates});
               
    //         }

            
                // if (test.length < 418){
                //     test = [...test, {x: carCoordinates.x, y: carCoordinates.y}];
                // } else if (firstLap) {
                //         window.localStorage.setItem('track-path', JSON.stringify(test));
                //         window.localStorage.setItem('car-location', JSON.stringify(carCoordinates));
                //         dispatch({type: "update-gps-track-coordinates", payload: test});
                //         dispatch({type: "update-first-lap", payload: false});
                //         dispatch({type: "update-car-location", payload: carCoordinates});
                //     } else {
                //         window.localStorage.setItem('car-location', JSON.stringify(carCoordinates));
                //         dispatch({type: "update-car-location", payload: carCoordinates});
                //     }
            
    //     });
    // }, [GPSMapContainerDimensions])

    // function getCarXYCoordinates (carCoordinates) {

    //     if (GPSMapContainerDimensions.height !== 0 ) {
      
    //       const [x1,y1] = proj4("EPSG:4326", "EPSG:3857", [ parseFloat(carCoordinates.x.toFixed(7)),  parseFloat(carCoordinates.y.toFixed(7))] );
      
    //       const verticalOffset = (GPSMapContainerDimensions.height);
                    
    //       const horizontalOffset = parseFloat(GPSMapContainerDimensions.width / 2);
        
    //       const verticalDisplacement = parseFloat(parseFloat(y1).toFixed(2) - parseFloat(4147114.81)).toFixed(2);
        
    //       const horizontalDisplacement = parseFloat(parseFloat(x1).toFixed(2) - parseFloat(-13164367.67)).toFixed(2);
        
    //       const x = parseFloat(parseFloat(horizontalOffset) + parseFloat(horizontalDisplacement)).toFixed(2);
          
    //       const y = parseFloat(parseFloat(verticalOffset) - (parseFloat(horizontalOffset) + parseFloat(verticalDisplacement))).toFixed(2);
        
    //       return  {
    //         x: x,
    //         y: y,
    //         verticalDisplacement: verticalDisplacement
    //       }
    //     }
    //   }


    return (
        <circle ref={carCircleRef}></circle>
    )
}

export default CarLocation;
