import * as moment from 'moment';

export const dateFormat = (date) => {
    if (!date) {
        return;
    }
    return moment(date).format('DD.MM.YYYY');
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
