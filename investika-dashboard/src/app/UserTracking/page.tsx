"use client";
import React, { useState, useEffect } from 'react';
import { CombinedUser, useUsers } from 'a/app/hooks/useUsers'; 
import { useSimulations } from 'a/app/hooks/useSimulation';
import { useVirtualMoney } from 'a/app/hooks/useVirtualMoney';

const UserManagement: React.FC = () => {
  const { virtualMoney, loading: loadingMoney, error: errorMoney } = useVirtualMoney();
  const { users, loading: loadingUsers, error: errorUsers } = useUsers(); 
  const { simulations, loading: loadingSimulations, error: errorSimulations } = useSimulations();

  
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10; 


  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

 
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

 
  const calculateTotalVirtualMoney = (virtualMoneyArray: { amount: number }[]) => {
    return virtualMoneyArray.reduce((total, item) => {
      return total + (isNaN(item.amount) ? 0 : item.amount);
    }, 0);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header with Stats */}
      <div className="flex flex-wrap justify-between gap-6 mb-8">
        <InfoCard
          value={users.length}
          title="Total Users"
          loading={loadingUsers}
          error={errorUsers}
        />
        <InfoCard         
          value={calculateTotalVirtualMoney(virtualMoney)}
          title="Total Virtual Money"
          loading={loadingMoney}
          error={errorMoney}
        />
        <InfoCard
          value={simulations.length}
          title="Total Simulations"
          loading={loadingSimulations}
          error={errorSimulations}
        />
      </div>

      {/* User Management Table */}
      <div className="bg-white p-6 shadow rounded-lg">
        <h2 className="text-4xl font-bold mb-4 text-center">User Management</h2>
        {loadingUsers ? (
          <p className="text-center">Loading users...</p>
        ) : errorUsers ? (
          <p className="text-center text-red-500">Error loading users: {errorUsers}</p>
        ) : users.length > 0 ? (
          <>
            <UserTable users={currentUsers} />
            <Pagination
              usersPerPage={usersPerPage}
              totalUsers={users.length}
              paginate={paginate}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </>
        ) : (
          <p className="text-center">No users found.</p>
        )}
      </div>
    </div>
  );
};

const InfoCard: React.FC<{
  title: string;
  value: number | string;
  loading: boolean;
  error: string | null;
}> = ({ title, value, loading, error }) => (
  <div className="flex-1 bg-white p-4 shadow-lg rounded text-center pl-6" style={{ boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)' }}>
    {loading ? (
      <p>Loading...</p>
    ) : error ? (
      <p className="text-red-500">Error: {error}</p>
    ) : (
      <>
        <p className="text-3xl font-bold">{value}</p> 
        <h2 className="text-lg font-semibold mt-1">{title}</h2> 
      </>
    )}
  </div>
);

const UserTable: React.FC<{ users: CombinedUser[] }> = ({ users }) => (
  <table className="min-w-full table-auto">
    <thead className="bg-gray-300 text-gray-800 text-2xl">
      <tr>
        <th className="px-4 py-3 text-xl">Username</th> 
        <th className="px-4 py-3 text-xl">Email</th> 
        <th className="px-4 py-3 text-xl">Virtual Money Balance</th> 
        <th className="px-4 py-4 text-xl">Location</th> 
      </tr>
    </thead>
    <tbody className="text-xl">
      {users.map((user, index) => (
        <tr
          key={user.user_id}
          className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-300'} hover:bg-blue-200`}
        >
          <td className="px-4 py-3 text-center text-gray-800">{user.username}</td>
          <td className="px-4 py-3 text-center text-gray-800">{user.email}</td>
          <td className="px-4 py-3 text-center text-gray-800">
            {formatToTwoDecimals(user.virtualmoney)} 
          </td>
          <td className="px-4 py-3 text-center text-gray-800">{user.location}</td>
        </tr>
      ))}
    </tbody>
  </table>
);


const Pagination: React.FC<{
  usersPerPage: number;
  totalUsers: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
  setCurrentPage: (pageNumber: number) => void;
}> = ({ usersPerPage, totalUsers, paginate, currentPage, setCurrentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleNext = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <nav className="flex justify-center mt-4">
      <ul className="flex space-x-2">
     
        <li>
          <button
            onClick={handlePrevious}
            className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-200 text-gray-800'}`}
            disabled={currentPage === 1}
          >
            &laquo; Back
          </button>
        </li>
    
        {pageNumbers.map(number => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={`px-4 py-2 rounded ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
            >
              {number}
            </button>
          </li>
        ))}
     
        <li>
          <button
            onClick={handleNext}
            className={`px-4 py-2 rounded ${currentPage === pageNumbers.length ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-200 text-gray-800'}`}
            disabled={currentPage === pageNumbers.length}
          >
            Next &raquo;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default UserManagement;

const formatToTwoDecimals = (number: number): string => {
  if (isNaN(number)) return "0.00"; 
  return number.toFixed(2); 
};
