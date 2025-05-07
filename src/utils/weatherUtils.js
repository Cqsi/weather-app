
// this function fetches the temperature for a city

/**
 * Fetches the current temperature for a given city
 * @param {string} city - The name of the city
 * @returns {Promise<{temperature: number, error: string|null}>} - the tempererature data (or an error)
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
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m`
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