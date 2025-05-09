import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import CityDetailPage from './pages/CityDetailPage';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import './LoadingScreen.css';
import { fetchCityTemperature } from './utils/weatherUtils';

function App() {
  // State to track if the app is in the initial loading state
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  
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

  return (
    <>
      {isInitialLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <div className="weatherContainer">
            <Routes>
              <Route 
                path="/" 
                element={<HomePage cachedWeatherData={cachedWeatherData} />} 
              />
              <Route 
                path="/city/:cityName" 
                element={<CityDetailPage />} 
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default App;