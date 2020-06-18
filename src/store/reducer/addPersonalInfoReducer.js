import * as actionType from '../action/actionTypes';
import { updateObject } from '../../common/common-util';

const intialState = {
}

const personalInfo = (state, data) => {
    return updateObject(state, { ...data });
    // return { state , ...data };
}

const clear = (state, action) => {
    // state.splice(0, state.length)
    return {}
}

const bindEmployeeDetails = (state, action) => {
    // console.log('&&&&&&&&&', updateObject(state, { ...action.payLoad }))
    return updateObject(state, { ...action.payLoad });
}

const showEmployeeDetails = (state, action) => {

}

const reducer = (state = intialState, action) => {
    switch (action.type) {
        case actionType.ADD_PERSONAL_INFO: return personalInfo(state, action.personalInfo);
        case actionType.CLEAR: return clear(state, action);
        case actionType.BIND_EMPLOYEE_DETAILS: return bindEmployeeDetails(state, action);
        case actionType.SHOW_EMPLOYEE_DETAILS: return bindEmployeeDetails(state, action);

        default: return state;
    }
}

export default reducer;