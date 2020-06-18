import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Col, Row, FormFeedback, Button, Card, CardBody, CardFooter, CardHeader } from 'reactstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { connect } from 'react-redux';
import * as action from '../../store/action/index';
import { withRouter } from 'react-router-dom';
import './addEmployee.css'
import * as moment from 'moment';

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
            dob: null
        }
    }

    componentDidMount() {
        if (Object.keys(this.props.personalInfo).length > 0) {
            this.setState({
                dob: new Date(this.props.personalInfo.dob)
            })
        }
    }

    handleValidation = (control, e) => {
        switch (control) {
            case 'firstName':
                this.setState({ ...this.state, validation: { ...this.state.validation, invalidFirstName: false } });
                break;
            case 'lastName':
                this.setState({ ...this.state, validation: { ...this.state.validation, invalidLastName: false } });
                break;
            case 'sex':
                this.setState({ ...this.state, validation: { ...this.state.validation, invalidGender: false } });
                break;
            case 'email':
                const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (emailRex.test(e.target.value)) {
                    this.setState({ ...this.state, validation: { ...this.state.validation, invalidEmail: false } });
                } else {
                    this.setState({ ...this.state, validation: { ...this.state.validation, invalidEmail: true } });
                }
                break;
            default:
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
            sex: data.get('sex'),
            dob: moment(this.state.dob).format('YYYY-MM-DD')
        }
        if (!personalInfo.firstName || !personalInfo.lastName || !personalInfo.email || personalInfo.sex === 'Select' || personalInfo.dob === 'Invalid date') {
            this.setState({
                validation: {
                    invalidFirstName: !personalInfo.firstName,
                    invalidLastName: !personalInfo.lastName,
                    invalidGender: personalInfo.sex === 'Select',
                    invalidEmail: !personalInfo.email,
                    invalidDOB: personalInfo.dob === 'Invalid date'
                }
            })
        } else {
            if (this.state.validation.invalidEmail) {
                return;
            }
            this.props.addPersonalInfo(personalInfo);
            setTimeout(() => {
                this.props.history.push('/addexperiences');
            }, 0);
        }
    }
    handleDOB = (date) => {
        this.setState({ ...this.state, validation: { ...this.state.validation, invalidDOB: false }, dob: date });
    }
    goBack = () => {
        this.props.clear();
        this.props.history.goBack();
    }
    render() {
        return (
            <div className="container-fluid">
                <Card body>
                    <CardHeader>
                        <span>  Personal Information</span>
                    </CardHeader>
                    <Form onSubmit={this.handleSubmit} autoComplete='off'>
                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="firstName">First Name</Label>
                                    <Input type="text" name="firstName" id="firstName" placeholder="First Name"
                                        invalid={this.state.validation.invalidFirstName}
                                        defaultValue={this.props?.personalInfo.firstName}
                                        onBlur={() => this.handleValidation('firstName')}
                                    />
                                    <FormFeedback >Required</FormFeedback>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="lastName">Last Name</Label>
                                    <Input type="text" name="lastName" id="lastName" placeholder="Last Name"
                                        defaultValue={this.props?.personalInfo.lastName}
                                        invalid={this.state.validation.invalidLastName}
                                        onBlur={() => this.handleValidation('lastName')} />
                                    <FormFeedback >Required</FormFeedback></FormGroup>
                            </Col>
                        </Row>
                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="sex">sex</Label>
                                    <Input type="select" name="sex" id="sex"
                                        defaultValue={this.props?.personalInfo.sex}
                                        invalid={this.state.validation.invalidGender}
                                        onChange={() => this.handleValidation('sex')}>
                                        <option>Select</option>
                                        <option>Male</option>
                                        <option>Female</option>
                                        <option>Other</option>
                                    </Input>
                                    <FormFeedback >Required</FormFeedback>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="Email">Email</Label>
                                    <Input type="text" name="email" id="Email" placeholder="Email"
                                        defaultValue={this.props?.personalInfo.email}
                                        invalid={this.state.validation.invalidEmail}
                                        onBlur={(e) => this.handleValidation('email', e)} />
                                    <FormFeedback >Invalid Email</FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="startDate">Date of Birth</Label>
                                    <DatePicker
                                        selected={this.state.dob}
                                        onChange={this.handleDOB}
                                        name="startDate"
                                        dateFormat="dd/MM/yyyy"
                                        className="form-control"
                                        showMonthDropdown
                                        showYearDropdown
                                        dropdownMode="select"
                                    />
                                    <i className="fa fa-calendar"></i>
                                    {this.state.validation.invalidDOB ? <div className="invalid-feedback dob-validation">Required</div> : null}
                                </FormGroup>
                            </Col>
                        </Row>
                        <CardFooter>
                            <Button className="btn btn-info mr-3" type="submit">Next</Button>
                            <Button className="btn btn-info mr-3" onClick={this.goBack} type='button'>Back</Button>
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
        addPersonalInfo: (data) => dispatch(action.addPersonalInfo(data)),
        clear: () => dispatch(action.clear())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddEmployee));