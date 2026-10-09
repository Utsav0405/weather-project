from fastapi import APIRouter

from .models import CurrentWeather, ForecastDay, HistoryDay
from . import weather_service

router = APIRouter(prefix="/api")


@router.get("/current", response_model=CurrentWeather)
async def current_weather():
    """Return current weather conditions for Patna."""
    data = await weather_service.get_current()
    return CurrentWeather(**data)


@router.get("/forecast", response_model=list[ForecastDay])
async def forecast():
    """Return 7-day daily forecast for Patna."""
    days = await weather_service.get_forecast()
    return [ForecastDay(**d) for d in days]


@router.get("/history", response_model=list[HistoryDay])
async def history():
    """Return daily mean temperature for the past 30 days for Patna."""
    days = await weather_service.get_history()
    return [HistoryDay(**d) for d in days]
