import { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import DefaultCities from './components/DefaultCities';
import WeatherHeader from './components/WeatherHeader';
import Footer from './components/Footer';
import WeatherDetail from './components/WeatherDetail';
import LoadingScreen from './components/LoadingScreen';
import './LoadingScreen.css';
import { fetchCityTemperature } from './utils/weatherUtils';

function App() {
  // State to track if the app is in the initial loading state
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  
  // State to track if we're viewing the detail page or home page
  const [view, setView] = useState('home');
  
  // State to store the selected city
  const [selectedCity, setSelectedCity] = useState(null);

  // Default cities
  const defaultCities = [
    'London',
    'New York',
    'Tokyo',
    'Sydney',
    'Paris',
    'Berlin'
  ];

  // State to store cached weather data
  const [cachedWeatherData, setCachedWeatherData] = useState({});

  // temperature data
  const [currentWeather, setCurrentWeather] = useState({
    city: null,
    temperature: null,
    error: null,
    loading: false
  });

  useEffect(() => {
    const loadInitialData = async () => {
      // Check if we have cached data
      const cachedData = localStorage.getItem('cachedWeatherData');
      const cachedTimestamp = localStorage.getItem('cachedWeatherTimestamp');
      const now = new Date().getTime();
      
      // Use cached data if it exists and is less than 30 minutes old
      if (cachedData && cachedTimestamp && (now - parseInt(cachedTimestamp) < 30 * 60 * 1000)) {
        setCachedWeatherData(JSON.parse(cachedData));
        setIsInitialLoading(false);
        return;
      }
      
      // Otherwise fetch fresh data
      const newData = {};
      
      // Fetch all city data in parallel
      const promises = defaultCities.map(async (city) => {
        const result = await fetchCityTemperature(city);
        return { city, result };
      });
      
      const results = await Promise.all(promises);
      
      // Process results
      results.forEach(({ city, result }) => {
        newData[city] = {
          temperature: result.temperature,
          error: result.error
        };
      });
      
      // Save to state and localStorage
      setCachedWeatherData(newData);
      localStorage.setItem('cachedWeatherData', JSON.stringify(newData));
      localStorage.setItem('cachedWeatherTimestamp', now.toString());
      
      setIsInitialLoading(false);
    };

    loadInitialData();
  }, []);

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
      {isInitialLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <div className="weatherContainer">
            {view === 'home' ? (
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
      )}
    </>
  );
}

export default App;