// utils/fetchVirtualMoney.ts
export const fetchVirtualMoney = async () => {
    try {
      const response = await fetch('/api/virtualmoney');
      if (!response.ok) {
        throw new Error('Failed to fetch virtual money data');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  