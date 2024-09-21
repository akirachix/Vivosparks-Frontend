export interface VirtualMoney {
  id: number;
  amount: number;
  user: number;
}

export const fetchVirtualMoney = async (): Promise<VirtualMoney[]> => {
  try {
    const response = await fetch('/api/virtualmoney');
    if (!response.ok) {
      throw new Error('Failed to fetch virtual money data');
    }

    const data = await response.json() as VirtualMoney[];
    return data.map(vm => ({
      ...vm,
      amount: parseFloat(vm.amount.toString()), 
    }));
  } catch (error) {
    console.error('Error fetching virtual money data:', error);
    throw error;
  }
};
