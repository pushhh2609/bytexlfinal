import React, { useState } from 'react'

export default function Quotes() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [quote, setQuote] = useState(null)

  const getQuote = async () => {
    setLoading(true); setError(null); setQuote(null)
    try {
      const res = await fetch('/api/quote')
      const json = await res.json()
      if (!res.ok) throw new Error(json.message || 'Failed to fetch quote')
      setQuote(json)
    } catch (e) {
      setError(e.message || 'Failed to fetch quote')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 style={{ marginTop: 0 }}>Motivational Quote</h2>
      <p className="subtitle">Random mock quotes from local Node API with simulated errors.</p>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <button onClick={getQuote} className="primary">New Quote</button>
        <button onClick={() => navigator.clipboard.writeText(quote ? `“${quote.text}” — ${quote.author}` : '')} disabled={!quote}>
          Copy
        </button>
      </div>

      {loading && <div className="status" style={{ marginTop: 12 }}>Thinking…</div>}
      {error && <div className="status error" style={{ marginTop: 12 }}>Error: {error}</div>}

      {quote && (
        <blockquote style={{ marginTop: 16, fontSize: '1.25rem', lineHeight: 1.4 }}>
          “{quote.text}”
          <footer style={{ marginTop: 8 }} className="subtitle">— {quote.author}</footer>
        </blockquote>
      )}
    </div>
  )
}
