
export const getNewsSources = () => dispatch => {
    fetch('https://newsapi.org/v2/sources?apiKey=c7ec4bfc19a04d93a5745aad6ac3715e')        
        .then(response => 
            response.json()
        )
        .then(async (response) => {
            if (response.status === "ok") {
                let sourcesData = {}
                response.sources.map((data, index) => {
                    return sourcesData[data.id] = {}
                })
                dispatch({
                    type: 'source_list',
                    list: response.sources,
                    data: sourcesData
                })
            }
        })
        .catch(console.log)
}
export const fetchNews = (inputData) => dispatch => {
    let id = inputData.id;
    let text = inputData.text;
    fetch('https://newsapi.org/v2/top-headlines?sources='+id+'&apiKey=c7ec4bfc19a04d93a5745aad6ac3715e')
        .then(response => 
            response.json()
        )
        .then((response) => {
            if (response.status === "ok") {
                let srcData = inputData.input;
                response.articles.map((data, index) => {
                    if (!srcData[id].hasOwnProperty(id+index)) {
                        return srcData[id][id+index] = {
                            title: data.title,
                            description: data.content,
                            img: data.urlToImage,
                            favorite: false
                        };
                    }
                    else
                        return [];
                });
                dispatch({
                    type: 'news_list',
                    news_list: response.articles, 
                    selected_list: text,
                    data: srcData,
                    id: id
                })
            }
        })
        .catch(console.log)
}
export const addToFavorite = (inputData, firstIndex, secondIndex, fav) => dispatch => {
    if (inputData[firstIndex][secondIndex].favorite) {
        inputData[firstIndex][secondIndex].favorite = false
        fav--
    }
    else {
        inputData[firstIndex][secondIndex].favorite = true
        fav++
    }
    dispatch({
        type: 'favorite',
        data: inputData,
        fav_count: fav
    })
}
export const showNewsDescription = (inputData, index) => dispatch => {
    dispatch(
        {
            type: 'news_description',
            selected_news: inputData[index].title,
            description: inputData[index].description,
            img:  inputData[index].img,
            favorite: inputData[index].favorite
        }
    )
}
export const loading = () => dispatch => {
    dispatch(
        {
            type: 'loading',
            wait: true
        }
    )
}