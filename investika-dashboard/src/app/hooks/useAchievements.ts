import { useState, useEffect } from 'react';
import { fetchAchievement, Achievements } from '../../../utils/fetchAchievement';

export const useAchievements = () => {
  const [achievements, setAchievements] = useState<Achievements[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAchievements = async () => {
      setLoading(true);
      setError(null);
      try {
    
        const fetchedAchievements: Achievements[] = await fetchAchievement(); 

        setAchievements(fetchedAchievements);
      } catch (err: any) { 
        console.error('Error fetching simulations:', err.message || err); 
        setError(err.message || 'Error fetching chievements');
      } finally {
        setLoading(false);
      }
    };

    loadAchievements();
  }, []);

  return {
    achievements,
    loading,
    error,
  };
};
