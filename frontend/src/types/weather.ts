export interface CurrentWeather {
  temperature: number;
  apparent_temperature: number;
  relative_humidity: number;
  wind_speed: number;
  weather_code: number;
  precipitation: number;
}

export interface ForecastDay {
  date: string;
  temp_max: number;
  temp_min: number;
  precipitation_sum: number | null;
}

export interface HistoryDay {
  date: string;
  temp_mean: number | null;
}
