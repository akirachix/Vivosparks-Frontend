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
      } catch (err) {
        if (err instanceof Error) {
          console.error('Error fetching achievements:', err.message);
          setError(err.message);
        } else {
          console.error('Unexpected error fetching achievements:', err);
          setError('Unexpected error occurred');
        }
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
