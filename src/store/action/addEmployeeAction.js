import * as action from './actionTypes';
import axios from 'axios';
import { staticUrl } from '../../common/common-util';

export const addPersonalInfo = (data) => {
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

export const updateExperience = (payload, id) => {
    return {
        type: action.UPDATE_EXPERIENCE,
        experienceList: payload,
        id: id
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

export const updateSkills = (payload, id) => {
    return {
        type: action.UPDATE_SKILLS,
        skillList: payload,
        id: id
    }
}

export const success = () => {
    return {
        type: action.SUCCESS
    }
}

export const clear = () => {
    return {
        type: action.CLEAR
    }
}

export const saveEmployee = (payload) => {
    const url = payload?.employeeId ? `${staticUrl}employees/${payload.employeeId}` : `${staticUrl}employees`;
    const request = payload.employeeId ? axios.put : axios.post
    return dispatch => {
        request(url, payload)
            .then(response => {
                console.log(response)
                dispatch(clear());
            })
            .catch(error => {
                console.log(error);
                dispatch(action)
            })
    }
}