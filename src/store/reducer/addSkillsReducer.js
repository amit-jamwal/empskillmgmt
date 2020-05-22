import * as actionType from '../action/actionTypes';


const intialState = []

const showSkills = (state, action) => {
    return state
}
const addSkills = (state, action) => {
    const id = (state[state.length - 1]?.id || 0) + 1;
    return [...state, action.experienceList]
}


const deleteSkills = (state, action) => {
    const newState = state.splice(action.index, 1);
    return[...state];
}

const reducer = (state = intialState, action) => {
    switch (action.type) {
        case actionType.ADD_SKILLS: return addSkills(state, action);
        case actionType.SHOW_SKILLS: return showSkills(state, action);
        case actionType.DELETE_SKILLS: return deleteSkills(state, action);
        default: return state;
    }
}
export default reducer;