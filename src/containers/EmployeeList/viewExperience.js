import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, CardBody, CardHeader, CardTitle, Table } from 'reactstrap';
import { dateFormat } from "../../common/common-util";

class ViewExperience extends Component {

    componentDidMount(){
        console.log('adsf')

    }
    render() {
        const renderExperience = this.props.experiences?.map((item, i) => {
            return <tr key={i}>
                <th scope="row">{i + 1}</th>
                <td>{item.company}</td>
                <td>{item.designation}</td>
                <td>{dateFormat(item.fromDate)}</td>
                <td>{dateFormat(item.toDate)}</td>
            </tr>
        });
        return (
            <div>
                <Card>
                    <CardHeader className="bg">
                        <CardTitle tag="h4">Experiences</CardTitle>
                    </CardHeader>
                    <CardBody className="tab-height">
                        <Table responsive hover  >
                            <thead className="header-text">
                                <tr>
                                    <th>#</th>
                                    <th>Company</th>
                                    <th>Designation</th>
                                    <th>From</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderExperience}
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
            </div >
        )
    }
}

const mapStateToProps = (state) => {
    // console.log('sdf', state)
    // console.log('1111', state.experienceList)
    return {
        // personalInfo: state.personalInfo,
        // skillList: state.skillList,
        experiences: state.experienceList
    };
}
const mapDispatchToProps = dispatch => {
    return {
        // getEmployeeDetails: (id) => dispatch(action.fetchEmployeeDetails(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewExperience)