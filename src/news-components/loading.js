import React, { Component } from 'react'
import { connect } from 'react-redux';

class Loading extends Component {
  render() {
    return (
        <div className="col-md-6">
            <table className="table table-striped news-list-table">
                <thead>
                    <tr>
                        <th>Loading...</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div> 
    )
  }
}
export default connect()(Loading);
