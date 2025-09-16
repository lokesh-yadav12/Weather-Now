import { weatherCodeToEmoji } from '../api.js';

export default function WeatherCard({ cityLabel, current, units }) {
  if (!current) return null;
  const unitTemp = units === 'metric' ? '°C' : '°F';
  const unitWind = units === 'metric' ? 'km/h' : 'mph';

  return (
    <div className="weather-card">
      <div className="weather-header">
        <h2>{cityLabel}</h2>
        <div className="weather-main">
          <span className="weather-emoji" title={weatherCodeToEmoji(current.weather_code)}>
            {weatherCodeToEmoji(current.weather_code).split(' ')[0]}
          </span>
          <span className="weather-temp">{Math.round(current.temperature_2m)}{unitTemp}</span>
        </div>
        <div className="weather-desc">{weatherCodeToEmoji(current.weather_code)}</div>
      </div>
      <div className="weather-details">
        <div>
          <span className="label">Feels like</span>
          <span>{Math.round(current.apparent_temperature)}{unitTemp}</span>
        </div>
        <div>
          <span className="label">Humidity</span>
          <span>{current.relative_humidity_2m}%</span>
        </div>
        <div>
          <span className="label">Wind</span>
          <span>{Math.round(current.wind_speed_10m)} {unitWind}</span>
        </div>
      </div>
      <div className="timestamp">Updated: {new Date(current.time).toLocaleString()}</div>
    </div>
  );
}


