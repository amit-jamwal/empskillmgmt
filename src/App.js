import React from 'react';
import './App.css';
import {
  Route,
  NavLink,
} from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from 'reactstrap';
import Dashboard from './components/dashboard/dashboard';
import EmployeeDetails from './components/employee-details/employee-details';
import logo from './images/image.png'
import AddEmployee from './containers/AddEmployee/addEmployee';
import ShowExperience from './containers/AddExperience/showExperience';
import ShowSkills from './containers/addSkills/showSkills';
// import showSkill from './containers/AddSkills/showSkill';
function App() {
  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand>
          <img className="img-fluid" src={logo} alt="logo" />
        </NavbarBrand>
        <NavbarToggler />
        <Collapse navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink to="/dashboard">Dashboard</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/details">Details</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/dashboard">Add Detials</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <section>
        <Route exact path="/dashboard" component={Dashboard} />
        <Route path="/details" component={EmployeeDetails} />
        <Route exact path="/addEmployee" component={AddEmployee} />
        <Route exact path="/addExperiences" component={ShowExperience} />
        <Route exact path="/addskills" component={ShowSkills} />

      </section>
    </div>
  );
}

export default App;
