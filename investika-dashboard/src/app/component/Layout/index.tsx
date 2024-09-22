"use client";
import React from 'react';
import Sidebar from '../Sidebar';
import AchievementManagement from 'a/app/risk-analysis-report/page';
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <div>
        <Sidebar/>
      </div>
      <div className="flex-grow pl-72">
        {children}
        <AchievementManagement/>
      </div>
    </div>
  );
}