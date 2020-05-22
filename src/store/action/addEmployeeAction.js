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
    return {
        type: action.DELETE_EXPERIENCE,
        index: id
    }
}

export const addSkills = (data) => {
    return {
        type: action.ADD_SKILLS,
        experienceList: data
    }
}

export const showSkills = () => {
    return {
        type: action.SHOW_SKILLS
    }
}

export const deleteSkills = (id) => {
    return {
        type: action.DELETE_SKILLS,
        index: id
    }
}