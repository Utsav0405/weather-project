import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import type { ForecastDay } from '../types/weather';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Props {
  data: ForecastDay[];
}

export default function ForecastChart({ data }: Props) {
  const labels = data.map((d) => {
    const dt = new Date(d.date + 'T00:00:00');
    return dt.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' });
  });

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Max Temp (°C)',
        data: data.map((d) => d.temp_max),
        backgroundColor: '#f97316cc',
        borderColor: '#f97316',
        borderWidth: 1,
        borderRadius: 4,
      },
      {
        label: 'Min Temp (°C)',
        data: data.map((d) => d.temp_min),
        backgroundColor: '#3b82f6cc',
        borderColor: '#3b82f6',
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: false },
    },
    scales: {
      y: {
        title: { display: true, text: 'Temperature (°C)' },
      },
    },
  };

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.heading}>7-Day Forecast</h2>
      <div style={styles.chartBox}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    background: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: 12,
    padding: '24px 28px',
  },
  heading: {
    margin: '0 0 16px',
    fontSize: 18,
    fontWeight: 700,
    color: '#1f2328',
  },
  chartBox: {
    height: 300,
    position: 'relative',
  },
};
