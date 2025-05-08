import { useState, useEffect } from 'react';
import { fetchCityForecast } from '../utils/weatherUtils';
import ''

function WeatherDetail({ city, onBackClick }) {
  const [forecastData, setForecastData] = useState({
    current: null,
    daily: null,
    error: null,
    loading: true
  });

  useEffect(() => {
    const loadForecastData = async () => {
      setForecastData(prev => ({ ...prev, loading: true, error: null }));
      
      const result = await fetchCityForecast(city);
      
      setForecastData({
        current: result.current,
        daily: result.daily,
        error: result.error,
        loading: false
      });
    };

    loadForecastData();
  }, [city]);

  const getWeatherIcon = (weatherCode) => {
    // WMO Weather interpretation codes: https://open-meteo.com/en/docs
    if (!weatherCode && weatherCode !== 0) return "./emojis/partly_sunny.png";
    
    // Clear
    if (weatherCode === 0) return "./emojis/sunny.png";
    // Mainly clear, partly cloudy
    if (weatherCode <= 2) return "./emojis/partly_sunny.png";
    // Overcast
    if (weatherCode === 3) return "./emojis/partly_sunny.png";
    // Fog
    if (weatherCode <= 49) return "./emojis/partly_sunny.png";
    // Drizzle
    if (weatherCode <= 59) return "./emojis/rain_cloud.png";
    // Rain
    if (weatherCode <= 69) return "./emojis/rain_cloud.png";
    // Snow
    if (weatherCode <= 79) return "./emojis/snowflake.png";
    // Rain showers
    if (weatherCode <= 82) return "./emojis/rain_cloud.png";
    // Snow showers
    if (weatherCode <= 86) return "./emojis/snowflake.png";
    // Thunderstorm
    if (weatherCode <= 99) return "./emojis/lightning.png";
    
    return "./emojis/partly_sunny.png";
  };

  // format date to display day of week
  const formatDay = (dateStr) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="weatherDetailContainer">
      <button onClick={onBackClick} className="backButton">
        &larr; Back to Search
      </button>
      
      <header className="cityHeader">
        <h1>{city}</h1>
      </header>

      {forecastData.loading && (
        <div className="loadingContainer">
          <p>Loading weather forecast...</p>
        </div>
      )}

      {forecastData.error && (
        <div className="errorContainer">
          <p className="errorMessage">{forecastData.error}</p>
        </div>
      )}

      {forecastData.current && !forecastData.loading && !forecastData.error && (
        <>
          <div className="currentWeatherDetail">
            <div className="weatherIconLarge">
              <img 
                src={getWeatherIcon(forecastData.current.weatherCode)} 
                alt={`Weather condition: ${forecastData.current.weatherCode}`}
              />
            </div>
            <div className="currentTemp">
              {forecastData.current.temperature}°C
            </div>
          </div>
          
          <div className="forecastSection">
            <h2>Today</h2>
            <div className="dailyForecast">
              {forecastData.daily && forecastData.daily.time.map((time, index) => {
                if (time === today) {
                  return (
                    <div key={time} className="forecastDay">
                      <div className="forecastDayTemp">
                        <span className="highTemp">{Math.round(forecastData.daily.temperature_2m_max[index])}°</span>
                        <span className="lowTemp">{Math.round(forecastData.daily.temperature_2m_min[index])}°</span>
                      </div>
                      <img 
                        src={getWeatherIcon(forecastData.daily.weathercode[index])}
                        alt={`Weather forecast: ${forecastData.daily.weathercode[index]}`}
                        className="forecastIcon"
                      />
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
          
          <div className="forecastSection">
            <h2>Tomorrow</h2>
            <div className="dailyForecast">
              {forecastData.daily && forecastData.daily.time.map((time, index) => {
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                const tomorrowStr = tomorrow.toISOString().split('T')[0];
                
                if (time === tomorrowStr) {
                  return (
                    <div key={time} className="forecastDay">
                      <div className="forecastDayTemp">
                        <span className="highTemp">{Math.round(forecastData.daily.temperature_2m_max[index])}°</span>
                        <span className="lowTemp">{Math.round(forecastData.daily.temperature_2m_min[index])}°</span>
                      </div>
                      <img 
                        src={getWeatherIcon(forecastData.daily.weathercode[index])}
                        alt={`Weather forecast: ${forecastData.daily.weathercode[index]}`}
                        className="forecastIcon"
                      />
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
          
          <div className="forecastSection">
            <h2>The next days</h2>
            <div className="weeklyForecast">
              {forecastData.daily && forecastData.daily.time.map((time, index) => {
                // Skip today and tomorrow
                const today = new Date();
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                const todayStr = today.toISOString().split('T')[0];
                const tomorrowStr = tomorrow.toISOString().split('T')[0];
                
                if (time !== todayStr && time !== tomorrowStr) {
                  return (
                    <div key={time} className="forecastDay">
                      <div className="dayName">{formatDay(time)}</div>
                      <div className="forecastDayTemp">
                        <span className="highTemp">{Math.round(forecastData.daily.temperature_2m_max[index])}°</span>
                        <span className="lowTemp">{Math.round(forecastData.daily.temperature_2m_min[index])}°</span>
                      </div>
                      <img 
                        src={getWeatherIcon(forecastData.daily.weathercode[index])}
                        alt={`Weather forecast: ${forecastData.daily.weathercode[index]}`}
                        className="forecastIcon"
                      />
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default WeatherDetail;