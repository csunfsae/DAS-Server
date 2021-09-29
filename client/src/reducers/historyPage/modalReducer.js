import {UPDATE_SEARCHED_DRIVE_DAY_BEGIN_DATE, UPDATE_SEARCHED_DRIVE_DAY_END_DATE, UPDATE_SELECTED_DRIVE_DATE, UPDATE_SELECTED_SESSION_NUMBER, UPDATE_SELECTED_LAP_NUMBER, ADD_SEARCHED_DRIVE_DAYS, UPDATE_SELECTED_DRIVE_DATE_INDEX, UPDATE_MODAL_STEP_FORWARD, UPDATE_MODAL_STEP_BACKWARDS, OPEN_MODAL, CLOSE_MODAL, UPDATE_MODAL_STEP} from '../../actions/historyPage/modalActions';

const initalState = {
    searchedDriveDayBeginDate: "",
    searchedDriveDayEndDate: "",
    selectedDriveDate: "",
    selectedDriveDateIndex: 1,
    selectedSessionNumber: 1,
    selectedLapNumber: 1,
    modalStep: 1,
    isModalOpen: false,
    driveDays: [],
    displayedSessions: {
        "2021-02-22": {
            sessions: [
                {
                    number: 1,
                    laps: [1,2]
                }
            ]
        }
    }  
}

function modalReducer(state = initalState, action) {
    switch(action.type) {

        case UPDATE_MODAL_STEP:
            return {
                ...state,
                modalStep: action.payload
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
        
        case UPDATE_SEARCHED_DRIVE_DAY_BEGIN_DATE:
            return {
                ...state,
                searchedDriveDayBeginDate: action.payload
            }

        case UPDATE_SEARCHED_DRIVE_DAY_END_DATE:
            return {
                ...state,
                searchedDriveDayEndDate: action.payload
            }
        
        case UPDATE_SELECTED_DRIVE_DATE:
            return {
                ...state,
                selectedDriveDate: action.payload
            }
        
        case UPDATE_SELECTED_DRIVE_DATE_INDEX:
            return {
                ...state,
                selectedDriveDateIndex: action.payload
            }

        case UPDATE_SELECTED_SESSION_NUMBER:
            return {
                ...state,
                selectedSessionNumber: action.payload
            }

        case UPDATE_SELECTED_LAP_NUMBER:
            return {
                ...state,
                selectedLapNumber: action.payload
            }
        
        case ADD_SEARCHED_DRIVE_DAYS:
            return {
                ...state,
                driveDays: action.payload
            }

        // case ADD_DRIVE_DAY:
        //     return {
        //         ...state,
        //         displayedDriveDays: [...state.displayedDriveDays, action.payload]
        //     }

        default: 
            return state
    }

}

export default modalReducer;