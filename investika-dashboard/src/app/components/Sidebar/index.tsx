"use client";
import Link from 'next/link';
import { IoHome } from "react-icons/io5";
import { CiBank } from "react-icons/ci";
import { FaPiggyBank } from "react-icons/fa";
import Image from 'next/image';
const Sidebar = () => {
  return (
    <div className="w-72 h-screen bg-[#00265B] text-white p-5 fixed">
      <div className="mb-5 text-center">
        <Image
        src={"/investika-logo.png"}
        alt='logo'
        width={300}
        height={200}
        />
      </div>
      <nav>
        <ul className="space-y-12 font-nunito">
          <li>
            <div className="flex items-center">
              <IoHome className="mr-4 text-2xl -mt-2"/>
              <Link href="/UserTracking" legacyBehavior>
                <a className="text-lg font-bold hover:text-[#F8BD00]">User Tracking Report</a>
              </Link>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <CiBank className="mr-4 text-2xl -mt-1"/>
              <Link href="/risk-analysis-report" legacyBehavior>
                <a className="text-lg font-bold hover:text-[#F8BD00]">Risk Analysis Report</a>
              </Link>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <FaPiggyBank className="mr-4 text-2xl -mt-2"/>
              <Link href="/financial-data-tracking" legacyBehavior>
                <a className="text-lg font-bold hover:text-[#F8BD00]">Financial Data Tracking</a>
              </Link>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;

