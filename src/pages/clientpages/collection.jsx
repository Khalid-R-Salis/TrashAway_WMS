import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import formbg from "../../assets/formsbg.png";
import notificationdb from "../../assets/notificationdb.png";
import cancelIcon from "../../assets/close.svg";
import search from "../../assets/Search.png";

const Collection = () => {
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

  const toggleNotification = () => {
    setShowNotification(!showNotification);
  };

  // collections logic
  const [collections] = useState([
    {
      id: 1,
      name: "Yusuf Sale",
      location: "Tarauni",
      number: 8032030303,
      time: "8:00am-6:00pm",
      category: "Hazardous",
    },
    {
      id: 2,
      name: "Adam Naiya",
      location: "G/kaya",
      number: 8032030303,
      time: "8:00am-5:00pm",
      category: "Recyclable",
    },
    {
      id: 3,
      name: "Musa Isa",
      location: "G/kaya",
      number: 8032030303,
      time: "8:00am-5:00pm",
      category: "Organic",
    },
    {
      id: 4,
      name: "John Akawu",
      location: "Tarauni",
      number: 8032030303,
      time: "8:00am-5:00pm",
      category: "Organic",
    },
    {
      id: 5,
      name: "Kabeer Ayub",
      location: "G/kaya",
      number: 8032030303,
      time: "8:00am-5:00pm",
      category: "Organic",
    },
    {
      id: 6,
      name: "Edgon Akpo",
      location: "Tarauni",
      number: 8032030303,
      time: "8:00am-6:00pm",
      category: "Hazardous",
    },
    {
      id: 7,
      name: "L. Umar",
      location: "Dan Agundi",
      number: 8032030303,
      time: "8:00am-6:00pm",
      category: "Recyclable",
    },
    {
      id: 8,
      name: "Sageer Kamis",
      location: "G/kaya",
      number: 8032030303,
      time: "8:00am-5:00pm",
      category: "Recyclable",
    },
    {
      id: 9,
      name: "Sunday Devine",
      location: "Tarauni",
      number: 8032030303,
      time: "8:00am-5:00pm",
      category: "Hazardous",
    },
    {
      id: 10,
      name: "Faith Akanji",
      location: "G/kaya",
      number: 8032030303,
      time: "8:00am-6:00pm",
      category: "Recyclable",
    },
    {
      id: 11,
      name: "Bammali Babawo",
      location: "YUMSUK M/C",
      number: 8032030303,
      time: "8:00am-4:00pm",
      category: "Recyclable",
    },
    {
      id: 12,
      name: "Garba Abubakar",
      location: "Tarauni",
      number: 8032030303,
      time: "8:00am-4:00pm",
      category: "Hazardous",
    },
    {
      id: 13,
      name: "M. Ahmad",
      location: "Dan Agundi",
      number: 8032030303,
      time: "8:00am-4:00pm",
      category: "Organic",
    },
    {
      id: 14,
      name: "Abdullahi Sani",
      location: "Dan Agundi",
      number: 8032030303,
      time: "8:00am-5:00pm",
      category: "Recyclable",
    },
    {
      id: 15,
      name: "Jerry Olugbumi",
      location: "Shaka",
      number: 8032030303,
      time: "8:00am-6:00pm",
      category: "Recyclable",
    },
    {
      id: 16,
      name: "Khalifa Muhammad",
      location: "Shaka",
      number: 8032030303,
      time: "8:00am-6:00pm",
      category: "Hazardous",
    },
    {
      id: 17,
      name: "Abbas Salo",
      location: "Tarauni",
      number: 8032030303,
      time: "8:00am-6:00pm",
      category: "Organic",
    },
  ]);
  const [selectedCollectionId, setSelectedCollectionId] = useState(null);

  const [filterStatus, setFilterStatus] = useState("All");

  const filteredCollections = collections.filter((collection) => {
    if (filterStatus === "All") return true;
    return collection.status === filterStatus;
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const collectionsPerPage = 6;

  const indexOfLastCollection = currentPage * collectionsPerPage;
  const indexOfFirstCollection = indexOfLastCollection - collectionsPerPage;
  const currentCollections = filteredCollections.slice(
    indexOfFirstCollection,
    indexOfLastCollection
  );

  // Calculate total pages
  const totalPages = Math.ceil(filteredCollections.length / collectionsPerPage);

  // Navigate to next page
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Navigate to previous page
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar activePage="collection" />
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
              </div>
            </>
          )}
        </div>

        <div
          className="bg-no-repeat bg-cover bg-center w-full h-full"
          style={{ backgroundImage: `url(${formbg})` }}
        >
          {/* CONTENT HERE */}
          <div className=" flex justify-between items-center px-5 py-2">
            <h1 className=" text-[#1E1E1E] text-[24px] font-Inter font-[600] tracking-[-0.48px]">
              Collection Points
            </h1>
            <input
              type="number"
              min={1}
              max={9999}
              maxLength={4}
              placeholder="Search by Location"
              className="px-[16px] py-[8px] outline-none rounded-[4px] w-[200px] h-[37px] bg-white bg-no-repeat bg-[20px_center] bg-[length:20px_20px] pl-[48px] pr-[16px] shadow-[0px_0px_3px_0px_rgba(0,0,0,0.10)]"
              style={{ backgroundImage: `url(${search})` }}
              onInput={(e) => {
                if (e.target.value.length > 4) {
                  e.target.value = e.target.value.slice(0, 4);
                }
              }}
            />
          </div>
          <hr className="mx-[20px] mt-2 bg-[#666666] mb-[50px] z-10" />

          {/* Collection Table */}
          <div className="RecentPickUpCollections mt-4 mx-[20px]">
            <table className="min-w-full table-auto bg-white shadow-md rounded-md py-5">
              <thead>
                <tr>
                  <th className="font-sans text-[#8B909A] text-[13px] font-[500] px-0 py-2">
                    NO.
                  </th>
                  <th className="font-sans text-[#8B909A] text-[13px] font-[500] px-0 py-2">
                    NAME
                  </th>
                  <th className="font-sans text-[#8B909A] text-[13px] font-[500] px-0 py-2">
                    LOCATION
                  </th>
                  <th className="font-sans text-[#8B909A] text-[13px] font-[500] px-0 py-2 uppercase">
                    PHONE NUMBER
                  </th>
                  <th className="font-sans text-[#8B909A] text-[13px] font-[500] px-0 py-2 uppercase">
                    COLLECTION TIME
                  </th>
                  <th className="font-sans text-[#8B909A] text-[13px] font-[500] px-0 py-2 uppercase">
                    CATEGORY
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentCollections.map((collection) => (
                  <tr key={collection.id} className="border-b">
                    <td className="px-[45px] py-4 text-[#23272E] text-[16px] font-[400] font-sans">
                      {collection.id}
                    </td>
                    <td className="px-[45px] py-4 text-[#23272E] text-[16px] font-[600] font-sans">
                      {collection.name}
                    </td>
                    <td className="px-[45px] py-4 text-[#23272E] text-[16px] font-[400] font-sans">
                      {collection.location}
                    </td>
                    <td className="px-[45px] py-4 text-[#23272E] text-[16px] font-[400] font-sans">
                      {collection.number}
                    </td>
                    <td className="px-[45px] py-4 text-[#23272E] text-[16px] font-[400] font-sans">
                      {collection.time}
                    </td>
                    <td className="px-[45px] py-4 text-[#23272E] text-[16px] font-[400] font-sans">
                      {collection.category}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Pagination Content here */}
        <div className="flex justify-around items-center">
          <button
            onClick={handlePrevious}
            className="bg-gray-200 text-gray-700 px-4 py-2 mt-[-350px] rounded-md hover:bg-gray-300"
            disabled={currentPage === 1} // Disable if on the first page
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="bg-gray-200 text-gray-700 px-4 py-2 mt-[-350px] rounded-md hover:bg-gray-300"
            disabled={currentPage === totalPages} // Disable if on the last page
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
};

export default Collection;
