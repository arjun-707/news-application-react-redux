import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addToFavorite, showNewsDescription } from "../actions/get-post-actions";
import { bindActionCreators } from 'redux'

class NewsStar extends Component {
    constructor(props) {
        super(props)
        this.addStar = this.addStar.bind(this)
        this.state = {
            fav: ""
        }
    }
    addStar(event) {
        let source = event.target.attributes[1].nodeValue;
        let id = event.target.id;
        this.props.addToFavorite(this.props.data, source, source+id, this.props.favorite_count)
        this.props.showNewsDescription(this.props.data[source], source+id)
    }
    render() {
        return (
            <span
                id={this.props.id} 
                source={this.props.source} 
                className={"glyphicon glyphicon-star "+ 
                    (
                        this.props.data[this.props.source][this.props.source+this.props.id].favorite 
                        ? "star-green"
                        : ""
                    )
                /* this.state.fav  */} 
                onClick={this.addStar} 
                data-toggle="tooltip" 
                title="favorite"
            >
            </span>
        )
    }
}
NewsStar.propTypes = {
    addToFavorite: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    // as defined in root-reducer
    data: state.lists.data,
    favorite_count: state.lists.favorite_count
}) 

function mapDispatchToProps(dispatch) {
    return bindActionCreators({addToFavorite, showNewsDescription}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(NewsStar);