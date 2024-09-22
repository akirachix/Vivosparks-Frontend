export interface Achievements {
  id: number;
  title: string;
  reward_type: string;
  date_achieved: string;
}

export const fetchAchievement = async (): Promise<Achievements[]> => {
  try {
    const response = await fetch('/api/achievements');

    // Log the entire response for debugging
    console.log("API Response: ", response);

    if (!response.ok) {
      throw new Error(`Failed to fetch achievements. Status: ${response.status} - ${response.statusText}`);
    }

    const data: Achievements[] = await response.json();

    console.log("Fetched Achievements Data: ", data);

    return data;
  } catch (error: any) {
    // More detailed error logging
    console.error('Error fetching achievements:', error.message || error);
    throw error;
  }
};
