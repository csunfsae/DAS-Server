import React, {useEffect, useState, useContext, useRef, useLayoutEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {SocketContext } from '../../../SocketContext';


function SteeringAngle () {

    const socket = useContext(SocketContext);

    const dispatch = useDispatch();

    const steeringAngleContainer = useRef(null);

    const [svgLength, setSvgLength] = useState( { height: 0, width: 0 } );

    const steering_angle = useSelector( (state) => state.vehicleDynamics.steeringAngle);

    useLayoutEffect( () => {

        if (steeringAngleContainer.current) {
           
            setSvgLength( {
                height: steeringAngleContainer.current.offsetHeight,
                width: steeringAngleContainer.current.offsetWidth 
           })
        }

    }, [steeringAngleContainer])

    useEffect( ()=> {
        socket.on('steering_angle', (data) => {
            dispatch({type: "update-steering_angle-value", payload: data});
        });
    }, [])

    let fill = "#000";

    const percentage = parseFloat( parseFloat(8.5 + parseFloat( parseFloat( parseFloat(steering_angle.value - steering_angle.min) * 100) / parseFloat(steering_angle.max - steering_angle.min))) );

    return (
        <div className="horizontal-bar">
            <div className="sensor-desc text-center">
                <div className="sensor__name">
                    Steering Angle
                </div>
                <div className="sensor__value">
                    { `${parseFloat(parseFloat(8.5 + parseFloat(steering_angle.value))).toFixed(2)}°` } 
                </div>
            </div>
            <div className="horizontal-svg-container svg-container" ref={steeringAngleContainer}>
                <svg className="horizontal-svg">
                    <path className="horizontal-svg__path svg__path"
                        d={`M ${ svgLength.width / 2 } 0 H ${ (svgLength.width * percentage) / 100 } V ${svgLength.height} H ${ svgLength.width / 2 }  L ${ svgLength.width / 2 }  0`}
                        fill={fill}
                    />
                </svg>
            </div>
        </div>
    )
}

export default SteeringAngle;