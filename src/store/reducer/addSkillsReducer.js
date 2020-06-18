import * as actionType from '../action/actionTypes';


const intialState = []

const showSkills = (state, action) => {
    return state
}
const addSkills = (state, action) => {
    console.log('dasfasfdasfdasf')
    console.log(state, action)
    const id = (state[state.length - 1]?.id || 0) + 1;
    console.log()
    return [...state, action.experienceList]
}


const deleteSkills = (state, action) => {
    state.splice(action.index, 1);
    return [...state];
}

const clear = (state, action) => {
    state.splice(0, state.length)
    return [...state]
}

const bindEmployeeDetails = (state, action) => {
    return [...state, ...action.payLoad.skills];
}

const updateSkills = (state, action) => {
    console.log(action)
    state.splice(action.id, 1, action.skillList);
    console.log('kkkkkkk', state)
    return [...state];
}

const reducer = (state = intialState, action) => {
    switch (action.type) {
        case actionType.ADD_SKILLS: return addSkills(state, action);
        case actionType.SHOW_SKILLS: return showSkills(state, action);
        case actionType.DELETE_SKILLS: return deleteSkills(state, action);
        case actionType.CLEAR: return clear(state, action);
        case actionType.BIND_EMPLOYEE_DETAILS: return bindEmployeeDetails(state, action);
        case actionType.UPDATE_SKILLS: return updateSkills(state, action);
        case actionType.SHOW_EMPLOYEE_DETAILS: return bindEmployeeDetails(state, action);



        default: return state;
    }
}
export default reducer;