
import React, { Component } from 'react';

class SearchEmployee extends Component {

    render() {
        return (
            <div className="container">

                <input type="text" className="input" onChange={this.handleChange} placeholder="Search..." />
            </div>
        )
    }

}

export default SearchEmployee