export interface Simulation {
  id: number;
  amount_invested: number
  outcome:string
}
 
  

export const fetchSimulations = async (): Promise<Simulation[]> => {
  try {
    
    const response = await fetch('/api/investment-simulation');
    
    if (!response.ok) {
      throw new Error(`Failed to fetch simulations. Status: ${response.status} - ${response.statusText}`);
    }

    const data: Simulation[] = await response.json() as Simulation[];
    
    return data;
  } catch (error: any) { 
    console.error('Error fetching simulations:', error.message || error);
    throw error;
  }
};
