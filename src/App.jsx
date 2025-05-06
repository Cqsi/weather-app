import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [city, setCity] = useState('Helsinki');
  const [temperature, setTemperature] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);

    try {
      
      // first we get the latitude and longitude of the
      // city using the Nominatim API
      const geoResponse = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}`
      )

      // get it in json format
      const geocodingData = await geoResponse.json();

      // throw error if the city wasn't found
      if (!geocodingData || geocodingData.length === 0) {
        throw new Error('City not found');
      }

      // get the lat and lon
      const lat = geocodingData[0].lat;
      const lon = geocodingData[0].lon;

      // get the degrees for the lon and lat
      // using the open-meteo API
      const weatherRespoinse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m`
      )

      // get the json for the weather data
      const weatherData = await weatherRespoinse.json();
      setTemperature(weatherData.current.temperature_2m);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch weather data: ' + err.message)
      setLoading(false);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  }

  // run this when rendering the first time (i.e. get the weather in Helsinki)
  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div>
      <h2>Weather App</h2>

      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button type="submit">Get Weather</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {temperature !== null && !loading && !error && (
        <p>Current temperature in {city}: {temperature}°C</p>
      )}
    </div>
  )
}

export default App
