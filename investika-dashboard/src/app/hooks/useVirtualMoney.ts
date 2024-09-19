import { useState, useEffect } from 'react';
import { fetchVirtualMoney } from '../../../utils/fetchVirtualMoney';

type VirtualMoney = {
  id: number;
  amount: number;
  currency: string;
};

export const useVirtualMoney = () => {
  const [virtualMoney, setVirtualMoney] = useState<VirtualMoney[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadVirtualMoney = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedVirtualMoney: VirtualMoney[] = await fetchVirtualMoney();
        setVirtualMoney(fetchedVirtualMoney);
      } catch (err) {
        setError('Error fetching virtual money data');
      } finally {
        setLoading(false);
      }
    };

    loadVirtualMoney();
  }, []);

  return {
    virtualMoney,
    loading,
    error,
  };
};
