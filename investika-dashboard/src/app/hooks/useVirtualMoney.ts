import { useState, useEffect } from 'react';
import { fetchVirtualMoney, VirtualMoney } from '../../../utils/fetchVirtualMoney'; 

export const useVirtualMoney = () => {
  const [virtualMoney, setVirtualMoney] = useState<VirtualMoney[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadVirtualMoney = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchVirtualMoney(); 
        setVirtualMoney(data);
      } catch (err: any) {
        setError(err.message || 'Error fetching virtual money data');
      } finally {
        setLoading(false);
      }
    };

    loadVirtualMoney();
  }, []);

  return { virtualMoney, loading, error };
};
