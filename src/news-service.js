export default class NewsApiService{
    constructor() {
        this.searchQuery = '';
        this.page=1
    }

    fetchArticles() {
        console.log(this)
         const options = {
    key: '31272833-6208e6f151d79070e75270c69'
}

const url=`https://pixabay.com/api/?key=31272833-6208e6f151d79070e75270c69&q=${this.searchQuery}&orientation=horizontal&safesearch=true&image_type=photo&per_page=40&page=${this.page}`

fetch(url, options)
    .then(r => r.json())
    .then(data => {
        this.page += 1;
    });
    }


    get query(){
    return this.searchQuery;
}

set query(newQuery){
    this.searchQuery = newQuery;
}
}

