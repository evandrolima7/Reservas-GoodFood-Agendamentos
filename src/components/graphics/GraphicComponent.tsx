import { useEffect, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { loadApi} from "../../loadApi"
import Spinner from '../spiners/Spinner';

Chart.register(...registerables);

export const GraphicComponent = () => {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const reservations = await loadApi.load();
        
        const daysCount: { [key: string]: number } = {
          'Segunda': 0,
          'Terça': 0,
          'Quarta': 0,
          'Quinta': 0,
          'Sexta': 0,
        };

        reservations.forEach((reservation: any) => {
          const date = new Date(reservation.dateReserve);
          const day = date.getDay(); 
          const mapping: { [key: number]: string } = {
            1: 'Segunda',
            2: 'Terça',
            3: 'Quarta',
            4: 'Quinta',
            5: 'Sexta'
          };
          if (day >= 1 && day <= 5) {
            daysCount[mapping[day]] += 1;
          }
        });

        const labels = Object.keys(daysCount);
        const dataValues = Object.values(daysCount);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'Reservas por Dia',
              data: dataValues,
              backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
              ],
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Erro ao buscar reservas:', error);
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
    <div className="m-auto w-80 h-90 pl-6  pt-6 pr-6 pb-20 bg-white rounded-lg mb-4 shadow-md md:m-auto md:mt-10 pb-30">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        Reservas por Dia da Semana
      </h2>
      {chartData ? (
        <Bar data={chartData} options={options} />
      ) : (
        <Spinner/>
      )}
    </div>
  );
};