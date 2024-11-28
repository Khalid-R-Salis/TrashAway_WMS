import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import formbg from "../../assets/formsbg.png";
import notificationdb from "../../assets/notificationdb.png";
import cancelIcon from "../../assets/close.svg";
import SidebarAdmin from "../../components/SidebarAdmin";

// const data = [
//   {
//     id: "US001",
//     name: "John Joe",
//     pickups: 10,
//     phoneNumber: "08111111111",
//     category: "Hazardous",
//   },
//   {
//     id: "US002",
//     name: "Jane Doe",
//     pickups: 8,
//     phoneNumber: "08122222222",
//     category: "Organic",
//   },
//   {
//     id: "US003",
//     name: "Khalid Rabiu",
//     pickups: 12,
//     phoneNumber: "08133333333",
//     category: "Recyclable",
//   },
//   {
//     id: "US004",
//     name: "Khalid Rabiu",
//     pickups: 12,
//     phoneNumber: "08133333333",
//     category: "Recyclable",
//   },
//   {
//     id: "US005",
//     name: "Khalid Rabiu",
//     pickups: 12,
//     phoneNumber: "08133333333",
//     category: "Recyclable",
//   },
//   {
//     id: "US006",
//     name: "Khalid Rabiu",
//     pickups: 12,
//     phoneNumber: "08133333333",
//     category: "Recyclable",
//   },
//   {
//     id: "US007",
//     name: "Khalid Rabiu",
//     pickups: 12,
//     phoneNumber: "08133333333",
//     category: "Recyclable",
//   },
//   {
//     id: "US008",
//     name: "Khalid Rabiu",
//     pickups: 12,
//     phoneNumber: "08133333333",
//     category: "Recyclable",
//   },
//   {
//     id: "US009",
//     name: "Khalid Rabiu",
//     pickups: 12,
//     phoneNumber: "08133333333",
//     category: "Recyclable",
//   },
//   {
//     id: "US010",
//     name: "Khalid Rabiu",
//     pickups: 12,
//     phoneNumber: "08133333333",
//     category: "Recyclable",
//   },
// ];

const UserManagement = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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

  // start timer
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

  const toggleNotification = () => {
    setShowNotification(!showNotification);
  };

  // @desc: fetching all users
  const fetchUsersHandler = useCallback(async () => {
    const userSession = JSON.parse(localStorage.getItem("userSession"));
    const token = userSession?.token;

    setIsLoading(true);
    setErrors("");

    if (!token) return;

    try {
      const response = await fetch(
        "https://waste-mangement-backend-3qg6.onrender.com/api/admin/all-pickup",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok && data.error) {
        setIsLoading(false);
        throw new Error("Server Error. Please try again later");
      }

      if (data.message === "No users found") {
        setIsLoading(false);
        throw new Error("User orders not available.");
      }

      if (data.message === "No pick up requests found.") {
        setIsLoading(false);
        throw new Error("No pick up requests found at the moment.");
      }

      if (data.message === "jwt expired") {
        navigate("/login");
      }

      setUsers(data.updatedPickUpRequest);
      setErrors("");
      setIsLoading(false);
    } catch (error) {
      setUsers([]);
      setErrors(error.message);
      setIsLoading(false);
      console.log(error);
    }
  }, [navigate]);

  useEffect(() => {
    fetchUsersHandler();
  }, [fetchUsersHandler]);

  const rowsPerPage = 6;

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = users.slice(indexOfFirstRow, indexOfLastRow);

  const handleNextPage = () => {
    if (indexOfLastRow < users.length) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // @desc: showing error modal conditionally
  const showError = (
    <div className="absolute right-[35rem] bottom-[19rem] mt-[23rem] w-[370px] bg-[#549877] p-6 rounded-lg shadow-sm z-10">
      <div className="flex justify-between items-center pb-[32px]">
        <h3 className="text-white font-Inter text-[20px] font-semibold capitalize">
          {errors}
        </h3>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarAdmin activePage="userManagement" />
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
          className="bg-no-repeat bg-cover bg-center w-full h-full py-[2px] px-[5px]"
          style={{ backgroundImage: `url(${formbg})` }}
        >
          <h1 className=" text-[#1E1E1E] text-[24px] font-[600] tracking-[-0.48px] mt-3 ml-4">
            Pick up History
          </h1>
          <div className="mx-[18px] mt-[30px] bg-white shadow-md p-4 rounded-md">
            <table className="w-full">
              <thead>
                <tr className="font-sans text-[#8B909A] text-[13px] font-[500] px-0 py-2">
                  <th className="py-3 px-4 text-left">ID</th>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Pickups</th>
                  <th className="py-3 px-4 text-left">Phone Number</th>
                  <th className="py-3 px-4 text-left">Category</th>
                </tr>
              </thead>

              <tbody className="px-4 py-2 text-[#23272E] text-[15px] font-[400] font-sans">
                {currentRows.map((row, index) => (
                  <tr key={index} className="border-b hover:bg-gray-100">
                    <td className="py-3 px-4 text-left">{row.searchId}</td>
                    <td className="py-3 px-4 text-left">{row.user_name}</td>
                    <td className="py-3 px-4 text-left">{row.capacity}</td>
                    <td className="py-3 px-4 text-left">{row.phone}</td>
                    <td className="py-3 px-4 text-left">{row.category}</td>
                    <td className="py-3 px-4 text-center"></td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-between mt-4">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className={`px-4 py-2 border ${
                  currentPage === 1 ? "text-gray-400" : "text-gray-green"
                } hover:bg-gray-100`}
              >
                Previous
              </button>
              <button
                onClick={handleNextPage}
                disabled={indexOfLastRow >= users.length}
                className={`px-4 py-2 border ${
                  indexOfLastRow >= users.length
                    ? "text-gray-400"
                    : "text-gray-green"
                } hover:bg-gray-100`}
              >
                Next
              </button>
            </div>
          </div>
          {isLoading && !errors && (
            <div className="ml-[38rem] mt-[5rem] spinner-border text-[#549877] w-[40px] h-[40px] border-t-[#549877] border-4 border-solid  rounded-full animate-spin"></div>
          )}
          {!isLoading && errors && showError}
        </div>
      </main>
    </div>
  );
};

export default UserManagement;
