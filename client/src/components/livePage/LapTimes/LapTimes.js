import React, { useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SocketContext } from '../../../SocketContext';
import { updateLapTime, updateLapTimes, updateBestLapTime, updateSpeedometer } from '../../../actions/livePage/lapTimesActions'


import './LapTimes.css';

function LapTimes() {

    const socket = useContext(SocketContext);
    const lap_time = useSelector((state) => state.lapTimes.lapTime);
    const dispatch = useDispatch();
    const lapCount = useSelector((state) => state.lapTimes.lapCount);
    const lapTimes = useSelector((state) => state.lapTimes.lapTimes);
    const bestLap = useSelector((state) => state.lapTimes.bestLapTime);
    const speedometer = useSelector((state) => state.lapTimes.speedometer)

    useEffect(() => {
        socket.on('lap_time', (data) => {
            dispatch(updateLapTime(data))
        });
    }, [])

    useEffect(() => {
        if (lapCount > 1) {
            dispatch(updateLapTimes(`${lap_time}`))
        }
    }, [lapCount])

    useEffect(() => {
        if (lapCount > 1) {
            getBestLapTime();
        }
    }, [lapTimes])

    useEffect(() => {
        socket.on('speedometer', (data) => {
            dispatch(updateSpeedometer(data))
        });
    }, [])

    function getBestLapTime() {
        let bestLapTime = lapTimes[0];
        let bestLapNumber = 1;
        for (let i = 0; i < lapTimes.length; i++) {
            if (bestLapTime > lapTimes[i]) {
                bestLapTime = lapTimes[i];
                bestLapNumber = i + 1;
            }
        }
        dispatch(updateBestLapTime({ time: bestLapTime, lapNumber: bestLapNumber }))
    }

    return (
        <div>
            <h1>
                Lap {lapCount}: {lap_time} sec
            </h1>
            <h2 style={{ color: "red" }}>
                Best Lap: {lapCount === 1 ? `${lap_time} (L1)` : `${bestLap.time} (L${bestLap.lapNumber})`}
            </h2>
            <h3>
                {lapTimes.map((lapTime, index) => {
                    return (<div>L{index + 1}: {lapTime}</div>)
                })
                }
            </h3>
            <h2>
                Speedometer: {speedometer} mph
            </h2>
        </div>
    );
}

export default LapTimes;
