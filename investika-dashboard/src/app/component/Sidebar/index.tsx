'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import { IoHome } from "react-icons/io5";
import { CiBank } from "react-icons/ci";
import { FaPiggyBank } from "react-icons/fa";

type SidebarItemProps = {
  Icon: React.ElementType;
  label: string;
  path: string;
};

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (pathname === '/') {
      router.push('/homepage');
    }
  }, [pathname, router]);

  const handleNavigation = async (path: string) => {
    if (!loading && pathname !== path) {
      setLoading(true); // Start loading
      await new Promise((resolve) => setTimeout(resolve, 500)); // Delay for 500 ms
      router.push(path); // Navigate
    }
  };

  const SidebarItem: React.FC<SidebarItemProps> = ({ Icon, label, path }) => {
    const isActive = pathname === path;
    return (
      <li
        onClick={() => handleNavigation(path)}
        className={`flex items-center p-2 rounded-lg cursor-pointer transition-all duration-300 ease-in-out ${
          isActive ? 'text-[#F8BD00]' : 'text-white hover:text-[#F8BD00]'
        } ${loading && 'pointer-events-none'}`}
        style={{ opacity: loading ? 0.5 : 1 }} 
      >
        <Icon className="mr-4 text-2xl" />
        <span className="text-lg font-bold">{label}</span>
      </li>
    );
  };

  if (!mounted) return null;

  return (
    <div className="w-72 h-screen bg-[#00265B] text-white p-5 fixed flex flex-col justify-between">
      <div>
        <div className="mb-5 text-center">
          <Image
            src="/images/logo.png"
            alt="logo"
            width={300}
            height={200}
          />
        </div>
        <nav>
          <ul className="space-y-12 font-nunito">
            <SidebarItem Icon={IoHome} label="User Tracking Report" path="/user-tracking" />
            <SidebarItem Icon={CiBank} label="Risk Analysis Report" path="/risk-analysis-report" />
            <SidebarItem Icon={FaPiggyBank} label="Financial Data Tracking" path="/financial-data-tracking" />
          </ul>
        </nav>
      </div>
    
      {loading && (
        <div
          className="absolute top-0 left-0 w-full h-full flex items-center justify-center transition-opacity duration-300 ease-in-out"
          style={{ opacity: loading ? 1 : 0 }} // Maintain visibility of loading overlay
        >
          <p className="text-white">Loading...</p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
