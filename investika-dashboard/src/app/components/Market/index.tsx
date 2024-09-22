import { useMarkets } from 'a/app/hooks/useMarkets';
import { useUsers } from 'a/app/hooks/useUsers';
import { useSimulations } from 'a/app/hooks/useSimulation';
import { useVirtualMoney } from 'a/app/hooks/useVirtualMoney';
import { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Market {
  id: number;
  risk_level: string;
}

interface User {
  id: number;
  name: string;
}

interface Simulation {
  id: number;
}

interface VirtualMoney {
  id: number;
  amount: number;
}

interface InfoCardProps {
  title: string;
  value: number | string;
  loading: boolean;
  error?: string;
}

const MarketsPage = () => {
  const { markets, loading } = useMarkets() as { markets: Market[]; loading: boolean };
  const { users, loading: loadingUsers, error: errorUsers } = useUsers() as unknown as { users: User[]; loading: boolean; error?: string };
  const { simulations, loading: loadingSimulations, error: errorSimulations } = useSimulations() as { simulations: Simulation[]; loading: boolean; error?: string };
  const { virtualMoney, loading: loadingMoney, error: errorMoney } = useVirtualMoney() as { virtualMoney: VirtualMoney[]; loading: boolean; error?: string };

  const [heatmapData, setHeatmapData] = useState<any>(null);

  useEffect(() => {
    if (!loading && markets.length > 0) {
      const labels = ['Low', 'Medium', 'High'];
      const frequencyData = [0, 0, 0];

      markets.forEach((market) => {
        const riskLevel = market.risk_level ? market.risk_level.charAt(0).toUpperCase() + market.risk_level.slice(1) : '';
        const riskIndex = labels.indexOf(riskLevel);
        if (riskIndex !== -1) {
          frequencyData[riskIndex] += 1;
        }
      });

      setHeatmapData({
        labels,
        datasets: [
          {
            label: 'Frequency',
            data: frequencyData,
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
          },
        ],
      });
    }
  }, [markets, loading]);

  const calculateTotalVirtualMoney = (virtualMoneyArray: VirtualMoney[]): number => {
    return virtualMoneyArray.reduce((total, item) => {
      return total + (isNaN(item.amount) ? 0 : item.amount);
    }, 0);
  };

  const InfoCard = ({ title, value, loading, error }: InfoCardProps) => (
    <div className="flex-1 bg-white p-6 shadow-md rounded-lg text-center sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/4" style={{ boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <>
          <p className="text-4xl font-bold text-gray-800">{value}</p>
          <h2 className="text-lg font-semibold mt-1 text-gray-500">{title}</h2>
        </>
      )}
    </div>
  );

  if (loading || loadingUsers || loadingSimulations || loadingMoney) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex flex-wrap justify-between gap-6 mb-8">
        <InfoCard
          value={users.length}
          title="Total Users"
          loading={loadingUsers}
          error={errorUsers}
        />
        <InfoCard
          value={calculateTotalVirtualMoney(virtualMoney)}
          title="Total Virtual Money"
          loading={loadingMoney}
          error={errorMoney}
        />
        <InfoCard
          value={simulations.length}
          title="Total Simulations"
          loading={loadingSimulations}
          error={errorSimulations}
        />
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Actions Users Risk Preferences</h2>

      <div className="w-full max-w-6xl h-full bg-white shadow-md rounded-lg p-8">
        {heatmapData ? (
          <Bar
            data={heatmapData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: 'Market Risk Level Frequency',
                },
              },
              scales: {
                x: {
                  stacked: true,
                },
                y: {
                  stacked: true,
                },
              },
            }}
          />
        ) : (
          <p className="text-center text-gray-500">No data available</p>
        )}
      </div>
    </div>
  );
};

export default MarketsPage;
