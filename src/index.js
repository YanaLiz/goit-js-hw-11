
import axios from "axios";
import Notiflix from "notiflix";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { newsApiService } from "./news-service";

let getEl = selector => document.querySelector(selector);
getEl('.search-form').addEventListener('submit', onSearch);
getEl('.load-more').addEventListener('click', onLoadMore);

const newApiService = new newsApiService();
const lightbox = new SimpleLightbox('.gallery a', { captionsData: "alt", captionDelay: 250 });

function  createHitsMarkup(cards) {
    return cards.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
            return `
        <div class="gallery_photo-card">
        <a class="gallery__link" href="${largeImageURL}">
        <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy"/>
        </a>
        <div class="info">
        <p class="info-item">
            <b>Likes</br></b>${likes}
        </p>
        <p class="info-item">
            <b>Views</br></b>${views}
        </p>
        <p class="info-item">
            <b>Comments</br></b>${comments}
        </p>
        <p class="info-item">
            <b>Downloads</br></b>${downloads}
        </p>
    </div>
        </div>
        `
        }).join('')
}

function appendHitsMarkup(data) {
    if (data.totalHits > 0) {
        getEl('.gallery').insertAdjacentHTML('beforeend', createHitsMarkup(data.hits));
        lightbox.refresh();
        Notiflix.Notify.success(`Hooray! We load more images.`);
    } else {
        Notiflix.Notify.warning("Sorry, there are no images matching your search query. Please try again.");
    }
}

function clearHitsConainer(data) {
    if (data.totalHits < 40 && data.totalHits !== 0) {
        getEl('.gallery').insertAdjacentHTML('beforeend', createHitsMarkup(data.hits));
        lightbox.refresh();
        return Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
    } else if (data.totalHits > 0) {
        getEl('.gallery').insertAdjacentHTML('beforeend', createHitsMarkup(data.hits));
        lightbox.refresh();
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
        getEl('.load-more').style.visibility = "visible";
    } else {
        Notiflix.Notify.warning("Sorry, there are no images matching your search query. Please try again.");
    }
}


function onSearch(e) {
    e.preventDefault();
    newApiService.query = e.currentTarget.elements.searchQuery.value;
    newApiService.resetPage();
    if (newApiService.query !== "") {
        getEl('.gallery').innerHTML = "";
        getEl('.load-more').style.visibility = "hidden";
    } else if (newApiService.query === "") {
        return Notiflix.Notify.warning("Sorry, there are no images matching your search query. Please try again.");
    
    }
    newApiService.getHits().then(data => {
        newApiService.totalHits = data.totalHits;
        clearHitsConainer(data);
    }).catch(error => {
        console.log(error);
        
        Notiflix.Notify.warning("Sorry, there are no images matching your search query. Please try again.");
    })
}

function onLoadMore(e) {
    e.preventDefault();
    newApiService.page += 1;
    newApiService.decreaseTotalHits();
    newApiService.getHits().then(data => {
        if (newApiService.totalHits <= 40) {
            getEl('.load-more').style.visibility = "hidden";
            Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.")
        }
        appendHitsMarkup(data);
    }).catch(error => {
        console.log(error);
        
        Notiflix.Notify.warning("Sorry, there are no images matching your search query. Please try again.");
    })
}

