"use client";
import React from 'react';
import { useUsers } from 'a/app/hooks/useUsers';
import { useSimulations } from 'a/app/hooks/useSimulation';
import { useVirtualMoney } from 'a/app/hooks/useVirtualMoney';

const UserManagement: React.FC = () => {
  const { users, loading: loadingUsers, error: errorUsers, refreshUsers } = useUsers();
  const { simulations, loading: loadingSimulations, error: errorSimulations } = useSimulations();
  const { virtualMoney, loading: loadingVirtualMoney, error: errorVirtualMoney } = useVirtualMoney();

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header with Stats */}
      <div className="grid grid-cols-4 gap-28 mb-8 pl-72">
        <div className="bg-white p-4 shadow rounded text-center">
          <h2 className="text-lg font-semibold">Total Simulations</h2>
          <p className="text-2xl font-bold">{simulations.length}</p>
        </div>
        <div className="bg-white p-4 shadow rounded text-center">
          <h2 className="text-lg font-semibold">Total Users</h2>
          <p className="text-2xl font-bold">{users.length}</p>
          {/* <button 
            onClick={refreshUsers} 
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Refresh Users
          </button> */}
        </div>
        <div className="bg-white p-4 shadow rounded text-center">
          <h2 className="text-lg font-semibold">Total Virtual Money</h2>
          <p className="text-2xl font-bold">{virtualMoney.length}</p>
        </div>
      </div>

      {/* User Management Table */}
      <div className="bg-white p-6 shadow rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">User Management</h2>
        {loadingUsers ? (
          <p className="text-center">Loading users...</p>
        ) : errorUsers ? (
          <p className="text-center text-red-500">Error loading users: {errorUsers}</p>
        ) : (
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">Username</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Virtual Money Balance</th>
                <th className="px-4 py-2">Location</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user.id}
                  className={`${
                    index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                  } hover:bg-gray-200`}
                >
                  <td className="px-4 py-2 text-center">{user.username}</td>
                  <td className="px-4 py-2 text-center">{user.email}</td>
                  <td className="px-4 py-2 text-center">{user.virtualmoney}</td>
                  <td className="px-4 py-2 text-center">{user.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
