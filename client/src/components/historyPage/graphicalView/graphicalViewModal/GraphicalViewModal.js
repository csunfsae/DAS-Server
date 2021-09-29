import React from 'react';
import Modal from 'react-modal';
import {useSelector} from 'react-redux';
import SensorSelectionForm from './forms/SensorSelectionForm';
import ReviewForm from './forms/ReviewForm';

function GraphicalViewModal() {

    const step = useSelector( (state) => state.sensorModal.modalStep);
    const sensor = useSelector( (state) => state.sensorModal.selectedSensor);

    function renderFormStep () {
        switch(step) {
            case 1:
                return <SensorSelectionForm selectedSensor={sensor}/>
            case 2: 
                return <ReviewForm selectedSensor={sensor}/>
            default:
                return ""
        }
    }

    return (
        <Modal isOpen={true}>
            { renderFormStep() }
        </Modal>
    )
}

export default GraphicalViewModal;
