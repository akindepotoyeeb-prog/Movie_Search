const apiKey = "YOUR_API_KEY"; // get from omdbapi.com

const searchInput = document.querySelector('.search');
const resultsContainer = document.querySelector('.results');

async function searchMovies() {
  const query = searchInput.value;

  if (!query) return;

  try {
    const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`);
    const data = await response.json();

    displayMovies(data.Search);
  } catch (error) {
    console.log("Error fetching movies:", error);
  }
}

function displayMovies(movies) {
  resultsContainer.innerHTML = "";

  if (!movies) {
    resultsContainer.innerHTML = "No movies found";
    return;
  }

  movies.forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');

    movieCard.innerHTML = `
      <img src="${movie.Poster}" alt="${movie.Title}">
      <h3>${movie.Title}</h3>
      <p>${movie.Year}</p>
    `;

    resultsContainer.appendChild(movieCard);
  });
}

document.querySelector('.search-btn')
  .addEventListener('click', searchMovies);