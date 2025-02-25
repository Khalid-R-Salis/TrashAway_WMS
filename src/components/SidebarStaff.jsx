import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dashboarddb from "../assets/dashboarddb.png";
import settingdb from "../assets/settingdb.png";
import shopdb from "../assets/shopdb.png";
import logoutdb from "../assets/logoutdb.png";
import cartdb from "../assets/cartdb.png";
import profiledb1 from "../assets/profiledb1.png";
import trackingicon from "../assets/trackingicon.png";

// eslint-disable-next-line react/prop-types
const Sidebar = ({ activePage }) => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    const userSession = JSON.parse(localStorage.getItem("userSession"));
    setUserDetails({
      name: userSession.name,
      email: userSession.email,
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
                    activePage === "staffdashboard"
                      ? "bg-gray-green2"
                      : "hover:bg-gray-700"
                  }`}
                >
                  <img src={dashboarddb} alt="Icon" />
                  <Link to="/staffdashboard">Dashboard</Link>
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
                  <img src={cartdb} alt="Icon" />
                  <Link to="/stafforders">Allocated Orders</Link>
                </div>
              </li>
              <li>
                <div
                  className={`flex justify-start items-center gap-[16px] rounded-[4px] py-[12px] pl-[12px] w-[18rem] ${
                    activePage === "staffvehicleTracking"
                      ? "bg-gray-green2"
                      : "hover:bg-gray-700"
                  }`}
                >
                  <img src={trackingicon} alt="Icon" />

                  <Link to="/staffvehicletracking">Client Tracking</Link>
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
                  <Link to="/staffsupport">Support</Link>
                </div>
              </li>
              <li>
                <div
                  className={`flex justify-start items-center gap-[16px] rounded-[4px] py-[12px] pl-[12px] w-[18rem] ${
                    activePage === "referral"
                      ? "bg-gray-green2"
                      : "hover:bg-gray-700"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-[25px] w-[25px] text-white fill-current"
                    viewBox="0 0 640 512"
                    fill="currentColor"
                  >
                    <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3zM609.3 512l-137.8 0c5.4-9.4 8.6-20.3 8.6-32l0-8c0-60.7-27.1-115.2-69.8-151.8c2.4-.1 4.7-.2 7.1-.2l61.4 0C567.8 320 640 392.2 640 481.3c0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z" />
                  </svg>

                  <Link to="/staffreferral">Referral</Link>
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
                  <img src={profiledb1} alt="Icon" />
                  <Link to="/staffsettings">
                    <h2 className=" text-[12px] font-[400]">
                      {userDetails.name}
                    </h2>
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

export default Sidebar;
