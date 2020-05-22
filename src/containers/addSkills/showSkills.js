import React, { Component } from "react";
import { Button, Card, CardHeader, Table, CardFooter, ListGroup, ListGroupItem, Toast, ToastHeader, ToastBody } from "reactstrap";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import AddSkills from "./addSkills";
import * as action from '../../store/action/index';
import './showSkills.css';

class ShowSkills extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openModal: false,
            reqValidation: false
        }
    }
    toggle = () => {
        this.setState({
            openModal: !this.state.openModal
        })
    }
    goBack = () => {
        this.props.history.goBack();
    }
    componentDidUpdate() {
        this.props.showSkills();
    }

    saveEmployee = () => {
        console.log(this.props.skillList.length)
        console.log('ave')
        if (this.props.skillList.length === 0) {
            this.setState({
                reqValidation: true
            })
        }
    }
    closeToast = () => {
        this.setState({
            reqValidation: false
        })
    }

    render() {
        let toster = null;
        if (this.state.reqValidation) {
            toster = (<Toast>
                <ToastHeader>
                    Reactstrap
                 </ToastHeader>
                <ToastBody>
                    This is a toast on a white background — check it out!
                </ToastBody>
            </Toast>)
        }

        const renderRows = this.props.skillList?.map((item, i) => {
            return <tr key={i}>
                <th scope="row">{i + 1}</th>
                <td>{item.skill}</td>
                <td>{item.rating}</td>
                <td><Button className="btn btn-info" onClick={() => this.handleDeleteExp(i)}>Delete</Button></td>
            </tr>
        });
        return (
            <div className="container-fluid">
                <Card body>
                    <CardHeader>Skills
                    <Button className="btn btn-info" onClick={this.toggle}>Add Skills</Button>
                        <AddSkills modal={this.state.openModal} toggle={this.toggle}></AddSkills>
                    </CardHeader>
                    <Table responsive hover bordered>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Skills</th>
                                <th>Level</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderRows}
                        </tbody>
                    </Table>
                    <CardFooter>
                        <div className="pull-right">
                            <Button className="btn btn-info button mr-3" type="button" onClick={this.goBack}>Back</Button>
                            <Button className="btn btn-info button" type="button" onClick={this.saveEmployee}>Save</Button>
                        </div>
                    </CardFooter>
                </Card>
                <Toast isOpen={this.state.reqValidation}>
                    <ToastHeader toggle={this.closeToast}>Toast title</ToastHeader>
                    <ToastBody>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </ToastBody>
                </Toast>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log('skill', state);
    return {
        skillList: state.skillList || []
    };
}
const mapDispatchToProps = dispatch => {
    return {
        showSkills: () => dispatch(action.showSkills()),
        deleteSkills: (id) => dispatch(action.deleteSkills(id))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ShowSkills))