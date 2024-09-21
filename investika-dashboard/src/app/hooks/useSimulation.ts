import { useState, useEffect } from 'react';
import { fetchSimulations, Simulation } from '../../../utils/fetchInvestmentSimulation';

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
      } catch (err: unknown) { 
        if (err instanceof Error) {
          console.error('Error fetching simulations:', err.message);
          setError(err.message);
        } else {
          console.error('Unknown error fetching simulations:', err);
          setError('Error fetching simulations');
        }
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
