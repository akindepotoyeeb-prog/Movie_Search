// Replace 'your_api_key' with your actual OMDb API key
const BASE_URL = "https://www.omdbapi.com/";
const API_KEY = "23f7b537"; 

const movieInput = document.getElementById('movieInput');

async function searchMovie(event) {
    // 1. Prevent the default link/form behavior (Stop the reload!)
    if (event) event.preventDefault();

    const query = movieInput.value.trim().toLowerCase();

    if (query === "") {
        alert("Please enter a movie name");
        return;
    }

    try {
        // 2. Fetch data from the API
        const response = await fetch(`${BASE_URL}?t=${query}&apikey=${API_KEY}`);
        const data = await response.json();

        if (data.Response === "True") {
            // 3. Store the result in localStorage so result.html can see it
            localStorage.setItem('searchResult', JSON.stringify(data));
            
            // 4. Redirect to the results page
            window.location.href = "result.html";
        } else {
            alert("Movie not found!");
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// --- Logic for result.html ---
// This runs only if we are on the result page
if (window.location.pathname.includes("result.html")) {
    window.onload = function() {
        const movieData = JSON.parse(localStorage.getItem('searchResult'));

        if (movieData) {
            // Update the HTML elements with API data
            document.querySelector('.details h1').innerText = movieData.Title;
            document.querySelector('.details p').innerText = movieData.Plot;
            document.querySelector('.poster').src = movieData.Poster;
            
            // Update tags (Year, Rated, etc.)
            const tags = document.querySelectorAll('.tag');
            tags[0].innerText = `Year: ${movieData.Year}`;
            tags[1].innerText = `Rated: ${movieData.Rated}`;
            tags[2].innerText = `Released: ${movieData.Released}`;
            tags[3].innerText = `Genre: ${movieData.Genre}`;
            
            // Update Info section
            const infoDivs = document.querySelectorAll('.info div');
            infoDivs[0].innerHTML = `<strong>Writer:</strong> ${movieData.Writer}`;
            infoDivs[1].innerHTML = `<strong>Actors:</strong> ${movieData.Actors}`;
            infoDivs[2].innerHTML = `<strong>IMDb Rating:</strong> ⭐ ${movieData.imdbRating} / 10`;
        }
    };
}
