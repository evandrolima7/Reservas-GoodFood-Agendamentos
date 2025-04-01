import { useState, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import type { ChartData, ChartOptions } from 'chart.js';
import { loadApi } from '../../loadApi'; 
import Spinner from '../spiners/Spinner';

Chart.register(...registerables);

export const GraphicComponentPie = () => {
  const [chartData, setChartData] = useState<ChartData<'pie'> | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const reservations = await loadApi.load();

        const daysCount: { [key: string]: number } = {
          'Domingo': 0,
          'Segunda': 0,
          'Terça': 0,
          'Quarta': 0,
          'Quinta': 0,
          'Sexta': 0,
          'Sábado': 0,
        };

        reservations.forEach((reservation: any) => {
          const date = new Date(reservation.dateReserve);
          const dayNumber = date.getDay(); 
          const dayNames = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
          const dayName = dayNames[dayNumber];
          daysCount[dayName] += 1;
        });

        setChartData({
          labels: Object.keys(daysCount),
          datasets: [
            {
              label: 'Reservas por Dia da Semana',
              data: Object.values(daysCount),
              backgroundColor: [
                '#F87171',
                '#FBBF24', 
                '#34D399', 
                '#60A5FA',
                '#A78BFA', 
                '#F472B6',
                '#A3E635', 
              ],
              borderWidth: 1,
            }
          ],
        });
      } catch (error) {
        console.error('Erro ao buscar reservas para Pie Chart:', error);
      }
    }
    fetchData();
  }, []);

  const options: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div  className=" m-auto w-80 h-90 pl-6 mt-8 pt-6 pr-6 pb-20 bg-white rounded-lg mb-4 shadow-md md:m-auto md:mt-10 pb-30">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        Distribuição de Reservas Semana
      </h2>
      {chartData ? (
        <Pie data={chartData} options={options} />
      ) : (
        <Spinner />
      )}
    </div>
  );
};