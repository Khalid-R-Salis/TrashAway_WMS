import React, { useState, useEffect } from "react";
import SidebarAdmin from "../../components/SidebarAdmin.jsx";
import AdminPersonalInformation from "../adminpages/adminPersonalInformation.jsx";
import AdminNotificationPreferences from "../adminpages/adminNotificationPreferences.jsx";
import AdminSecurity from "../adminpages/adminSecuritySettings.jsx";
import formbg from "../../assets/formsbg.png";
import notificationdb from "../../assets/notificationdb.png";
import cancelIcon from "../../assets/close.svg";

const AdminSettings = () => {
  // Time and date state
  const [time, setTime] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  const [date, setDate] = useState({
    day: "1st",
    month: "Jan",
    year: 2023,
  });

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      const formatWithLeadingZero = (num) => (num < 10 ? `0${num}` : num);

      const ordinalSuffix = (day) => {
        if (day >= 11 && day <= 13) {
          return `${day}th`;
        }
        switch (day % 10) {
          case 1:
            return `${day}st`;
          case 2:
            return `${day}nd`;
          case 3:
            return `${day}rd`;
          default:
            return `${day}th`;
        }
      };

      setTime({
        hours: formatWithLeadingZero(now.getHours()),
        minutes: formatWithLeadingZero(now.getMinutes()),
        seconds: formatWithLeadingZero(now.getSeconds()),
      });

      setDate({
        day: ordinalSuffix(now.getDate()),
        month: now.toLocaleString("default", { month: "short" }),
        year: now.getFullYear(),
      });
    };

    const intervalId = setInterval(updateDateTime, 1000);
    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);

  // Handle showing notification dropdown
  const [showNotification, setShowNotification] = useState(false);
  const toggleNotification = () => {
    setShowNotification(!showNotification);
  };

  // Handle switching between sections
  const [activeSection, setActiveSection] = useState("personal");

  const renderSection = () => {
    switch (activeSection) {
      case "personal":
        return <AdminPersonalInformation />;
      case "notifications":
        return <AdminNotificationPreferences />;
      case "security":
        return <AdminSecurity />;
      default:
        return <AdminPersonalInformation />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarAdmin activePage="adminsettings" />

      {/* Main Content */}
      <main className="flex-1">
        <div className="flex justify-between items-center px-[32px] py-[12px] w-full bg-[#1E1E1E] h-20 relative">
          <h2 className="text-white font-Inter text-[20px] font-[600] tracking-[-0.4]">
            Admin Dashboard
          </h2>

          {/* Date and Time Display */}
          <div className="flex gap-4 items-center justify-center text-white font-Inter text-[16px] font-[500] p-2 border-gray-green/50 rounded-xl border-[1px]">
            <div>
              <span>{date.day}</span>-<span>{date.month}</span>-
              <span>{date.year}</span>
            </div>
            <div>
              <span>{time.hours}</span>:<span>{time.minutes}</span>:
              <span>{time.seconds}</span>
            </div>
          </div>

          <img
            src={notificationdb}
            alt="Notifications"
            className="cursor-pointer"
            onClick={toggleNotification}
          />
          {showNotification && (
            <>
              {/* Notification Dropdown */}
              <div
                className="fixed inset-0 bg-black opacity-50 z-10"
                onClick={toggleNotification}
              ></div>
              <div className="absolute right-[30px] mt-[23rem] w-[370px] bg-white p-6 rounded-lg shadow-sm z-10">
                <div className="flex justify-between items-center pb-[32px]">
                  <h3 className="text-[#1E1E1E] font-Inter text-[20px] font-semibold">
                    Notifications
                  </h3>
                  <img
                    src={cancelIcon}
                    alt="Close"
                    className="cursor-pointer right-[10px] top-[10px] h-4 w-4"
                    onClick={toggleNotification}
                  />
                </div>
                {/* Notification items */}
                <div className="flex justify-between items-center">
                  <div className="text-[#343A40] font-Inter text-[16px] font-medium">
                    Pick up completed
                  </div>
                  <div className="text-[#B9B9B9] font-Inter text-[12px] font-medium mb-5">
                    10/10/2024
                  </div>
                </div>
                <hr className="w-full border-b-[1px] border-[#E9E9E9] mb-4" />
                <div className="flex justify-between items-center">
                  <div className="text-[#343A40] font-Inter text-[16px] font-medium">
                    Pick up completed
                  </div>
                  <div className="text-[#B9B9B9] font-Inter text-[12px] font-medium mb-5">
                    10/10/2024
                  </div>
                </div>
                <hr className="w-full border-b-[1px] border-[#E9E9E9] mb-4" />
                <div className="flex justify-between items-center">
                  <div className="text-[#343A40] font-Inter text-[16px] font-medium">
                    Pick up completed
                  </div>
                  <div className="text-[#B9B9B9] font-Inter text-[12px] font-medium mb-5">
                    10/10/2024
                  </div>
                </div>
                <hr className="w-full border-b-[1px] border-[#E9E9E9] mb-4" />
                <div className="flex justify-between items-center">
                  <div className="text-[#343A40] font-Inter text-[16px] font-medium">
                    Pick up completed
                  </div>
                  <div className="text-[#B9B9B9] font-Inter text-[12px] font-medium mb-5">
                    10/10/2024
                  </div>
                </div>
                <hr className="w-full border-b-[1px] border-[#E9E9E9] mb-4" />
              </div>
            </>
          )}
        </div>
        <div
          className="bg-no-repeat bg-cover bg-center w-full h-full"
          style={{ backgroundImage: `url(${formbg})` }}
        >
          {/* Sidebar with settings options */}
          <div className="flex">
            <div className="w-1/4 p-6">
              <button
                onClick={() => setActiveSection("personal")}
                className={`block w-full px-[12px] py-[8px] text-[#1E1E1E] font-[500] text-[14px] rounded-[6px] ${
                  activeSection === "personal" ? "bg-[#B9B9B9]" : ""
                }`}
              >
                Personal Information
              </button>
              <button
                onClick={() => setActiveSection("notifications")}
                className={`block w-full px-[12px] py-[8px] text-[#1E1E1E] font-[500] text-[14px] rounded-[6px] ${
                  activeSection === "notifications" ? "bg-[#B9B9B9]" : ""
                }`}
              >
                Notification Preferences
              </button>
              <button
                onClick={() => setActiveSection("security")}
                className={`block w-full px-[12px] py-[8px] text-[#1E1E1E] font-[500] text-[14px] rounded-[6px] ${
                  activeSection === "security" ? "bg-[#B9B9B9]" : ""
                }`}
              >
                Security
              </button>
            </div>

            {/* Content section */}
            <div className="flex-1 pr-8  ">{renderSection()}</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminSettings;
