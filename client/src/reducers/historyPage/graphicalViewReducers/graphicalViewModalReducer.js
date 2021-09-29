import {UPDATE_MODAL_STEP_FORWARD, UPDATE_MODAL_STEP_BACKWARDS, OPEN_MODAL, CLOSE_MODAL, UPDATE_SELECTED_SENSOR} from '../../../actions/historyPage/graphicalViewActions/graphicalViewModalActions';

const initalState = {
    selectedSensor: "",
    modalStep: 1,
    isModalOpen: false
}

function graphicalViewModalReducer(state = initalState, action) { 

    switch(action.type) {

        case UPDATE_SELECTED_SENSOR:
            return {
                ...state,
                selectedSensor: action.payload
            }
        
        case UPDATE_MODAL_STEP_FORWARD:
            return {
                ...state,
                modalStep: state.modalStep + 1
            }
        
        case UPDATE_MODAL_STEP_BACKWARDS:
            return {
                ...state,
                modalStep: state.modalStep - 1
            }

        case OPEN_MODAL:
            return {
                ...state,
                isModalOpen: true
            }

        case CLOSE_MODAL:
            return {
                ...state,
                isModalOpen: false
            }
        
        default: 
            return state;
    }

}

export default graphicalViewModalReducer;