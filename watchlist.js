const options = {
  method: "POST",
  headers: {
    accept: "application/json",
    "content-type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMmFhMzUxNDM5Yzg2MmY4YmJmNTAxOWQ0NjRhNmU0NCIsInN1YiI6IjY1YzYyMzk0ZGJjYWRlMDE2MjcwMDZiOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SAnEacqe4myjvfT45Ie8YaHMaU8utsoxk_nPaYFf9x0",
  },
  body: JSON.stringify({
    media_type: "movie",
    media_id: 792307,
    favorite: true,
  }),
};

fetch("https://api.themoviedb.org/3/account/20977516/favorite", options)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));

const options3 = {
  method: "POST",
  headers: {
    accept: "application/json",
    "content-type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMmFhMzUxNDM5Yzg2MmY4YmJmNTAxOWQ0NjRhNmU0NCIsInN1YiI6IjY1YzYyMzk0ZGJjYWRlMDE2MjcwMDZiOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SAnEacqe4myjvfT45Ie8YaHMaU8utsoxk_nPaYFf9x0",
  },
  body: JSON.stringify({
    media_type: "movie",
    media_id: 693134,
    favorite: true,
  }),
};

fetch("https://api.themoviedb.org/3/account/20977516/favorite", options3)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));

function fetchWatchlist() {
  const moviesPromise = fetch(
    "https://api.themoviedb.org/3/account/20977516/favorite/movies?language=en-US&page=1&sort_by=created_at.asc",
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMmFhMzUxNDM5Yzg2MmY4YmJmNTAxOWQ0NjRhNmU0NCIsInN1YiI6IjY1YzYyMzk0ZGJjYWRlMDE2MjcwMDZiOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SAnEacqe4myjvfT45Ie8YaHMaU8utsoxk_nPaYFf9x0",
      },
    }
  ).then((response) => response.json());

  const tvShowsPromise = fetch(
    "https://api.themoviedb.org/3/account/20977516/favorite/tv?language=en-US&page=1&sort_by=created_at.asc",
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMmFhMzUxNDM5Yzg2MmY4YmJmNTAxOWQ0NjRhNmU0NCIsInN1YiI6IjY1YzYyMzk0ZGJjYWRlMDE2MjcwMDZiOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SAnEacqe4myjvfT45Ie8YaHMaU8utsoxk_nPaYFf9x0",
      },
    }
  ).then((response) => response.json());

  Promise.all([moviesPromise, tvShowsPromise])
    .then(([moviesData, tvShowsData]) => {
      const combinedResults = [...moviesData.results, ...tvShowsData.results];
      displayWatchlist(combinedResults);
    })
    .catch((error) => {
      console.error("Error fetching watchlist:", error);
    });
}

function displayWatchlist(combinedResults) {
  const watchlistDiv = document.getElementById("Watchlist");
  watchlistDiv.innerHTML = "";

  combinedResults.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "movie-list-item";

    const img = document.createElement("img");
    img.src = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
    img.alt = `Poster of ${item.title || item.name}`;
    img.className = "watchlist-img";

    const itemTitle = document.createElement("span");
    itemTitle.textContent = item.title || item.name;
    itemTitle.className = "movie-list-item-title";

    const itemDesc = document.createElement("p");
    itemDesc.textContent = item.overview;
    itemDesc.className = "watchlist-movie-desc";

    const itemButton = document.createElement("button");
    itemButton.textContent = "Remove from watchlist";
    itemButton.className = "movie-button";
    itemButton.onclick = function () {
      removeFromFavorites(item.id, itemDiv, "tv");
      removeFromFavorites(item.id, itemDiv, "movie");
    };

    itemDiv.appendChild(img);
    itemDiv.appendChild(itemTitle);
    itemDiv.appendChild(itemDesc);
    itemDiv.appendChild(itemButton);

    watchlistDiv.appendChild(itemDiv);
  });
}

function removeFromFavorites(itemId, itemElement, mediaType) {
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
      media_id: itemId,
      favorite: false,
    }),
  };

  fetch("https://api.themoviedb.org/3/account/20977516/favorite", options)
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        console.log("Removed from favorites successfully!");
        itemElement.remove(); // Remove the item from the DOM
      } else {
        console.error("Failed to remove from favorites:", data.status_message);
      }
    })
    .catch((err) => console.error(err));
}

fetchWatchlist();
