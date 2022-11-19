
const API_KEY = '31272833-6208e6f151d79070e75270c69';
const BASE_URL='https://pixabay.com/api/'
export default class NewsApiService{
constructor() {
this.searchQuery = '';
    this.page = 1;
    this.totalHits = null;
}

fetchHits() {
const options = {
    key: API_KEY,
}

const
url=`${BASE_URL}?key=${API_KEY}&page=${this.page}&q=${this.searchQuery}&orientation=horizontal&safesearch=true&image_type=photo&per_page=40`

return fetch(url, options)
.then(response => response.json())
.then(data => {
    console.log(data);
this.incrementPage();
return data.hits;
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