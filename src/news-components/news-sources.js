import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getNewsSources, fetchNews, loading } from "../actions/get-post-actions";
import NewsList from "./news-list.js";
import { bindActionCreators } from 'redux'
import NewsFooter from './news-footer';
import Loading  from "./loading.js";

class NewsSource extends Component {
    componentDidMount () {
        this.props.loading()
        this.props.getNewsSources();
    }
    constructor(props) {
        super(props)
        this.getNews = this.getNews.bind(this);
    }
    getNews(event) {
        this.props.fetchNews({id: event.target.id, text: event.target.innerHTML, input: this.props.data});
    }
    render() {
        const SOURCES = this.props.list.length > 0 ?
            this.props.list.map((data, index) => {
                return <tr key={index}>
                    <td>
                        <button className="btn btn-primary news-source" type="button"  onClick={this.getNews} id={data.id}>
                            {data.name}
                        </button>
                    </td>
                </tr>
            })
            :
            (this.props.wait) ?
                <Loading/>
            : ''
        return (
            <div className="row source">
                <div className="col-md-3 source-news-table">
                    <table className="table source-list">
                        <thead>
                            <tr>
                                
                                <th id="all-sources">All Sources</th>
                            </tr>
                        </thead>
                        <tbody>
                            { SOURCES }
                        </tbody>
                    </table>
                </div>
                <NewsList/>
                <NewsFooter/>
            </div>
        );
    }
}
NewsSource.propTypes = {
    getNewsSources: PropTypes.func.isRequired,
    fetchNews: PropTypes.func.isRequired,
    list: PropTypes.array.isRequired
}
const mapStateToProps = state => ({ 
    // lists : as defined in root-reducer
    list: state.lists.list,
    data: state.lists.data,
    wait: state.lists.wait,
})
function mapDispatchToProps(dispatch) {
    return bindActionCreators({getNewsSources, fetchNews, loading}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(NewsSource);