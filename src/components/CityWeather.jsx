import { useState, useEffect } from 'react';
import { fetchCityTemperature } from '../utils/weatherUtils';

// get a city's weather data

function CityWeather({ city, initialLoad = false }) {
  const [weatherData, setWeatherData] = useState({
    temperature: null,
    error: null,
    loading: initialLoad
  });

  useEffect(() => {
    if (initialLoad) {
      loadWeatherData();
    }
  }, []);

  const loadWeatherData = async () => {
    setWeatherData(prev => ({ ...prev, loading: true, error: null }));
    
    const result = await fetchCityTemperature(city);
    
    setWeatherData({
      temperature: result.temperature,
      error: result.error,
      loading: false
    });
  };

  return (
    <div className="cityWeatherCard">
      <h4>{city}</h4>
      
      {weatherData.loading && <p className="loadingText">Loading...</p>}
      
      {weatherData.error && (
        <p className="errorText">{weatherData.error}</p>
      )}
      
      {weatherData.temperature !== null && !weatherData.loading && !weatherData.error && (
        <p className="temperatureText">{weatherData.temperature}°C</p>
      )}
    </div>
  );
}

export default CityWeather;