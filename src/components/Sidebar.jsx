import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import dashboarddb from "../assets/dashboarddb.png";
import settingdb from "../assets/settingdb.png";
import shopdb from "../assets/shopdb.png";
import logoutdb from "../assets/logoutdb.png";
import cartdb from "../assets/cartdb.png";
import notificationdb from "../assets/notificationdb.png";
import profiledb1 from "../assets/profiledb1.png";
import profiledb2 from "../assets/profiledb2.png";

const Sidebar = ({ activePage }) => {
  return (
    <>
      <div className=" flex justify-start items-start">
        <aside className="w-[328px] h-[100vh] bg-[#1E1E1E] text-[#FFF] font-Inter text-[16px] font-[500] p-[20px] flex flex-col justify-between items-start">
          <nav className="">
            <h2 className=" tracking-[4px] font-semibold">
              TRASH <span className=" text-green-600">AWAY</span> (W
              <span className=" text-green-600">M</span>S)
            </h2>
            {/* <img src={logo} alt="" /> */}
            <ul className=" flex flex-col justify-center items-start gap-[14px] pt-[32px]">
              <li>
                <div
                  className={`flex justify-start items-center gap-[16px] rounded-[4px] py-[12px] pl-[12px] w-[18rem] ${
                    activePage === "dashboard"
                      ? "bg-gray-green2"
                      : "hover:bg-gray-700"
                  }`}
                >
                  <img src={dashboarddb} alt="Dashboard Icon" />
                  <Link to="/dashboard">Dashboard</Link>
                </div>
              </li>
              <li>
                <div
                  className={`flex justify-start items-center gap-[16px] rounded-[4px] py-[12px] pl-[12px] w-[18rem] ${
                    activePage === "orders"
                      ? "bg-gray-green2"
                      : "hover:bg-gray-700"
                  }`}
                >
                  <img src={cartdb} alt="Dashboard Icon" />
                  <Link to="/orders">Orders</Link>
                </div>
              </li>
              <li>
                <div
                  className={`flex justify-start items-center gap-[16px] rounded-[4px] py-[12px] pl-[12px] w-[18rem] ${
                    activePage === "collection"
                      ? "bg-gray-green2"
                      : "hover:bg-gray-700"
                  }`}
                >
                  <img src={shopdb} alt="Dashboard Icon" />

                  <Link to="/collection">Collection Point</Link>
                </div>
              </li>
            </ul>
          </nav>
          {/* ------------------------------------------------------------------- */}
          <nav>
            <ul className=" flex flex-col justify-center items-start gap-[14px] pt-[32px]">
              <li>
                <div
                  className={`flex justify-start items-center gap-[16px] rounded-[4px] py-[12px] pl-[12px] w-[18rem] ${
                    activePage === "loginhome"
                      ? "bg-gray-green2"
                      : "hover:bg-gray-700"
                  }`}
                >
                  <img src={logoutdb} alt="Dashboard Icon" />
                  <Link to="/loginhome">Log Out</Link>
                </div>
              </li>
              <li>
                <div
                  className={`flex justify-start items-center gap-[16px] rounded-[4px] py-[12px] pl-[12px] w-[18rem] ${
                    activePage === "support"
                      ? "bg-gray-green2"
                      : "hover:bg-gray-700"
                  }`}
                >
                  <img src={settingdb} alt="Dashboard Icon" />
                  <Link to="/support">Support</Link>
                </div>
              </li>
              <li>
                <div
                  className={`flex justify-start items-center gap-[16px] rounded-[4px] py-[12px] pl-[12px] w-[18rem] ${
                    activePage === "settings"
                      ? "bg-gray-green2"
                      : "hover:bg-gray-700"
                  }`}
                >
                  <img src={profiledb1} alt="Dashboard Icon" />
                  <Link to="/settings">
                    <h2 className=" text-[12px] font-[400]">Khalid Rabiu</h2>
                    <p className=" text-[12px] font-[400]">
                      khalidrabiu@gmail.com
                    </p>
                  </Link>
                </div>
              </li>
            </ul>
          </nav>
        </aside>
      </div>
    </>
  );
};

export default Sidebar;
