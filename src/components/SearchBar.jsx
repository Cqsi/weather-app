import { useState } from 'react';
import { fetchCityTemperature } from '../utils/weatherUtils';

function SearchBar({ onWeatherUpdate }) {
  const [city, setCity] = useState('Helsinki');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!city.trim()) {
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
          disabled={loading || !city.trim()}
        >
          {loading ? 'Loading...' : 'Get Weather'}
        </button>
      </form>
    </div>
  );
}

export default SearchBar;