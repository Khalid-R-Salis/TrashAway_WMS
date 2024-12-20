import { useState, useEffect, useCallback } from "react";
import Sidebar from "../../components/Sidebar";
import formbg from "../../assets/formsbg.png";
import notificationdb from "../../assets/notificationdb.png";
import cancelIcon from "../../assets/close.svg";
import profile2 from "../../assets/profiledb2.png";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [errors, setErrors] = useState("");
  const [userId, setUserID] = useState("");
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [username, setUserName] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [isDeleteOrder, setIsDeleteOrder] = useState(false);
  const navigate = useNavigate();

  // @desc: States for Timer
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

  // @desc: fetching user pickup orders
  useEffect(() => {
    const userSession = JSON.parse(localStorage.getItem("userSession"));
    setToken(userSession?.token);
    setUserID(userSession?.id);
    setName(userSession?.name);
    setEmail(userSession?.email);
    setUserName(userSession?.username);
    setPhoneNumber(userSession?.phone);
  }, [token, userId, name, email, phoneNumber, username]);

  const fetchUserOrdersHandler = useCallback(async () => {
    setIsLoading(true);

    if (!userId || !token) return;

    try {
      const response = await fetch(
        `https://waste-mangement-backend-3qg6.onrender.com/api/user/all-user-pickups/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { pickupData, error, message } = await response.json();

      if (!response.ok && error) {
        setIsLoading(false);
        throw new Error(error);
      }

      if (message === "No pickups found.") {
        setIsLoading(false);
        throw new Error("No pickups found. Try by adding some.");
      }

      if (response.status === 403) {
        navigate("/login");
      }

      if (message === "jwt expired") {
        setIsLoading(false);
        navigate("/login");
      }

      // @desc: set user pickup order
      const data = pickupData.slice(0, 6);
      setOrders(data);
      setErrors(null);
      setIsLoading(false);
    } catch (error) {
      console.log("Error from dashboard", error);
      setErrors(error.message);
      setOrders([]);
      setIsLoading(false);
    }
  }, [token, userId, navigate]);

  useEffect(() => {
    fetchUserOrdersHandler();
  }, [fetchUserOrdersHandler, refresh]);

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

  const handleDelete = async (orderID) => {
    setIsLoading(true);

    try {
      if (!userId || !token) return;

      const response = await fetch(`https://waste-mangement-backend-3qg6.onrender.com/api/user/delete-pickup/${userId}/${orderID}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok && data.error) {
        setIsLoading(false);
        throw new Error(data.error);
      }

      if (data.message) {
        setIsLoading(false);
        setIsDeleteOrder(true);
      }

      if (response.status === 403) {
        navigate("/login");
      }

      setIsLoading(false);
      setErrors('');
      setRefresh(curVal => !curVal);

      setTimeout(() => {
        setIsDeleteOrder(false);
      }, 1500);
    } catch (error) {
      console.log("Error from delete handler", error);
      setOrders([]);
      setErrors(error.message);
      setIsLoading(false);
    }
  };

  const showError = (
    <div className="absolute right-[35rem] bottom-[15rem] mt-[23rem] w-[370px] bg-white  p-6 rounded-lg shadow-sm z-10">
      <div className="flex justify-between items-center pb-[32px]">
        <h3 className="text-[#1E1E1E] font-Inter text-[20px] font-semibold capitalize">
          {errors}
        </h3>
      </div>
    </div>
  );

  // @desc: showing a delete order success message after an order has been deleted
  const deleteOrder = (
    <div className="fixed top-5 left-1/2 transform -translate-x-1/2 w-[90%] sm:w-[60%] md:w-[40%] lg:w-[30%] max-w-[360px] bg-[#549877] p-6 rounded-lg shadow-sm z-10">
      <div className="flex justify-between items-center">
        <h3 className="text-white font-Inter text-[16px] capitalize">
          Pickup Order Deleted.
        </h3>
      </div>
    </div>
  );
  
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar activePage="dashboard" />
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
          className="bg-no-repeat min-h-full bg-cover bg-center w-full px-5 py-2 font-Inter"
          style={{ backgroundImage: `url(${formbg})` }}
        >
          <div className=" text-[#141417] font-Inter text-[20px] font-[600] mb-2">
            Personal information
          </div>
          <div className=" flex justify-center items-center gap-6 mb-1">
            <img src={profile2} alt="" />
            <div className="flex flex-col justify-center items-center gap-4">
              <div className="rounded-[4px] w-[25rem] bg-white shadow-inner [box-shadow:0px_0px_4px_0px_#83818E_inset] px-4 py-1">
                <h2 className=" text-[#666] text-[12px] font-[500] text-start">
                  Full Name
                </h2>
                <h1 className=" text-[#212121] text-[14px] font-[400] text-start">
                  {name}
                </h1>
              </div>

              <div className="rounded-[4px] w-[25rem] bg-white shadow-inner [box-shadow:0px_0px_4px_0px_#83818E_inset] px-4 py-1">
                <h2 className=" text-[#666] text-[12px] font-[500] text-start">
                  User Name
                </h2>
                <h1 className=" text-[#212121] text-[14px] font-[400] text-start">
                  {username}
                </h1>
              </div>
            </div>

            <div className="flex flex-col justify-center items-center gap-4">
              <div className="rounded-[4px] w-[25rem] bg-white shadow-inner [box-shadow:0px_0px_4px_0px_#83818E_inset] px-4 py-1">
                <h2 className=" text-[#666] text-[12px] font-[500] text-start">
                  Email
                </h2>
                <h1 className=" text-[#212121] text-[14px] font-[400] text-start">
                  {email}
                </h1>
              </div>

              <div className="rounded-[4px] w-[25rem] bg-white shadow-inner [box-shadow:0px_0px_4px_0px_#83818E_inset] px-4 py-1">
                <h2 className=" text-[#666] text-[12px] font-[500] text-start">
                  Phone Number
                </h2>
                <h1 className=" text-[#212121] text-[14px] font-[400] text-start">
                  {phoneNumber}
                </h1>
              </div>
            </div>
          </div>

          <div className="RecentPickUpOrders mt-4 h-[30rem]">
            <h2 className="text-[20px] font-semibold text-[#212121] font-Inter">
              Recent Pick Up Orders
            </h2>
            <p className=" text-[#666] font-Inter text-[14px] font-[500] mb-4">
              Your recent orders appear here
            </p>
            <table className="min-w-full table-auto bg-white shadow-md rounded-md py-5">
              <thead>
                <tr>
                  <th className=" font-sans text-[#8B909A] text-[13px] font-[500] px-0 py-2">
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
                {orders.map((order) => (
                  <tr key={order._id} className="border-b">
                    <td className="px-4 py-2 text-[#23272E] text-[15px] font-[400] font-sans">
                      {order.searchId}
                    </td>
                    <td className="px-4 py-2 text-[#23272E] text-[15px] font-[400] font-sans">
                      {order.time}
                    </td>
                    <td className="px-4 py-2 text-[#23272E] text-[15px] font-[400] font-sans">
                      {order.capacity}
                    </td>
                    <td className="px-4 py-2 text-[#23272E] text-[15px] font-[400] font-sans">
                      {order.category}
                    </td>
                    <td className="px-4 py-2 text-[#23272E] text-[15px] font-[400] font-sans">
                      {order.status === "Pending" ||
                      order.status === "Driver Allocated" ? (
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
                            onClick={() => setSelectedOrderId(order._id)}
                            className="text-gray-500"
                          >
                            &#x22EE;
                          </button>
                          {selectedOrderId === order._id && (
                            <div className="absolute right-0 mt-2 w-[100px] bg-white shadow-md border border-gray-200">
                              <button
                                onClick={() => handleDelete(order._id)}
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
            {isLoading && !errors && (
              <div className="ml-[38rem] mt-[8rem] spinner-border text-[#549877] w-[40px] h-[40px] border-t-[#549877] border-4 border-solid  rounded-full animate-spin"></div>
            )}
          </div>
          {!isLoading && errors && showError}
          {!isLoading && isDeleteOrder && deleteOrder}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
