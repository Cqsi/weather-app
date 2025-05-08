import CityWeather from './CityWeather';

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
          <div 
            key={city} 
            onClick={() => onCitySelect && onCitySelect(city)}
            style={{ cursor: 'pointer' }}
          >
            <CityWeather
              city={city}
              initialLoad={false}
              cachedData={cachedData[city]}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default DefaultCities;