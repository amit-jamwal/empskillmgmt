import * as action from './actionTypes';
import axios from 'axios';

export const showEmployeeList = (list) => {
    return {
        type: action.SHOW_EMP_LIST,
        employeeList: list || []
    }
}

export const getEmployeeList = (pageNo) => {
    const url = `http://13.94.203.73:1103/api/employees/${pageNo}/10/true/firstName/`
    return dispatch => {
        axios.get(url)
            .then(response => {
                console.log('res', response)
                dispatch(showEmployeeList(response.data))
            })
            .catch(error => {
                console.log('ERROR:', error);
            })
    }
}