import React, { Component } from "react";
import DatePicker from 'react-datepicker';
import { withRouter } from 'react-router-dom';
import { Button, Col, Form, FormFeedback, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import * as action from '../../store/action/index';
import { connect } from "react-redux";
import { dateFormat } from "../../common/common-util";

class AddExperiences extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validation: {
                reqCompany: false,
                reqDesignation: false,
                reqDateFrom: false,
                reqDateTo: false
            },
            dateFrom: new Date(),
            dateTo: new Date()
        }
    }

    handleSubmit = (e) => {
        // alert('helo');
        e.preventDefault();
        const formData = new FormData(e.target);
        const experience = {
            companyName: formData.get('companyName'),
            designation: formData.get('designation'),
            dateFrom: dateFormat(this.state.dateFrom),
            dateTo: dateFormat(this.state.dateTo)
        }
        console.log(experience);
        if (!experience.companyName || !experience.designation || !experience.dateFrom || !experience.dateTo) {
            this.setState({
                validation: {
                    reqCompany: !experience.companyName,
                    reqDesignation: !experience.designation,
                    reqDateFrom: !experience.dateFrom,
                    reqDateTo: !experience.dateTo
                }
            })
            // setTimeout(() => {
            //     console.log('adsf', this.state.validation);
            // }, 0);
        } else {
            this.props.addExperience(experience);
            this.props.toggle();
        }
    }
    handleValildation = (control) => {
        switch (control) {
            case 'companyName':
                this.setState({ validation: { reqCompany: false } });
                break;
            case 'designation':
                this.setState({ validation: { reqDesignation: false } });
                break;
            default:
                break;
        }
    }
    handleDate = (date, dateType) => {
        switch (dateType) {
            case 'dateFrom':
                this.setState({
                    dateFrom: date
                });
                break;
            case 'dateTo':
                this.setState({
                    dateTo: date
                })
                break;
            default:
                break;
        }
    }
    render() {
        return (
            <div>
                <Modal isOpen={this.props.modal ? true : false} toggle={this.props.toggle} backdrop="static">
                    <ModalHeader toggle={this.props.toggle}>Modal title</ModalHeader>
                    <Form className="container" onSubmit={(event) => { this.handleSubmit(event) }} autoComplete='off'>
                        <ModalBody>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="companyName">Company Name</Label>
                                        <Input type="text" name="companyName" id="companyName" placeholder="Company Name"
                                            invalid={this.state.validation.reqCompany}
                                            onChange={(e) => this.handleValildation('companyName')} />
                                        <FormFeedback >Required</FormFeedback>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="designation">Designation</Label>
                                        <Input type="text" name="designation" id="designation" placeholder="Designation"
                                            invalid={this.state.validation.reqDesignation}
                                            onChange={(e) => this.handleValildation('designation')} />
                                        <FormFeedback >Required</FormFeedback>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="dateFrom">From</Label>
                                        {/* <Input type="text" name="dateFrom" id="dateFrom" placeholder="Date From" invalid={true} /> */}
                                        <DatePicker
                                            name="dateFrom"
                                            dateFormat="dd/MM/yyyy"
                                            className="form-control"
                                            selected={this.state.dateFrom}
                                            onChange={(date) => this.handleDate(date, 'dateFrom')}
                                            showMonthDropdown
                                            showYearDropdown
                                            dropdownMode="select"
                                        />
                                        <i className="fa fa-calendar"></i>
                                        <FormFeedback invalid>Required</FormFeedback>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="dateTo">To</Label>
                                        {/* <Input type="text" name="dateTo" id="dateTo" placeholder="Date To" invalid={true} /> */}
                                        <DatePicker
                                            name="dateTo"
                                            dateFormat="dd/MM/yyyy"
                                            className="form-control"
                                            selected={this.state.dateTo}
                                            onChange={(date) => this.handleDate(date, 'dateTo')}
                                            showMonthDropdown
                                            showYearDropdown
                                            dropdownMode="select"
                                        />
                                        <i className="fa fa-calendar"></i>
                                        <FormFeedback invalid>Required</FormFeedback>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" type="submit">Add</Button>
                            <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        experience: { ...state.experienceList }
    };
}
const mapDispatchToProps = dispatch => {
    return {
        addExperience: (data) => dispatch(action.addExperience(data))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddExperiences))