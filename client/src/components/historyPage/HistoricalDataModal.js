import React from 'react'
import Modal from 'react-modal';
import {useSelector} from 'react-redux';
import DateForm from './forms/DateForm';
import DriveDaySelectionForm from './forms/DriveDaySelectionForm';
import LapSelectionForm from './forms/LapSelectionForm';
import SessionSelectionForm from './forms/SessionSelectionForm';
import ReviewForm from './forms/ReviewForm';

function HistoricalDataModal() {
    const step = useSelector( (state) => state.historyModal.modalStep);
    const modalState = useSelector( (state) => state.historyModal.isModalOpen);
    const selectedDriveDate = useSelector( (state) => state.historyModal.selectedDriveDate);
    const selectedDriveDateIndex = useSelector( (state) => state.historyModal.selectedDriveDateIndex);
    const sessionNumber = useSelector( (state) => state.historyModal.selectedSessionNumber);
    const lapNumber = useSelector( (state) => state.historyModal.selectedLapNumber);

    const driveDayBeginDate = useSelector( (state) => state.historyModal.searchedDriveDayBeginDate);

    const driveDayEndDate = useSelector( (state) => state.historyModal.searchedDriveDayEndDate);

    function renderFormSteps () {
        switch(step) {
            case 1:
                return <DateForm driveDatesData={{driveDayBeginDate, driveDayEndDate}}/>
            case 2: 
                return <DriveDaySelectionForm driveDateData={ {selectedDriveDate, selectedDriveDateIndex} }/>
            case 3:
                return <SessionSelectionForm sessionData={sessionNumber}/>
            case 4: 
                return <LapSelectionForm lapData={lapNumber}/>
            case 5:
                return <ReviewForm/>
        }
    }

    return (
        <Modal isOpen={modalState}>
            {renderFormSteps() }
        </Modal>
        )
    }

export default HistoricalDataModal;