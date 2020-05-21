import * as actionType from '../action/actionTypes';
import { updateObject } from '../../common/common-util';

const intialState = {
    personalInfo: null
}

const personalInfo = (state, data) => {
    return updateObject(state.personalInfo, {...data});
}

const reducer = (state = intialState, action) => {
    switch (action.type) {
        case actionType.ADD_PERSONAL_INFO:
            return personalInfo(state, action.personalInfo);
        default:
            return state;
    }
}

export default reducer;