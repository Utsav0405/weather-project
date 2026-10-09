import { useEffect, useState } from 'react';
import { fetchCurrent, fetchForecast, fetchHistory } from './api/weatherApi';
import type { CurrentWeather, ForecastDay, HistoryDay } from './types/weather';
import CurrentConditionsCard from './components/CurrentConditionsCard';
import ForecastChart from './components/ForecastChart';
import HistoryChart from './components/HistoryChart';

export default function App() {
  const [current, setCurrent] = useState<CurrentWeather | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [history, setHistory] = useState<HistoryDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([fetchCurrent(), fetchForecast(), fetchHistory()])
      .then(([cur, fcast, hist]) => {
        setCurrent(cur);
        setForecast(fcast);
        setHistory(hist);
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : 'Failed to load weather data.');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container">
      <header className="header">
        <h1>Patna Weather Dashboard</h1>
        <p className="subtitle">Live data from Open-Meteo · Metric units</p>
      </header>

      {loading && (
        <div className="state-message">Loading weather data…</div>
      )}

      {!loading && error && (
        <div className="state-message error">{error}</div>
      )}

      {!loading && !error && current && (
        <div className="dashboard">
          <CurrentConditionsCard data={current} />
          <ForecastChart data={forecast} />
          <HistoryChart data={history} />
        </div>
      )}
    </div>
  );
}
