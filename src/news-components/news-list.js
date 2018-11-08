import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { showNewsDescription } from "../actions/get-post-actions";
import NewsDescription from "./news-description";
import NewsStar  from "./news-star";
import Loading  from "./loading.js";

class NewsList extends Component {
    constructor() {
        super()
        this.getPublishedDateTime = this.getPublishedDateTime.bind(this)
        this.showDescription = this.showDescription.bind(this)
    }
    showDescription(event) {        
        this.props.loading()
        let source = event.target.attributes[1].nodeValue;
        let id = event.target.id;
        this.props.showNewsDescription(this.props.data[source], source+id)
    }
    render() {
        const HEADLINES = this.props.news_list.map((data, index) => {
            return <tr key={index} id={index}>
                <td>
                    <div className="row">
                        <div className="col-md-3">
                            {
                                data.urlToImage ?
                                    <img 
                                        id={index} 
                                        source={this.props.id}
                                        src={data.urlToImage} 
                                        className="news-img" 
                                        onClick={this.showDescription}
                                        alt="no pic avail"
                                    />
                                :
                                "no image"
                            }
                        </div>
                        <div className="col-md-9">
                            <h3 
                                id={index} 
                                source={data.source.id}
                                onClick={this.showDescription}
                            >
                                {data.title}
                            </h3>
                            <p>
                                <small>
                                    <b>Published At: </b>
                                </small> 
                                { 
                                    this.getPublishedDateTime(data.publishedAt) 
                                }
                            </p>
                            <NewsStar id={index} source={this.props.id}/>
                        </div>
                    </div>
                </td>
            </tr>
        })
        return (
            <div className="col-md-9 news-list">
                <div className="row">
                    {   
                        (this.props.news_list.length > 0 && !this.props.wait) ?
                            <div className="col-md-6 headline-list-table">
                                <table className="table table-striped news-list-table">
                                    <thead>
                                        <tr>
                                            <th id={this.props.selected_list}>{this.props.selected_list}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {   
                                            HEADLINES                                             
                                        }
                                    </tbody>
                                </table>
                            </div>
                        :
                        (this.props.wait) ?
                            <Loading/>
                        : ''
                    }
                    <NewsDescription/>
                </div>
            </div>
        );
    }
    getPublishedDateTime(inputDate) {
        if (inputDate !== undefined && inputDate !== '') {
            let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
            let publDat = new Date(inputDate);
            let year = publDat.getFullYear();
            let month = months[publDat.getMonth()];
            let date = publDat.getDate();
            let hour = publDat.getHours();
            let min = publDat.getMinutes();
            let sec = publDat.getSeconds();
            let finalDatetime = ( (date<10)?'0'+date:date) + ',' + ( (month<10)?'0'+month:month) + ' ' + year + ' ' + ( (hour<10)?'0'+hour:hour) + ':' + ( (min<10)?'0'+min:min) + ':' + ( (sec<10)?'0'+sec:sec) ;
            return finalDatetime
        }
        return ''
    }
}
NewsList.propTypes = {
    showNewsDescription: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    // as defined in root-reducer
    list: state.lists.list,
    news_list: state.lists.news_list,
    selected_list: state.lists.selected_list,
    wait: state.lists.wait,
    data: state.lists.data,
    id: state.lists.id
}) 
function mapDispatchToProps(dispatch) {
    return bindActionCreators({showNewsDescription}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(NewsList);