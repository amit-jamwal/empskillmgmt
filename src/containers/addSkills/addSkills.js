import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { Button, Col, Form, FormFeedback, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import * as action from '../../store/action/index';
import { connect } from "react-redux";
import { dateFormat } from "../../common/common-util";

class AddSkills extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validation: {
                reqSkill: false,
                reqRating: false
            }
        }
    }

    handleSubmit = (e) => {
        // alert('helo');
        e.preventDefault();
        const formData = new FormData(e.target);
        const experience = {
            skill: formData.get('skills'),
            rating: formData.get('rating')
        }
        console.log(experience);
        if (!experience.skill || experience.rating.toLowerCase() === 'select') {
            this.setState({
                validation: {
                    reqSkill: !experience.skill,
                    reqRating: experience.rating.toLowerCase() === 'select',
                }
            })
        } else {
            this.props.addSkills(experience);
            this.props.toggle();
        }
    }
    handleValidation = (control) => {
        switch (control) {
            case 'skills':
                this.setState({ validation: { reqSkill: false } });
                break;
            case 'rating':
                this.setState({ validation: { reqRating: false } });
                break;
            default:
                break;
        }
    }
   
    closeModal = () => {
        this.setState({
            validation: {
                reqSkill: false,
                reqRating: false
            }
        })
        this.props.toggle();
    }
    render() {
        return (
            <div>
                <Modal isOpen={this.props.modal ? true : false} backdrop="static">
                    <ModalHeader toggle={this.props.toggle}>Modal title</ModalHeader>
                    <Form className="container" onSubmit={(event) => { this.handleSubmit(event) }} autoComplete='off'>
                        <ModalBody>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="skills">Skill</Label>
                                        <Input type="text" name="skills" id="skills" placeholder="Company Name"
                                            invalid={this.state.validation.reqSkill}
                                            onChange={(e) => this.handleValidation('skills')} />
                                        <FormFeedback >Required</FormFeedback>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="rating">Rating</Label>
                                        <Input type="select" name="rating" id="rating"
                                            invalid={this.state.validation.reqRating}
                                            onChange={() => this.handleValidation('rating')}>
                                            <option>Select</option>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Input>
                                        <FormFeedback invalid>Required</FormFeedback>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" type="submit">Add</Button>
                            <Button color="secondary" onClick={this.closeModal}>Cancel</Button>
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
        addSkills: (data) => dispatch(action.addSkills(data))    
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddSkills))