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


const deleteExperience = (state, action) => {
    const newState = state.splice(action.index, 1);
    console.log('ddd', newState);
    return[...state];
}

const reducer = (state = intialState, action) => {
    switch (action.type) {
        case actionType.ADD_EXPERIENCE: return addExperience(state, action);
        case actionType.SHOW_EXPERIENCE: return showExperience(state, action);
        case actionType.DELETE_EXPERIENCE: return deleteExperience(state, action);
        default: return state;
    }
}
export default reducer;