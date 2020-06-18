import * as actionType from '../action/actionTypes';


const intialState = []

const showExperience = (state, action) => {
    return state
}
const addExperience = (state, action) => {
    const id = (state[state.length - 1]?.id || 0) + 1;
    action.experienceList['id'] = id;
    return [...state, action.experienceList]
}

const updateExperience = (state, action) => {
    state.splice(action.id, 1, action.experienceList);
    return [...state];
}

const deleteExperience = (state, action) => {
    state.splice(action.index, 1);
    return [...state];
}

const clear = (state, action) => {
    state.splice(0, state.length)
    return [...state]
}

const bindEmployeeDetails = (state, action) => {
    return [...state, ...action.payLoad.experiences];
}

const reducer = (state = intialState, action) => {
    switch (action.type) {
        case actionType.ADD_EXPERIENCE: return addExperience(state, action);
        case actionType.SHOW_EXPERIENCE: return showExperience(state, action);
        case actionType.DELETE_EXPERIENCE: return deleteExperience(state, action);
        case actionType.CLEAR: return clear(state, action);
        case actionType.BIND_EMPLOYEE_DETAILS: return bindEmployeeDetails(state, action);
        case actionType.UPDATE_EXPERIENCE: return updateExperience(state, action);
        case actionType.SHOW_EMPLOYEE_DETAILS: return bindEmployeeDetails(state, action);

        default: return state;
    }
}
export default reducer;