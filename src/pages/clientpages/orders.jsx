import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import formbg from "../../assets/formsbg.png";
import notificationdb from "../../assets/notificationdb.png";
import cancelIcon from "../../assets/close.svg";
import search from "../../assets/Search.png";

const Orders = () => {
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
    return () => clearInterval(intervalId);
  }, []);

  // end timer

  const [showNotification, setShowNotification] = useState(false);
  const toggleNotification = () => {
    setShowNotification(!showNotification);
  };

  // Orders logic
  const [orders, setOrders]= useState([
    {
      id: 1001,
      date: "7 July 2024",
      items: 20,
      category: "Recyclable",
      status: "Pending",
    },
    {
      id: 1002,
      date: "7 July 2024",
      items: 10,
      category: "Recyclable",
      status: "Pending",
    },
    {
      id: 1003,
      date: "7 July 2024",
      items: 18,
      category: "Hazardous",
      status: "Pending",
    },
    {
      id: 1004,
      date: "7 July 2024",
      items: 20,
      category: "Organic",
      status: "Pending",
    },
    {
      id: 1005,
      date: "7 July 2024",
      items: 20,
      category: "Organic",
      status: "Completed",
    },
    {
      id: 1006,
      date: "7 July 2024",
      items: 20,
      category: "Organic",
      status: "Completed",
    },
    {
      id: 1007,
      date: "7 July 2024",
      items: 20,
      category: "Organic",
      status: "Completed",
    },
    {
      id: 1008,
      date: "7 July 2024",
      items: 20,
      category: "Organic",
      status: "Completed",
    },
    {
      id: 1009,
      date: "7 July 2024",
      items: 20,
      category: "Organic",
      status: "Completed",
    },
    {
      id: 1010,
      date: "7 July 2024",
      items: 20,
      category: "Organic",
      status: "Pending",
    },
    {
      id: 1011,
      date: "7 July 2024",
      items: 20,
      category: "Organic",
      status: "Completed",
    },
    {
      id: 1012,
      date: "7 July 2024",
      items: 20,
      category: "Organic",
      status: "Completed",
    },
    {
      id: 1013,
      date: "7 July 2024",
      items: 20,
      category: "Organic",
      status: "Completed",
    },   {
      id: 1014,
      date: "7 July 2024",
      items: 20,
      category: "Organic",
      status: "Completed",
    },
    {
      id: 1015,
      date: "7 July 2024",
      items: 20,
      category: "Organic",
      status: "Completed",
    },   {
      id: 1016,
      date: "7 July 2024",
      items: 20,
      category: "Organic",
      status: "Pending",
    },
    {
      id: 1017,
      date: "7 July 2024",
      items: 20,
      category: "Organic",
      status: "Completed",
    },
    {
      id: 1018,
      date: "7 July 2024",
      items: 20,
      category: "Organic",
      status: "Completed",
    },
    {
      id: 1019,
      date: "7 July 2024",
      items: 20,
      category: "Organic",
      status: "Completed",
    },    {
      id: 1020,
      date: "7 July 2024",
      items: 20,
      category: "Organic",
      status: "Pending",
    },

  ]);

  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const handleDelete = (id) => {
    const filteredOrders = orders.filter((order) => order.id !== id);
    setOrders(filteredOrders);
  };

  const [filterStatus, setFilterStatus] = useState("All");


const filteredOrders = orders.filter((order) => {
  if (filterStatus === "All") return true;
  return order.status === filterStatus;
});
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 6;


  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);


  // Calculate total pages
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

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
      <Sidebar activePage="orders" />
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
          className="bg-no-repeat bg-cover bg-center w-full h-full"
          style={{ backgroundImage: `url(${formbg})` }}
        >
          {/* CONTENT HERE */}
          <div className=" flex justify-between items-center px-5 py-2">
            <h1 className=" text-[#1E1E1E] text-[24px] font-Inter font-[600] tracking-[-0.48px]">
              Orders
            </h1>
            <input
              type="number"
              min={1}
              max={9999}
              maxLength={4}
              placeholder="Search by ID"
              className="px-[16px] py-[8px] outline-none rounded-[4px] w-[200px] h-[37px] bg-white bg-no-repeat bg-[20px_center] bg-[length:20px_20px] pl-[48px] pr-[16px] shadow-[0px_0px_3px_0px_rgba(0,0,0,0.10)]"
              style={{ backgroundImage: `url(${search})` }}
              onInput={(e) => {
                if (e.target.value.length > 4) {
                  e.target.value = e.target.value.slice(0, 4);
                }
              }}
            />
          </div>

          {/* Orders Filter */}
          <div className=" flex justify-start items-center gap-4 pl-5 mt-[32px]">
            <h2
              className={`cursor-pointer text-[#666] font-sans text-[15px] font-[400] ${
                filterStatus === "Completed"
                  ? "border-b-2 border-gray-green"
                  : ""
              }`}
              onClick={() => setFilterStatus("Completed")}
            >
              Confirmed
            </h2>

            <h2
              className={`cursor-pointer text-[#666] font-sans text-[15px] font-[400] ${
                filterStatus === "Pending"
                  ? "border-b-2 border-gray-green z-10"
                  : ""
              }`}
              onClick={() => setFilterStatus("Pending")}
            >
              Pending
            </h2>

            <h2
              className={`cursor-pointer text-[#666] font-sans text-[15px] font-[400] ${
                filterStatus === "All" ? "border-b-2 border-gray-green" : ""
              }`}
              onClick={() => setFilterStatus("All")}
            >
              All
            </h2>
          </div>

          <hr className="mx-[20px] mt-2 bg-[#666666] mb-[50px] z-10" />

          {/* Orders Table */}
          <div className="RecentPickUpOrders mt-4 mx-[20px]">
            <table className="min-w-full table-auto bg-white shadow-md rounded-md py-5">
              <thead>
                <tr>
                  <th className="font-sans text-[#8B909A] text-[13px] font-[500] px-0 py-2">
                    ID
                  </th>
                  <th className="font-sans text-[#8B909A] text-[13px] font-[500] px-0 py-2">
                    DATE
                  </th>
                  <th className="font-sans text-[#8B909A] text-[13px] font-[500] px-0 py-2">
                    NUMBER OF ITEMS
                  </th>
                  <th className="font-sans text-[#8B909A] text-[13px] font-[500] px-0 py-2 uppercase">
                    category
                  </th>
                  <th className="font-sans text-[#8B909A] text-[13px] font-[500] px-0 py-2 uppercase">
                    Status
                  </th>
                  <th className="px-0 py-2"></th>
                </tr>
              </thead>
              <tbody>
              {currentOrders.map((order) => (
    <tr key={order.id} className="border-b">
                    <td className="px-[45px] py-2 text-[#23272E] text-[15px] font-[400] font-sans">{order.id}</td>
                    <td className="px-[45px] py-2 text-[#23272E] text-[15px] font-[400] font-sans">{order.date}</td>
                    <td className="px-[45px] py-2 text-[#23272E] text-[15px] font-[400] font-sans">{order.items}</td>
                    <td className="px-[45px] py-2 text-[#23272E] text-[15px] font-[400] font-sans">{order.category}</td>
                    <td className="px-[45px] py-2 text-[#23272E] text-[15px] font-[400] font-sans">
                      {order.status === "Pending" ? (
                        <span className="text-yellow-500 bg-yellow-50 p-1">
                          Pending
                        </span>
                      ) : (
                        <span className="text-green-500 bg-green-50 p-1">
                          Completed
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {order.status === "Pending" && (
                        <div className="relative">
                          <button
                            onClick={() => setSelectedOrderId(order.id)}
                            className="text-gray-500"
                          >
                            &#x22EE;
                          </button>
                          {selectedOrderId === order.id && (
                            <div className="absolute right-0 mt-2 w-[100px] bg-white shadow-md border border-gray-200">
                              <button
                                onClick={() => handleDelete(order.id)}
                                className="w-full text-red-500 py-2 hover:bg-gray-100"
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      )}
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
      disabled={currentPage === 1}
    >
      Previous
    </button>
    <button
      onClick={handleNext}
      className="bg-gray-200 text-gray-700 px-4 py-2 mt-[-350px] rounded-md hover:bg-gray-300"
      disabled={currentPage === totalPages}
    >
      Next
    </button>
    </div>
      </main>
     
    </div>

    
  );
};

export default Orders;
