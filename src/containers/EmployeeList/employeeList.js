import React, { Component } from 'react';
import * as action from '../../store/action/index';
import { connect } from 'react-redux';
import { Table, Card, CardHeader, CardBody, CardFooter, Button } from 'reactstrap';
import { dateFormat } from '../../common/common-util';
import './employeeList.css'
import Pagination from 'react-js-pagination';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import ViewEmployee from './viewEmployee';

class EmployeeList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openModal: false,
        }
        this.employeeId = null;
        this.sortBy = 'FirstName';
        this.sortOrder = false;
    }
    componentDidMount() {
        this.props.getEmployeeList(1, this.sortOrder, this.sortBy);
    }

    handlePageChange(pageNumber) {
        this.props.getEmployeeList(pageNumber, this.sortOrder, this.sortBy)
    }

    clearState = () => {
        this.props.clear();
        // this.props.history.push('/addEmployee');
    }

    fetchDetails = (id) => {
        this.props.fetchEmployeeDetails(id);

        setTimeout(() => {
            this.props.history.push('/addEmployee');
        }, 1000);
    }
    viewEmployee = (id) => {
        this.employeeId = id;
        this.props.getEmployeeDetails(id);
        this.toggle();
    }
    toggle = () => {
        this.setState({
            openModal: !this.state.openModal,
        })
    }
    sort = (val) => {
        this.sortBy = val;
        this.sortOrder = !this.sortOrder;
        this.props.getEmployeeList(1, this.sortOrder, this.sortBy);
    }
    render() {
        const renderRows = this.props.list.map((item, i) => {
            return <tr key={i} className="row mr-0 ml-0">
                <th className="col-md-1" scope="row">{i + 1}</th>
                <td className="col-md-3">{`${item.firstName} ${item.lastName}`}</td>
                <td className="col-md-1">{item.sex}</td>
                <td className="col-md-3">{item.email}</td>
                <td className="col-md-2">{dateFormat(item.dob)}</td>
                <td className="col-md-2" >
                    <div className="pull-right">
                        <Button className='btn button-color mr-3' onClick={() => this.viewEmployee(item.employeeId)}>View</Button>
                        <Button className='btn button-color mr-3' onClick={() => this.fetchDetails(item.employeeId)}>Edit</Button>
                    </div>
                </td>
            </tr>
        })
        return (
            <div className="container-fluid">
                <Card body>
                    <CardHeader>
                        <span>Employee List</span>
                        <NavLink className="btn btn-info" onClick={this.clearState} to='/addEmployee'>Add New Employee</NavLink>
                        <ViewEmployee modal={this.state.openModal}
                            toggle={this.toggle}
                            empId={this.employeeId}
                            data={this.props.list}></ViewEmployee>
                    </CardHeader>
                    <CardBody>
                        <Table responsive hover >
                            <thead>
                                <tr className="row mr-0 ml-0">
                                    <th className="col-md-2">#</th>
                                    <th className="col-md-2 sort-by" onClick={() => this.sort('FirstName')} >Name</th>
                                    <th className="col-md-2" onClick={() => this.sort('Sex')} >Sex</th>
                                    <th className="col-md-2" onClick={() => this.sort('email')} >Email</th>
                                    <th className="col-md-2" onClick={() => this.sort('DOB')} >DOB</th>
                                    <th className="col-md-2"></th>
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
                            className="button-color"
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
        getEmployeeList: (pageNo, sortOrder, sortBy) => dispatch(action.getEmployeeList(pageNo, sortOrder, sortBy)),
        clear: () => dispatch(action.clear()),
        fetchEmployeeDetails: (id) => dispatch(action.fetchEmployeeDetails(id, 'bind')),
        getEmployeeDetails: (id) => dispatch(action.fetchEmployeeDetails(id, 'view'))

    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EmployeeList));