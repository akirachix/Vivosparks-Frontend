import { useState, useEffect } from 'react';
import { fetchUsers, User } from '../../../utils/fetchUsers';
import { fetchVirtualMoney, VirtualMoney } from '../../../utils/fetchVirtualMoney';

export interface CombinedUser extends User {
  virtualmoney: number;
}

export const useUsers = () => {
  const [users, setUsers] = useState<CombinedUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const combineUsersWithVirtualMoney = (fetchedUsers: User[], virtualMoney: VirtualMoney[]): CombinedUser[] => {

    console.log({fetchedUsers, virtualMoney});
    
    return fetchedUsers.map(user => {
      const money = virtualMoney.find(v => v.user === user.user_id);
      return { ...user, virtualmoney: money ? money.amount : 0 };
    });
  };

  useEffect(() => {
    const loadData = async () => { 
      setLoading(true);
      setError(null);

      try {
     
        const virtualMoney: VirtualMoney[] = await fetchVirtualMoney();
        
     
        if (virtualMoney.length > 0) {
       
          const fetchedUsers: User[] = await fetchUsers();
          const combinedUsers = combineUsersWithVirtualMoney(fetchedUsers, virtualMoney);
          
 
          setUsers(combinedUsers);
        } else {
    
          setError('Virtual money data is unavailable or empty.');
        }
      } catch (err: any) {
        setError(err.message || 'Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return {
    users,
    loading,
    error,
  };
};
