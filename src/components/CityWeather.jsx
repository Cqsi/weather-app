import { useState, useEffect } from 'react';
import { fetchCityTemperature } from '../utils/weatherUtils';

function CityWeather({ city, initialLoad = false, cachedData = null }) {
  const [weatherData, setWeatherData] = useState({
    temperature: cachedData ? cachedData.temperature : null,
    error: cachedData ? cachedData.error : null,
    loading: initialLoad && !cachedData
  });

  useEffect(() => {
    // Update from cached data if available
    if (cachedData) {
      setWeatherData({
        temperature: cachedData.temperature,
        error: cachedData.error,
        loading: false
      });
      return;
    }
    
    // Otherwise load data if initialLoad is true
    if (initialLoad) {
      loadWeatherData();
    }
  }, [cachedData]);

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