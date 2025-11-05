# bytexlfinal — ByteXL InfoHub (Mock Full‑Stack)

A **full-stack mock** version for the ByteXL challenge.

- Frontend: React 18 + Vite (single‑page app with tabs)
- Backend: Node + Express (mock `/api` routes with delay + occasional errors)
- Modules: Weather, Currency Converter (INR→USD/EUR), Motivational Quotes
- No real API keys needed for this edition

## Run locally
```bash
npm install
npm run dev
# UI:   http://localhost:5173
# APIs: http://localhost:3001 (proxied from /api by Vite)
```

## Build & preview (static UI only)
```bash
npm run build
npm run preview   # http://localhost:5174
```

## Endpoints (mock)
- GET /api/health
- GET /api/weather?city=Hyderabad
- GET /api/rates
- GET /api/quote

## Notes
- All data is mocked with a small random delay and ~10–12% simulated failures to show loading/error states.
- To swap to real APIs later, replace the server handlers in `server/index.js`.
