import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class NewsFooter extends Component {
    render() {
        return (
            <div className="footer">
                <p>Favorites : {this.props.favorite_count}</p>
            </div>
        )
    }
}
NewsFooter.propTypes = {
    favorite_count: PropTypes.number.isRequired 
}
const mapStateToProps = state => ({
    // as defined in root-reducer
    favorite_count: state.lists.favorite_count 
}) 

export default connect(mapStateToProps)(NewsFooter);

