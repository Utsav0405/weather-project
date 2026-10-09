from typing import Any

import httpx

BASE_FORECAST_URL = "https://api.open-meteo.com/v1/forecast"
TIMEOUT = 30  # seconds — raised from 10 to handle slow network conditions

# Patna, Bihar, India
LAT = 25.5941
LON = 85.1376


async def get_current(lat: float = LAT, lon: float = LON) -> dict[str, Any]:
    """Fetch current weather conditions from Open-Meteo."""
    params = {
        "latitude": lat,
        "longitude": lon,
        "current": ",".join([
            "temperature_2m",
            "relative_humidity_2m",
            "wind_speed_10m",
            "weather_code",
            "apparent_temperature",
            "precipitation",
        ]),
        "timezone": "auto",
    }
    async with httpx.AsyncClient() as client:
        response = await client.get(BASE_FORECAST_URL, params=params, timeout=TIMEOUT)
        response.raise_for_status()
        data = response.json()

    current = data["current"]
    return {
        "temperature": current["temperature_2m"],
        "apparent_temperature": current["apparent_temperature"],
        "relative_humidity": current["relative_humidity_2m"],
        "wind_speed": current["wind_speed_10m"],
        "weather_code": current["weather_code"],
        "precipitation": current["precipitation"],
    }


async def get_forecast(lat: float = LAT, lon: float = LON) -> list[dict[str, Any]]:
    """Fetch 7-day daily forecast from Open-Meteo."""
    params = {
        "latitude": lat,
        "longitude": lon,
        "daily": ",".join([
            "temperature_2m_max",
            "temperature_2m_min",
            "precipitation_sum",
        ]),
        "forecast_days": 7,
        "timezone": "auto",
    }
    async with httpx.AsyncClient() as client:
        response = await client.get(BASE_FORECAST_URL, params=params, timeout=TIMEOUT)
        response.raise_for_status()
        data = response.json()

    daily = data["daily"]
    return [
        {
            "date": daily["time"][i],
            "temp_max": daily["temperature_2m_max"][i],
            "temp_min": daily["temperature_2m_min"][i],
            "precipitation_sum": daily["precipitation_sum"][i],
        }
        for i in range(len(daily["time"]))
    ]


async def get_history(lat: float = LAT, lon: float = LON) -> list[dict[str, Any]]:
    """Fetch daily mean temperature for the past 30 days using forecast past_days param."""
    params = {
        "latitude": lat,
        "longitude": lon,
        "daily": "temperature_2m_mean",
        "past_days": 30,
        "forecast_days": 1,
        "timezone": "auto",
    }
    async with httpx.AsyncClient() as client:
        response = await client.get(BASE_FORECAST_URL, params=params, timeout=TIMEOUT)
        response.raise_for_status()
        data = response.json()

    daily = data["daily"]
    return [
        {
            "date": daily["time"][i],
            "temp_mean": daily["temperature_2m_mean"][i],
        }
        for i in range(len(daily["time"]))
    ]
