import React, { useEffect, useState } from 'react'

export default function Converter() {
  const [amount, setAmount] = useState(100)
  const [rates, setRates] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const getRates = async () => {
    setLoading(true); setError(null)
    try {
      const res = await fetch('/api/rates')
      const json = await res.json()
      if (!res.ok) throw new Error(json.message || 'Failed to fetch rates')
      setRates(json)
    } catch (e) {
      setError(e.message || 'Failed to fetch rates')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { getRates() }, [])

  const toUSD = rates ? (amount * (rates.USD || 0)).toFixed(2) : '—'
  const toEUR = rates ? (amount * (rates.EUR || 0)).toFixed(2) : '—'

  return (
    <div>
      <h2 style={{ marginTop: 0 }}>Currency Converter</h2>
      <p className="subtitle">Mocked INR → USD/EUR via local Node API</p>

      <div className="row" style={{ marginTop: 12 }}>
        <div className="col-6">
          <div className="field">
            <label htmlFor="amt">Amount in INR</label>
            <input id="amt" type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} />
          </div>
        </div>
        <div className="col-6" style={{ display: 'grid', alignItems: 'end' }}>
          <button onClick={getRates}>Refresh Rates</button>
        </div>
      </div>

      {loading && <div className="status" style={{ marginTop: 12 }}>Fetching latest rates…</div>}
      {error && <div className="status error" style={{ marginTop: 12 }}>Error: {error}</div>}

      {rates && (
        <div style={{ marginTop: 16, display: 'grid', gap: 8 }}>
          <div><strong>₹{Number.isFinite(amount) ? amount.toLocaleString() : 0}</strong> ≈ <strong>${toUSD}</strong> (USD)</div>
          <div><strong>₹{Number.isFinite(amount) ? amount.toLocaleString() : 0}</strong> ≈ <strong>€{toEUR}</strong> (EUR)</div>
          <small className="subtitle">As of {new Date(rates.timestamp).toLocaleString()}</small>
        </div>
      )}
    </div>
  )
}
