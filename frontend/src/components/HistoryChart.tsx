import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import type { HistoryDay } from '../types/weather';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

interface Props {
  data: HistoryDay[];
}

export default function HistoryChart({ data }: Props) {
  const labels = data.map((d) => {
    const dt = new Date(d.date + 'T00:00:00');
    return dt.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
  });

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Mean Temp (°C)',
        data: data.map((d) => d.temp_mean),
        borderColor: '#7c5cd8',
        backgroundColor: '#7c5cd820',
        fill: true,
        tension: 0.3,
        pointRadius: 3,
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
      <h2 style={styles.heading}>30-Day Historical Temperature</h2>
      <div style={styles.chartBox}>
        <Line data={chartData} options={options} />
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
