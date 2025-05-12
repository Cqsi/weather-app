import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { fetchCityForecast } from '../utils/weatherUtils';
import '../WeatherDetail.css';

function CityDetailPage() {
  const { cityName } = useParams();
  const navigate = useNavigate();
  const decodedCityName = decodeURIComponent(cityName);

  // check whether we are on a mobile screen
  const isMobile = window.innerWidth <= 768;

  // function to get amount of ticks on X-axis. Show only every 6h on mobile.
  const getXAxisTicks = () => {
    const data = prepareHourlyData();
    const step = isMobile ? 6 : 2; // every 6h on mobile, every 2h on desktop
    return data.filter((_, index) => index % step === 0).map(item => item.hour);
  };
  
  // forecast data state
  const [forecastData, setForecastData] = useState({
    current: null,
    daily: null,
    hourly: null,
    error: null,
    loading: true
  });

  useEffect(() => {
    const loadForecastData = async () => {
      setForecastData(prev => ({ ...prev, loading: true, error: null }));
      
      const result = await fetchCityForecast(decodedCityName);
      
      setForecastData({
        current: result.current,
        daily: result.daily,
        hourly: result.hourly,
        error: result.error,
        loading: false
      });
    };

    loadForecastData();
  }, [decodedCityName]);

  const getWeatherIcon = (weatherCode) => {
    // WMO Weather interpretation codes: https://open-meteo.com/en/docs
    if (!weatherCode && weatherCode !== 0) return "./emojis/partly_sunny.png";
    
    // Clear
    if (weatherCode === 0) return "/emojis/sunny.png";
    // Mainly clear, partly cloudy
    if (weatherCode <= 2) return "/emojis/partly_sunny.png";
    // Overcast
    if (weatherCode === 3) return "/emojis/partly_sunny.png";
    // Fog
    if (weatherCode <= 49) return "/emojis/partly_sunny.png";
    // Drizzle
    if (weatherCode <= 59) return "/emojis/rain_cloud.png";
    // Rain
    if (weatherCode <= 69) return "/emojis/rain_cloud.png";
    // Snow
    if (weatherCode <= 79) return "/emojis/snowflake.png";
    // Rain showers
    if (weatherCode <= 82) return "/emojis/rain_cloud.png";
    // Snow showers
    if (weatherCode <= 86) return "/emojis/snowflake.png";
    // Thunderstorm
    if (weatherCode <= 99) return "/emojis/lightning.png";
    
    return "./emojis/partly_sunny.png";
  };

  // Format date to display day of week
  const formatDay = (dateStr) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);
  };

  // Format hour for chart
  const formatHour = (dateTimeStr) => {
    const date = new Date(dateTimeStr);
    return date.getHours() + ':00';
  };

  // Prepare hourly temperature data for today
  const prepareHourlyData = () => {
    if (!forecastData.hourly) return [];
    
    const today = new Date().toISOString().split('T')[0];
    const hourlyData = [];
    
    // Get hourly data for today
    forecastData.hourly.time.forEach((time, index) => {
      // Only include today's data
      if (time.startsWith(today)) {
        hourlyData.push({
          time: time,
          hour: formatHour(time),
          temperature: forecastData.hourly.temperature_2m[index],
          weatherCode: forecastData.hourly.weathercode ? forecastData.hourly.weathercode[index] : null
        });
      }
    });
    
    return hourlyData;
  };

  const handleBackClick = () => {
    navigate('/');
  };

  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-time">{label}</p>
          <p className="tooltip-temp">{`${Math.round(payload[0].value)}°C`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="weatherDetailContainer">
      <button onClick={handleBackClick} className="backButton">
        <img src="/arrow_back.png" alt="Back" />
      </button>

      {forecastData.loading && (
        <div className="loadingContainer">
          <p>Loading weather forecast...</p>
        </div>
      )}

      {forecastData.error && (
        <div className="errorContainer">
          <p className="errorMessage">{forecastData.error}</p>
        </div>
      )}

      {forecastData.current && !forecastData.loading && !forecastData.error && (
        <>
          <div className="currentWeatherHeader">
            <h1 className="cityTitle">{decodedCityName}</h1>
            <div className="currentWeatherDetail">
                <div className="weatherIconLarge">
                <img 
                    src={getWeatherIcon(forecastData.current.weatherCode)} 
                    alt={`Weather condition: ${forecastData.current.weatherCode}`}
                />
                </div>
                <div className="currentTemp">
                {forecastData.current.temperature}°C
                </div>
            </div>
          </div>
          
          <div className="forecastSection">
            <h2>Hourly Forecast</h2>
            <div className="hourlyChartContainer">
              <ResponsiveContainer width="100%" height={250}>
                <LineChart
                  data={prepareHourlyData()}
                  margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="hour" 
                    tick={{ fontSize: 12 }} 
                    tickMargin={10}
                    ticks={getXAxisTicks()}
                    interval={0}
                  />
                  <YAxis 
                    tickCount={6} 
                    tick={{ fontSize: 12 }} 
                    domain={['auto', 'auto']}
                    tickMargin={10}
                    unit="°C"
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    type="monotone" 
                    dataKey="temperature" 
                    stroke="#3498db" 
                    strokeWidth={2}
                    dot={{ stroke: '#3498db', strokeWidth: 2, r: 4 }}
                    activeDot={{ stroke: '#3498db', strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="forecastSection">
            <h2>Tomorrow</h2>
            <div className="dailyForecast">
              {forecastData.daily && forecastData.daily.time.map((time, index) => {
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                const tomorrowStr = tomorrow.toISOString().split('T')[0];
                
                if (time === tomorrowStr) {
                  return (
                    <div key={time} className="forecastDay">
                      <div className="dayName">{formatDay(time)}</div>
                      <div className="forecastDayTemp">
                        <span className="highTemp">{Math.round(forecastData.daily.temperature_2m_max[index])}°</span>
                        <span className="lowTemp">{Math.round(forecastData.daily.temperature_2m_min[index])}°</span>
                      </div>
                      <img 
                        src={getWeatherIcon(forecastData.daily.weathercode[index])}
                        alt={`Weather forecast: ${forecastData.daily.weathercode[index]}`}
                        className="forecastIcon"
                      />
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
          
          <div className="forecastSection">
            <h2>The next days</h2>
            <div className="weeklyForecast">
              {forecastData.daily && forecastData.daily.time.map((time, index) => {
                // Skip today and tomorrow
                const today = new Date();
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                const todayStr = today.toISOString().split('T')[0];
                const tomorrowStr = tomorrow.toISOString().split('T')[0];
                
                if (time !== todayStr && time !== tomorrowStr) {
                  return (
                    <div key={time} className="forecastDay">
                      <div className="dayName">{formatDay(time)}</div>
                      <div className="forecastDayTemp">
                        <span className="highTemp">{Math.round(forecastData.daily.temperature_2m_max[index])}°</span>
                        <span className="lowTemp">{Math.round(forecastData.daily.temperature_2m_min[index])}°</span>
                      </div>
                      <img 
                        src={getWeatherIcon(forecastData.daily.weathercode[index])}
                        alt={`Weather forecast: ${forecastData.daily.weathercode[index]}`}
                        className="forecastIcon"
                      />
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CityDetailPage;