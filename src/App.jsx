import { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import DefaultCities from './components/DefaultCities';
import WeatherHeader from './components/WeatherHeader';
import Footer from './components/Footer';
import WeatherDetail from './components/WeatherDetail';

function App() {
  // State to track if we're viewing the detail page or home page
  const [view, setView] = useState('home');
  // State to store the selected city
  const [selectedCity, setSelectedCity] = useState(null);

  // temperature data
  const [currentWeather, setCurrentWeather] = useState({
    city: null,
    temperature: null,
    error: null,
    loading: false
  });

  // handler for weather updates
  const handleWeatherUpdate = (weatherData) => {
    setCurrentWeather(weatherData);
    
    // If successful, navigate to the detail view
    if (weatherData.temperature !== null && !weatherData.error) {
      setSelectedCity(weatherData.city);
      setView('detail');
    }
  };

  // handler to return to home page
  const handleBackToHome = () => {
    setView('home');
  };

  return (
    <>
      <div className="weatherContainer">
        {view === 'home' ? (
          // Home page view
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
              
              {currentWeather.city && currentWeather.temperature !== null && !currentWeather.loading && !currentWeather.error && (
                <div className="currentWeatherResult">
                  <p>Current temperature in {currentWeather.city}: {currentWeather.temperature}°C</p>
                </div>
              )}
            </section>
            
            <section className="defaultCitiesSection">
              <h3>Popular Cities</h3>
              <DefaultCities 
                onCitySelect={(city) => {
                  setSelectedCity(city);
                  setView('detail');
                }} 
              />
            </section>
          </>
        ) : (
          // Detail page view
          <WeatherDetail 
            city={selectedCity}
            onBackClick={handleBackToHome}
          />
        )}
      </div>
      <Footer />
    </>
  );
}

export default App;