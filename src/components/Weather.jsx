import React, { useState } from 'react'

export default function Weather() {
  const [city, setCity] = useState('Hyderabad')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  const getWeather = async () => {
    setLoading(true); setError(null); setData(null)
    try {
      const res = await fetch(`/api/weather?city=${encodeURIComponent(city || 'Your City')}`)
      const json = await res.json()
      if (!res.ok) throw new Error(json.message || 'Failed to fetch weather')
      setData(json)
    } catch (e) {
      setError(e.message || 'Failed to fetch weather')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 style={{ marginTop: 0 }}>Weather</h2>
      <p className="subtitle">Mocked data from local Node API with realistic delay & errors.</p>

      <div className="row" style={{ marginTop: 12 }}>
        <div className="col-6">
          <div className="field">
            <label htmlFor="city">City</label>
            <input id="city" value={city} onChange={e => setCity(e.target.value)} placeholder="Enter city name" />
          </div>
        </div>
        <div className="col-6" style={{ display: 'grid', alignItems: 'end' }}>
          <button onClick={getWeather} className="primary">Get Weather</button>
        </div>
      </div>

      {loading && <div className="status" style={{ marginTop: 12 }}>Loading weather…</div>}
      {error && <div className="status error" style={{ marginTop: 12 }}>Error: {error}</div>}

      {data && (
        <div style={{ marginTop: 16, display: 'grid', gap: 8 }}>
          <div><strong>{data.city}</strong> · {data.country}</div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800 }}>{Math.round(data.temp)}°C</div>
          <div style={{ textTransform: 'capitalize' }}>{data.description}</div>
          <small className="subtitle">
            Feels like {Math.round(data.feels_like)}°C · Humidity {data.humidity}% · Wind {data.wind} m/s
          </small>
        </div>
      )}
    </div>
  )
}
