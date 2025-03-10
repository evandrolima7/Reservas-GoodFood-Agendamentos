import { useState, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { loadApi } from '../../loadApi';
import Spinner from '../spiners/Spinner';

Chart.register(...registerables);

export const GraphicComponentQuantity = () => {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const reservations = await loadApi.load();

        const quantityRanges: { [key: string]: number } = {
          '1-2': 0,
          '3-5': 0,
          '6-10': 0,
          '11-15': 0,
          '16+': 0,
        };

        reservations.forEach((reservation: any) => {
          const quantity = reservation.quantity;

          if (quantity >= 1 && quantity <= 2) {
            quantityRanges['1-2'] += 1;
          } else if (quantity >= 3 && quantity <= 5) {
            quantityRanges['3-5'] += 1;
          } else if (quantity >= 6 && quantity <= 10) {
            quantityRanges['6-10'] += 1;
          } else if (quantity >= 11 && quantity <= 15) {
            quantityRanges['11-15'] += 1;
          } else {
            quantityRanges['16+'] += 1;
          }
        });
        
        const labels = Object.keys(quantityRanges);
        const dataValues = Object.values(quantityRanges);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'Reservas por Faixa de Quantidade de Pessoas',
              data: dataValues,
              backgroundColor: [
                'rgba(54, 162, 235, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(255, 159, 64, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 99, 132, 0.5)',
              ],
              borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 99, 132, 1)',
              ],
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Erro ao buscar reservas por quantidade de pessoas:', error);
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
        Reservas por Quantidade
      </h2>
      {chartData ? (
        <Bar data={chartData} options={options} />
      ) : (
        <Spinner />
      )}
    </div>
  );
};
