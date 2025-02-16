const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    nav.classList.toggle('active');
    burger.classList.toggle('active');

    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
});

// Scroll Animation for Movie Cards
const movieCards = document.querySelectorAll('.movie-card');

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

movieCards.forEach(card => {
    observer.observe(card);
});

// Slider functionality
document.addEventListener('DOMContentLoaded', function() {
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    const totalSlides = document.querySelectorAll('.slider-page').length;

    function updateSlider() {
        sliderWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    // Next button click
    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    });

    // Previous button click
    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
    });

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlider();
        });
    });

    // Auto-play functionality
    let autoplayInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }, 5000); // Change slide every 5 seconds

    // Pause auto-play on hover
    sliderWrapper.addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
    });

    // Resume auto-play on mouse leave
    sliderWrapper.addEventListener('mouseleave', () => {
        autoplayInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlider();
        }, 5000);
    });
});

// Movie database (можно расширить этот список)
const movies = [
    {
        title: 'Гладіатор II',
        genre: 'епічна історія, екшн, пригоди, драма',
        image: 'Gladiator2-poster2-vend.jpg',
        rating: '16+'
    },
    {
        title: 'Ваяна 2',
        genre: 'анімація, пригоди, сімейний',
        image: 'moana2-vend2.jpg',
        rating: '0+'
    },
    {
        title: 'Джокер: Божевілля на двох',
        genre: 'кримінал, драма, трилер, мюзикл, DC',
        image: 'jfd-vend4.jpg',
        rating: '16+'
    }
];

// Search functionality
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const searchResults = document.getElementById('searchResults');

// Function to search movies
function searchMovies(query) {
    if (!query) {
        searchResults.classList.remove('active');
        return;
    }

    query = query.toLowerCase();
    const results = movies.filter(movie => 
        movie.title.toLowerCase().includes(query) || 
        movie.genre.toLowerCase().includes(query)
    );

    displayResults(results);
}

// Function to display search results
function displayResults(results) {
    searchResults.innerHTML = '';

    if (results.length === 0) {
        searchResults.innerHTML = '<div class="no-results">Фільмів не знайдено</div>';
        searchResults.classList.add('active');
        return;
    }

    results.forEach(movie => {
        const resultItem = document.createElement('div');
        resultItem.className = 'search-result-item';
        resultItem.innerHTML = `
            <img src="${movie.image}" alt="${movie.title}">
            <div class="search-result-info">
                <h4>${movie.title}</h4>
                <p>${movie.genre}</p>
            </div>
        `;

        // Add click event to navigate to movie details
        resultItem.addEventListener('click', () => {
            window.location.href = `movies.html#${movie.title.toLowerCase().replace(/\s+/g, '-')}`;
        });

        searchResults.appendChild(resultItem);
    });

    searchResults.classList.add('active');
}

// Event listeners
searchInput.addEventListener('input', (e) => {
    searchMovies(e.target.value.trim());
});

searchButton.addEventListener('click', () => {
    searchMovies(searchInput.value.trim());
});

// Close search results when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-container')) {
        searchResults.classList.remove('active');
    }
});

// Prevent search results from closing when clicking inside the search container
searchResults.addEventListener('click', (e) => {
    e.stopPropagation();
});
