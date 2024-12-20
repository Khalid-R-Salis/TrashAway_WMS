import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/SidebarStaff";
import formbg from "../../assets/formsbg.png";
import notificationdb from "../../assets/notificationdb.png";
import cancelIcon from "../../assets/close.svg";
import search from "../../assets/Search.png";

const StaffOrders = () => {
  const [pickupOption, setPickupOption] = useState(null);

  const [showNotification, setShowNotification] = useState(false);
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [token, setToken] = useState("");
  const [staffID, setStaffID] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [isSearch, setIsSearch] = useState(false);
  const [searchResult, setSearchResult] = useState({});
  const [searchError, setSearchError] = useState("");
  const [searchId, setSearchId] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showPickupOptions, setShowPickupOptions] = useState(true);
  const [showSuccessMessage, setSuccessMessage] = useState(false);
  const [showRejectMessage, setRejectMessage] = useState(false);
  const [allocationDetails, setAllocationDetails] = useState({
    location: "",
    items: null,
    category: "",
    timeArrived: "",
    timeLeft: "",
    pictureProof: "",
    rejectReason: "",
  });
  const [refresh, setRefresh] = useState(false);
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

  // @desc: getting user details from local storge
  useEffect(() => {
    const userSession = JSON.parse(localStorage.getItem("userSession"));
    setToken(userSession?.token);
    setStaffID(userSession?.id);
  }, []);

  // @desc: fetching all user orders
  const fetchUserOrderHandler = useCallback(async () => {
    if (!staffID || !token) return;

    try {
      setIsLoading(true);
      const response = await fetch(
        `https://waste-mangement-backend-3qg6.onrender.com/api/staff/all-orders/${staffID}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { updatedPickups, error, message, errorMessage } =
        await response.json();

      if (!response.ok && error) {
        setIsLoading(false);
        throw new Error(error);
      }

      if (errorMessage) {
        setIsLoading(false);
        throw new Error(errorMessage);
      }

      if (message === "jwt expired") {
        setIsLoading(false);
        navigate("/login");
      }

      setIsLoading(curVal => !curVal);
      setOrders(updatedPickups);
      setError(null);
    } catch (error) {
      console.log(error);
      setError(error.message);
      setOrders([]);
      setIsLoading(false);
    }
  }, [staffID, token, navigate]);

  // desc: calling fetch orders to only re-render only once and when there is a change
  useEffect(() => {
    fetchUserOrderHandler();
  }, [fetchUserOrderHandler, refresh]);

  const toggleNotification = () => {
    setShowNotification((prevValue) => !prevValue);
  };

  // const handleDelete = (id) => {
  //   const filteredOrders = orders.filter((order) => order.id !== id);
  //   setOrders(filteredOrders);
  // };

  const filteredOrders = orders.filter((order) => {
    if (filterStatus === "All") return true;
    return order.status === filterStatus;
  });
  // Pagination state
  const ordersPerPage = 6;
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  // Allocation form logic handled in handleFormSubmit function down below
  // const handleInputChange = (e) => {
  //   setAllocationDetails({
  //     ...allocationDetails,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // @desc: handling the confirmation or rejection of pickup order
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (pickupOption === "confirm") {
      try {
        const response = await fetch(
          `https://waste-mangement-backend-3qg6.onrender.com/api/staff/complete-order/${selectedOrderId}/${staffID}`,
          {
            method: "POST",
            body: JSON.stringify({
              location: allocationDetails.location,
              items: allocationDetails.items,
              category: allocationDetails.category,
              timeArrived: allocationDetails.timeArrived,
              timeLeft: allocationDetails.timeLeft,
              pictureProof: allocationDetails.pictureProof,
            }),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        console.log(data);

        if (!response.ok && data.error) {
          setIsLoading(false);
          setShowForm(false);
          throw new Error(data.error);
        }

        if (response.status === 403) {
          navigate("/login");
        }

        if (data.message === "jwt expired") {
          navigate("/login");
        }

        if (data.message) {
          setIsLoading(false);
          setShowForm(false);
          throw new Error(data.message);
        }

        setShowForm(false);
        setSuccessMessage(true); //state for setting the state to show the succes message
        setTimeout(() => {
          setSuccessMessage(false);
        }, 2500);
        setAllocationDetails({
          location: "",
          items: null,
          category: "",
          timeArrived: "",
          timeLeft: "",
          pictureProof: "",
          rejectReason: "",
        });
        setError("");
        setIsLoading(false);
        setRefresh((curVal) => !curVal);
      } catch (error) {
        console.log("error from confirm pickup", error);
        setError(error.message);
        setIsLoading(false);
        setOrders([]);
        setShowForm(false);
      }
    }

    if (pickupOption === "reject") {
      try {
        const response = await fetch(
          `https://waste-mangement-backend-3qg6.onrender.com/api/staff/reject-order/${selectedOrderId}/${staffID}`,
          {
            method: "POST",
            body: JSON.stringify({
              rejectOrderReason: allocationDetails.rejectReason,
            }),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        console.log(data);

        if (!response.ok && data.error) {
          setIsLoading(false);
          setShowForm(false);
          throw new Error(data.error);
        }

        if (response.status === 403) {
          navigate("/login");
        }

        if (data.message === "jwt expired") {
          navigate("/login");
        }

        if (data.message) {
          setIsLoading(false);
          setShowForm(false);
          throw new Error(data.message);
        }

        setShowForm(false);
        setIsLoading(false);
        setRejectMessage(true); //state for setting the state to show the succes message
        setTimeout(() => {
          setRejectMessage(false);
        }, 2500);

        setAllocationDetails({ rejectReason: "" });
        setError("");
        setRefresh((curVal) => !curVal);
      } catch (error) {
        console.log("error from confirm pickup", error);
        setError(error.message);
        setIsLoading(false);
        setOrders([]);
        setShowForm(false);
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setPickupOption(null);
    setShowPickupOptions(true);
  };

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
    });
  };

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

  // @desc: showing error conditionally
  const showError = (
    <div className="absolute right-[34rem] bottom-[20rem] mt-[23rem] w-[370px] bg-[#549877] p-6 rounded-lg shadow-sm z-10">
      <div className="flex justify-between items-center pb-[32px]">
        <h3 className="text-white font-Inter text-[20px] font-semibold capitalize">
          {error}
        </h3>
      </div>
    </div>
  );

  // @desc: showing search error conditionally
  const showSearchError = (
    <div className="absolute right-[34rem] bottom-[20rem] mt-[23rem] w-[370px] bg-[#549877]  p-6 rounded-lg shadow-sm z-10">
      <div className="flex justify-between items-center pb-[32px]">
        <h3 className="text-white font-Inter text-[20px] font-semibold capitalize">
          {searchError}
        </h3>
      </div>
    </div>
  );

  // @desc: showing success message that the order has been completed
  const showOrderMessage = (
    <div className="absolute right-[35rem] bottom-[39rem] mt-[23rem] w-[350px] bg-[#549877] p-6 rounded-lg shadow-sm z-10">
      <div className="flex justify-between items-center pb-[-1px]">
        <h3 className="text-white font-Inter text-[16px] capitalize">
          Allocation Submitted successfully
        </h3>
      </div>
    </div>
  );

  // @desc: showing success message that the order has been completed
  const showRejectMessages = (
    <div className="absolute right-[35rem] bottom-[39rem] mt-[23rem] w-[300px] bg-[#549877] p-6 rounded-lg shadow-sm z-10">
      <div className="flex justify-between items-center pb-[-1px]">
        <h3 className="text-white font-Inter text-[16px] capitalize">
          Successfull.
        </h3>
      </div>
    </div>
  );

  // @desc: handling search order to get the ID the user provides
  const searchOrderHandler = async (event) => {
    event.preventDefault();
    const value = event.target.value.slice(0, 6);
    setInputValue(value);
  };

  // @desc: useEffect hook from getting the exact data and set it to searchId state for accessibility
  useEffect(() => {
    if (inputValue !== "" && inputValue.length === 6) {
      setSearchId(inputValue);
    } else if (inputValue === "") {
      setSearchId("");
    }
  }, [inputValue]);

  // @desc: sending the search request when the searchId is only available
  useEffect(() => {
    const searchResults = async () => {
      setIsLoading(true);
      setIsSearch(true);

      if (searchId === "") {
        return;
      }

      const searchIDUppercase = searchId.toUpperCase();
      try {
        const response = await fetch(
          "https://waste-mangement-backend-3qg6.onrender.com/api/staff/search-order",
          {
            method: "POST",
            body: JSON.stringify({ searchID: searchIDUppercase }),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const { data, message } = await response.json();
        if (!response.ok && message) {
          setIsLoading(false);
          setIsSearch(false);
          throw new Error(message);
        }

        setSearchResult(data);
        setIsSearch(false);
        setIsLoading(false);
        setSearchError("");
      } catch (error) {
        console.log(error.message);
        setSearchError(error.message);
        setSearchResult({});
        setIsLoading(false);
        setIsSearch(false);
      }
    };

    searchResults();
  }, [searchId, token]);
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar activePage="orders" />
      <main className="flex-1">
        <div className="flex justify-between items-center px-[32px] py-[12px] w-full bg-[#1E1E1E] h-20 relative">
          <h2 className="text-white font-Inter text-[20px] font-[600] tracking-[-0.4]">
            Staff Dashboard
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
              Assinged Pickups
            </h1>
            <input
              type="text"
              min={1}
              max={9999}
              value={inputValue}
              maxLength={6}
              placeholder="Search by ID"
              className="px-[16px] py-[8px] outline-none rounded-[4px] w-[200px] h-[37px] bg-white bg-no-repeat bg-[20px_center] bg-[length:20px_20px] pl-[48px] pr-[16px] shadow-[0px_0px_3px_0px_rgba(0,0,0,0.10)]"
              style={{ backgroundImage: `url(${search})` }}
              onChange={searchOrderHandler}
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
                  <th className="font-sans text-[#8B909A] text-[13px] font-[500] px-0 py-2 uppercase">
                    Action
                  </th>
                  <th className="px-0 py-2"></th>
                </tr>
              </thead>
              {isSearch && (
                <tbody>
                  {currentOrders.map((order) => (
                    <tr key={order._id} className="border-b">
                      <td className="px-[45px] py-2 text-[#23272E] text-[15px] font-[400] font-sans">
                        {order.collectionID}
                      </td>
                      <td className="px-[45px] py-2 text-[#23272E] text-[15px] font-[400] font-sans">
                        {order.time}
                      </td>
                      <td className="px-[45px] py-2 text-[#23272E] text-[15px] font-[400] font-sans">
                        {order.capacity}
                      </td>
                      <td className="px-[45px] py-2 text-[#23272E] text-[15px] font-[400] font-sans">
                        {order.category}
                      </td>
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
                      <td className="py-3 px-4 text-center">
                        {order.status === "Pending" && (
                          <button
                            className="text-gray-green font-semibold tracking-wide"
                            onClick={() => handleAllocate(order._id)}
                          >
                            Take Order
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}

              {!isSearch && searchResult === "" ? null : (
                <>
                  {!isSearch && searchResult && searchResult._id && (
                    <tbody>
                      <tr key={searchResult._id} className="border-b">
                        <td className="px-[45px] py-2 text-[#23272E] text-[15px] font-[400] font-sans">
                          {searchResult.collectionID}
                        </td>
                        <td className="px-[45px] py-2 text-[#23272E] text-[15px] font-[400] font-sans">
                          {searchResult.time}
                        </td>
                        <td className="px-[45px] py-2 text-[#23272E] text-[15px] font-[400] font-sans">
                          {searchResult.capacity}
                        </td>
                        <td className="px-[45px] py-2 text-[#23272E] text-[15px] font-[400] font-sans">
                          {searchResult.category}
                        </td>
                        <td className="px-[45px] py-2 text-[#23272E] text-[15px] font-[400] font-sans">
                          {searchResult.status === "Pending" ? (
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
                          {searchResult.status === "Pending" && (
                            <div className="relative">
                              <button
                                onClick={() =>
                                  setSelectedOrderId(searchResult._id)
                                }
                                className="text-gray-500"
                              >
                                &#x22EE;
                              </button>
                              {/* {selectedOrderId === searchResult._id && (
                                <div className="absolute right-0 mt-2 w-[100px] bg-white shadow-md border border-gray-200">
                                  <button
                                    onClick={() =>
                                      handleDelete(searchResult._id)
                                    }
                                    className="w-full text-red-500 py-2 hover:bg-gray-100"
                                  >
                                    Delete
                                  </button>
                                </div>
                              )} */}
                            </div>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  )}
                </>
              )}
            </table>
            {/* Loading spinner */}
            {isLoading && orders.length === 0 && (
              <div className="ml-[38rem] mt-[8rem] spinner-border text-[#549877] w-[40px] h-[40px] border-t-[#549877] border-4 border-solid  rounded-full animate-spin"></div>
            )}
            {!isLoading && error && showError}
            {!isLoading && searchError && showSearchError}
            {!isLoading && showSuccessMessage && showOrderMessage}
            {!isLoading && showRejectMessage && showRejectMessages}
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

          {showForm && (
            <>
              <div
                className="fixed inset-0 bg-black opacity-50 z-10"
                onClick={handleCancel}
              ></div>

              {/* Form  */}
              <div className="fixed inset-0 flex items-center justify-center z-20">
                <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
                  {pickupOption === "confirm" ? (
                    <h2 className="text-xl font-bold mb-4">Confirm Pickup</h2>
                  ) : pickupOption === "reject" ? (
                    <h2 className="text-xl font-bold mb-4">Reject Pickup</h2>
                  ) : (
                    <h2 className="text-xl font-bold mb-4">
                      Confirm/Reject Pickup
                    </h2>
                  )}
                  <form onSubmit={handleFormSubmit}>
                    {/* Option 1: Confirm Pickup */}
                    {pickupOption === "confirm" && (
                      <>
                        <div className="mb-4">
                          <label className="block mb-1">Location:</label>
                          <input
                            type="text"
                            name="location"
                            value={allocationDetails.location}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                            disabled
                          />
                        </div>

                        <div className="mb-4">
                          <label className="block mb-1">No of Items:</label>
                          <input
                            type="number"
                            name="items"
                            value={allocationDetails.items}
                            className="w-full p-2 border border-gray-300 rounded"
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
                            required
                            disabled
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
                          <label className="block mb-1">Time Arrived:</label>
                          <input
                            type="time"
                            onChange={(event) =>
                              setAllocationDetails({
                                ...allocationDetails,
                                timeArrived: event.target.value,
                              })
                            }
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                          />
                        </div>

                        <div className="mb-4">
                          <label className="block mb-1">Time Left:</label>
                          <input
                            type="time"
                            onChange={(event) =>
                              setAllocationDetails({
                                ...allocationDetails,
                                timeLeft: event.target.value,
                              })
                            }
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                          />
                        </div>

                        <div className="mb-4">
                          <label className="block mb-1">Prove of Pickup:</label>
                          <input
                            type="file"
                            onChange={(event) =>
                              setAllocationDetails({
                                ...allocationDetails,
                                pictureProof: event.target.value,
                              })
                            }
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                          />
                        </div>
                      </>
                    )}

                    {/* Option 2: Reject Pickup */}
                    {pickupOption === "reject" && (
                      <div className="mb-4">
                        <label className="block mb-1">
                          Reason for Rejection:
                        </label>
                        <textarea
                          name="rejectionReason"
                          onChange={(event) =>
                            setAllocationDetails({
                              rejectReason: event.target.value,
                            })
                          }
                          className="w-full p-2 border border-gray-300 rounded resize-none"
                          placeholder="Enter reason here"
                          rows="4"
                        />
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex justify-between">
                      {pickupOption === "confirm" && (
                        <button
                          type="submit"
                          className="px-4 py-2 bg-gray-green text-white rounded"
                        >
                          Confirm Pickup
                        </button>
                      )}
                      <button
                        type="button"
                        className="px-4 py-2 bg-gray-300 rounded"
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>

                      {pickupOption === "reject" && (
                        <button
                          type="submit"
                          className="px-4 py-2 bg-orange-800 text-white rounded"
                        >
                          Reject
                        </button>
                      )}
                    </div>
                    {/* Loading spinner */}
                    {isLoading && !showError && (
                      <div className="ml-[15rem] mt-[] spinner-border text-[#549877] w-[30px] h-[30px] border-t-[#549877] border-4 border-solid  rounded-full animate-spin"></div>
                    )}
                  </form>

                  {/* Pickup Options */}
                  {showPickupOptions && (
                    <div className="mt-4">
                      <button
                        className="w-full px-4 py-2 bg-gray-green text-white rounded mb-2"
                        onClick={() => {
                          setPickupOption("confirm");
                          setShowPickupOptions(false);
                        }}
                      >
                        Confirm Pickup
                      </button>
                      <button
                        className="w-full px-4 py-2 bg-orange-800 text-white rounded"
                        onClick={() => {
                          setPickupOption("reject");
                          setShowPickupOptions(false);
                        }}
                      >
                        Reject Pickup
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default StaffOrders;
