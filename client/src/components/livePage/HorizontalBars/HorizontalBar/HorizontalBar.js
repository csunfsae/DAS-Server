import React, {useRef, useState, useLayoutEffect} from 'react';
import './HorizontalBar.css';

function HorizontalBar(props) {

    const horizontalBarRef = useRef(null);

    const [svgLength, setSvgLength] = useState( { height: 0, width: 0 } );

    useLayoutEffect( () => {

        if (horizontalBarRef.current) {
           
            setSvgLength( {
                height: horizontalBarRef.current.offsetHeight,
                width: horizontalBarRef.current.offsetWidth 
           })
        }

    }, [horizontalBarRef])

    let fill = "#32BFEB";

    const percentage = parseFloat( parseFloat( parseFloat(props.value - props.min) * 100) / parseFloat(props.max - props.min) );

    return (
        <div className="horizontal-bar">
            <div className="horizontal-svg-container svg-container" ref={horizontalBarRef}>
                <svg className="horizontal-svg">
                    <path className="horizontal-svg__path svg__path"
                        d={`M 0 0 H ${ (svgLength.width * percentage) / 100 } V ${svgLength.height} H 0 L 0 0`}
                        fill={fill}
                    />
                </svg>
            </div>
            <div className="sensor-desc">
                <div className="sensor__name">
                    {props.sensor}
                </div>
                <div className="sensor__value">
                    { props.units === "%" ? `${parseFloat(percentage).toFixed(2)}%` : `${parseFloat(props.value).toFixed(2)} ${props.units}` } 
                </div>
            </div>
        </div>
    )
}

export default HorizontalBar;