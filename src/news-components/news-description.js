import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class NewsDescription extends Component {
    render() {
        return (
            <div className="col-md-6">
                {
                    this.props.title ? 
                        <table className="table table-striped news-list-table">
                            <thead>
                                <tr>
                                    <th 
                                        id={this.props.title}
                                    >
                                        {this.props.title}  
                                            <span 
                                                className=
                                                {
                                                    this.props.favorite ? "glyphicon glyphicon-star star-green" : ""
                                                }
                                            >
                                            </span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                { 
                                    <td>
                                        <img 
                                            src={this.props.img} 
                                            alt="" 
                                            className="desc-img"
                                        />
                                    </td>
                                }
                                </tr>
                                <tr>
                                { 
                                    <td>
                                        {this.props.description}
                                    </td>
                                }
                                </tr>
                            </tbody>
                        </table>
                    :
                    ''
                }
            </div>
        )
    }
}
NewsDescription.propTypes = {
    title: PropTypes.string.isRequired,
    favorite: PropTypes.bool.isRequired 
}
const mapStateToProps = state => ({
    // as defined in root-reducer
    title: state.lists.title,
    description: state.lists.description,
    img:  state.lists.img,
    favorite: state.lists.favorite 
}) 

export default connect(mapStateToProps)(NewsDescription);

