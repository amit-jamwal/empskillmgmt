import * as moment from 'moment';
import axios from 'axios';

export const dateFormat = (date) => {
    if (!date) {
        return;
    }
    return moment(date).format('DD/MM/YYYY');
}


/**
 * METHOD TO UPDATE STATE...
 * @param {} oldObject 
 * @param {*} updatedProperties 
 */
export const updateObject = (oldObject, updatedProperties) => {
    // console.log('update state')
    // console.log('old state', oldObject);
    // console.log('new state', updatedProperties);
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const staticUrl = 'http://13.94.203.73:1103/api/';


// const instance = axios.create({
//     baseURL: 'http://13.94.203.73:1103/api/'
// });

// export default instance;
