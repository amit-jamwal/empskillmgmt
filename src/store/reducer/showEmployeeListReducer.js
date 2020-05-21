import * as actionType from '../action/actionTypes';
import { updateObject } from '../../common/common-util';
const intialState = {}



const showEmployeeList = (state, action) => {
    return updateObject(state, { ...action.employeeList });
}


const reducer = (state = intialState, action) => {
    switch (action.type) {
        case actionType.SHOW_EMP_LIST: return showEmployeeList(state, action);
        default: return state;
    }
}
export default reducer;