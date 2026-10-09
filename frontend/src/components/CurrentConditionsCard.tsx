import type { CurrentWeather } from '../types/weather';

// WMO Weather interpretation codes → human-readable description
const WMO_CODES: Record<number, string> = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Depositing rime fog',
  51: 'Light drizzle',
  53: 'Moderate drizzle',
  55: 'Dense drizzle',
  61: 'Slight rain',
  63: 'Moderate rain',
  65: 'Heavy rain',
  71: 'Slight snowfall',
  73: 'Moderate snowfall',
  75: 'Heavy snowfall',
  77: 'Snow grains',
  80: 'Slight showers',
  81: 'Moderate showers',
  82: 'Violent showers',
  85: 'Slight snow showers',
  86: 'Heavy snow showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm with slight hail',
  99: 'Thunderstorm with heavy hail',
};

interface Props {
  data: CurrentWeather;
}

export default function CurrentConditionsCard({ data }: Props) {
  const description = WMO_CODES[data.weather_code] ?? `Code ${data.weather_code}`;

  return (
    <div style={styles.card}>
      <div style={styles.city}>Patna, Bihar</div>
      <div style={styles.condition}>{description}</div>
      <div style={styles.tempRow}>
        <span style={styles.temp}>{data.temperature.toFixed(1)}°C</span>
        <span style={styles.feelsLike}>Feels like {data.apparent_temperature.toFixed(1)}°C</span>
      </div>
      <div style={styles.grid}>
        <Stat label="Humidity" value={`${data.relative_humidity}%`} />
        <Stat label="Wind" value={`${data.wind_speed.toFixed(1)} km/h`} />
        <Stat label="Precipitation" value={`${data.precipitation.toFixed(1)} mm`} />
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div style={styles.stat}>
      <span style={styles.statLabel}>{label}</span>
      <span style={styles.statValue}>{value}</span>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    background: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: 12,
    padding: '24px 28px',
  },
  city: {
    fontSize: 22,
    fontWeight: 700,
    color: '#1f2328',
    marginBottom: 4,
  },
  condition: {
    fontSize: 15,
    color: '#57606a',
    marginBottom: 16,
  },
  tempRow: {
    display: 'flex',
    alignItems: 'baseline',
    gap: 16,
    marginBottom: 20,
  },
  temp: {
    fontSize: 48,
    fontWeight: 700,
    color: '#1f2328',
    lineHeight: 1,
  },
  feelsLike: {
    fontSize: 15,
    color: '#57606a',
  },
  grid: {
    display: 'flex',
    gap: 32,
    flexWrap: 'wrap',
  },
  stat: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#57606a',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 600,
    color: '#1f2328',
  },
};
