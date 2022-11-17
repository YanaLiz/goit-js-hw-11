


import axios from "axios";
import NewsApiService from "./news-service";
import Notiflix from "notiflix";


const refs = {
searchForm: document.querySelector('#search-form'),
loadMoreBtn:document.querySelector('.load-more'),
hitsContainer: document.querySelector('.gallery'),
}

const newsApiService = new NewsApiService();

console.log(newsApiService);

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
e.preventDefault();
clearHitsConainer();
newsApiService.query = e.currentTarget.elements.searchQuery.value;
newsApiService.resetPage();
newsApiService.fetchHits().then(appendHitsMarkup);

}

function createHitsMarkup(hits) {
    return hits.map(({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
    }) => {
        return `<div class="photo-card">
    <a href='${largeImageURL}'><img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
    <div class="info">
        <p class="info-item">
            <b>Likes</b>${likes}
        </p>
        <p class="info-item">
            <b>Views</b>${views}
        </p>
        <p class="info-item">
            <b>Comments</b>${comments}
        </p>
        <p class="info-item">
            <b>Downloads</b>${downloads}
        </p>
    </div>
</div>`
        }).join('')
        // gallery.insertAdjacentHTML('beforeend', hitsMarkup(hits));
}


function onLoadMore() {
newsApiService.fetchHits().then(appendHitsMarkup);
}

function appendHitsMarkup(hits) {
refs.hitsContainer.insertAdjacentHTML('beforeend', createHitsMarkup(hits));
}

function clearHitsConainer() {
refs.hitsContainer.innerHTML = '';
}





















