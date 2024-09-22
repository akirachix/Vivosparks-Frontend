export interface User {
  user_id: number;
  username: string;
  email: string;
  location: string;
}

export const fetchUsers = async (): Promise<User[]> => {
  try {
  
    const response = await fetch('/api/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
 
    if (!response.ok) {
      throw new Error(`Failed to fetch users. Status: ${response.status} - ${response.statusText}`);
    }

   
    const data = await response.json() as User[];
    console.log('Fetched users data:', data);
    return data;
  } catch (error: any) { 
    console.error('Error fetching users data:', error.message || error);
    throw error;
  }
};
