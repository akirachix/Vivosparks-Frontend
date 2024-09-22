"use client";

import React, { useState, useEffect } from 'react';
import { useAchievements } from 'a/app/hooks/useAchievements';
import { useUsers } from 'a/app/hooks/useUsers';
import { useSimulations } from 'a/app/hooks/useSimulation';
import { Achievements } from '../../../utils/fetchAchievement';

const AchievementManagement: React.FC = () => {
  const { achievements, loading: loadingAchievements, error: errorAchievements } = useAchievements();
  const { users, loading: loadingUsers, error: errorUsers } = useUsers();
  const { simulations, loading: loadingSimulations, error: errorSimulations } = useSimulations();
  const [currentPage, setCurrentPage] = useState(1);
  const achievementsPerPage = 10;

  useEffect(() => {
    console.log('Achievements:', achievements);
    console.log('Loading Achievements:', loadingAchievements);
    console.log('Error Achievements:', errorAchievements);
  }, [achievements, loadingAchievements, errorAchievements]);

  const indexOfLastAchievement = currentPage * achievementsPerPage;
  const indexOfFirstAchievement = indexOfLastAchievement - achievementsPerPage;
  const currentAchievements = achievements.slice(indexOfFirstAchievement, indexOfLastAchievement);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header with Stats */}
      <div className="flex flex-wrap justify-between gap-6 mb-8">
        <InfoCard
          value={simulations.length}
          title="Total Simulations"
          loading={loadingSimulations}
          error={errorSimulations}
        />
        <InfoCard
          value={users.length}
          title="Total Users"
          loading={loadingUsers}
          error={errorUsers}
        />
        <InfoCard
          value={achievements.length}
          title="Total Achievements"
          loading={loadingAchievements}
          error={errorAchievements}
        />
      </div>
      {/* Achievement Management Table */}
      <div className="bg-white p-6 shadow rounded-lg">
        <h2 className="text-4xl font-bold mb-4 text-center">Achievement Management</h2>
        {loadingAchievements ? (
          <p className="text-center">Loading achievements...</p>
        ) : errorAchievements ? (
          <div className="text-center text-red-500">
            <p>Error loading achievements: {errorAchievements}</p>
            <p>Please check the console for more details.</p>
          </div>
        ) : achievements.length > 0 ? (
          <>
            <AchievementTable achievements={currentAchievements} />
            <Pagination
              itemsPerPage={achievementsPerPage}
              totalItems={achievements.length}
              paginate={paginate}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </>
        ) : (
          <p className="text-center">No achievements found. Please check the console for more information.</p>
        )}
      </div>
    </div>
  );
};

// InfoCard, AchievementTable, and Pagination components remain unchanged

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

const AchievementTable: React.FC<{ achievements: Achievements[] }> = ({ achievements }) => (
  <table className="min-w-full table-auto">
    <thead className="bg-gray-300 text-gray-800 text-2xl">
      <tr>
        <th className="px-4 py-3 text-xl">Id</th>
        <th className="px-4 py-3 text-xl">Title</th>
        <th className="px-4 py-3 text-xl">Reward Type</th>
        <th className="px-4 py-3 text-xl">Date Achieved</th>
      </tr>
    </thead>
    <tbody className="text-xl">
      {achievements.map((achievement, index) => (
        <tr
          key={achievement.id}
          className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-300'} hover:bg-blue-200`}
        >
          <td className="px-4 py-3 text-center text-gray-800">{achievement.id}</td>
          <td className="px-4 py-3 text-center text-gray-800">{achievement.title}</td>
          <td className="px-4 py-3 text-center text-gray-800">{achievement.reward_type}</td>
          <td className="px-4 py-3 text-center text-gray-800">{achievement.date_achieved}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

const Pagination: React.FC<{
  itemsPerPage: number;
  totalItems: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
  setCurrentPage: (pageNumber: number) => void;
}> = ({ itemsPerPage, totalItems, paginate, currentPage, setCurrentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
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

export default AchievementManagement;
