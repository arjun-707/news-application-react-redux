import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux'
import store from "./reducer/store";
import NewsSource from "./news-components/news-sources";
class App extends Component {
    
    render() {
        return (
            <Provider store={store}>
                <div className="App container-fluid">
                    <NewsSource/>
                </div>
            </Provider>
        );
    }
}

export default App;
