export const UPDATE_SEARCHED_DRIVE_DAY_BEGIN_DATE = "UPDATE_SEARCHED_DRIVE_DAY_BEGIN_DATE";
export const UPDATE_SEARCHED_DRIVE_DAY_END_DATE = "UPDATE_SEARCHED_DRIVE_DAY_END_DATE";
export const UPDATE_SELECTED_DRIVE_DATE = "UPDATE_SELECTED_DRIVE_DATE";
export const UPDATE_SELECTED_DRIVE_DATE_INDEX = "UPDATE_SELECTED_DRIVE_DATE_INDEX";
export const UPDATE_SELECTED_SESSION_NUMBER = "UPDATE_SELECTED_SESSION_NUMBER";
export const UPDATE_SELECTED_LAP_NUMBER = "UPDATE_SELECTED_LAP_NUMBER";
export const ADD_SEARCHED_DRIVE_DAYS = "ADD_SEARCHED_DRIVE_DAYS";
export const UPDATE_MODAL_STEP_FORWARD = "UPDATE_MODAL_STEP_FORWARD";
export const UPDATE_MODAL_STEP_BACKWARDS = "UPDATE_MODAL_STEP_BACKWARDS";
export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";
export const UPDATE_MODAL_STEP =  "UPDATE_MODAL_STEP";


export const updateSearchedDriveDayBeginDate = beginDate => ({
    type: UPDATE_SEARCHED_DRIVE_DAY_BEGIN_DATE, 
    payload: beginDate
});

export const updateSearchedDriveDayEndDate = endDate => ({
    type: UPDATE_SEARCHED_DRIVE_DAY_END_DATE, 
    payload: endDate
});

export const updateSelectedDriveDate = driveDate => ({
    type: UPDATE_SELECTED_DRIVE_DATE, 
    payload: driveDate
});

export const updateSelectedDriveDateIndex = index => ({
    type: UPDATE_SELECTED_DRIVE_DATE_INDEX, 
    payload: index
});


export const updateSelectedSessionNumber = sessionNumber => ({
    type: UPDATE_SELECTED_SESSION_NUMBER, 
    payload: sessionNumber
});

export const updateSelectedLapNumber = lapNumber => ({
    type: UPDATE_SELECTED_LAP_NUMBER, 
    payload: lapNumber
});

export const addSearchedDriveDays = searchedDates => ({
    type: ADD_SEARCHED_DRIVE_DAYS, 
    payload: searchedDates
});

export const updateModalStepForward = () => ({
    type: UPDATE_MODAL_STEP_FORWARD
});

export const updateModalStepBackwards = () => ({
    type: UPDATE_MODAL_STEP_BACKWARDS
});

export const updateModalStep = step => ({
    type: UPDATE_MODAL_STEP,
    payload: step
});

export const openModal = () => ({
    type: OPEN_MODAL
});

export const closeModal = () => ({
    type: CLOSE_MODAL
});

