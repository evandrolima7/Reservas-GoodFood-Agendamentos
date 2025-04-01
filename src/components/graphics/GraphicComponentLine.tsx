import { useState, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import type { ChartData, ChartOptions } from 'chart.js';
import { loadApi } from '../../loadApi';
import Spinner from '../spiners/Spinner';

Chart.register(...registerables);

export const GraphicComponentLine = () => {
  const [chartData, setChartData] = useState<ChartData<'line'> | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const reservations = await loadApi.load();
        const hourCount: { [key: string]: number } = {};
        reservations.forEach((reservation: any) => {
          const date = new Date(reservation.dateReserve);
          const hourStr = date.getHours().toString().padStart(2, '0') + ':00';
          hourCount[hourStr] = (hourCount[hourStr] || 0) + 1;
        });

        const sortedHours = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);
        const counts = sortedHours.map(hour => hourCount[hour] || 0);

        setChartData({
          labels: sortedHours,
          datasets: [
            {
              label: 'Reservas por Hora',
              data: counts,
              fill: false,
              borderColor: 'rgba(75,192,192,1)',
              backgroundColor: 'rgba(75,192,192,0.4)',
              tension: 0.1,
            }
          ],
        });
      } catch (error) {
        console.error('Erro ao buscar reservas para Time Series:', error);
      }
    }

    fetchData();
  }, []);

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          color: '#4b5563',
          font: { weight: 'bold' },
        },
        grid: { color: '#e5e7eb' },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: '#4b5563',
          font: { weight: 'bold' },
        },
        grid: { color: '#e5e7eb' },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#1e3a8a',
        titleColor: '#fff',
        bodyColor: '#fff',
      },
    },
  };

  return (
    <div className="mr-auto ml-auto w-80 pl-6  pt-6 pr-6 pb-20 bg-white rounded-lg shadow-md mb-4 ">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        Evolução das Reservas por Hora
      </h2>
      <div style={{ height: '300px' }}>
        {chartData ? (
          <Line data={chartData} options={options} />
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};
