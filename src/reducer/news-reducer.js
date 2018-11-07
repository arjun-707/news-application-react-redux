const initialState = {
    list: [],
    news_list: [],
    selected_list: '',
    wait: false,
    data: {},    
    title: '',
    description: '',
    img:  '',
    favorite: false,
    id: '',
    favorite_count: 0
};
const newsReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'source_list': 
            return {
                ...state,
                list: action.list,
                data: action.data
            };
        case 'news_list': 
            return {
                ...state,
                news_list: action.news_list, 
                selected_list: action.selected_list, 
                wait: action.wait, 
                data: action.data,
                id:  action.id
            };
        case 'favorite': 
            return {
                ...state,
                data: action.data,
                favorite_count: action.fav_count
            };
        case 'news_description': 
            return {
                ...state,
                title: action.selected_news,
                description: action.description,
                img:  action.img,
                favorite: action.favorite
            };
        case 'wait': 
            return {
                ...state,
                wait: action.wait
            };
        default:
            return state;
    }
}

export default newsReducer;