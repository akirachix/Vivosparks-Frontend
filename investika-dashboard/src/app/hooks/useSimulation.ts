import { useState, useEffect } from 'react';
import { fetchSimulations } from '../../../utils/fetchInvestmentSimulation';

type Simulation = {
  id: number;
  title: string;
  description: string;
};

export const useSimulations = () => {
  const [simulations, setSimulations] = useState<Simulation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSimulations = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedSimulations: Simulation[] = await fetchSimulations();
        setSimulations(fetchedSimulations);
      } catch (err) {
        setError('Error fetching simulations');
      } finally {
        setLoading(false);
      }
    };

    loadSimulations();
  }, []);

  return {
    simulations,
    loading,
    error,
  };
};
