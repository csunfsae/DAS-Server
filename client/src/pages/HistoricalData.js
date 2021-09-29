import React from 'react';
import HistoricalDataModal from '../components/historyPage/HistoricalDataModal';
import GraphicalViewModal from '../components/historyPage/graphicalView/graphicalViewModal/GraphicalViewModal';
import GraphicalView from '../components/historyPage/graphicalView/GraphicalView';
import SessionView from '../components/historyPage/sessionView/SessionView';

function HistoricalData() {
    return(
        <>
            <HistoricalDataModal/>
            {/* <GraphicalViewModal/> */}
            <SessionView/>
            <GraphicalView/>
        </>
    )
}

export default HistoricalData;