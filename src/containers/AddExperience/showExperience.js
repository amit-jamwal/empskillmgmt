import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import AddExperience from './addExperience';
import { connect } from "react-redux";
import { Button, Table, Card, CardHeader, CardFooter } from 'reactstrap'
import { dateFormat } from "../../common/common-util";
import * as action from '../../store/action/index';
import './showExperiences.css'
import { ToastContainer, toast } from 'react-toastify';

class ShowExperiences extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openModal: false,
            experienceId: null
        }
        let isAddNew = null;
    }
    goBack = () => {
        this.props.history.goBack();
    }

    toggle = () => {

        this.setState({
            openModal: !this.state.openModal
        })
    }
    componentDidUpdate() {
        this.props.showExperience();
    }

    handleDeleteExp = (ind) => {
        this.props.deleteExperience(ind);
        setTimeout(() => {
            this.props.showExperience();
        }, 1000);
    }
    goNext = () => {
        if (this.props.experiences.length > 0) {
            this.props.history.push('./addskills');
        } else {
            toast.warning("Please Add Experiences !", {
                autoClose: 3000,
                closeOnClick: true,
                closeButton: true
            });
        }
    }
    editExperience = (id) => {
        this.isAddNew = false;
        this.setState({
            experienceId: id
        })
        this.toggle()
    }

    openModal = () => {
        this.setState({
            experienceId: null
        })
        this.isAddNew = true;
        this.toggle();
    }
    render() {
        const renderRows = this.props.experiences?.map((item, i) => {
            return <tr key={i} className="row mr-0 ml-0">
                <th className="col-md-2" scope="row">{i + 1}</th>
                <td className="col-md-2">{item.company}</td>
                <td className="col-md-2">{item.designation}</td>
                <td className="col-md-2">{dateFormat(item.fromDate)}</td>
                <td className="col-md-2">{dateFormat(item.toDate)}</td>
                <td className="col-md-2">
                    <div className="pull-right">
                        <Button className="btn button-color ml-3" onClick={() => this.editExperience(i)}>Edit</Button>
                        <Button className="btn button-color ml-3" onClick={() => this.handleDeleteExp(i)}>Delete</Button>
                    </div>
                </td>
            </tr>
        });
        return (
            <div className="container-fluid">
                <Card body>
                    <CardHeader>
                        <span>Experience List</span>
                        <Button className="btn btn-info" onClick={this.openModal}>Add Experience</Button>
                        <AddExperience id={this.state.experienceId}
                            modal={this.state.openModal}
                            toggle={this.toggle}
                            isAddNew={this.isAddNew}
                        ></AddExperience>
                    </CardHeader>
                    <Table responsive hover bordered>
                        <thead>
                            <tr className="row mr-0 ml-0">
                                <th className="col-md-2">#</th>
                                <th className="col-md-2">Company</th>
                                <th className="col-md-2">Designation</th>
                                <th className="col-md-2">From</th>
                                <th className="col-md-2">Date</th>
                                <th className="col-md-2"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderRows}
                        </tbody>
                    </Table>
                    <CardFooter>
                        <div className="pull-right">
                            <Button className="btn button-color ml-3" type="button" onClick={this.goBack}>Back</Button>
                            <Button className="btn button-color ml-3" type="button" onClick={this.goNext}>Next</Button>
                        </div>
                    </CardFooter>
                </Card>
                <ToastContainer />
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        experiences: state.experienceList || []
    };
}
const mapDispatchToProps = dispatch => {
    return {
        showExperience: () => dispatch(action.showExperience()),
        deleteExperience: (id) => dispatch(action.deleteExperience(id))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ShowExperiences))