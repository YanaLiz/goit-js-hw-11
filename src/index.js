
import axios from "axios";
import NewsApiService from "./news-service";
import Notiflix from "notiflix";
import LoadMoreBtn from "./load-more-btn";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const refs = {
searchForm: document.querySelector('#search-form'),
loadMoreBtn:document.querySelector('.load-more'),
hitsContainer: document.querySelector('.gallery'),
}



const newsApiService = new NewsApiService();

console.log(newsApiService);

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

const loadMoreBtn = new LoadMoreBtn({
    selector: '.load-more',
    hidden: true,
})
console.log(loadMoreBtn)
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);

// loadMoreBtn.show();
// loadMoreBtn.disabled();


function onSearch(e) {
e.preventDefault();
clearHitsConainer();
    newsApiService.query = e.currentTarget.elements.searchQuery.value;
    if (newsApiService.query === '') {
        return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
    }
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
        return `<div class="gallery__item photo-card">
    <a href='${largeImageURL}' class="gallery__link"><img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
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
    }).join('');
}

// const modalWindow = new SimpleLightbox('.gallery a');
var lightbox = new SimpleLightbox('.gallery a', { captionsData: "alt", captionDelay: 250 });

function onLoadMore() {
    newsApiService.fetchHits().then(appendHitsMarkup);
    //     let createHitsMarkup=add.createHitsMarkup(array.hits)
    // if (array.totalHits <= page*40) {
    //     refs.loadMoreBtn.classList.add(`disabled`)
    //     return Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.")
    // }
}



function appendHitsMarkup(hits) {
refs.hitsContainer.insertAdjacentHTML('beforeend', createHitsMarkup(hits));
}

function clearHitsConainer() {
    refs.hitsContainer.innerHTML = '';
}





















