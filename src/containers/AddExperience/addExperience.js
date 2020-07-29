import React, { Component } from "react";
import DatePicker from 'react-datepicker';
import { withRouter } from 'react-router-dom';
import { Button, Col, Form, FormFeedback, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import * as action from '../../store/action/index';
import { connect } from "react-redux";
import { dateFormat } from "../../common/common-util";
import * as moment from 'moment';
import { parseISO } from "date-fns";

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
            fromDate: null,
            toDate: null,
            experienceData: null,
            id: null,
            isNew: false
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log('')
        const formData = new FormData(e.target);
        const experience = {
            company: formData.get('company'),
            designation: formData.get('designation'),
            fromDate: this.state.fromDate === 'Invalid date' ? 'Invalid date' : moment(this.state.fromDate).format('YYYY-MM-DD'),
            toDate: this.state.toDate === 'Invalid date' ? 'Invalid date' : moment(this.state.toDate).format('YYYY-MM-DD')
        }
        if (!experience.company || !experience.designation || experience.fromDate === 'Invalid date' || experience.toDate === 'Invalid date') {
            this.setState({
                validation: {
                    reqCompany: !experience.company,
                    reqDesignation: !experience.designation,
                    reqDateFrom: experience.fromDate === 'Invalid date',
                    reqDateTo: experience.toDate === 'Invalid date'
                }
            })
        } else {
            if (this.props.id !== null) {
                this.props.updateExperience(experience, this.props.id)
            } else {
                this.props.addExperience(experience);
            }
            this.setState({
                ...this.state, fromDate: null, toDate: null, id: null
            })
            this.props.toggle();
        }
    }
    handleValildation = (control) => {
        switch (control) {
            case 'company':
                this.setState({ ...this.state, validation: { ...this.state.validation, reqCompany: false } });
                break;
            case 'designation':
                this.setState({ ...this.state, validation: { ...this.state.validation, reqDesignation: false } });
                break;
            default:
                break;
        }
    }
    handleDate = (date, dateType) => {
        switch (dateType) {
            case 'fromDate':
                // this.setState({
                //     fromDate: date
                // });
                this.setState({ ...this.state, validation: { ...this.state.validation, reqDateFrom: false }, fromDate: date });
                break;
            case 'toDate':
                // this.setState({
                //     toDate: date
                // })
                this.setState({ ...this.state, validation: { ...this.state.validation, reqDateTo: false }, toDate: date });
                break;
            default:
                break;
        }
    }
    componentDidUpdate() {
        const experience = this.props.experience;

        if (this.props.isAddNew && this.props.isAddNew !== this.state.isNew) {
            this.setState({
                experienceData: null,
                fromDate: null,
                toDate: null,
                id: this.props.id,
                isNew: this.props.isAddNew,
                validation: {
                    reqCompany: false,
                    reqDesignation: false,
                    reqDateFrom: false,
                    reqDateTo: false
                }
            })
        } else if (this.props.id !== this.state.id) {
            this.setState({
                experienceData: experience[this.props.id],
                fromDate: parseISO(experience[this.props.id].fromDate),
                toDate: new Date(experience[this.props.id].toDate),
                id: this.props.id,
                isNew: this.props.isAddNew,
                validation: {
                    reqCompany: false,
                    reqDesignation: false,
                    reqDateFrom: false,
                    reqDateTo: false
                }

            })
        }
    }
    render() {
        return (
            <div>
                <Modal contentClassName="card-style" isOpen={this.props.modal ? true : false} toggle={this.props.toggle} backdrop="static">
                    <ModalHeader className="card-header" toggle={this.props.toggle}>Add Experience</ModalHeader>
                    <Form className="container" onSubmit={(event) => { this.handleSubmit(event) }} autoComplete='off'>
                        <ModalBody>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="company">Company Name</Label>
                                        <Input type="text" name="company" id="company" placeholder="Company Name"
                                            defaultValue={this.state.experienceData?.company}
                                            invalid={this.state.validation.reqCompany}
                                            onBlur={(e) => this.handleValildation('company')} />
                                        <FormFeedback >Required</FormFeedback>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="designation">Designation</Label>
                                        <Input type="text" name="designation" id="designation" placeholder="Designation"
                                            defaultValue={this.state.experienceData?.designation}
                                            invalid={this.state.validation.reqDesignation}
                                            onBlur={(e) => this.handleValildation('designation')} />
                                        <FormFeedback >Required</FormFeedback>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="fromDate">From</Label>
                                        {/* <Input type="text" name="fromDate" id="fromDate" placeholder="Date From" invalid={true} /> */}
                                        <DatePicker
                                            name="fromDate"
                                            dateFormat="dd/MM/yyyy"
                                            className="form-control"
                                            selected={this.state.fromDate}
                                            onChange={(date) => this.handleDate(date, 'fromDate')}
                                            showMonthDropdown
                                            showYearDropdown
                                            dropdownMode="select"
                                            placeholderText="From"
                                        />
                                        <i className="fa fa-calendar"></i>
                                        {this.state.validation.reqDateFrom ? <div className="invalid-feedback dob-validation">Required</div> : null}
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="toDate">To</Label>
                                        {/* <Input type="text" name="toDate" id="toDate" placeholder="Date To" invalid={true} /> */}
                                        <DatePicker

                                            selected={this.state.toDate}
                                            onChange={(date) => this.handleDate(date, 'toDate')}
                                            showMonthDropdown
                                            showYearDropdown
                                            dropdownMode="select"
                                            dateFormat="dd/MM/yyyy"
                                            name="toDate"
                                            className="form-control"
                                            placeholderText="To"
                                        />
                                        <i className="fa fa-calendar"></i>
                                        {this.state.validation.reqDateTo ? <div className="invalid-feedback dob-validation">Required</div> : null}

                                    </FormGroup>
                                </Col>
                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button className="btn btn-info" color="primary" type="submit">Save</Button>
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
        addExperience: (data) => dispatch(action.addExperience(data)),
        updateExperience: (data, id) => dispatch(action.updateExperience(data, id))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddExperiences))