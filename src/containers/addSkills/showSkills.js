import * as moment from 'moment';
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Card, CardFooter, CardHeader, Table } from "reactstrap";
import * as action from '../../store/action/index';
import AddSkills from "./addSkills";
import './showSkills.css';
class ShowSkills extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openModal: false,
            reqValidation: false,
            skillId: null
        }
        let isAddNew = null;
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
        if (this.props.skillList.length === 0 && this.props.experienceList.length === 0 && Object.keys(this.props.personalInfo).length === 0) {
            this.props.history.push('./dashboard')
        }
    }

    saveEmployee = () => {
        if (this.props.skillList.length === 0) {
            toast.warning("Please Add Skills !", {
                autoClose: 3000,
                closeOnClick: true,
                closeButton: true
            });
        } else {
            let finalObj = { ...this.props.personalInfo, experiences: [...this.props.experienceList], skills: [...this.props.skillList] };
            finalObj.experiences.map((item, ind) => {
                item['fromDate'] = moment(item['fromDate']).format('YYYY-MM-DD');
                item['toDate'] = moment(item['toDate']).format('YYYY-MM-DD');
            })
            this.props.saveEmployee(finalObj);


        }
    }
    handleDeleteSkill = (ind) => {
        this.props.deleteSkills(ind);
        setTimeout(() => {
            this.props.showSkills();
        }, 1000);
    }

    editSkills = (id) => {
        this.isAddNew = false;
        this.setState({
            skillId: id
        })
        this.toggle()
    }
    openModal = () => {
        this.setState({
            skillId: null
        })
        this.isAddNew = true;
        this.toggle();
    }

    render() {
        const renderRows = this.props.skillList?.map((item, i) => {
            return <tr key={i} className="row mr-0 ml-0">
                <th className="col-md-3" scope="row">{i + 1}</th>
                <td className="col-md-3">{item.skill}</td>
                <td className="col-md-3">{item.level}</td>
                <td className="col-md-3">
                    <div className="pull-right">
                        <Button className="btn button-color ml-3" onClick={() => this.editSkills(i)}>Edit</Button>
                        <Button className="btn button-color ml-3" onClick={() => this.handleDeleteSkill(i)}>Delete</Button>
                    </div>
                </td>
            </tr>
        });
        return (
            <div className="container-fluid">
                <Card body>
                    <CardHeader>
                        <span>Skill List</span>
                        <Button className="btn btn-info" onClick={this.openModal}>Add Skills</Button>
                        <AddSkills modal={this.state.openModal}
                            toggle={this.toggle}
                            id={this.state.skillId}
                            isAddNew={this.isAddNew}></AddSkills>
                    </CardHeader>
                    <Table responsive hover bordered>
                        <thead>
                            <tr className="row mr-0 ml-0">
                                <th className="col-md-3">#</th>
                                <th className="col-md-3">Skills</th>
                                <th className="col-md-3">Level</th>
                                <th className="col-md-3"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderRows}
                        </tbody>
                    </Table>
                    <CardFooter>
                        <div className="pull-right">
                            <Button className="btn button-color mr-3" type="button" onClick={this.goBack}>Back</Button>
                            <Button className="btn button-color mr-3" type="button" onClick={this.saveEmployee}>Save</Button>
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
        skillList: state.skillList || [],
        experienceList: state.experienceList,
        personalInfo: state.personalInfo
    };
}
const mapDispatchToProps = dispatch => {
    return {
        showSkills: () => dispatch(action.showSkills()),
        deleteSkills: (id) => dispatch(action.deleteSkills(id)),
        saveEmployee: (payload) => dispatch(action.saveEmployee(payload))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ShowSkills))