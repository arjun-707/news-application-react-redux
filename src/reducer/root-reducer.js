import { combineReducers } from 'redux'
import newsReducer from './news-reducer'

const rootReducer = combineReducers({
    lists: newsReducer
})

export default rootReducer;