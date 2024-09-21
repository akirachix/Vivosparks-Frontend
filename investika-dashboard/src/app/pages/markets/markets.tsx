import { useMarkets } from 'a/app/hooks/useMarkets';
import { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';


interface Market {
  risk_level: 'low' | 'medium' | 'high'; }

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MarketsPage = () => {
  const { markets, loading }: { markets: Market[]; loading: boolean } = useMarkets();
  const [heatmapData, setHeatmapData] = useState<any>(null);

  useEffect(() => {
    if (!loading && markets.length > 0) {
      const labels = ['Low', 'Medium', 'High'];
      const buyData = [0, 0, 0]; 
      const sellData = [0, 0, 0]; 

      markets.forEach((market) => {
        const riskIndex = labels.indexOf(market.risk_level);
        if (riskIndex !== -1) {

          buyData[riskIndex] += Math.random();
          sellData[riskIndex] += Math.random();
        }
      });

      setHeatmapData({
        labels,
        datasets: [
          {
            label: 'Buy',
            data: buyData,
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
          },
          {
            label: 'Sell',
            data: sellData,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
          },
        ],
      });
    }
  }, [markets, loading]);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="flex flex-col pl-80 items-center justify-center min-h-screen p-4 bg-gray-100">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Market Risk Levels Heatmap</h2>
      <div className="w-full max-w-4xl p-4 bg-white shadow-lg rounded-lg">
        {heatmapData && (
          <Bar
            data={heatmapData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'top' },
                title: { display: true, text: 'Buy/Sell Actions by Market Risk Level' },
              },
              scales: {
                x: { stacked: true },
                y: { stacked: true },
              },
            }}
          />
        )}
      </div>
    </div>
  );
};

export default MarketsPage;
