import { useState, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { loadApi } from '../../loadApi';
import Spinner from '../spiners/Spinner';

Chart.register(...registerables);

export const GraphicComponentMonth = () => {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const reservations = await loadApi.load();
        const monthCount: { [key: string]: number } = {
          'Janeiro': 0,
          'Fevereiro': 0,
          'Março': 0,
          'Abril': 0,
          'Maio': 0,
          'Junho': 0,
          'Julho': 0,
          'Agosto': 0,
          'Setembro': 0,
          'Outubro': 0,
          'Novembro': 0,
          'Dezembro': 0,
        };

        reservations.forEach((reservation: any) => {
          const date = new Date(reservation.dateReserve);
          const month = date.getMonth();
          const monthNames = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
          ];
          const monthName = monthNames[month];
          monthCount[monthName] += 1;
        });

        setChartData({
          labels: Object.keys(monthCount),
          datasets: [
            {
              label: 'Reservas por Mês',
              data: Object.values(monthCount),
              backgroundColor: [
                'rgba(75, 192, 192, 0.5)',
                'rgba(255, 99, 132, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 159, 64, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 159, 64, 0.5)',
              ],
              borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Erro ao buscar reservas por mês:', error);
      }
    }

    fetchData();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#374151',
        },
        grid: {
          color: '#e5e7eb',
        },
      },
      x: {
        ticks: {
          color: '#374151',
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="w-80 h-90 pl-6 m-auto pt-6 pr-6 pb-20 bg-white rounded-lg mb-4 shadow-md md:m-auto md:mt-10 pb-30">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        Reservas por Mês
      </h2>
      {chartData ? (
        <Bar data={chartData} options={options} />
      ) : (
        <Spinner />
      )}
    </div>
  );
};
