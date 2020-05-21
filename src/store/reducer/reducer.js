import { combineReducers } from "redux";
import showEmployeeListReducer from './showEmployeeListReducer';
import addPersonalInfoReducer from './addPersonalInfoReducer';
import experienceList from './experienceReducer';


const rootReducer = combineReducers({
  showEmployeeList: showEmployeeListReducer,
  personalInfo: addPersonalInfoReducer,
  experienceList: experienceList
});


export default rootReducer;