import React, { Component } from "react";
import { Button, Card, CardHeader, Table, CardFooter } from "reactstrap";
import { withRouter } from "react-router";
import { connect } from "react-redux";

class ShowSkills extends Component {


    goBack = () => {
        this.props.history.goBack();
    }
    render() {
        return (
            <div>
                <div className="container">
                <Card body>
                    <CardHeader>Skills
                    
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
                            {/* {renderRows} */}
                        </tbody>
                    </Table>
                    <CardFooter>
                        <div className="pull-right">
                            <Button className="btn btn-info button mr-3" type="button" onClick={this.goBack}>Back</Button>
                            {/* <Button className="btn btn-info button" type="button" onClick={this.goNext}>Next</Button> */}
                        </div>
                    </CardFooter>
                </Card>
            </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        experiences: state.skillList || []
    };
}
const mapDispatchToProps = dispatch => {
    return {
        // showExperience: () => dispatch(action.showExperience()),
        // deleteExperience: (id) => dispatch(action.deleteExperience(id))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ShowSkills))