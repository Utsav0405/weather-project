from pydantic import BaseModel


class CurrentWeather(BaseModel):
    temperature: float
    apparent_temperature: float
    relative_humidity: int
    wind_speed: float
    weather_code: int
    precipitation: float


class ForecastDay(BaseModel):
    date: str
    temp_max: float
    temp_min: float
    precipitation_sum: float | None = None


class HistoryDay(BaseModel):
    date: str
    temp_mean: float | None = None
