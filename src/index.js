import axios from "axios";
import NewsApiService from "./news-service";


const refs = {
    searchForm: document.querySelector('#search-form'),
    galleryContainer:document.querySelector('.gallery'),
}

const newsApiService = new NewsApiService();



refs.searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
    e.preventDefault()

    newsApiService.query = e.currentTarget.elements.searchQuery.value;
    newsApiService.fetchArticles();

}

