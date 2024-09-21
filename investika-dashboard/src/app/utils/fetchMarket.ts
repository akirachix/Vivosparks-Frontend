export const fetchMarkets = async () => {
    try {
      const res = await fetch('/api/markets');
      if (!res.ok) {
        throw new Error('Failed to fetch market data');
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.error('Error fetching markets:', error);
      return [];
    }
  };
  