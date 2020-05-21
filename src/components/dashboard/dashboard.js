import React, { Component } from 'react';
import EmployeeList from '../../containers/EmployeeList/employeeList';
import SearchEmployee from '../SearchEmployee/searchEmployee';

class Dashbboard extends Component {
    render() {
        return (
            <div>
                <SearchEmployee></SearchEmployee>
                <EmployeeList></EmployeeList>
            </div>
        )
    }
}

export default Dashbboard;