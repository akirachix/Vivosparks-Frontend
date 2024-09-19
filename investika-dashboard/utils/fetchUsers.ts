// utils/fetchUsers.ts
export const fetchUsers = async () => {
  try {
    // Use the relative path to call the Next.js API route
    const response = await fetch('/api/users');
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
