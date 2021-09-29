import React, {useContext, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Scatter} from  'react-chartjs-2';
import {SocketContext} from '../../../SocketContext';
import SteeringAngle from '../SteeringAngle/SteeringAngle';

import './GForceChart.css';
import VerticalBar from '../VerticalBar/VerticalBar';


function GForceChart () {

  const socket = useContext(SocketContext);

  const gForceData = useSelector( (state) => state.vehicleDynamics.gForceData);

  const brake_position = useSelector( (state) => state.vehicleDynamics.brakePosition);
  const throttle_position = useSelector( (state) => state.vehicleDynamics.throttlePosition);

  const FLTireLoad = useSelector( (state) => state.tires.FLTireLoad);
  const FLTireTemp = useSelector( (state) => state.tires.FLTireTemp);

  const FRTireLoad = useSelector( (state) => state.tires.FRTireLoad);
  const FRTireTemp = useSelector( (state) => state.tires.FRTireTemp);

  const RLTireLoad = useSelector( (state) => state.tires.RLTireLoad);
  const RLTireTemp = useSelector( (state) => state.tires.RLTireTemp);

  const RRTireLoad = useSelector( (state) => state.tires.RRTireLoad);
  const RRTireTemp = useSelector( (state) => state.tires.RRTireTemp);


  const dispatch = useDispatch();
  
    const data = {
        labels: ['Scatter'],
        datasets: [
          {
            label: 'G-G Diagram',
            fill: false,
            backgroundColor: 'rgba(75,192,192,0.4)',
            pointBorderColor: 'blue',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 2,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 5,
            pointHitRadius: 10,
            data: gForceData
          }
        ]
      };

      useEffect( () => {
        socket.on('steering_angle', (data) => {
          dispatch({type: "update-steering_angle-value", payload: data});
        });

        socket.on('gForceChart', (data) => {
          dispatch({type: "update-gg-diagram", payload: data});
        });

        socket.on('brake_position', (data) => {
          dispatch({type: "update-brake_position", payload: data});
        });
        
        socket.on('throttle_position', (data) => {
          dispatch({type: "update-throttle_position", payload: data});
        });

        socket.on('fl_tire_load', (data) => {
          dispatch({type: "update-fl_tire_load", payload: data});
        });

        socket.on('fl_tire_temp', (data) => {
          dispatch({type: "update-fl_tire_temp", payload: data});
        });

        socket.on('fr_tire_load', (data) => {
          dispatch({type: "update-fr_tire_load", payload: data});
        });

        socket.on('fr_tire_temp', (data) => {
          dispatch({type: "update-fr_tire_temp", payload: data});
        });

        socket.on('rl_tire_load', (data) => {
          dispatch({type: "update-rl_tire_load", payload: data});
        });

        socket.on('rl_tire_temp', (data) => {
          dispatch({type: "update-rl_tire_temp", payload: data});
        });

        socket.on('rr_tire_load', (data) => {
          dispatch({type: "update-rr_tire_load", payload: data});
        });

        socket.on('rr_tire_temp', (data) => {
          dispatch({type: "update-rr_tire_temp", payload: data});
        });

      },  []);

    return (
      <>
      <div className="suspension-container">

        <SteeringAngle/>
          
          <div className="suspension-data">
            <div className="suspension-left-side">

              <div className="text-center" style={{width: "66%", marginLeft: "auto"}}>
                  FL Tire
              </div>

              <div className="d-flex" style={{height: "calc(100% - 24px)"}}>
                <VerticalBar sensor={"Brake"} min={brake_position.min} value={brake_position.value} max={brake_position.max} units={"%"}/>
                <div className="d-flex left-tire-data flex-column justify-content-between">

                  <div className="front-left-tire-data d-flex" style={{height: "33.33%"}}>
                      <VerticalBar sensor={"Load"} min={FLTireLoad.min} value={FLTireLoad.value} max={FLTireLoad.max} units={"lbs"} />
                      <VerticalBar sensor={"Temp"} min={FLTireTemp.min} value={FLTireTemp.value} max={FLTireTemp.max} units={"°F"}/>
                  </div>

                  <div className="d-flex flex-column" style={{height: "calc(33.33% + 24px)"}}>

                    <div className="text-center">
                      RL Tire
                    </div>

                    <div className="rear-left-tire-data d-flex" style={{height: "calc(100% - 24px)"}}>
                      <VerticalBar sensor={"Load"} min={RLTireLoad.min} value={RLTireLoad.value} max={RLTireLoad.max} units={"lbs"}/>
                      <VerticalBar sensor={"Temp"} min={RLTireTemp.min} value={RLTireTemp.value} max={RLTireTemp.max} units={"°F"}/>
                    </div>

                  </div>

                </div>
              </div>

                
            </div>

            <div className="g-g-diagram d-flex align-items-center justify-content-center" style={{height: "calc(100% + 48px)"}}>
              <Scatter data={data} /> 
            </div>

            <div className="suspension-right-side">

              <div className="text-center" style={{width: "66%", marginRight: "auto"}}>
                FR Tire
              </div>





              <div className="d-flex" style={{height: "calc(100% - 24px)"}}>
                <div className="d-flex right-tire-data flex-column h-100 justify-content-between">

                  <div className="front-right-tire-data d-flex" style={{height: "33.33%"}}>
                    <VerticalBar sensor={"Load"} min={FRTireLoad.min} value={FRTireLoad.value} max={FRTireLoad.max} units={"lbs"}/>
                    <VerticalBar sensor={"Temp"} min={FRTireTemp.min} value={FRTireTemp.value} max={FRTireTemp.max} units={"°F"}/>
                  </div>

            
                  <div style={{height: "calc(33.33% + 24px)"}}>
                    <div className="text-center">
                        RR Tire 
                    </div>
                    
                    <div className="d-flex" style={{height: "calc(100% - 24px)"}}>
                      <div className="rear-right-tire-data d-flex">
                        <VerticalBar sensor={"Load"} min={RRTireLoad.min} value={RRTireLoad.value} max={RRTireLoad.max} units={"lbs"}/>
                        <VerticalBar sensor={"Temp"} min={RRTireTemp.min} value={RRTireTemp.value} max={RRTireTemp.max} units={"°F"} />
                      </div>
                    </div>

                  </div>

                </div>
                <VerticalBar sensor={"Throttle"} min={throttle_position.min} value={throttle_position.value} max={throttle_position.max} units={"%"}/>
              </div>
            </div>
          
          </div>
          
          
          
          
          {/* <div className="suspension-data">

            <div className="brake-position">
              <VerticalBar sensor={"Brake"} min={brake_position.min} value={brake_position.value} max={brake_position.max} units={"%"}/>
            </div>

            <div className="d-flex left-tire-data flex-column justify-content-between h-100">
              <div className="front-left-tire-data d-flex" style={{height: "33.33%"}}>
                  <VerticalBar sensor={"Load"} min={FLTireLoad.min} value={FLTireLoad.value} max={FLTireLoad.max} units={"lbs"} />
                  <VerticalBar sensor={"Temp"} min={FLTireTemp.min} value={FLTireTemp.value} max={FLTireTemp.max} units={"°F"}/>
              </div>

              <div className="rear-left-tire-data d-flex" style={{height: "33.33%"}}>
                  <VerticalBar sensor={"Load"} min={RLTireLoad.min} value={RLTireLoad.value} max={RLTireLoad.max} units={"lbs"}/>
                  <VerticalBar sensor={"Temp"} min={RLTireTemp.min} value={RLTireTemp.value} max={RLTireTemp.max} units={"°F"}/>
              </div>

            </div>

            <div className="g-g-diagram d-flex align-items-center justify-content-center h-100">
              <Scatter data={data} /> 
            </div>

            <div className="d-flex right-tire-data flex-column justify-content-between h-100">

              <div className="front-right-tire-data d-flex" style={{height: "33.33%"}}>
                  <VerticalBar sensor={"Load"} min={FRTireLoad.min} value={FRTireLoad.value} max={FRTireLoad.max} units={"lbs"}/>
                  <VerticalBar sensor={"Temp"} min={FRTireTemp.min} value={FRTireTemp.value} max={FRTireTemp.max} units={"°F"}/>
              </div>

              <div className="rear-right-tire-data d-flex" style={{height: "33.33%"}}>
                  <VerticalBar sensor={"Load"} min={RRTireLoad.min} value={RRTireLoad.value} max={RRTireLoad.max} units={"lbs"}/>
                  <VerticalBar sensor={"Temp"} min={RRTireTemp.min} value={RRTireTemp.value} max={RRTireTemp.max} units={"°F"} />
              </div>

            </div>

            <div className="throttle-position">
              <VerticalBar sensor={"Throttle"} min={throttle_position.min} value={throttle_position.value} max={throttle_position.max} units={"%"}/>
            </div>
          </div> */}
        </div>
        </>
    );
}

export default GForceChart;