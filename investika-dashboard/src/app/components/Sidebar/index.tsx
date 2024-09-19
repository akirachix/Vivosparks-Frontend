
import Link from 'next/link';
import { IoHome } from "react-icons/io5";
import { CiBank } from "react-icons/ci";
import { FaPiggyBank } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";

const Sidebar = () => {
  return (
    <div className="w-72 h-screen bg-[#00265B] text-white p-5 fixed">
      <div className="mb-5 text-center">
        <img src="/images/investika-logo.png" alt="Logo" className="max-w-xs mb-10 mx-auto"/>
      </div>
      <nav>
        <ul className="space-y-12 font-nunito">
          <li>
            <div className="flex items-center">
              <IoHome className="mr-4 text-2xl -mt-2"/>
              <Link href="/user-tracking-report" legacyBehavior>
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
      <div className="mt-96 ml-7 flex items-center">
        <IoIosLogOut className="mr-4 text-2xl"/>
        <Link href="/logout" legacyBehavior>
          <a className="text-lg font-bold hover:text-[#F8BD00]">Logout</a>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;

