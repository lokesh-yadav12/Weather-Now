// Open-Meteo APIs: Geocoding and Forecast
// Docs: `https://open-meteo.com/en/docs` and `https://open-meteo.com/en/docs/geocoding-api`

const GEOCODE_BASE = 'https://geocoding-api.open-meteo.com/v1/search';
const FORECAST_BASE = 'https://api.open-meteo.com/v1/forecast';

export async function geocodeCity(query, { count = 5 } = {}) {
  if (!query || query.trim().length === 0) {
    return [];
  }
  const url = new URL(GEOCODE_BASE);
  url.searchParams.set('name', query.trim());
  url.searchParams.set('count', String(count));
  url.searchParams.set('language', 'en');
  url.searchParams.set('format', 'json');

  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error('Failed to search locations');
  }
  const data = await res.json();
  return (data.results || []).map((r) => ({
    id: `${r.latitude},${r.longitude}`,
    name: r.name,
    country: r.country,
    admin1: r.admin1,
    latitude: r.latitude,
    longitude: r.longitude,
    population: r.population,
    timezone: r.timezone,
  }));
}

export async function fetchCurrentWeather({ latitude, longitude, units = 'metric' }) {
  const isMetric = units === 'metric';
  const url = new URL(FORECAST_BASE);
  url.searchParams.set('latitude', String(latitude));
  url.searchParams.set('longitude', String(longitude));
  url.searchParams.set('current', [
    'temperature_2m',
    'apparent_temperature',
    'relative_humidity_2m',
    'wind_speed_10m',
    'wind_direction_10m',
    'weather_code',
  ].join(','));
  url.searchParams.set('hourly', [
    'temperature_2m',
  ].join(','));
  url.searchParams.set('temperature_unit', isMetric ? 'celsius' : 'fahrenheit');
  url.searchParams.set('wind_speed_unit', isMetric ? 'kmh' : 'mph');
  url.searchParams.set('timezone', 'auto');

  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error('Failed to fetch weather');
  }
  const data = await res.json();
  return data;
}

export function formatPlace(place) {
  const parts = [place.name];
  if (place.admin1) parts.push(place.admin1);
  if (place.country) parts.push(place.country);
  return parts.join(', ');
}

export function weatherCodeToEmoji(code) {
  // Simplified mapping from WMO weather codes
  // Reference: `https://open-meteo.com/en/docs#weathervariables`
  const map = new Map([
    [[0], '☀️ Clear sky'],
    [[1, 2], '🌤️ Partly cloudy'],
    [[3], '☁️ Overcast'],
    [[45, 48], '🌫️ Fog'],
    [[51, 53, 55], '🌦️ Drizzle'],
    [[56, 57], '🌧️ Freezing drizzle'],
    [[61, 63, 65], '🌧️ Rain'],
    [[66, 67], '🌧️ Freezing rain'],
    [[71, 73, 75], '❄️ Snow'],
    [[77], '🌨️ Snow grains'],
    [[80, 81, 82], '🌧️ Showers'],
    [[85, 86], '🌨️ Snow showers'],
    [[95], '⛈️ Thunderstorm'],
    [[96, 99], '⛈️ Thunderstorm with hail'],
  ]);
  for (const [codes, label] of map.entries()) {
    if (codes.includes(code)) return label;
  }
  return '🌡️ Weather';
}


