import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import schedulingicon from "../assets/schedulingicon.png";
import stafficon from "../assets/stafficon.png";
import umicon from "../assets/umicon.png";
import home2 from "../assets/home2.png";
import wasterbinicon from "../assets/wasterbinicon.png";
import trackingicon from "../assets/trackingicon.png";

import settingdb from "../assets/settingdb.png";
import logoutdb from "../assets/logoutdb.png";
import profiledb1 from "../assets/profiledb1.png";

// eslint-disable-next-line react/prop-types
const SidebarAdmin = ({ activePage }) => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: ''
  });

  useEffect(() => {
    const userSession = JSON.parse(localStorage.getItem("userSession"));
    setUserDetails({
      name: userSession.name,
      email: userSession.email
    });
  }, [userDetails.name, userDetails.email]);

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
                    activePage === "adminDashboard"
                      ? "bg-gray-green2"
                      : "hover:bg-gray-700"
                  }`}
                >
                  <img src={home2} alt="Icon" />
                  <Link to="/admindashboard">Dashboard</Link>
                </div>
              </li>

              <li>
                <div
                  className={`flex justify-start items-center gap-[16px] rounded-[4px] py-[12px] pl-[12px] w-[18rem] ${
                    activePage === "wasteManagment"
                      ? "bg-gray-green2"
                      : "hover:bg-gray-700"
                  }`}
                >
                  <img src={wasterbinicon} alt="Icon" />
                  <Link to="/wastemanagment">Waste Managment</Link>
                </div>
              </li>

              <li>
                <div
                  className={`flex justify-start items-center gap-[16px] rounded-[4px] py-[12px] pl-[12px] w-[18rem] ${
                    activePage === "vehicleTracking"
                      ? "bg-gray-green2"
                      : "hover:bg-gray-700"
                  }`}
                >
                  <img src={trackingicon} alt="Icon" />

                  <Link to="/vehicletracking">Vehicle Tracking</Link>
                </div>
              </li>

              <li>
                <div
                  className={`flex justify-start items-center gap-[16px] rounded-[4px] py-[12px] pl-[12px] w-[18rem] ${
                    activePage === "userManagement"
                      ? "bg-gray-green2"
                      : "hover:bg-gray-700"
                  }`}
                >
                  <img src={umicon} alt="Icon" />
                  <Link to="/usermanagment">User Management</Link>
                </div>
              </li>

              <li>
                <div
                  className={`flex justify-start items-center gap-[16px] rounded-[4px] py-[12px] pl-[12px] w-[18rem] ${
                    activePage === "staffs"
                      ? "bg-gray-green2"
                      : "hover:bg-gray-700"
                  }`}
                >
                  <img src={stafficon} alt="Icon" />
                  <Link to="/staffs">Staffs</Link>
                </div>
              </li>

              <li>
                <div
                  className={`flex justify-start items-center gap-[16px] rounded-[4px] py-[12px] pl-[12px] w-[18rem] ${
                    activePage === "scheduling"
                      ? "bg-gray-green2"
                      : "hover:bg-gray-700"
                  }`}
                >
                  <img src={schedulingicon} alt="Icon" />
                  <Link to="/scheduling">Scheduling</Link>
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
                  <img src={logoutdb} alt="Icon" />
                  <Link to="/">Log Out</Link>
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
                  <img src={settingdb} alt="Icon" />
                  <Link to="/adminsupport">Support</Link>
                </div>
              </li>

              <li>
                <div
                  className={`flex justify-start items-center gap-[16px] rounded-[4px] py-[12px] pl-[12px] w-[18rem] ${
                    activePage === "adminsettings"
                      ? "bg-gray-green2"
                      : "hover:bg-gray-700"
                  }`}
                >
                  <img src={profiledb1} alt="Icon" />
                  <Link to="/adminsettings">
                    <h2 className=" text-[12px] font-[400]">{userDetails.name}</h2>
                    <p className=" text-[12px] font-[400]">
                    {userDetails.email}
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

export default SidebarAdmin;
