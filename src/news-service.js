import axios from "axios";

class newsApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.totalHits = null;
    }

    async getHits() {
    try {
        return await axios.get('https://pixabay.com/api/', {
            params: {
                key: "31272833-6208e6f151d79070e75270c69",
                q: this.searchQuery,
                image_type: "photo",
                orientation: "horizontal",
                safesearch: true,
                per_page: 40,
                page: this.page,
            }
        }).then(response => { 
            return response.data;
        }).then(data => {
            return data;
        })
    } catch (error) {
        console.log(error);
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    }
    }
    
    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }

    resetPage() {
        this.page = 1;
    }

    decreaseTotalHits() {
        this.totalHits = this.totalHits - 40;
    }
}


export { newsApiService };
