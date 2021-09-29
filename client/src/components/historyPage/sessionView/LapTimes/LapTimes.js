import React from 'react'
import {useSelector} from 'react-redux';

function LapTimes() {
    const selectedDriveDate = useSelector( (state) => state.historyModal.selectedDriveDate);
    const sessionNumber = useSelector( (state) => state.historyModal.selectedSessionNumber);
    const lapNumber = useSelector( (state) => state.historyModal.selectedLapNumber);

    const selectedDriveDateIndex = useSelector( (state) => state.historyModal.selectedDriveDateIndex);
    const allDriveDays = useSelector( (state) => state.historyModal.driveDays);
    const lastSearchedDriveDays = allDriveDays[allDriveDays.length -1];

    let bestLap = [];
    let laps = [];

    if( selectedDriveDate !== "" && sessionNumber !== -1 && lapNumber !== -1) {
        laps = lastSearchedDriveDays[selectedDriveDateIndex]["sessions"][sessionNumber - 1]["laps"];
        bestLap = getBestLapTime(laps);
    }

    function getBestLapTime(laps) {
        let bestLapTime = laps[0];
        for (let i = 0; i < laps.length; i++) {
            if (bestLapTime.lap_time > laps[i].lap_time) {
                bestLapTime = laps[i];
            }
        }
        return bestLapTime;
    }

    function renderLapTimes() {
        return (
            laps.map( (lap, index) =>
                <p> L{index + 1}: {lap.lap_time}</p>
            )
        )
    }

    function isRendered() {
        if (selectedDriveDate !== "" && sessionNumber !== -1 && lapNumber !== -1) {
            return true; 
        } else {
            return false;
        }
        
    }

    return (

        <div>
            <h2>Lap Times</h2>
            <h3>Best Lap: {isRendered() ? `${bestLap.lap_time} (L${bestLap.lap_number})` : ""} </h3>
                {isRendered() ? renderLapTimes() : ""}
        </div>
    )
}

export default LapTimes
