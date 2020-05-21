import * as action from './actionTypes';

export const addPersonalInfo = (data) => {
    console.log('dddd', data)
    return {
        type: action.ADD_PERSONAL_INFO,
        personalInfo: data
    }
}

export const showPersonalInfo = (data) => {
    return {
        type: action.SHOW_PSERSONAL_INFO,
        personalInfo: data
    }
}

export const addExperience = (data) => {
    return {
        type: action.ADD_EXPERIENCE,
        experienceList: data
    }
}

export const showExperience = () => {
    return {
        type: action.SHOW_EXPERIENCE
    }
}

export const deleteExperience = (id) => {
    console.log('**************id', id)
    return {
        type: action.DELETE_EXPERIENCE,
        index: id
    }
}