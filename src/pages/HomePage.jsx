import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WeatherHeader from '../components/WeatherHeader';
import SearchBar from '../components/SearchBar';
import DefaultCities from '../components/DefaultCities';
import { fetchCityTemperature } from '../utils/weatherUtils';

function HomePage({ cachedWeatherData }) {
  const navigate = useNavigate();
  
  // State for the current weather search
  const [currentWeather, setCurrentWeather] = useState({
    city: null,
    temperature: null,
    error: null,
    loading: false
  });

  const handleWeatherUpdate = (weatherData) => {
    setCurrentWeather(weatherData);
    
    // If successful, navigate to the city detail page
    if (weatherData.temperature !== null && !weatherData.error) {
      navigate(`/city/${encodeURIComponent(weatherData.city)}`);
    }
  };

  // Handler for city selection from the default cities grid
  const handleCitySelect = (city) => {
    navigate(`/city/${encodeURIComponent(city)}`);
  };

  return (
    <>
      <header className="appHeader">
        <WeatherHeader />
      </header>
      
      <section className="searchSection">
        <SearchBar onWeatherUpdate={handleWeatherUpdate} />
        
        {currentWeather.loading && (
          <p className="statusMessage">Loading...</p>
        )}
        
        {currentWeather.error && (
          <p className="errorMessage">{currentWeather.error}</p>
        )}
      </section>
      
      <section className="defaultCitiesSection">
        <DefaultCities 
          cachedData={cachedWeatherData}
          onCitySelect={handleCitySelect}
        />
      </section>
    </>
  );
}

export default HomePage;