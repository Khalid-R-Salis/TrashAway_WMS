import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";

import formbg from "../../assets/formsbg.png";
import notificationdb from "../../assets/notificationdb.png";
import cancelIcon from "../../assets/close.svg";
import search from "../../assets/Search.png";
import SidebarAdmin from "../../components/SidebarAdmin";

// Orders logic
/* const orders = [{
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
},] */

const WasteManagment = () => {
  const [orders, setOrders] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [errors, setErrors] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [showSuccessMessage, setSuccessMessage] = useState(false);
  const [allocationDetails, setAllocationDetails] = useState({
    location: "",
    items: "",
    category: "",
    contactNumber: "",
  });
  const [drivers, setAllDrivers] = useState(null);

  const driverInputRef = useRef();

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
  const toggleNotification = () => {
    setShowNotification(!showNotification);
  };

  // @desc: fetching pickup orders from the backend
  const fetchUserOrdersHandler = useCallback(async () => {
    const userSession = JSON.parse(localStorage.getItem("userSession"));
    const token = userSession?.token;

    setIsLoading(true);

    if (!token) return;

    try {
      const response = await fetch(
        `https://waste-mangement-backend-3qg6.onrender.com/api/admin/all-pickup`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { updatedPickUpRequest, error, message, getAllStaffs } =
        await response.json();

      if (!response.ok && error) {
        setIsLoading(false);
        throw new Error(error);
      }

      if (message === "No pick up requests found.") {
        setIsLoading(false);
        throw new Error("No pick up requests found at the moment.");
      }

      if (response.status === 403) {
        navigate("/login");
      }

      if (message === "jwt expired") {
        setIsLoading(false);
        navigate("/login");
      }

      setAllDrivers(getAllStaffs);
      setOrders(updatedPickUpRequest);
      setErrors(null);
      setIsLoading(false);
    } catch (error) {
      console.log("Error from dashboard", error);
      setErrors(error.message);
      setOrders([]);
      setIsLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchUserOrdersHandler();
  }, [fetchUserOrdersHandler, refresh]);

  // Allocation form logic (already handled in the allocate function down below)
  // const handleInputChange = (e) => {
  //   setAllocationDetails({
  //     ...allocationDetails,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  const handleAllocate = (id) => {
    setShowForm(true);
    setSelectedOrderId(id);

    const selectedOrder = orders.filter((order) => {
      return order._id === id;
    });

    setAllocationDetails({
      ...allocationDetails,
      location: selectedOrder[0].location,
      items: selectedOrder[0].capacity,
      category: selectedOrder[0].category,
      contactNumber: selectedOrder[0].phone,
    });
  };

  // @desc: submit allocation details
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setShowForm(true);
    setIsLoading(true);

    const driver = driverInputRef.current.value;

    const userSession = JSON.parse(localStorage.getItem("userSession"));
    const token = userSession?.token;

    try {
      if (!token) return;

      const response = await fetch(
        `https://waste-mangement-backend-3qg6.onrender.com/api/admin/update-pickup-request/${selectedOrderId}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            driverName: driver,
            capacity: allocationDetails.items,
            location: allocationDetails.location,
            category: allocationDetails.category,
            userPhoneNumber: allocationDetails.contactNumber,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok && data.error) {
        setIsLoading(false);
        setShowForm(false);
        throw new Error(data.error);
      }

      if (data.message === "Pick up request point not found") {
        setIsLoading(false);
        setShowForm(false);
        throw new Error("Pick up request point not found.");
      }

      if (data.message === "Something happened. Try again later") {
        setIsLoading(false);
        setShowForm(false);
        throw new Error("Something happened. Try again later.");
      }

      if (data.message === "Driver not found") {
        setIsLoading(false);
        setShowForm(false);
        throw new Error("Driver not found.");
      }

      if (response.status === 403) {
        navigate("/login");
      }

      if (data.message === "jwt expired") {
        navigate("/login");
      }

      setShowForm(false);
      setSuccessMessage(true); //state for setting the state to show the succes message
      setTimeout(() => {
        setSuccessMessage(false);
      }, 2500);

      setRefresh((prevVal) => !prevVal); //to re-render the component when this form is submitted
      setIsLoading(false);
      setErrors("");
    } catch (error) {
      console.log(error);
      setOrders([]);
      setErrors(error.message);
      setIsLoading(false);
      setShowForm(false);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  // Orders filtering
  const filteredOrders = orders.filter((order) => {
    if (filterStatus === "All") return true;
    return order.status === filterStatus;
  });

  // Pagination logic
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

  const showError = (
    <div className="absolute right-[30rem] bottom-[15rem] mt-[23rem] w-[370px] bg-[#549877]  p-6 rounded-lg shadow-sm z-10">
      <div className="flex justify-between items-center pb-[32px]">
        <h3 className="text-white font-Inter text-[20px] font-semibold capitalize">
          {errors}
        </h3>
      </div>
    </div>
  );

  // @desc: showing success message afer allocation has been made
  const showStaffCreatedMessage = (
    <div className="absolute right-[35rem] bottom-[39rem] mt-[23rem] w-[300px] bg-[#549877] p-6 rounded-lg shadow-sm z-10">
      <div className="flex justify-between items-center pb-[-1px]">
        <h3 className="text-white font-Inter text-[16px] capitalize">
          Allocation submitted successfully.
        </h3>
      </div>
    </div>
  );

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
              type="text"
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
                  <tr key={order._id} className="border-b">
                    <td className="py-3 px-4 text-left">{order.searchId}</td>
                    <td className="py-3 px-4 text-left">{order.time}</td>
                    <td className="py-3 px-4 text-left">{order.capacity}</td>
                    <td className="py-3 px-4 text-left">{order.category}</td>
                    <td className="py-3 px-4 text-left">
                      {order.status === "Pending" ? (
                        <span className="text-yellow-500 bg-yellow-50 p-1">
                          Pending
                        </span>
                      ) : order.status === "Driver Allocated" ? (
                        <span className="text-orange-500 bg-orange-50 p-1">
                          Driver Allocated
                        </span>
                      ) : (
                        <span className="text-green-500 bg-green-50 p-1">
                          Completed
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {order.status === "Pending" && (
                        <button
                          className="text-gray-green underline font-semibold tracking-wide"
                          onClick={() => handleAllocate(order._id)}
                        >
                          Allocate
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Showing error conditionally */}
            {!isLoading && errors && showError}

            {/* Showing staff created modal */}
            {!isLoading && showSuccessMessage && showStaffCreatedMessage}

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

          {/* Showing the loading spinner */}
          {isLoading && !errors && (
            <div className="ml-[38rem] mt-[4.5rem] spinner-border text-[#549877] w-[40px] h-[40px] border-t-[#549877] border-4 border-solid  rounded-full animate-spin"></div>
          )}

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
                        className="w-full p-2 text-[#666] border border-gray-300 rounded"
                        placeholder="YUMSUK main campus"
                        disabled
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block mb-1">No of Items:</label>
                      <input
                        type="number"
                        name="items"
                        value={allocationDetails.items}
                        className="w-full p-2 border text-[#666] border-gray-300 rounded"
                        placeholder="Must not be more than 20"
                        required
                        disabled
                        max={20}
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block mb-1">Category:</label>
                      <select
                        name="category"
                        value={allocationDetails.category}
                        className="w-full p-2 border border-gray-300 rounded"
                        disabled
                        required
                      >
                        <option defaultValue={"Select Category"} disabled>
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
                        className="w-full p-2 border text-[#666] border-gray-300 rounded"
                        maxLength={12}
                        pattern="\d{10,12}"
                        title="Contact number should be between 10 to 12 digits."
                        placeholder="090909090909"
                        disabled
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="driver" className="block mb-1">
                        Driver:
                      </label>
                      <select
                        name="driver"
                        className="w-full p-2 border border-gray-300 rounded"
                        ref={driverInputRef}
                        required
                      >
                        <option value="" disabled>
                          Select Driver
                        </option>
                        {drivers.map((driver) => (
                          <option
                            key={driver._id}
                            value={driver.name}
                            className=" uppercase"
                          >
                            {driver.name}
                          </option>
                        ))}
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
                    {/* Loading spinner */}
                    {isLoading && !errors && (
                      <div className="ml-[15rem] mt-[] spinner-border text-[#549877] w-[30px] h-[30px] border-t-[#549877] border-4 border-solid  rounded-full animate-spin"></div>
                    )}
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
