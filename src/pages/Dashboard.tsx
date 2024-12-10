import { useQuery } from '@tanstack/react-query';
import { db } from '../lib/db';
import { DealsPipeline } from '../components/charts/DealsPipeline';
import { formatCurrency } from '../lib/utils/format';

export function Dashboard() {
  const { data: contactsCount = 0 } = useQuery(['contactsCount'], () => 
    db.contacts.count()
  );

  const { data: companiesCount = 0 } = useQuery(['companiesCount'], () =>
    db.companies.count()
  );

  const { data: dealsCount = 0 } = useQuery(['dealsCount'], () =>
    db.deals.count()
  );

  const { data: dealValue = 0 } = useQuery(['dealValue'], async () => {
    const deals = await db.deals.where('stage').equals('closed-won').toArray();
    return deals.reduce((sum, deal) => sum + deal.value, 0);
  });

  const stats = [
    { name: 'Total Contacts', value: contactsCount },
    { name: 'Total Companies', value: companiesCount },
    { name: 'Active Deals', value: dealsCount },
    { name: 'Closed Deal Value', value: formatCurrency(dealValue) },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      
      <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
          >
            <dt>
              <div className="absolute rounded-md bg-blue-500 p-3">
                <div className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">{stat.name}</p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-8">
        <DealsPipeline />
      </div>
    </div>
  );
}