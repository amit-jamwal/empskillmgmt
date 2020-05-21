import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import AddExperience from './addExperience';
import { connect } from "react-redux";
import { Button, Table, Card, CardHeader, CardFooter } from 'reactstrap'
import { dateFormat } from "../../common/common-util";
import * as action from '../../store/action/index';
import './showExperiences.css'

class ShowExperiences extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openModal: false
        }
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
        this.props.history.push('./addskills');
    }
    render() {

        const renderRows = this.props.experiences?.map((item, i) => {
            return <tr key={i}>
                <th scope="row">{i + 1}</th>
                <td>{item.companyName}</td>
                <td>{item.designation}</td>
                <td>{dateFormat(item.dateFrom)}</td>
                <td>{dateFormat(item.dateTo)}</td>
                <td><Button className="btn btn-info" onClick={() => this.handleDeleteExp(i)}>Delete</Button></td>
            </tr>
        });
        return (
            <div className="container">
                <Card body>
                    <CardHeader>Experience List
                    <Button className="btn btn-info" onClick={this.toggle}>Add Experience</Button>
                        <AddExperience modal={this.state.openModal} toggle={this.toggle}></AddExperience>
                    </CardHeader>
                    <Table responsive hover bordered>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Company Name</th>
                                <th>Designation</th>
                                <th>From</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderRows}
                        </tbody>
                    </Table>
                    <CardFooter>
                        <div className="pull-right">
                            <Button className="btn btn-info button mr-3" type="button" onClick={this.goBack}>Back</Button>
                            <Button className="btn btn-info button" type="button" onClick={this.goNext}>Next</Button>
                        </div>
                    </CardFooter>
                </Card>
            </div>

        )
    }
}


const mapStateToProps = (state) => {
    console.log('&&&&&7', state)
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