document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('searchButton');
    const searchQuery = document.getElementById('searchQuery');
    const searchResultsContainer = document.getElementById('searchResults');

    searchButton.addEventListener('click', async function() {
        const query = searchQuery.value.trim();
        if (query !== '') {
            const searchResults = await fetchSearchResults(query);
            displaySearchResults(searchResults);
        } else {
            alert('Please enter a search query.');
        }
    });

    async function fetchSearchResults(query) {
        const apiKey = 'api_key'; // Replace 'your_serpapi_api_key' with your actual SerpApi API key
        const searchEngine = 'google'; // You can specify other search engines like 'bing', 'yahoo', etc.
        const apiUrl = `https://serpapi.com/search.json?q=${query}&engine=${searchEngine}&apiKey=${apiKey}`;

        try {
            const response = await fetch(apiUrl);
            return await response.json();
        } catch (error) {
            console.error('Error fetching search results:', error);
            return null;
        }
    }

    function displaySearchResults(searchResults) {
        searchResultsContainer.innerHTML = ''; // Clear previous results
        if (searchResults && searchResults.organic_results.length > 0) {
            searchResults.organic_results.forEach(result => {
                const resultElement = document.createElement('div');
                resultElement.classList.add('search-result');
                resultElement.innerHTML = `
                    <h3><a href="${result.link}" target="_blank">${result.title}</a></h3>
                    <p>${result.snippet}</p>
                    <cite>${result.displayed_link}</cite>
                `;
                searchResultsContainer.appendChild(resultElement);
            });
        } else {
            searchResultsContainer.innerHTML = '<p>No results found.</p>';
        }
    }
});
