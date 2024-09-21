import { useEffect, useState } from 'react';
import { fetchMarkets } from '../utils/fetchMarket';

export const useMarkets = () => {
  const [markets, setMarkets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMarkets = async () => {
      const data = await fetchMarkets();
      setMarkets(data);
      setLoading(false);
    };
    
    getMarkets();
  }, []);

  return { markets, loading };
};
