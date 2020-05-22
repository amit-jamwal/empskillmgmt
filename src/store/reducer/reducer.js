import { combineReducers } from "redux";
import showEmployeeListReducer from './showEmployeeListReducer';
import addPersonalInfoReducer from './addPersonalInfoReducer';
import experienceList from './experienceReducer';
import skillList from './addSkillsReducer';

const rootReducer = combineReducers({
  showEmployeeList: showEmployeeListReducer,
  personalInfo: addPersonalInfoReducer,
  experienceList: experienceList,
  skillList: skillList
});


export default rootReducer;