'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import { IoHome } from "react-icons/io5";
import { CiBank } from "react-icons/ci";
import { FaPiggyBank } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";

type SidebarItemProps = {
  Icon: React.ElementType; 
  label: string;
  path: string;
};

const Sidebar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const SidebarItem: React.FC<SidebarItemProps> = ({ Icon, label, path }) => {
    const isActive = pathname === path;
    return (
      <li
        onClick={() => router.push(path)}
        className={`flex items-center p-2 rounded-lg cursor-pointer ${isActive ? 'text-[#F8BD00]' : 'text-white hover:text-[#F8BD00] transition-colors duration-200'}`}
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
      <div className="ml-7 flex items-center cursor-pointer" onClick={() => router.push('/logout')}>
        <IoIosLogOut className="mr-4 text-2xl" />
        <span className="text-lg font-bold hover:text-[#F8BD00]">Logout</span>
      </div>
    </div>
  );
};

export default Sidebar;
