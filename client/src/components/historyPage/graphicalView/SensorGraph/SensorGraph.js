import React, {useRef, useEffect} from 'react'
import {select, line, curveLinear, axisLeft} from 'd3';

function SensorGraph({sensor, sensorData, isFirstSensor, yScale, width, index, minValue, maxValue}) {
    const gRef = useRef(null);

    const getMinMaxValues = (values) =>  {
        let greatestValue = values[0].value["$numberDecimal"];
        let lowestValue = values[0].value["$numberDecimal"];
        
        for (const valueIndex of values) {

            if (parseFloat(valueIndex.value["$numberDecimal"].toString()) > greatestValue) {
                greatestValue = valueIndex.value["$numberDecimal"]
            }

            if ( parseFloat(valueIndex.value["$numberDecimal"].toString()) < lowestValue) {
                lowestValue = valueIndex.value["$numberDecimal"]
            }
        }

        return {
            greatestValue,
            lowestValue
        }
    }

    const getLongestLap = (laps) => {
        let longestLap = laps[0];
        // console.log("laps", laps);
        for (let lap of laps) {
            if(lap.length > longestLap.length) {
                longestLap = lap;
            }
        }
        return longestLap;
    }

    useEffect( ()=> {
        if(gRef.current) {
            const g = select(gRef.current);

            const longestLap = getLongestLap(sensorData);

            const {greatestValue, lowestValue} = getMinMaxValues(longestLap);
            
            const xMultiplier =  parseFloat(parseFloat(width - 100) / parseFloat(longestLap[longestLap.length - 1].lapTime["$numberDecimal"].toString()));
            const yMultiplier = parseFloat(parseFloat(300) / parseFloat(maxValue));


            const chartLine = line().x( p => parseFloat(parseFloat(p.lapTime["$numberDecimal"].toString()) * xMultiplier) ).y( (p) => parseFloat( parseFloat(300) - Math.abs(parseFloat( parseFloat( p.value["$numberDecimal"].toString() ) * parseFloat(yMultiplier ) ))  ) ).curve(curveLinear); 

            for(let i = 0; i < sensorData.length; i++) {
                g.append("path").data([sensorData[i]]).attr("d", value => chartLine(value)).attr("fill", "none").attr("stroke", "#" + ((1<<24)*Math.random() | 0).toString(16)).attr('stroke-width', '2px').attr("class","line");
            }

            const yAxis = axisLeft(yScale)
            g.select('.y-axis').call(yAxis)
            
            if(!isFirstSensor) {
                g.style('transform', `translateY(${index * 350}px)`);
            } 
        }

        

    }, [gRef, width])

    return (
        <g ref={gRef} className="chart">
            <g>{sensor}</g>
            <g className="y-axis" />
        </g>
    )
}

export default SensorGraph;
