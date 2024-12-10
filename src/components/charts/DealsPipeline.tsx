import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useQuery } from '@tanstack/react-query';
import { db } from '../../lib/db';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export function DealsPipeline() {
  const { data: deals = [] } = useQuery(['deals'], () => db.deals.toArray());

  const stages = ['lead', 'opportunity', 'proposal', 'negotiation', 'closed-won', 'closed-lost'];
  const stageData = stages.map(stage => 
    deals.filter(deal => deal.stage === stage).reduce((sum, deal) => sum + deal.value, 0)
  );

  const data = {
    labels: stages.map(s => s.replace('-', ' ').toUpperCase()),
    datasets: [
      {
        label: 'Deal Value',
        data: stageData,
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Deals Pipeline',
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <Bar options={options} data={data} />
    </div>
  );
}