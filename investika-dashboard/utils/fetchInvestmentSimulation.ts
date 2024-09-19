// utils/fetchInvestmentSimulations.ts
export const fetchSimulations = async () => {
    try {
      const response = await fetch('/api/investment-simulations');
      if (!response.ok) {
        throw new Error('Failed to fetch simulations');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  