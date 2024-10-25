import React, { useState, useEffect } from "react";
import formbg from "../../assets/formsbg.png";
import notificationdb from "../../assets/notificationdb.png";
import cancelIcon from "../../assets/close.svg";
import search from "../../assets/Search.png";
import SidebarAdmin from "../../components/SidebarAdmin";

const WasteManagment = () => {
  // Start timer
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

  // Notification logic
  const [showNotification, setShowNotification] = useState(false);
  const toggleNotification = () => {
    setShowNotification(!showNotification);
  };

  // Orders logic
  const [orders, setOrders] = useState([
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
      items: 8,
      category: "Recyclable",
      status: "Pending",
    },
    {
      id: 1004,
      date: "7 July 2024",
      items: 4,
      category: "Hazardous",
      status: "Completed",
    },
    {
      id: 1005,
      date: "7 July 2024",
      items: 16,
      category: "Organic",
      status: "Completed",
    },
    {
      id: 1006,
      date: "7 July 2024",
      items: 18,
      category: "Hazardous",
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
      category: "Recyclable",
      status: "Pending",
    },
    {
      id: 1009,
      date: "7 July 2024",
      items: 10,
      category: "Recyclable",
      status: "Pending",
    },
    {
      id: 1010,
      date: "7 July 2024",
      items: 8,
      category: "Recyclable",
      status: "Pending",
    },
    {
      id: 1011,
      date: "7 July 2024",
      items: 4,
      category: "Hazardous",
      status: "Completed",
    },
    {
      id: 1012,
      date: "7 July 2024",
      items: 16,
      category: "Organic",
      status: "Completed",
    },
    {
      id: 1013,
      date: "7 July 2024",
      items: 18,
      category: "Hazardous",
      status: "Completed",
    },
    {
      id: 1014,
      date: "7 July 2024",
      items: 20,
      category: "Organic",
      status: "Completed",
    },
  ]);

  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Allocation form logic
  const [allocationDetails, setAllocationDetails] = useState({
    location: "",
    items: "",
    category: "",
    contactNumber: "",
    driver: "",
  });

  const handleInputChange = (e) => {
    setAllocationDetails({
      ...allocationDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Allocation Details Submitted: ", allocationDetails);
    setShowForm(false);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  const handleAllocate = (id) => {
    setSelectedOrderId(id);
    setShowForm(true);
  };

  // Orders filtering
  const [filterStatus, setFilterStatus] = useState("All");

  const filteredOrders = orders.filter((order) => {
    if (filterStatus === "All") return true;
    return order.status === filterStatus;
  });

  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 6;

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarAdmin activePage="wasteManagment" />
      <main className="flex-1">
        <div className="flex justify-between items-center px-[32px] py-[12px] w-full bg-[#1E1E1E] h-20 relative">
          <h2 className="text-white font-Inter text-[20px] font-[600] tracking-[-0.4]">
            Admin Dashboard
          </h2>

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
          <div className="flex justify-between items-center px-5 py-2">
            <h1 className="text-[#1E1E1E] text-[24px] font-Inter font-[600] tracking-[-0.48px]">
            Pick up Requests
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

          <div className="flex justify-start items-center gap-4 pl-5 mt-[32px]">
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

            
          </div>
          <hr className=" h-3 w-full" />

          {/* Orders Table */}
          <div className="mx-[18px] mt-[30px] bg-white shadow-md p-4 rounded-md">
            <table className="w-full">
              <thead>
                <tr className="font-sans text-[#8B909A] text-[13px] font-[500] px-0 py-2">
                  <th className="py-3 px-4 text-left">Order ID</th>
                  <th className="py-3 px-4 text-left">Date</th>
                  <th className="py-3 px-4 text-left">No of items</th>
                  <th className="py-3 px-4 text-left">Category</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className=" px-4 py-2 text-[#23272E] text-[15px] font-[400] font-sans">
                {currentOrders.map((order) => (
                  <tr key={order.id} className="border-b">
                    <td className="py-3 px-4 text-left">{order.id}</td>
                    <td className="py-3 px-4 text-left">{order.date}</td>
                    <td className="py-3 px-4 text-left">{order.items}</td>
                    <td className="py-3 px-4 text-left">{order.category}</td>
                    <td className="py-3 px-4 text-left">{order.status}</td>
                    <td className="py-3 px-4 text-center">
                      {order.status === "Pending" && (
                        <button
                          className="text-gray-green underline font-semibold tracking-wide"
                          onClick={() => handleAllocate(order.id)}
                        >
                          Allocate
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-between items-center py-4">
              <button
                className={`${
                  currentPage === 1 ? "text-gray-400" : "text-gray-green"
                }`}
                disabled={currentPage === 1}
                onClick={handlePrevious}
              >
                Previous
              </button>
              <span className="text-gray-500">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className={`${
                  currentPage === totalPages
                    ? "text-gray-400"
                    : "text-gray-green"
                }`}
                disabled={currentPage === totalPages}
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          </div>

          {showForm && (
            <>
              <div
                className="fixed inset-0 bg-black opacity-50 z-10"
                onClick={handleCancel}
              ></div>

              {/* Form  */}
              <div className="fixed inset-0 flex items-center justify-center z-20">
                <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
                  <h2 className="text-xl font-bold mb-4">Allocate Order</h2>
                  <form onSubmit={handleFormSubmit}>
                    <div className="mb-4">
                      <label className="block mb-1">Location:</label>
                      <input
                        type="text"
                        name="location"
                        value={allocationDetails.location}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="YUMSUK main campus"
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block mb-1">No of Items:</label>
                      <input
                        type="number"
                        name="items"
                        value={allocationDetails.items}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Must not be more than 20"
                        required
                        max={20}
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block mb-1">Category:</label>
                      <select
                        name="category"
                        value={allocationDetails.category}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                      >
                        <option value="" disabled>
                          Select Category
                        </option>
                        <option value="Hazardous">Hazardous</option>
                        <option value="Organic">Organic</option>
                        <option value="Recyclable">Recyclable</option>
                      </select>
                    </div>

                    <div className="mb-4">
                      <label className="block mb-1">Contact Number:</label>
                      <input
                        type="number"
                        name="contactNumber"
                        value={allocationDetails.contactNumber}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        maxLength={12}
                        pattern="\d{10,12}"
                        title="Contact number should be between 10 to 12 digits."
                        placeholder="090909090909"
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block mb-1">Driver:</label>
                      <select
                        name="driver"
                        value={allocationDetails.driver}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                      >
                        <option value="" disabled>
                          Select a driver
                        </option>
                        <option value="Khalid Rabiu" className=" uppercase">
                          Khalid Rabiu
                        </option>
                        <option value="ISA Musa" className=" uppercase">
                          ISA Musa
                        </option>
                        <option value="ADAM ISA">ADAM ISA</option>
                        <option value="KAST MAN BIGBOSS">
                          KAST MAN BIGBOSS
                        </option>
                      </select>
                    </div>

                    <div className="flex justify-between">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-gray-green text-white rounded"
                      >
                        Submit
                      </button>
                      <button
                        type="button"
                        className="px-4 py-2 bg-gray-300 rounded"
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default WasteManagment;
