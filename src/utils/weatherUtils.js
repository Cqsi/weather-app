// this file contains utility functions for fetching weather data

/**
 * fetches the current temperature for a given city
 * @param {string} city - The name of the city
 * @returns {Promise<{temperature: number, error: string|null}>} - the temperature data (or an error)
 */
export const fetchCityTemperature = async (city) => {
  try {
    // get the latitude and longitude of the city using Nominatim API
    const geoResponse = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}`
    );

    const geocodingData = await geoResponse.json();

    // Throw error if the city wasn't found
    if (!geocodingData || geocodingData.length === 0) {
      return { temperature: null, error: 'City not found' };
    }

    // get lat and lon
    const lat = geocodingData[0].lat;
    const lon = geocodingData[0].lon;

    // get the temperature using the open-meteo API
    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weathercode`
    );

    const weatherData = await weatherResponse.json();
    return { 
      temperature: weatherData.current.temperature_2m,
      error: null
    };
  } catch (err) {
    return { 
      temperature: null,
      error: 'Failed to fetch weather data: ' + err.message
    };
  }
};

/**
 * fetches the weataher forecast for a given city
 * @param {string} city - The name of the city
 * @returns {Promise<{current: Object, daily: Object, error: string|null}>} - the forecast data (or an error)
 */
export const fetchCityForecast = async (city) => {
  try {
    // get the latitude and longitude of the city using Nominatim API
    const geoResponse = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}`
    );

    const geocodingData = await geoResponse.json();

    // Throw error if the city wasn't found
    if (!geocodingData || geocodingData.length === 0) {
      return { current: null, daily: null, error: 'City not found' };
    }

    // get lat and lon
    const lat = geocodingData[0].lat;
    const lon = geocodingData[0].lon;

    // get forecast data using the open-meteo API
    // We're getting:
    // - current temperature and weather code
    // - hourly temperature for today
    // - daily forecast for temperature min/max and weather code for 7 days
    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weathercode&hourly=temperature_2m&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=7`
    );

    const weatherData = await weatherResponse.json();
    
    // Check if we have the expected data structure
    if (!weatherData.current || !weatherData.daily) {
      return { current: null, daily: null, error: 'Invalid weather data format' };
    }
    
    return { 
      current: {
        temperature: weatherData.current.temperature_2m,
        weatherCode: weatherData.current.weathercode
      },
      daily: weatherData.daily,
      hourly: weatherData.hourly,
      error: null
    };
  } catch (err) {
    return { 
      current: null,
      daily: null,
      error: 'Failed to fetch forecast data: ' + err.message
    };
  }
};