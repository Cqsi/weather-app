import CityWeather from './CityWeather';

function DefaultCities() {
  
  // default cities
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
          <CityWeather 
            key={city}
            city={city}
            initialLoad={true}
          />
        ))}
      </div>
    </div>
  );
}

export default DefaultCities;