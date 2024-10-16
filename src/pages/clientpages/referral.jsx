import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import formbg from "../../assets/formsbg.png";
import closereferral from "../../assets/close.svg";
import referpic from "../../assets/refer.png";
import refercopy from "../../assets/copy.svg";
import facebookicon from "../../assets/facebookrf.svg";
import twittericon from "../../assets/xrf.svg";
import whatsappicon from "../../assets/whatsapprf.svg";
import notificationdb from "../../assets/notificationdb.png";
import cancelIcon from "../../assets/close.svg";

const Referral = () => {
  // start timer
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

  // end timer

  const [showNotification, setShowNotification] = useState(false);
  const url = "https://trash-away.vercel.app";

  const copyText = () => {
    const tempInput = document.createElement("input");
    tempInput.value = url;
    document.body.appendChild(tempInput);
    tempInput.select();
    tempInput.setSelectionRange(0, 99999);
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    alert(`Copied: ${url}`);
  };

  const toggleNotification = () => {
    setShowNotification(!showNotification);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar activePage="referral" />
      <main className="flex-1">
        <div className="flex justify-between items-center px-[32px] py-[12px] w-full bg-[#1E1E1E] h-20 relative">
          <h2 className="text-white font-Inter text-[20px] font-[600] tracking-[-0.4]">
            Dashboard
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
          {/* Notification Dropdown */}
          {showNotification && (
            <>
              {/* Black overlay */}
              <div
                className="fixed inset-0 bg-black opacity-50 z-10"
                onClick={toggleNotification}
              ></div>
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
          <div className="w-[400px] shadow-md p-5 rounded-lg bg-white">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Refer A Friend</h3>
              <a href="dashboard">
                <img
                  className="cursor-pointer h-[15px]"
                  src={closereferral}
                  alt="Close"
                />
              </a>
            </div>
            <hr className="my-4" />

            <div className="text-center">
              <img
                className="mx-auto my-10 h-[120px]"
                src={referpic}
                alt="Refer"
              />

              <div className="flex justify-between items-center bg-gray-200 border border-green-700 rounded-lg p-4 mt-10">
                <div id="textToCopy" className="text-sm">
                  {url}
                </div>
                <img
                  onClick={copyText}
                  className="cursor-pointer h-[20px]"
                  src={refercopy}
                  alt="Copy"
                />
              </div>

              <h4 id="copy" className="text-gray-500 text-center mt-2">
                Click to copy URL
              </h4>
              <h4
                id="share"
                className="text-black text-center font-medium mt-[45px]"
              >
                Share
              </h4>

              <div className="flex justify-center items-center gap-8 mt-4">
                <a href="https://twitter.com">
                  <img
                    className="h-[20px] rounded p-1"
                    src={twittericon}
                    alt="Twitter"
                  />
                </a>
                <a href="https://web.whatsapp.com/">
                  <img
                    className="h-[25px] rounded p-1"
                    src={whatsappicon}
                    alt="WhatsApp"
                  />
                </a>
                <a href="https://www.facebook.com/">
                  <img
                    className="h-[25px] w-[25px] rounded p-1"
                    src={facebookicon}
                    alt="Facebook"
                  />
                </a>
              </div>
            </div>

            <div className="mt-6 text-center">
              <h4 className="text-sm">
                Any question(s)? Email:{" "}
                <a
                  href="mailto:trashaway@gmail.com"
                  className="text-gray-green"
                >
                  trashaway@gmail.com
                </a>
              </h4>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Referral;
