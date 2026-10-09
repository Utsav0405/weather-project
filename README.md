# Patna Weather Dashboard

A full-stack weather analytics dashboard for **Patna, Bihar** using Open-Meteo (free, no API key).

| Service | URL |
|---|---|
| React frontend | http://localhost:3000 |
| FastAPI backend | http://localhost:8000 |
| FastAPI Swagger UI | http://localhost:8000/docs |

---

## Prerequisites

| Tool | Minimum version |
|---|---|
| Python | 3.11+ |
| Node.js + npm | 18+ |

---

## Backend Setup

```bash
# 1. Create and activate a virtual environment
cd backend
python -m venv venv

# Windows (PowerShell)
.\venv\Scripts\Activate.ps1

# macOS / Linux
source venv/bin/activate

# 2. Install dependencies
pip install -r requirements.txt

# 3. Start the development server (run from the PROJECT ROOT)
cd ..
uvicorn backend.main:app --reload --port 8000
```

The API will be available at **http://localhost:8000**.  
Visit **http://localhost:8000/docs** to explore all endpoints interactively.

---

## Frontend Setup

```bash
# 1. Install dependencies
cd frontend
npm install

# 2. Start the dev server
npm run dev
```

The dashboard will be available at **http://localhost:3000**.

> Both servers must be running at the same time for the dashboard to show live data.

---

## API Endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/` | Health check |
| GET | `/api/current` | Current weather conditions |
| GET | `/api/forecast` | 7-day daily forecast |
| GET | `/api/history` | 30-day historical mean temperature |

All data is fetched from the free [Open-Meteo API](https://open-meteo.com/), no API key required.

---

## Project Structure

```
.
├── README.md
├── backend/
│   ├── __init__.py
│   ├── main.py            # FastAPI app + CORS
│   ├── routes.py          # API route handlers
│   ├── models.py          # Pydantic response models
│   ├── weather_service.py # Open-Meteo HTTP service layer
│   └── requirements.txt
└── frontend/
    ├── index.html
    ├── package.json
    ├── vite.config.ts     # Vite config + /api proxy
    ├── tsconfig.json
    └── src/
        ├── main.tsx
        ├── App.tsx          # Root component + data fetching
        ├── index.css
        ├── types/
        │   └── weather.ts   # TypeScript interfaces
        ├── api/
        │   └── weatherApi.ts  # Axios API client
        └── components/
            ├── CurrentConditionsCard.tsx
            ├── ForecastChart.tsx
            └── HistoryChart.tsx
```
