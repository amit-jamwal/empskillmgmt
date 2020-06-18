import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Card, CardBody, Row, Col, Table, CardHeader, CardTitle } from 'reactstrap';
import * as action from '../../store/action/index';
import profilePic from '../../assets/images/default-profile-pic.jpg'
import { dateFormat } from "../../common/common-util";
import './viewEmployee.css';
import ViewExperience from "./viewExperience";
import ViewSkills from "./viewSkills";

class ViewEmployee extends Component {
    constructor(props) {
        super(props);
        this.getDetails = true;
        this.empId = null;
    }

    closeModal = () => {
        this.props.toggle();
    }
    editEmployee = () => {
        this.props.history.push('/addEmployee');
    }

    editEmployee
    render() {
        return (
            <div>
                <Modal isOpen={this.props.modal ? true : false} backdrop="static">
                    <ModalHeader toggle={this.props.toggle}>Employee Details</ModalHeader>
                    <ModalBody>
                        <div className="row">
                            <Col md="4">
                                <Card className="card-user card-height">
                                    <div className="image">
                                        {/* <img alt="..." src='' /> */}
                                    </div>
                                    <CardBody>
                                        <div className="author">
                                            <img
                                                alt="..."
                                                className="avatar border-gray"
                                                src={profilePic}
                                            />
                                            <h5 className="title">{this.props.personalInfo.firstName} {this.props.personalInfo.lastName}</h5>
                                            <p>{dateFormat(this.props.personalInfo.dob)}</p>
                                            <p>{this.props.personalInfo.sex}</p>
                                            <p>{this.props.personalInfo.email}</p>
                                        </div>
                                    </CardBody>
                                </Card>

                            </Col>
                            <Col md="4">
                                <ViewExperience></ViewExperience>
                            </Col>
                            <Col md="4">
                                <ViewSkills></ViewSkills>
                            </Col>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <div className="pull-right">
                            <Button className="btn button-color ml-3" color="primary" onClick={this.editEmployee}>Edit</Button>
                            <Button color="btn button-color ml-3" onClick={this.closeModal}>Cancel</Button>
                        </div>
                    </ModalFooter>
                </Modal>
            </div >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        personalInfo: state.personalInfo,
    };
}

export default withRouter(connect(mapStateToProps)(ViewEmployee))