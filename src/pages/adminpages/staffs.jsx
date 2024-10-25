import React, { useState, useEffect } from "react";
import formbg from "../../assets/formsbg.png";
import cancelIcon from "../../assets/close.svg";
import notificationdb from "../../assets/notificationdb.png";
import SidebarAdmin from "../../components/SidebarAdmin";

const Staffs = () => {
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
        if (day >= 11 && day <= 13) return `${day}th`;
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

  const [showNotification, setShowNotification] = useState(false);
  const toggleNotification = () => {
    setShowNotification(!showNotification);
  };

  const [orders, setOrders] = useState([
    { id: 1001, name: "Khalid Rabiu", phoneNumber: 8085499803, role: "Driver" },
    { id: 1002, name: "Khalid Rabiu", phoneNumber: 8085499803, role: "Driver" },
    { id: 1003, name: "Khalid Rabiu", phoneNumber: 8085499803, role: "Driver" },
    { id: 1004, name: "Khalid Rabiu", phoneNumber: 8085499803, role: "Driver" },
    { id: 1005, name: "Khalid Rabiu", phoneNumber: 8085499803, role: "Driver" },
    { id: 1006, name: "Khalid Rabiu", phoneNumber: 8085499803, role: "Driver" },
    { id: 1007, name: "Khalid Rabiu", phoneNumber: 8085499803, role: "Driver" },
    { id: 1008, name: "Khalid Rabiu", phoneNumber: 8085499803, role: "Driver" },
    { id: 1009, name: "Khalid Rabiu", phoneNumber: 8085499803, role: "Driver" },
    { id: 1010, name: "Khalid Rabiu", phoneNumber: 8085499803, role: "Driver" },
    { id: 1011, name: "Khalid Rabiu", phoneNumber: 8085499803, role: "Driver" },
    { id: 1012, name: "Khalid Rabiu", phoneNumber: 8085499803, role: "Driver" },
    { id: 1013, name: "Khalid Rabiu", phoneNumber: 8085499803, role: "Driver" },
    { id: 1014, name: "Khalid Rabiu", phoneNumber: 8085499803, role: "Driver" },
    { id: 1015, name: "Khalid Rabiu", phoneNumber: 8085499803, role: "Driver" },
  ]);

  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteReason, setDeleteReason] = useState("");

  const handleDelete = (id) => {
    setOrders(orders.filter((order) => order.id !== id));
    setShowDeleteModal(false); // Close modal after delete
    setDeleteReason(""); // Clear reason input
  };

  const [filterStatus] = useState("All");
  const filteredOrders = orders.filter((order) => filterStatus === "All");

  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 6;
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);


  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarAdmin activePage="staffs" />
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
              <div className="fixed inset-0 bg-black opacity-50 z-10" onClick={toggleNotification}></div>
              <div className="absolute right-[30px] mt-[23rem] w-[370px] bg-white p-6 rounded-lg shadow-sm z-10">
                <div className="flex justify-between items-center pb-[32px]">
                  <h3 className="text-[#1E1E1E] font-Inter text-[20px] font-semibold">
                    Notifications
                  </h3>
                  <img
                    src={cancelIcon}
                    alt="Close"
                    className="cursor-pointer h-4 w-4"
                    onClick={toggleNotification}
                  />
                </div>
                {/* Notification List */}
              </div>
            </>
          )}
        </div>

        <div
          className="bg-no-repeat bg-cover bg-center w-full h-full"
          style={{ backgroundImage: `url(${formbg})` }}
        >
          <div className="flex justify-between items-center px-5 py-2 mt-6 mb-4">
            <h1 className="text-[#1E1E1E] text-[24px] font-Inter font-[600] tracking-[-0.48px]">
              Staffs
            </h1>
            <button
        className="py-[12px] px-[39px] bg-[#549877] rounded-[4px] text-white"
        onClick={openModal}
      >
        + <span className="ml-2">Add Staff</span>
      </button>
          </div>

          <div className="RecentPickUpOrders mt-4 mx-[20px]">
            <table className="min-w-full table-auto bg-white shadow-md rounded-md py-5">
              <thead>
                <tr>
                  <th className="text-[#8B909A] text-[13px] font-[500] px-0 py-2">ID</th>
                  <th className="text-[#8B909A] text-[13px] font-[500] px-0 py-2">Name</th>
                  <th className="text-[#8B909A] text-[13px] font-[500] px-0 py-2">Phone Number</th>
                  <th className="text-[#8B909A] text-[13px] font-[500] px-0 py-2">Role</th>
                  <th className="px-0 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.map((order) => (
                  <tr key={order.id} className="border-b">
                    <td className="px-[45px] py-2 text-[#23272E] text-[15px] font-[400]">{order.id}</td>
                    <td className="px-[45px] py-2 text-[#23272E] text-[15px] font-[400]">{order.name}</td>
                    <td className="px-[45px] py-2 text-[#23272E] text-[15px] font-[400]">{order.phoneNumber}</td>
                    <td className="px-[45px] py-2 text-[#23272E] text-[15px] font-[400]">{order.role}</td>
                    <td className="px-4 py-2">
                      <div className="relative">
                        <button
                          onClick={() => {
                            setSelectedOrderId(order.id);
                            setShowDeleteModal(true);
                          }}
                          className="text-gray-500"
                        >
                          &#x22EE;
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-around items-center">
          <button
            onClick={handlePrevious}
            className="bg-gray-200 text-gray-700 px-4 py-2 mt-[-650px] rounded-md hover:bg-gray-300"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="bg-gray-200 text-gray-700 px-4 py-2 mt-[-650px] rounded-md hover:bg-gray-300"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>

        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-md shadow-lg w-[400px]">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Are you sure you want to remove this driver?
              </h3>
              <textarea
                value={deleteReason}
                onChange={(e) => setDeleteReason(e.target.value)}
                className="w-full h-[80px] p-2 border-2 rounded-md mb-4 outline-none resize-none"
                placeholder="Optional: Provide a reason"
              ></textarea>
              <div className="flex justify-end">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(selectedOrderId)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                >
                  Remove Driver
                </button>
              </div>
            </div>
          </div>
        )}

         {/* Modal for the form */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-[400px] relative">
            <button
              className="absolute top-2 right-2 text-gray-600"
              onClick={closeModal}
            >
              &times;
            </button>

            <h2 className="text-[16px] font-Inter font-[500] mb-4">Add Staff</h2>
            <form className="">
              <div className="mb-4">
                <label className="block text-gray-700">Full Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 p-2 rounded outline-none"
                  placeholder="Enter Full Name"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  className="w-full border border-gray-300 p-2 rounded outline-none"
                  placeholder="Enter Email"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Contact Number</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 p-2 rounded outline-none"
                  placeholder="Enter Contact Number"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Role</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 text-gray-400 p-2 rounded outline-none"
                  placeholder="Driver"
                  value={"Driver"}
                  disabled
                  
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  className="text-gray-600"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gray-green text-white px-4 py-2 rounded"
                >
                  Create
                </button>
              </div>
            </form>
            {/* Form ends here */}
          </div>
        </div>
      )}
      </main>
    </div>
);
};

export default Staffs;
