import { useState, useEffect, useCallback } from "react";
import SidebarAdmin from "../../components/SidebarAdmin";
import formbg from "../../assets/formsbg.png";
import notificationdb from "../../assets/notificationdb.png";
import cancelIcon from "../../assets/close.svg";
import iconSet from "../../assets/iconSet.png";
import { useNavigate } from "react-router-dom";

/* 
const orders = [
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
] */

const AdminDashboard = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [orders, setOrders] = useState([]);
  const [errors, setErrors] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [totalOrganicOrders, setTotalOrganicOrders] = useState(0);
  const [totalRecycledOrders, setTotalRecycledOrders] = useState(0);
  const [totalHazardousOrders, setTotalHazardousOrders] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalStaff, setTotalStaff] = useState(0);
  const navigate = useNavigate();

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

  const toggleNotification = () => {
    setShowNotification(!showNotification);
    console.log(orders);
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

      const { updatedPickUpRequest, error, message, ordersCount, allRoles } =
        await response.json();

      if (!response.ok && error) {
        setIsLoading(false);
        throw new Error(error);
      }

      if (message === "No pick up requests found.") {
        setIsLoading(false);
        throw new Error("No pick up requests found at the moment.");
      }

      if (message === "jwt expired") {
        setIsLoading(false);
        navigate("/login");
      }

      const data = updatedPickUpRequest.slice(0, 7);

      setTotalRecycledOrders(ordersCount.allRecycledOrders);
      setTotalHazardousOrders(ordersCount.allHazardousOrders);
      setTotalOrganicOrders(ordersCount.allOrganicOrders);
      setTotalStaff(allRoles.allStaffs);
      setTotalUsers(allRoles.allUsers);
      setOrders(data);
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
  }, [fetchUserOrdersHandler]);

  /* 
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const handleDelete = (id) => {
    const filteredOrders = orders.filter((order) => order.id !== id);
    setOrders(filteredOrders);
  }; */

  const showError = (
    <div className="absolute right-[35rem] bottom-[5rem] mt-[23rem] w-[370px] bg-[#549877]  p-6 rounded-lg shadow-sm z-10">
      <div className="flex justify-between items-center pb-[32px]">
        <h3 className="text-white font-Inter text-[20px] font-semibold capitalize">
          {errors}
        </h3>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarAdmin activePage="adminDashboard" />
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
              <div className="absolute right-[30px] mt-[23rem]  w-[370px] bg-white p-6 rounded-lg shadow-sm z-50">
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
          className="bg-no-repeat bg-cover bg-center w-full h-full px-5 py-2 font-Inter"
          style={{ backgroundImage: `url(${formbg})` }}
        >
          <div className="grid grid-cols-[2fr_1fr] gap-2">
            <div className=" LEFT-CONTAINER flex flex-wrap gap-6">
              <div className="flex flex-col justify-between w-[350px] items-start p-4 bg-[#F7F9FB] font-Inter text-[#1C1C1C] rounded-[16px] shadow-sm">
                <div>
                  <h1 className="text-[17px] font-[600]">Total Vehicles</h1>
                </div>
                <div className="flex justify-between items-center w-full">
                  <h1 className="text-[40px] font-[700]">50</h1>
                  <div className="flex items-center gap-1 text-[14px] font-[400]">
                    <p>+0.03%</p>
                    <img src={iconSet} alt="iconSet" />
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="flex flex-col justify-between w-[350px] items-start p-4 bg-[#E3F5FF] font-Inter text-[#1C1C1C] rounded-[16px] shadow-sm ">
                <div>
                  <h1 className="text-[17px] font-[600]">Revenue</h1>
                </div>
                <div className="flex justify-between items-center w-full">
                  <h1 className="text-[40px] font-[700]">37</h1>
                  <div className="flex items-center gap-1 text-[14px] font-[400]">
                    <p>+11.01%</p>
                    <img src={iconSet} alt="iconSet" />
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="flex flex-col justify-between  w-[350px] items-start p-4 bg-[#F7F9FB] font-Inter text-[#1C1C1C] rounded-[16px] shadow-sm ">
                <div>
                  <h1 className="text-[17px] font-[600]">Total Users</h1>
                </div>
                <div className="flex justify-between items-center w-full">
                  <h1 className="text-[40px] font-[700]">{totalUsers}</h1>
                  <div className="flex items-center gap-1 text-[14px] font-[400]">
                    <p>+6.08%</p>
                    <img src={iconSet} alt="iconSet" />
                  </div>
                </div>
              </div>

              {/* Card 4 */}
              <div className="flex flex-col justify-between  w-[350px] items-start p-4 bg-[#E5ECF6] font-Inter text-[#1C1C1C] rounded-[16px] shadow-sm ">
                <div>
                  <h1 className="text-[17px] font-[600]">Staffs</h1>
                </div>
                <div className="flex justify-between items-center w-full">
                  <h1 className="text-[40px] font-[700]">{totalStaff}</h1>
                  <div className="flex items-center gap-1 text-[14px] font-[400]">
                    <p>+15.03%</p>
                    <img src={iconSet} alt="iconSet" />
                  </div>
                </div>
              </div>
            </div>

            <div className="relative p-[30px] bg-[#EEF5F1] rounded-[8px]">
              <div className="text-left">
                <h2 className="text-[#1E1E1E] font-Inter text-[18px] font-[600] tracking-[-0.36px]">
                  Pickups
                </h2>
                <p className="text-[#888] text-[14px] font-[500] tracking-[-0.28px]">
                  Last 24hours
                </p>
              </div>

              <div className="relative mt-6 flex justify-center items-center gap-4">
                <div className="absolute w-[120px] h-[120px] flex flex-col justify-center items-center gap-[3px] bg-[#6389EB] rounded-full text-center z-10">
                  <p className="text-[#EEF5F1] text-[12px] font-[400] font-Inter leading-[14px]">
                    Total Plastic Recycled
                  </p>
                  <h1 className="font-sans text-[16px] font-[700] text-[#FFF] tracking-[-0.311px]">
                    {totalRecycledOrders}
                  </h1>
                </div>
                <div className="absolute w-[100px] h-[100px] flex flex-col justify-center items-center gap-[3px] bg-[#D3E9FE] rounded-full text-center z-20 top-[7px] right-[3rem]">
                  <p className="text-black text-[10px] font-[400] font-Inter leading-[14px] ">
                    Hazardous Waste
                  </p>
                  <h1 className="font-sans text-[16px] font-[700] text-gray-600 tracking-[-0.311px]">
                    {totalHazardousOrders}
                  </h1>
                </div>
                <div className="absolute w-[80px] h-[80px] flex flex-col justify-center items-center gap-[3px] bg-[#1E63B5] rounded-full text-center z-30 top-[3rem] right-[8rem]">
                  <p className="text-[#EEF5F1] text-[12px] font-[400] font-Inter leading-[14px] w-full">
                    Organic Waste
                  </p>
                  <h1 className="font-sans text-[16px] font-[700] text-[#FFF] tracking-[-0.311px]">
                    {totalOrganicOrders}
                  </h1>
                </div>
              </div>
            </div>
          </div>

          <div className="RecentPickUpOrders mt-4">
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
                    <td className="px-4 py-2">
                      {order.status === "Pending" && (
                        <div className="relative"></div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {!isLoading && errors && showError}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
