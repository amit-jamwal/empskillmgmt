import React, { Component } from 'react';
import * as actions from '../../store/action/index';
import { connect } from 'react-redux';
import { Table, Card, CardHeader, CardBody, CardFooter } from 'reactstrap';
import { dateFormat } from '../../common/common-util';
import './employeeList.css'
import Pagination from 'react-js-pagination';
import { NavLink } from 'react-router-dom';

class EmployeeList extends Component {

    componentDidMount() {
        this.props.getEmployeeList(1);
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.props.getEmployeeList(pageNumber)
    }

    render() {
        const renderRows = this.props.list.map((item, i) => {
            return <tr key={i}>
                <th scope="row">{i + 1}</th>
                <td>{`${item.firstName} ${item.lastName}`}</td>
                <td>{item.sex}</td>
                <td>{item.email}</td>
                <td>{dateFormat(item.dob)}</td>
            </tr>
        })
        return (
            <div className="container">
                <Card body>
                    <CardHeader>Employee List
                        <NavLink className="btn btn-info" to='/addEmployee'>Add New Employee</NavLink>
                    </CardHeader>
                    <CardBody>
                        <Table responsive hover bordered>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Sex</th>
                                    <th>Email</th>
                                    <th>DOB</th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderRows}
                            </tbody>
                        </Table>
                    </CardBody>
                    <CardFooter>
                        <Pagination
                            itemClass="page-item"
                            linkClass="page-link"
                            activePage={this.props.currentPage}
                            itemsCountPerPage={this.props.pageSize}
                            totalItemsCount={this.props.totalItems}
                            pageRangeDisplayed={4}
                            onChange={this.handlePageChange.bind(this)}
                        />
                    </CardFooter>
                </Card>

            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
        list: state.showEmployeeList.results || [],
        currentPage: state.showEmployeeList.pageNumber,
        pageSize: state.showEmployeeList.pageSize,
        totalItems: state.showEmployeeList.totalNumberOfRecords || 0
    };

}

const mapDispatchToProps = dispatch => {
    return {
        getEmployeeList: (pageNo) => dispatch(actions.getEmployeeList(pageNo)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeList);