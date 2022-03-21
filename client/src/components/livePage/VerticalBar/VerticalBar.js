import React, {useRef, useState, useLayoutEffect} from 'react';
import './VerticalBar.css';

function VerticalBar(props) {

    const verticalBarRef = useRef(null);

    const [svgLength, setSvgLength] = useState( { height: 0, width: 0 } );

    useLayoutEffect( () => {

        if (verticalBarRef.current) {
           
            setSvgLength( {
                height: verticalBarRef.current.offsetHeight,
                width: verticalBarRef.current.offsetWidth 
           })
        }

    }, [verticalBarRef])

    const percentage = parseFloat( parseFloat( parseFloat(props.value - props.min) * 100) / parseFloat(props.max - props.min) );

    return (
        <div className="vertial-bar">
            <div className="vertical-svg-container svg-container" ref={verticalBarRef}>
                <svg className="vertical-svg">
                    <path className="vertical-svg__path svg__path"
                        d={`M 0 ${svgLength.height} V ${svgLength.height - (svgLength.height * percentage) / 100} H ${svgLength.width} V ${svgLength.height} L 0 ${svgLength.height}`}
                        fill={"#32BFEB"}
                    />
                </svg>
            </div>
            <div className="vertical-bar__desc">
                <div className="desc__sensor_name text-center">
                    {props.sensor}
                </div>
                <div className="desc__sensor_percent text-center">
                    { props.units === "%" ? `${parseFloat(percentage).toFixed(2)}%` : `${props.value} ${props.units}` } 
                </div>
            </div>
        </div>
    )
}

export default VerticalBar;