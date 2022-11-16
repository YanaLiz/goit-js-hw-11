import axios from "axios";
import NewsApiService from "./news-service";
// import Notiflix from "notiflix";



const refs = {
searchForm: document.querySelector('#search-form'),
loadMoreBtn:document.querySelector('.load-more'),
articlesContainer: document.querySelector('.gallery'),
}

const newsApiService = new NewsApiService();

console.log(newsApiService);

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
e.preventDefault();

newsApiService.query = e.currentTarget.elements.searchQuery.value;
newsApiService.resetPage();
newsApiService.fetchArticles().then(appendArticlesMarkup);

}

function createArticlesMarkup(articlesMarkup) {
return articlesMarkup
.map(({ }) => {
return `<div class="photo-card">
    <img src="" alt="" loading="lazy" />
    <div class="info">
        <p class="info-item">
            <b>${Likes}</b>
        </p>
        <p class="info-item">
            <b>${Views}</b>
        </p>
        <p class="info-item">
            <b>${Comments}</b>
        </p>
        <p class="info-item">
            <b>${Downloads}</b>
        </p>
    </div>
</div>`
}).join('');
}

function onLoadMore() {
newsApiService.fetchArticles().then(articles => console.log(articles));
}

function appendArticlesMarkup(articles) {
refs.articlesContainer.insertAdjacentHTML('beforeend',createArticlesMarkup);
}

// function clearArticlesConainer() {
// refs.articlesContainer.innerHTML = '';
// }
