import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import formbg from "../../assets/formsbg.png";
import notificationdb from "../../assets/notificationdb.png";
import cancelIcon from "../../assets/close.svg";

const Support = () => {
  const [showNotification, setShowNotification] = useState(false);

  const toggleNotification = () => {
    setShowNotification(!showNotification);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar activePage="support" />
      <main className="flex-1">
        <div className="flex justify-between items-center px-[32px] py-[12px] w-full bg-[#1E1E1E] h-20 relative">
          <h2 className="text-white font-Inter text-[20px] font-[600] tracking-[-0.4]">
          Dashboard
          </h2>
          <img
            src={notificationdb}
            alt="Notifications"
            className="cursor-pointer"
            onClick={toggleNotification}
          />

          {/* Notification Dropdown */}
          {showNotification && (
            <>
             {/* Black overlay */}
             <div className="fixed inset-0 bg-black opacity-50 z-10" onClick={toggleNotification}></div>
            <div className="absolute right-[30px] mt-[23rem]  w-[370px] bg-white p-6 rounded-lg shadow-sm z-10">
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

              <div className=" flex justify-between items-center">
                <div className="text-[#343A40] font-Inter text-[16px] font-medium">
                  Pick up completed
                </div>
                <div className="text-[#B9B9B9] font-Inter text-[12px] font-medium mb-5">
                  10/10/2024
                </div>
              </div>
              <hr className="w-full border-b-[1px] border-[#E9E9E9]  mb-4" />

              <div className=" flex justify-between items-center">
                <div className="text-[#343A40] font-Inter text-[16px] font-medium">
                  Pick up completed
                </div>
                <div className="text-[#B9B9B9] font-Inter text-[12px] font-medium mb-5">
                  10/10/2024
                </div>
              </div>
              <hr className="w-full border-b-[1px] border-[#E9E9E9]  mb-4" />

              <div className=" flex justify-between items-center">
                <div className="text-[#343A40] font-Inter text-[16px] font-medium">
                  Pick up completed
                </div>
                <div className="text-[#B9B9B9] font-Inter text-[12px] font-medium mb-5">
                  10/10/2024
                </div>
              </div>
              <hr className="w-full border-b-[1px] border-[#E9E9E9]  mb-4" />

              <div className=" flex justify-between items-center">
                <div className="text-[#343A40] font-Inter text-[16px] font-medium">
                  Pick up completed
                </div>
                <div className="text-[#B9B9B9] font-Inter text-[12px] font-medium mb-5">
                  10/10/2024
                </div>
              </div>
              <hr className="w-full border-b-[1px] border-[#E9E9E9]  mb-4" />

              {/* {[...Array(4)].map((_, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center my-4"
                >
                  <div className="text-[#343A40] font-Inter text-[16px] font-medium">
                    Pick up completed
                  </div>
                  <div className="text-[#B9B9B9] font-Inter text-[12px] font-medium">
                    10/10/2024
                  </div>
                  {idx < 3 && (
                    <hr className="w-full border-b-[1px] border-[#E9E9E9] my-2" />
                  )}
                </div>
              ))} */}
            </div>
            </>
          )}
        </div>

        <div
          className="bg-no-repeat bg-cover bg-center w-full h-full flex justify-center items-center"
          style={{ backgroundImage: `url(${formbg})` }}
        >
          {/* CONTENT HERE */}
          On development
        </div>
      </main>
    </div>
  );
};

export default Support;



