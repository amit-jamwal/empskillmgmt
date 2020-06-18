import * as action from './actionTypes';
import axios from 'axios';
import { staticUrl } from '../../common/common-util';

export const showEmployeeList = (list) => {
    return {
        type: action.SHOW_EMP_LIST,
        employeeList: list || []
    }
}

// export const clear = () => {
//     return {
//         type: action.CLEAR
//     }
// }


export const bindEmployee = (res) => {
    return {
        type: action.BIND_EMPLOYEE_DETAILS,
        payLoad: res.data
    }
}

export const showEmployeeDetails = (res) => {
    return {
        type: action.SHOW_EMPLOYEE_DETAILS,
        payLoad: res.data
    }
}


export const getEmployeeList = (pageNo, sortOrder, sortBy) => {
    const url = `${staticUrl}employees/${pageNo}/10/${sortOrder}/${sortBy}/`
    return dispatch => {
        axios.get(url)
            .then(response => {
                dispatch(showEmployeeList(response.data))
            })
            .catch(error => {
                console.log('ERROR:', error);
            })
    }
}


export const fetchEmployeeDetails = (empId, type = null) => {
    const url = `${staticUrl}employees/${empId}`;
    return dispatch => {
        axios.get(url)
            .then(response => {
                console.log('res', response)
                if (type === 'view') {
                    dispatch(showEmployeeDetails(response));
                } else {
                    dispatch(bindEmployee(response))
                }
            })
            .catch(error => {
                console.log('ERROR', error)
            })
    }
}