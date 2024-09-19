import { useState, useEffect } from 'react';
import { fetchUsers } from '../../../utils/fetchUsers';

type User = {
  id: number;
  username: string;
  email: string;
  virtualmoney: string;
  location: string;
};

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedUsers: User[] = await fetchUsers();
      setUsers(fetchedUsers);
    } catch (err) {
      setError('Error fetching users');
    } finally {
      setLoading(false);
    }
  };

  // Load users on initial render
  useEffect(() => {
    loadUsers();
  }, []);

  // Function to manually refresh users
  const refreshUsers = () => {
    loadUsers();
  };

  return {
    users,
    loading,
    error,
    refreshUsers, // Expose refresh function
  };
};
