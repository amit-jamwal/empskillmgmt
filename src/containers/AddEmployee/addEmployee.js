import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Col, Row, FormFeedback, Button, Card, CardBody, CardFooter, CardHeader } from 'reactstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { connect } from 'react-redux';
import * as action from '../../store/action/index';
// import history from '../../common/history';
import { withRouter } from 'react-router-dom';

import moment from 'moment';

class AddEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validation: {
                invalidFirstName: false,
                invalidLastName: false,
                invalidGender: false,
                invalidEmail: false,
                requiredEmail: false,
                invalidDOB: false
            },
            DOB: new Date()

        }


    }

    handleValidation = (control, e) => {
        switch (control) {
            case 'firstName':
                this.setState({ validation: { invalidFirstName: false } });
                break;
            case 'lastName':
                this.setState({ validation: { invalidLastName: false } });
                break;
            case 'gender':
                this.setState({ validation: { invalidGender: false } });
                break;
            case 'email':
                const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (emailRex.test(e.target.value)) {
                    this.setState({ validation: { invalidEmail: false } });
                } else {
                    this.setState({ validation: { invalidEmail: true } });
                }
                break;
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const personalInfo = {
            firstName: data.get('firstName'),
            lastName: data.get('lastName'),
            email: data.get('email'),
            gender: data.get('gender'),
            DOB: '26/10/1986'
        }
        if (!personalInfo.firstName || !personalInfo.lastName || !personalInfo.email || personalInfo.gender === 'Select') {
            this.setState({
                validation: {
                    invalidFirstName: !personalInfo.firstName,
                    invalidLastName: !personalInfo.lastName,
                    invalidGender: personalInfo.gender === 'Select',
                    invalidEmail: !personalInfo.email
                }
            })

            // return;
        } else {

            if (this.state.validation.invalidEmail) {
                return;
            }
            // console.log(JSON.parse(JSON.stringify(personalInfo)));
            this.props.bindPersonalInfo(personalInfo);
            setTimeout(() => {
                this.props.history.push('/addexperiences');
            }, 0);
        }
    }
    handleDOB = (date) => {
        console.log(date)
        this.setState({ DOB: date });
    }
    render() {
        return (
            <div className="container">
                <Card body>
                    <CardHeader>
                        Personal Information
                    </CardHeader>
                    <Form className="container" onSubmit={this.handleSubmit} autoComplete='off'>
                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="firstName">First Name</Label>
                                    <Input type="text" name="firstName" id="firstName" placeholder="First Name"
                                        invalid={this.state.validation.invalidFirstName}
                                        defaultValue={this.props?.personalInfo.firstName}
                                        onChange={() => this.handleValidation('firstName')}
                                    />
                                    <FormFeedback invalid>Required</FormFeedback>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="lastName">Last Name</Label>
                                    <Input type="text" name="lastName" id="lastName" placeholder="Last Name" defaultValue={this.props?.personalInfo.lastName} invalid={this.state.validation.invalidLastName} onChange={() => this.handleValidation('lastName')} />
                                    <FormFeedback invalid>Required</FormFeedback></FormGroup>
                            </Col>
                        </Row>
                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="Gender">Gender</Label>
                                    <Input type="select" name="gender" id="Gender" defaultValue={this.props?.personalInfo.gender} invalid={this.state.validation.invalidGender} onChange={() => this.handleValidation('gender')}>
                                        <option>Select</option>
                                        <option>Male</option>
                                        <option>Female</option>
                                        <option>Other</option>
                                    </Input>
                                    <FormFeedback invalid>Required</FormFeedback>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="Email">Email</Label>
                                    <Input type="text" name="email" id="Email" placeholder="Email"
                                        defaultValue={this.props?.personalInfo.email}
                                        invalid={this.state.validation.invalidEmail}
                                        onChange={(e) => this.handleValidation('email', e)} />
                                    <FormFeedback invalid>Invalid Email</FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="firstName">Date of Birth</Label>
                                    {/* <Input type="text" name="firstName" id="firstName" placeholder="First Name" invalid={true} />
                                <FormFeedback invalid tooltip>Sweet! that name is available</FormFeedback> */}
                                    <DatePicker
                                        selected={this.state.DOB}
                                        onChange={this.handleDOB}
                                        name="startDate"
                                        dateFormat="dd/MM/yyyy"
                                        className="form-control"
                                    />
                                    <i className="fa fa-calendar"></i>
                                </FormGroup>
                            </Col>
                        </Row>
                        <CardFooter>
                            <Button type="submit">Next</Button>

                        </CardFooter>
                    </Form>

                </Card>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        personalInfo: { ...state.personalInfo }
    };
}
const mapDispatchToProps = dispatch => {
    return {
        bindPersonalInfo: (data) => dispatch(action.addPersonalInfo(data))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddEmployee));