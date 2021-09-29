import React, {useEffect, useRef, useState} from 'react';
import SensorGraph from './SensorGraph/SensorGraph';
import {useSelector, useDispatch} from 'react-redux';
import {select, bisector, scaleLinear, axisBottom, zoom, zoomTransform} from 'd3';
import {loadDefaultSensorData} from '../../../actions/historyPage/historicalPageActions'

function GraphicalView() {
    const sensorsData = useSelector( (state) => state.generalHistoricalData.sensorsData);
    const dispatch = useDispatch();
    const [dimensions, setDimensions] = useState({height: 0, width: 0});
    const [currentZoomState, setCurrentZoomState] = useState();
    const margin = {top: 50, right: 50, bottom: 50, left: 50};
    const innerHeight = dimensions.height - margin.top - margin.bottom;
    const innerWidth = dimensions.width - margin.left - margin.right;

    const svgRef = useRef();
    let svg = null;
    let xScale = null;
    let yScales = {};

    const renderGraphs = () => {
        let sensorGraphs = [];
        let sensorIndex = 0;
        
        if(dimensions.height !== 0 ) {
            for (const sensor in sensorsData) {

                yScales[sensor] = null;
    
                let currentMinMax = getLapMinMaxValues(sensorsData[sensor][0]); 
    
                // find min and max in all of the sensors laps
                for (const lap of sensorsData[sensor]) {
                    const {minValue, maxValue} = getLapMinMaxValues(lap);
                    currentMinMax = getMinMax(currentMinMax.minValue, minValue, currentMinMax.maxValue, maxValue);
                }
    
                const yScale = scaleLinear().domain( [currentMinMax.minValue, currentMinMax.maxValue]).range( [300, 0] );
                yScales[sensor] = yScale;
    
                const isFirstSensor = sensorIndex === 0 ? true : false;
            
                sensorGraphs = [...sensorGraphs, <SensorGraph minValue={currentMinMax.minValue} maxValue={currentMinMax.maxValue} index={sensorIndex} width={dimensions.width} yScale={yScales[sensor]} isFirstSensor={isFirstSensor} sensor={sensor} sensorData={sensorsData[sensor]} />];
                sensorIndex++;
            }
        }
        
        return sensorGraphs;
    }

    const getMinMax = (currentMin, minValue, currentMax, maxValue) => {

        if (currentMin > minValue) {
            currentMin = minValue
        }

        if(currentMax < maxValue)  {
            currentMax = maxValue
        }

        return {
            minValue: currentMin,
            maxValue: currentMax
        }
    }

    const getLapMinMaxValues = (lapValues) =>  {
        let minValue = lapValues[0].value["$numberDecimal"];
        let maxValue = lapValues[0].value["$numberDecimal"];
        
        for (const valueIndex of lapValues) {
        
            if (parseFloat(valueIndex.value["$numberDecimal"].toString()) > maxValue) {
                maxValue = valueIndex.value["$numberDecimal"]
            }

            if ( parseFloat(valueIndex.value["$numberDecimal"].toString()) < minValue) {
                minValue = valueIndex.value["$numberDecimal"]
            }
        }

        return {
            minValue,
            maxValue
        }
    }

    const getLongestLap = () => {

        let firstSensor = sensorsData[Object.keys(sensorsData)[0]];
        let longestLap = firstSensor[0];

        for (let lap of firstSensor) {
            if(lap.length > longestLap.length) { 
                longestLap = lap;
            }
        }
        return longestLap;
    }

    const renderMousePerLines = (svg) => {
        for(const sensor in sensorsData) {
            for(const index in sensorsData[sensor]) {
                let mousePerLine = svg.select('.mouseover')
                                    .append("g")
                                    .data([sensorsData[sensor][index]])
                                    .attr("class", "mouse-per-line");

                    mousePerLine.append("circle")
                    .attr("r", 7)
                    .style("fill", "none")
                    .style("stroke","black")
                    .style("stroke-width", "1px")
                    .attr("class", "mouse-circle");

                    mousePerLine.append("text").attr("transform", "translate(10,3)");
            }
        }
    }

    useEffect( () => {
        dispatch(loadDefaultSensorData())
    }, [])

    useEffect( () => {
        
        if(svgRef.current && Object.keys(sensorsData).length > 0) {

            const height = Object.keys(sensorsData).length * 600;
            const width = svgRef.current.parentNode.getBoundingClientRect().width;
            setDimensions({height, width});

            const longestLap = getLongestLap()

            svg = select(svgRef.current);

            renderMousePerLines(svg);
            
            xScale = scaleLinear()
                .domain( [  parseFloat(longestLap[0].lapTime["$numberDecimal"].toString() ), parseFloat(longestLap[longestLap.length - 1].lapTime["$numberDecimal"].toString() ) ] )
                .range( [0, dimensions.width] );
 
            const xAxis = axisBottom(xScale).ticks(30)
            svg.select('.x-axis').style('transform', `translateY(${Object.keys(sensorsData).length * 600}px)`).call(xAxis)

        }
        
    }, [sensorsData, svgRef, sensorsData])

    useEffect( () => {

        if(svgRef.current && Object.keys(sensorsData).length > 0) {
            svg = select(svgRef.current);
            const longestLap = getLongestLap()

            xScale = scaleLinear()
                .domain( [  parseFloat(longestLap[0].lapTime["$numberDecimal"].toString() ), parseFloat(longestLap[longestLap.length - 1].lapTime["$numberDecimal"].toString() ) ] )
                .range( [0, innerWidth] );

            if(currentZoomState) {
                const newXScale = currentZoomState.rescaleX(xScale);
                xScale.domain(newXScale.domain());

            }

            const xAxis = axisBottom(xScale)
            const xOffset = ((Object.keys(sensorsData).length - 1) * 350) + 300
            console.log(Object.keys(sensorsData).length )
            console.log(xOffset);
            svg.select('.x-axis').style('transform', `translateY(${xOffset}px)`).call(xAxis)
            // Object.keys(sensorsData).length * 383

            // const zoomBehavior = zoom().scaleExtent([1, 10]).translateExtent([ [0,0], [dimensions.width, dimensions.height] ])
            // .on("zoom", () => { 
            //     const zoomState = zoomTransform(svg.node());
            //     setCurrentZoomState(zoomState);
            //     // console.log(zoomState)
            // })

            // svg.call(zoomBehavior);
        }
    }, [dimensions, currentZoomState, sensorsData])

    
    const showLine = (mouseClick) => {
        // console.log(mouseClick);
        const mouseClickX = mouseClick.clientX - margin.left;
        let clickedPosition = null;

        if(svgRef.current) {
            
            let index1 = 0;
            let sensorIndex = 0; 
            for(const sensor in sensorsData) {
                for(const index in sensorsData[sensor]) {

                    let lapForSensor = sensorsData[sensor][index];
                    let x0 = xScale.invert(mouseClickX);

                    let roundedX0 = (Math.round(x0  * 10) / 10)

                    let lapTimes = convertLapTimesToArray(lapForSensor);
                    
                    let bisect = bisector ( (lapTimes) => { return lapTimes} ).center;

                    let idx = bisect(lapTimes, roundedX0);
                    
                    clickedPosition = lapForSensor[idx];


                    let x = mouseClickX;
                    let beginning = x;
                    let end = svg.selectAll('.line')["_groups"][0][index1].getTotalLength();
                    let target = null;
                    let pos = null; 

                    while (true) {
                        target = Math.floor((beginning + end) / 2);
                        pos = svg.selectAll('.line')["_groups"][0][index1].getPointAtLength(target);

                        if ((target === end || target === beginning) && pos.x !== x) {
                            break;
                        }

                        if (pos.x > x) end = target;
                        else if (pos.x < x) beginning = target;
                        else break; //position found
                    }

                    const yCircle = sensorIndex * 350;

                    // console.log(index1);
                    console.log("yCircle",yCircle);

                    svg.selectAll('.mouse-per-line').filter(function(d, i) { return i == index1 }).style("transform", `translate(${x}px, ${yCircle + pos.y}px )`);
                    svg.selectAll('.mouse-per-line text').filter(function(d, i) { return i == index1 }).text(`${clickedPosition.value["$numberDecimal"].toString()}`).style("margin-left","10px");
                    index1++;
                }
                sensorIndex++;
            }

            svg.select('.mouse-line').attr("d",`M${mouseClickX} , ${innerHeight} ${mouseClickX}, 0`).style("opacity","1")

        }
    }

    const convertLapTimesToArray = (array) => {
        let lapTimes = []
        for(const index in array) {
            lapTimes = [...lapTimes, +array[index].lapTime["$numberDecimal"]]
        }
        return lapTimes
    }

    return (
        <>
        <div>
            <svg ref={svgRef} style={{height: `${dimensions.height}`, width: `${dimensions.width}` }}>
                <g style={{transform: `translate(${margin.left}px, ${margin.top}px)`}}>
                    { renderGraphs() }
                    <g className="mouseover">
                        <path className="mouse-line" style={{stroke: "black", strokeWidth: "2px", opacity: "1px"}}></path>
                        <rect width={innerWidth + 5} height={innerHeight} fill={"none"} onMouseDown={(mouseClick) => showLine(mouseClick)} pointerEvents={"all"} ></rect>
                    </g>
                    <g className="x-axis" /> 
                </g>
            </svg>
        </div>
        </>
    )
}

export default GraphicalView
