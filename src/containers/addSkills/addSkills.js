import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { Button, Col, Form, FormFeedback, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import * as action from '../../store/action/index';

class AddSkills extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validation: {
                reqSkill: false,
                reqLevel: false
            },
            skillData: null,
            skillId: null,
            isNew: false
        }
    }

    handleSubmit = (e) => {
        // alert('helo');
        e.preventDefault();
        const formData = new FormData(e.target);
        const skillData = {
            skill: formData.get('skills'),
            level: formData.get('level')
        }
        if (!skillData.skill || skillData.level.toLowerCase() === 'select') {
            this.setState({
                validation: {
                    reqSkill: !skillData.skill,
                    reqLevel: skillData.level.toLowerCase() === 'select',
                }
            })
        } else {
            if (this.props.id !== null) {
                const data = { ...this.props.skillList[this.props.id], ...skillData };
                this.props.updateSkills(data, this.props.id);
            } else {
                this.props.addSkills(skillData);
            }
            this.setState({
                skillId: null
            })
            this.props.toggle();
        }
    }
    handleValidation = (control) => {
        switch (control) {
            case 'skills':
                this.setState({ validation: { reqSkill: false } });
                break;
            case 'level':
                this.setState({ validation: { reqLevel: false } });
                break;
            default:
                break;
        }
    }

    closeModal = () => {
        this.setState({
            validation: {
                reqSkill: false,
                reqLevel: false
            }
        })
        this.props.toggle();
    }

    componentDidUpdate() {
        const skill = this.props.skillList;
        if (this.props.isAddNew && this.props.isAddNew !== this.state.isNew) {
            this.setState({
                skillData: null,
                id: this.props.id,
                isNew: this.props.isAddNew,
                validation: {
                    reqSkill: false,
                    reqLevel: false
                }
            })
        } else if (this.props.id !== this.state.skillId) {
            this.setState({
                skillData: skill[this.props.id],
                skillId: this.props.id,
                id: this.props.id,
                isNew: this.props.isAddNew,
                validation: {
                    reqSkill: false,
                    reqLevel: false
                }
            })
        }
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.props.modal ? true : false} backdrop="static">
                    <ModalHeader className="card-header" toggle={this.props.toggle}>Add Skills</ModalHeader>
                    <Form className="container" onSubmit={(event) => { this.handleSubmit(event) }} autoComplete='off'>
                        <ModalBody>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="skills">Skill</Label>
                                        <Input type="text" name="skills" id="skills" placeholder="skill"
                                            defaultValue={this.state.skillData?.skill}
                                            invalid={this.state.validation.reqSkill}
                                            onChange={(e) => this.handleValidation('skills')} />
                                        <FormFeedback >Required</FormFeedback>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="level">Level</Label>
                                        <Input type="select" name="level" id="level"
                                            defaultValue={this.state.skillData?.level}
                                            invalid={this.state.validation.reqLevel}
                                            onChange={() => this.handleValidation('level')}>
                                            <option>Select</option>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Input>
                                        <FormFeedback >Required</FormFeedback>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button className="btn btn-info" color="primary" type="submit">Save</Button>
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
        skillList: { ...state.skillList }
    };
}
const mapDispatchToProps = dispatch => {
    return {
        addSkills: (data) => dispatch(action.addSkills(data)),
        updateSkills: (payload, id) => dispatch(action.updateSkills(payload, id))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddSkills))