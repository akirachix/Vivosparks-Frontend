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

  // State to force component rendering on client-side after initial load
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Set default path to "/user-tracking" if the current pathname is "/"
    if (pathname === '/') {
      router.push('/homepage');
    }
  }, [pathname, router]);

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

  if (!mounted) return null; // Prevents rendering until the component is mounted

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
    </div>
  );
};

export default Sidebar;
