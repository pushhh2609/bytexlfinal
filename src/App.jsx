import React, { useState, useEffect } from 'react'
import Weather from './components/Weather.jsx'
import Converter from './components/Converter.jsx'
import Quotes from './components/Quotes.jsx'

const TABS = [
  { id: 'weather', label: '☀️ Weather' },
  { id: 'converter', label: '💱 INR → USD / EUR' },
  { id: 'quotes', label: '💬 Quotes' }
]

export default function App() {
  const [active, setActive] = useState('weather')

  useEffect(() => {
    const onKey = e => {
      const k = e.key?.toLowerCase?.()
      if (k === 'w') setActive('weather')
      if (k === 'c') setActive('converter')
      if (k === 'q') setActive('quotes')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="container">
      <header className="header">
        <div className="brand">
          <div className="logo"><span>IX</span></div>
          <div>
            <div className="title">InfoHub — bytexlfinal</div>
            <div className="subtitle">Mocked utilities for the ByteXL challenge</div>
          </div>
        </div>
        <div className="subtitle">React (Vite) + Node (mock APIs)</div>
      </header>

      <nav className="tabs" role="tablist" aria-label="Utilities">
        {TABS.map(t => (
          <button
            key={t.id}
            className={`tab ${active === t.id ? 'active' : ''}`}
            onClick={() => setActive(t.id)}
            role="tab"
            aria-selected={active === t.id}
            aria-controls={`${t.id}-panel`}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <section className="row">
        <div className="col-12">
          <div className="card" id={`${active}-panel`} role="tabpanel">
            {active === 'weather' && <Weather />}
            {active === 'converter' && <Converter />}
            {active === 'quotes' && <Quotes />}
          </div>
        </div>
      </section>

      <footer style={{ marginTop: 24 }} className="subtitle">
        <small>Shortcuts: <span className="kbd">W</span> / <span className="kbd">C</span> / <span className="kbd">Q</span></small>
      </footer>
    </div>
  )
}
