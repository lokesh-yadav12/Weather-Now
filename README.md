# Weather Now (React + Vite)

Weather Now is a simple, fast web app for checking current weather in any city. It uses the Open‑Meteo Geocoding API for city search and the Open‑Meteo Forecast API for current conditions. No API keys required.

## Features

- City search with debounced suggestions
- Current weather: temperature, feels like, humidity, wind, condition
- Unit toggle: Celsius / Fahrenheit
- Auto-detect current location (if permitted)
- Responsive, accessible UI with loading and error states

## Tech Stack

- React + Vite
- Built-in React state (no external state manager)
- Plain CSS
- Public APIs: Open‑Meteo Geocoding + Forecast

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run locally:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
npm run preview
```

## Deploy

You can deploy to CodeSandbox or StackBlitz by importing this repo/folder, or upload the `dist` folder to any static host. For GitHub Pages, use `vite` preview or a GH Actions workflow.

## APIs

- Geocoding: `https://geocoding-api.open-meteo.com/v1/search?name=London&count=5`
- Forecast: `https://api.open-meteo.com/v1/forecast?latitude=...&longitude=...&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,wind_direction_10m,weather_code&temperature_unit=celsius&wind_speed_unit=kmh&timezone=auto`

## Notes

- No authentication is required. Rate limits may apply.
- If geolocation is denied or fails, you can still search manually.

## Credits

- Weather data by [Open‑Meteo](https://open-meteo.com/).
