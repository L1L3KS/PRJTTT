const APILINK = 'https://api.themoviedb.org/3/discover/movie?api_key=109bba576ce0fe6ca16e16eccb47f976';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?api_key=109bba576ce0fe6ca16e16eccb47f976&query=';

const main = document.getElementById('section');
const form = document.getElementById('form');
const search = document.getElementById('query');

returnMovies(APILINK);

function returnMovies(url) {
    fetch(url)
        .then(res => res.json())
        .then(function(data) {
            if (data.results) {
                // Create a movies-grid container if it doesn't exist yet
                const movies_grid = document.getElementsByName("movies-grid")[0];

                // Clear previous movie cards
                movies_grid.innerHTML = ''; 

                data.results.forEach(element => {
                    // Create the movie card div
                    const div_card = document.createElement("div");
                    div_card.setAttribute('class', 'movie-card');

                    // Create the image element
                    const image = document.createElement("img");
                    image.setAttribute('src', IMG_PATH + element.poster_path); // Corrected to show full image path
                    image.setAttribute('alt', element.title);
                    // image.setAttribute('class', 'movie-img')

                    // Create the title element
                    const title = document.createElement("h3");
                    title.innerText = element.title;

                    // Create the button
                    const button = document.createElement("button");
                    button.innerText = "Детальніше"; // Button text in Ukrainian
                    button.setAttribute('class', 'details-button')

                    image.addEventListener('mouseover', function(){
                        button.style.display = 'inline'
                    })

                    image.addEventListener('mouseout', function(){
                        button.style.display = 'none'
                    })

                    // Append elements to the movie card
                    div_card.appendChild(image);
                    div_card.appendChild(title);
                    div_card.appendChild(button);

                    // Append the movie card to the  grid
                    movies_grid.appendChild(div_card);

                    // Add a fade-in effect for the card
                    setTimeout(() => {
                        div_card.style.opacity = "1";
                        div_card.style.transform = "translateY(0)";
                    }, 100); // Apply fade-in after 100ms
                });
            }
        })
        .catch(error => {
            console.error("Error fetching movies:", error);
        });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchItem = search.value;
    main.innerHTML = '';  // Clear previous results

    if (searchItem) {
        returnMovies(SEARCHAPI + searchItem);
        search.value = '';  // Clear the search input
    }
});

document.querySelector('.details-button').style.display = 'none';
