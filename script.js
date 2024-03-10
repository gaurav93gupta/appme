
document.addEventListener("DOMContentLoaded", function() {
    const searchBox = document.getElementById('search-box');
    const searchResults = document.getElementById('search-results');
    const fetchButton = document.getElementById('fetch-details');
    const detailsDiv = document.getElementById('details');
  
    // Dummy JSON data with additional details
    const jsonData = [
      { "name": "Apple", "details": "Red and green fruit" },
      { "name": "Banana", "details": "Yellow curved fruit" },
      { "name": "Orange", "details": "Orange citrus fruit" },
      { "name": "Mango", "details": "Tropical stone fruit" },
      { "name": "Pineapple", "details": "Tropical fruit with spiky skin" }
    ];
  
    // Function to filter JSON data based on user input
    function filterData(query) {
      return jsonData.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
    }
  
    // Function to display filtered results
    function displayResults(results, query) {
      searchResults.innerHTML = '';
      results.forEach(result => {
        const li = document.createElement('li');
        const nameParts = result.name.split(new RegExp(`(${query})`, 'i'));
        li.innerHTML = nameParts.map(part => part.toLowerCase() === query.toLowerCase() ? `<span class="highlight">${part}</span>` : part).join('');
        li.addEventListener('click', () => {
          searchBox.value = result.name;
          searchResults.innerHTML = '';
        });
        searchResults.appendChild(li);
      });
    }
  
    // Event listener for input changes
    searchBox.addEventListener('input', function() {
      const query = this.value;
      if (query.length === 0) {
        searchResults.innerHTML = '';
        detailsDiv.textContent = ''; // Clear details display for empty search
        return;
      }
      const results = filterData(query);
      displayResults(results, query);
      detailsDiv.textContent = ''; // Clear details display for new search
    });
  
    // Event listener to fetch details when button is clicked
    fetchButton.addEventListener('click', function() {
      const query = searchBox.value;
      if (!query) {
        alert("Please enter a search query.");
        return;
      }
      const result = jsonData.find(item => item.name.toLowerCase() === query.toLowerCase());
      if (result) {
        detailsDiv.textContent = `Details: ${result.details}`;
      } else {
        detailsDiv.textContent = "Details not found.";
      }
    });
  });
  