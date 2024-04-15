function setupArrowsAndLists() {
  const movieArrows = document.querySelectorAll(".arrow");
  const movieLeftArrows = document.querySelectorAll(
    ".movie-list-container .arrow-left"
  );
  const movieLists = document.querySelectorAll(".movie-list");
  const seriesArrows = document.querySelectorAll(
    ".series-list-container .arrow"
  );
  const seriesLeftArrows = document.querySelectorAll(
    ".series-list-container .arrow-left"
  );
  const seriesLists = document.querySelectorAll(".series-list");

  console.log(movieArrows);
  console.log(movieLeftArrows);
  console.log(seriesLeftArrows);
  console.log(seriesArrows);

  console.log(movieLists);

  movieArrows.forEach((arrow, i) => {
    let clickCounter = 0;
    arrow.addEventListener("click", () => {
      const itemNumber = movieLists[i].querySelectorAll("img").length;
      const itemWidth = 720 + 30;
      const viewportWidth = window.innerWidth;
      const itemsPerView = Math.floor(viewportWidth / itemWidth);
      const maxScroll = itemNumber - itemsPerView;

      console.log({
        viewportWidth,
        itemsPerView,
        maxScroll,
        clickCounter,
        itemNumber,
      });
      if (clickCounter <= 4) {
        clickCounter++;
        movieLists[i].style.transform = `translateX(${
          -itemWidth * clickCounter
        }px)`;
      } else {
        clickCounter = maxScroll;
      }
    });
  });

  movieLeftArrows.forEach((arrow, i) => {
    let clickCounter = 0;
    arrow.addEventListener("click", () => {
      const itemNumber = movieLists[i].querySelectorAll("img").length;
      const itemWidth = 250 + 30;
      const viewportWidth = window.innerWidth;
      const itemsPerView = Math.floor(viewportWidth / itemWidth);
      const maxScroll = itemNumber - itemsPerView;

      console.log({
        viewportWidth,
        itemsPerView,
        maxScroll,
        clickCounter,
        itemNumber,
      });
      if (clickCounter > 0) {
        movieLists[i].style.transform = `translateX(${
          -itemWidth * clickCounter
        }px)`;
        clickCounter--;
      } else {
        clickCounter = maxScroll;
      }
    });
  });

  seriesArrows.forEach((arrow, i) => {
    let clickCounter = 0;
    arrow.addEventListener("click", () => {
      const itemNumber = seriesLists[i].querySelectorAll("img").length;
      const itemWidth = 250 + 40;
      const viewportWidth = window.innerWidth;
      const itemsPerView = Math.floor(viewportWidth / itemWidth);
      const maxScroll = itemNumber - itemsPerView;

      clickCounter++;
      console.log({
        viewportWidth,
        itemsPerView,
        maxScroll,
        clickCounter,
        itemNumber,
      });
      if (clickCounter <= maxScroll) {
        seriesLists[i].style.transform = `translateX(${
          -itemWidth * clickCounter
        }px)`;
      } else {
        clickCounter = maxScroll;
      }
    });
  });

  seriesLeftArrows.forEach((arrow, i) => {
    let clickCounter = 0;
    arrow.addEventListener("click", () => {
      const itemNumber = seriesLists[i].querySelectorAll("img").length;
      const itemWidth = 250 + 40;
      const viewportWidth = window.innerWidth;
      const itemsPerView = Math.floor(viewportWidth / itemWidth);
      const maxScroll = itemNumber - itemsPerView;

      console.log({
        viewportWidth,
        itemsPerView,
        maxScroll,
        clickCounter,
        itemNumber,
      });
      if (clickCounter >= maxScroll) {
        clickCounter--;
        seriesLists[i].style.transform = `translateX(${
          -itemWidth * clickCounter
        }px)`;
      } else {
        clickCounter = maxScroll;
      }
    });
  });
}

const ball = document.querySelector(".toggle-ball");
const items = document.querySelectorAll(
  ".container, .movie-list-title, .navbar-container, .sidebar, .left-menu-icon, .toggle, #results, #searchBar, .movie-list-item-desc, .movie-list-item-title"
);

ball.addEventListener("click", () => {
  items.forEach((item) => {
    item.classList.toggle("active");
  });
  ball.classList.toggle("active");
});

function fetchAndDisplayMovies() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMmFhMzUxNDM5Yzg2MmY4YmJmNTAxOWQ0NjRhNmU0NCIsInN1YiI6IjY1YzYyMzk0ZGJjYWRlMDE2MjcwMDZiOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SAnEacqe4myjvfT45Ie8YaHMaU8utsoxk_nPaYFf9x0", // Make sure to replace with your actual token
    },
  };

  fetch(
    "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
    options
  )
    .then((response) => response.json())
    .then((data) => {
      const movieListElement = document.querySelector(".movie-list");
      movieListElement.innerHTML = "";
      data.results.forEach((movie) => {
        const movieItem = document.createElement("div");
        movieItem.className = "movie-list-item";

        const movieImg = document.createElement("img");
        movieImg.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        movieImg.alt = movie.title;
        movieImg.className = "movie-list-item-img";

        const movieTitle = document.createElement("span");
        movieTitle.textContent = movie.title;
        movieTitle.className = "movie-list-item-title";

        const movieDesc = document.createElement("p");
        movieDesc.textContent = movie.overview;
        movieDesc.className = "movie-list-item-desc";

        const movieButton = document.createElement("button");
        movieButton.textContent = "Add to watchlist";
        movieButton.className = "movie-list-item-trailer";
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

        movieItem.appendChild(movieImg);
        movieItem.appendChild(movieTitle);
        movieItem.appendChild(movieDesc);
        movieItem.appendChild(movieButton);
        movieListElement.appendChild(movieItem);
      });
    })
    .catch((err) => console.error(err));
}

function addToFavorites(mediaId, mediaType) {
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMmFhMzUxNDM5Yzg2MmY4YmJmNTAxOWQ0NjRhNmU0NCIsInN1YiI6IjY1YzYyMzk0ZGJjYWRlMDE2MjcwMDZiOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SAnEacqe4myjvfT45Ie8YaHMaU8utsoxk_nPaYFf9x0",
    },
    body: JSON.stringify({
      media_type: mediaType,
      media_id: mediaId,
      favorite: true,
    }),
  };

  fetch("https://api.themoviedb.org/3/account/20977516/favorite", options)
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        console.log(mediaType + "Added to favorites successfully!");
      } else {
        console.error("Failed to add to favorites:", data.status_message);
      }
    })
    .catch((err) => console.error(err));
}

function fetchAndDisplaySeries() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMmFhMzUxNDM5Yzg2MmY4YmJmNTAxOWQ0NjRhNmU0NCIsInN1YiI6IjY1YzYyMzk0ZGJjYWRlMDE2MjcwMDZiOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SAnEacqe4myjvfT45Ie8YaHMaU8utsoxk_nPaYFf9x0", // Make sure to replace with your actual token
    },
  };

  fetch("https://api.themoviedb.org/3/trending/tv/day?language=en-US", options)
    .then((response) => response.json())
    .then((data) => {
      const movieListElement = document.querySelector(".series-list");
      movieListElement.innerHTML = "";
      data.results.forEach((movie) => {
        const movieItem = document.createElement("div");
        movieItem.className = "series-list-item";

        const movieImg = document.createElement("img");
        movieImg.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        movieImg.alt = movie.name;
        movieImg.className = "series-list-item-img";

        const movieTitle = document.createElement("span");
        movieTitle.textContent = movie.name;
        movieTitle.className = "series-list-item-title";

        const movieDesc = document.createElement("p");
        movieDesc.textContent = movie.overview;
        movieDesc.className = "series-list-item-desc";

        const movieButton = document.createElement("button");
        movieButton.textContent = "Add to watchlist";
        movieButton.className = "series-list-item-trailer";
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

        movieItem.appendChild(movieImg);
        movieItem.appendChild(movieTitle);
        movieItem.appendChild(movieDesc);
        movieItem.appendChild(movieButton);
        movieListElement.appendChild(movieItem);
      });
    })
    .catch((err) => console.error(err));
}

window.addEventListener("load", fetchAndDisplayMovies);
window.addEventListener("load", fetchAndDisplaySeries);

setupArrowsAndLists();
