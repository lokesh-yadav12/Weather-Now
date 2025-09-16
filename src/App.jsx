import { useCallback, useEffect, useMemo, useState } from 'react'
import './App.css'
import './index.css'
import SearchBar from './components/SearchBar.jsx'
import UnitToggle from './components/UnitToggle.jsx'
import WeatherCard from './components/WeatherCard.jsx'
import { fetchCurrentWeather, formatPlace, geocodeCity } from './api.js'

function App() {
  const [query, setQuery] = useState('')
  const [places, setPlaces] = useState([])
  const [selected, setSelected] = useState(null)
  const [units, setUnits] = useState('metric')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [current, setCurrent] = useState(null)

  const onSearch = useCallback(async (text) => {
    try {
      setQuery(text)
      if (!text) {
        setPlaces([])
        return
      }
      const results = await geocodeCity(text, { count: 6 })
      setPlaces(results)
    } catch (e) {
      console.error(e)
    }
  }, [])

  const onSelectPlace = useCallback(async (place) => {
    setSelected(place)
  }, [])

  useEffect(() => {
    async function fetchWeather() {
      if (!selected) return
      setLoading(true)
      setError('')
      try {
        const data = await fetchCurrentWeather({
          latitude: selected.latitude,
          longitude: selected.longitude,
          units,
        })
        setCurrent({ ...data.current })
      } catch (e) {
        console.error(e)
        setError('Could not load weather. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    fetchWeather()
  }, [selected, units])

  useEffect(() => {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords
          // Reverse geocode via Open-Meteo: use search with coordinates by nearest place
          const nearest = await geocodeCity(`${latitude},${longitude}`, { count: 1 })
          const place = nearest[0] || { name: 'My location', latitude, longitude }
          setSelected(place)
        } catch (_) {
          setSelected({ name: 'My location', latitude: pos.coords.latitude, longitude: pos.coords.longitude })
        }
      },
      (_) => {
        // ignore errors, user can search manually
      }
    )
  }, [])

  const cityLabel = useMemo(() => (selected ? formatPlace(selected) : ''), [selected])

  return (
    <div className="container">
      <header className="header">
        <h1>Weather Now</h1>
        <UnitToggle units={units} onChange={setUnits} />
      </header>

      <SearchBar onSearch={onSearch} />

      {query && places.length > 0 && (
        <ul className="results" role="listbox">
          {places.map((p) => (
            <li key={p.id}>
              <button className="result-item" onClick={() => onSelectPlace(p)}>
                {formatPlace(p)}
              </button>
            </li>
          ))}
        </ul>
      )}

      {loading && <div className="info">Loading weather…</div>}
      {error && <div className="error" role="alert">{error}</div>}
      {!loading && !error && selected && current && (
        <WeatherCard cityLabel={cityLabel} current={current} units={units} />
      )}

      <footer className="footer">
        <a href="https://open-meteo.com/" target="_blank" rel="noreferrer">Powered by Open‑Meteo</a>
      </footer>
    </div>
  )
}

export default App
