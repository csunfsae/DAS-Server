import React, { useEffect, useContext} from 'react';
import HorizontalBar from '../HorizontalBars/HorizontalBar/HorizontalBar';
import {useSelector, useDispatch} from 'react-redux';
import {SocketContext } from '../../../SocketContext';
import {updateBatteryVoltage, updateMotorTemp, updateMotorControllerAirTemp} from '../../../actions/livePage/monitoringActions.js'

function HorizontalBars() {

    const socket = useContext(SocketContext);

    const battery_voltage = useSelector( (state) => state.monitoring.batteryVoltage);
    const motor_temp = useSelector( (state) => state.monitoring.motorTemp);
    const motor_controller_air_temp = useSelector( (state) => state.monitoring.motorControllerAirTemp);

    const dispatch = useDispatch();

    useEffect( () => {

        socket.on('battery_voltage', (data) => {
            dispatch(updateBatteryVoltage(data))
          });

          socket.on('motor_temp', (data) => {
            dispatch(updateMotorTemp(data))
          });

          socket.on('motor_controller_air_temp', (data) => {
            dispatch(updateMotorControllerAirTemp(data))
          });

      }, [socket, dispatch]);
          
    return (
        <div className="horizontal-bars-container" style={{marginTop: "48px"}}>
            <HorizontalBar sensor={"Battery Voltage"} min={battery_voltage.min} value={battery_voltage.value} max={battery_voltage.max} units={"V"}/>
            <HorizontalBar sensor={"Motor Temp"} min={motor_temp.min} value={motor_temp.value} max={motor_temp.max} units={"°F"}/>
            <HorizontalBar sensor={"Motor Controller Air Temp"} min={motor_controller_air_temp.min} value={motor_controller_air_temp.value} max={motor_controller_air_temp.max} units={"°F"}/>
        </div>
    );
}

export default HorizontalBars;


