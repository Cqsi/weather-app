import { useState } from 'react';
import { fetchCityTemperature } from '../utils/weatherUtils';

// search bar component 
function SearchBar({ onWeatherUpdate }) {

  // states for the city and whether the site is loading
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);

  // handle user submit of city
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!city.trim()) {
      alert('Please enter a city name.');
      return;
    }
    
    setLoading(true);
    
    const result = await fetchCityTemperature(city);

    onWeatherUpdate({
      city,
      temperature: result.temperature,
      error: result.error,
      loading: false
    });
    
    setLoading(false);
  };

  return (
    <div className="searchBarContainer">
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="cityInput"
        />
        <button 
          type="submit" 
          className="searchButton"
        >
          {loading ? 'Loading...' : 'Get Weather'}
        </button>
      </form>
    </div>
  );
}

export default SearchBar;