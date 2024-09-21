"use client";
import React from 'react';
import Sidebar from '../Sidebar';
import MarketsPage from 'a/app/pages/markets/markets';


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <div>
        <Sidebar />
      </div>
      <div className="flex-grow ">
        {children}
        <MarketsPage/>
       
      </div>
    </div>
  );
}