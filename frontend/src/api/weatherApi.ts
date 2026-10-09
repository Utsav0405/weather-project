import axios from 'axios';
import type { CurrentWeather, ForecastDay, HistoryDay } from '../types/weather';

export async function fetchCurrent(): Promise<CurrentWeather> {
  const { data } = await axios.get<CurrentWeather>('/api/current');
  return data;
}

export async function fetchForecast(): Promise<ForecastDay[]> {
  const { data } = await axios.get<ForecastDay[]>('/api/forecast');
  return data;
}

export async function fetchHistory(): Promise<HistoryDay[]> {
  const { data } = await axios.get<HistoryDay[]>('/api/history');
  return data;
}
