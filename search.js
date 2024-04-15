function searchMovies(query) {
  const encodedQuery = encodeURIComponent(query);
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMmFhMzUxNDM5Yzg2MmY4YmJmNTAxOWQ0NjRhNmU0NCIsInN1YiI6IjY1YzYyMzk0ZGJjYWRlMDE2MjcwMDZiOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SAnEacqe4myjvfT45Ie8YaHMaU8utsoxk_nPaYFf9x0",
    },
  };

  fetch(
    `https://api.themoviedb.org/3/search/multi?query=${encodedQuery}&include_adult=false&language=en-US&page=1`,
    options
  )
    .then((response) => response.json())
    .then((data) => updateResults(data))
    .catch((error) => console.error("Error:", error));
}

function updateResults(data) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  if (data.results) {
    data.results.forEach((movie) => {
      if (movie.poster_path) {
        const movieDiv = document.createElement("div");
        movieDiv.className = "movie-list-item";

        const movieImg = document.createElement("img");
        movieImg.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        movieImg.alt = `Poster of ${movie.title}`;
        movieImg.className = "movie-poster";

        const movieTitle = document.createElement("span");
        movieTitle.textContent = movie.title || movie.name;
        movieTitle.className = "movie-list-item-title";

        const movieDesc = document.createElement("p");
        movieDesc.textContent = movie.overview;
        movieDesc.className = "movie-desc";

        const movieButton = document.createElement("button");
        movieButton.textContent = "Add to watchlist";
        movieButton.className = "movie-button";
        movieButton.onclick = function () {
          addToFavorites(movie.id, movie.media_type);
          movieButton.textContent = "Adding...";

          movieButton.classList.add("is-adding");

          setTimeout(function () {
            movieButton.textContent = "Added to watchlist ✓";

            movieButton.classList.remove("is-adding");
            movieButton.classList.add("is-added");
          }, 1000);
        };

        movieDiv.appendChild(movieImg);
        movieDiv.appendChild(movieTitle);
        movieDiv.appendChild(movieDesc);
        movieDiv.appendChild(movieButton);

        resultsDiv.appendChild(movieDiv);
      }
    });
  }
}

let debounceTimeout;
const debounceSearch = (func, delay) => {
  return function (...args) {
    const context = this;
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => func.apply(context, args), delay);
  };
};

document.getElementById("searchBar").addEventListener(
  "input",
  debounceSearch(function (e) {
    searchMovies(e.target.value);
  }, 500)
);
