import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, CardBody, CardHeader, CardTitle, Table } from 'reactstrap';

class ViewSkills extends Component {

    render() {
        const renderRows = this.props.skillList?.map((item, i) => {
            return <tr key={i}>
                <th scope="row">{i + 1}</th>
                <td>{item.skill}</td>
                <td>{item.level}</td>
            </tr>
        });
        return (
            <div>
                <Card>
                    <CardHeader className="bg">
                        <CardTitle tag="h4">Experiences</CardTitle>
                    </CardHeader>
                    <CardBody className="tab-height">
                        <Table responsive hover>
                            <thead className="header-text">
                                <tr>
                                    <th>#</th>
                                    <th>Skill</th>
                                    <th>Level</th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderRows}
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
            </div >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        // personalInfo: state.personalInfo,
        skillList: state.skillList,
        // experiences: state.experienceList
    };
}

export default connect(mapStateToProps)(ViewSkills)