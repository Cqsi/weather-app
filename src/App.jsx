import { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import DefaultCities from './components/DefaultCities';
import WeatherHeader from './components/WeatherHeader';
import Footer from './components/Footer';

function App() {

  // temperature data
  const [currentWeather, setCurrentWeather] = useState({
    city: null,
    temperature: null,
    error: null,
    loading: false
  });

  // handler
  const handleWeatherUpdate = (weatherData) => {
    setCurrentWeather(weatherData);
  };

  return (
    <>
      <div className="weatherContainer">
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
          
          {currentWeather.city && currentWeather.temperature !== null && !currentWeather.loading && !currentWeather.error && (
            <div className="currentWeatherResult">
              <p>Current temperature in {currentWeather.city}: {currentWeather.temperature}°C</p>
            </div>
          )}
        </section>
        
        <section className="defaultCitiesSection">
          <DefaultCities />
        </section>
      </div>
      <Footer />
    </>
  );
}

export default App;