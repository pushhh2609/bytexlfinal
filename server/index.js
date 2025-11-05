import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const distPath = path.resolve(__dirname, '..', 'dist')
app.use(express.static(distPath))

// util helpers
const delay = ms => new Promise(res => setTimeout(res, ms))
const maybeFail = (p = 0.12) => {
  if (Math.random() < p) {
    const errs = ['Network timeout','Service unavailable','Mock gateway error','Rate limited']
    const e = new Error(errs[Math.floor(Math.random()*errs.length)])
    e.code = 'MOCK_FAIL'
    throw e
  }
}

app.get('/api/health', (_req, res) => res.json({ ok:true, uptime: process.uptime() }))

// ---- Mock Weather ----
app.get('/api/weather', async (req, res) => {
  try {
    await delay(500 + Math.random()*500)
    maybeFail(0.1)

    const city = String(req.query.city || 'Your City')
    const presets = {
      Hyderabad: { temp: 30.2, feels_like: 32.1, humidity: 55, wind: 3.1, description: 'clear sky', country: 'IN' },
      Bengaluru: { temp: 26.4, feels_like: 26.9, humidity: 62, wind: 2.4, description: 'light rain', country: 'IN' },
      Mumbai:    { temp: 29.1, feels_like: 33.0, humidity: 72, wind: 4.2, description: 'broken clouds', country: 'IN' }
    }
    const b = presets[city] || { temp: 28.0, feels_like: 29.0, humidity: 60, wind: 2.8, description: 'scattered clouds', country: 'IN' }

    res.json({
      city, country: b.country, temp: b.temp, feels_like: b.feels_like,
      humidity: b.humidity, wind: b.wind, description: b.description + ' (mock)'
    })
  } catch (e) {
    res.status(503).json({ message: e.message || 'Mock weather error' })
  }
})

// ---- Mock Rates (INR base) ----
app.get('/api/rates', async (_req, res) => {
  try {
    await delay(600 + Math.random()*600)
    maybeFail(0.12)
    const USD = 0.0121
    const EUR = 0.0111
    res.json({
      base: 'INR',
      USD: Number(USD.toFixed(6)),
      EUR: Number(EUR.toFixed(6)),
      timestamp: new Date().toISOString()
    })
  } catch (e) {
    res.status(503).json({ message: e.message || 'Mock rates error' })
  }
})

// ---- Mock Quotes ----
const QUOTES = [
  { text: 'Small steps every day beat occasional sprints.', author: 'Unknown' },
  { text: 'Discipline is choosing what you want most over what you want now.', author: 'Craig Groeschel' },
  { text: 'You do not have to be great to start, but you have to start to be great.', author: 'Zig Ziglar' },
  { text: 'Focus on progress, not perfection.', author: 'Bill Phillips' },
  { text: 'The only way to fail is to quit.', author: 'Unknown' },
  { text: 'Action cures fear.', author: 'David J. Schwartz' }
]
app.get('/api/quote', async (_req, res) => {
  try {
    await delay(300 + Math.random()*400)
    maybeFail(0.12)
    const idx = Math.floor(Math.random()*QUOTES.length)
    res.json(QUOTES[idx])
  } catch (e) {
    res.status(503).json({ message: e.message || 'Mock quote error' })
  }
})

app.get('*', (_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'))
})

app.listen(PORT, () => {
  console.log(`[server] Mock full-stack app on http://localhost:${PORT}`)
})

app.listen(PORT, () => {
  console.log(`[server] Mock API listening on http://localhost:${PORT}`)
})
