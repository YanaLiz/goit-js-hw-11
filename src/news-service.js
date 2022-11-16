export default class NewsApiService{
constructor() {
this.searchQuery = '';
this.page = 1;
}

fetchArticles() {
const options = {
key: '31272833-6208e6f151d79070e75270c69'
}

const
url=`https://pixabay.com/api/?key=31272833-6208e6f151d79070e75270c69&page=${this.page}&q=${this.searchQuery}&orientation=horizontal&safesearch=true&image_type=photo&per_page=40`

return fetch(url, options)
.then(r => r.json())
.then(data => {

this.incrementPage();
return data.articles;
})
.catch(error => {
Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
});
}

incrementPage() {
this.page += 1;
}

resetPage() {
this.page = 1;
}

get query(){
return this.searchQuery;
}

set query(newQuery){
this.searchQuery = newQuery;
}
}

