import { Link } from 'react-router-dom';
import CityWeather from './CityWeather';

// default cities components, get the weather of the cities using the CityWeather.jsx component
function DefaultCities({ cachedData = {}, onCitySelect }) {
  
  // Default cities
  const defaultCities = [
    'London',
    'New York',
    'Tokyo',
    'Sydney',
    'Paris',
    'Berlin'
  ];

  return (
    <div className="defaultCitiesContainer">
      <div className="citiesGrid">
        {defaultCities.map(city => (
          <Link 
            to={`/city/${encodeURIComponent(city)}`}
            key={city}
            style={{ textDecoration: 'none', color: 'inherit' }}
            onClick={(e) => {
              e.preventDefault();
              onCitySelect(city);
            }}
          >
            <div style={{ cursor: 'pointer' }}>
              <CityWeather
                city={city}
                initialLoad={false}
                cachedData={cachedData[city]}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default DefaultCities;