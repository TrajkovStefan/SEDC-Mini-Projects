const api_url = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=a1f36bff07e5255563df701b2bd9302d&page=1';
const img_path = 'https://image.tmdb.org/t/p/w1280';
const search_api = 'https://api.themoviedb.org/3/search/movie?api_key=a1f36bff07e5255563df701b2bd9302d&query="';

const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");

//Get initial movies

getMovies(api_url);

async function getMovies(url){
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    showMovies(data.results);
}

function showMovies(movies){
    main.innerHTML = "";

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie;

        const movieElements = document.createElement("div");
        movieElements.classList.add("movie");

        movieElements.innerHTML = ` 
            <img src="${img_path + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        `
        main.appendChild(movieElements);
    })
}

function getClassByRate(vote){
    if(vote >= 8) {
        return 'green';
    }
    else if(vote >= 5){
        return 'orange';
    }
    else{
        return 'red';
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if(searchTerm && searchTerm !== ""){
        getMovies(search_api + searchTerm);

        search.value = "";
    }
    else{
        window.location.reload();
    }
})

