import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import formbg from "../../assets/formsbg.png";
import notificationdb from "../../assets/notificationdb.png";
import cancelIcon from "../../assets/close.svg";
import profile2 from "../../assets/profiledb2.png";

const Dashboard = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [orders, setOrders] = useState([
    { id: 1001, date: "7 July 2024", items: 20, category: "Recyclable", status: "Pending" },
    { id: 1002, date: "7 July 2024", items: 10, category: "Recyclable", status: "Pending" },
    { id: 1003, date: "7 July 2024", items: 8, category: "Recyclable", status: "Pending" },
    { id: 1004, date: "7 July 2024", items: 4, category: "Hazardous", status: "Completed" },
    { id: 1005, date: "7 July 2024", items: 16, category: "Organic", status: "Completed" },
    { id: 1006, date: "7 July 2024", items: 18, category: "Hazardous", status: "Completed" },
    { id: 1007, date: "7 July 2024", items: 20, category: "Organic", status: "Completed" },
  ]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const toggleNotification = () => {
    setShowNotification(!showNotification);
  };

  const handleDelete = (id) => {
    const filteredOrders = orders.filter(order => order.id !== id);
    setOrders(filteredOrders);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar activePage="dashboard" />
      <main className="flex-1">
        <div className="flex justify-between items-center px-[32px] py-[12px] w-full bg-[#1E1E1E] h-20 relative">
          <h2 className="text-white font-Inter text-[20px] font-[600] tracking-[-0.4]">
            Dashboard
          </h2>
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
              <div className="fixed inset-0 bg-black opacity-50 z-10" onClick={toggleNotification}></div>

              <div className="absolute right-[30px] mt-[16rem] w-[360px] bg-white p-6 rounded-lg shadow-sm z-20">
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
              </div>
            </>
          )}
        </div>

        <div
          className="bg-no-repeat bg-cover bg-center w-full h-full px-5 py-2 font-Inter"
          style={{ backgroundImage: `url(${formbg})` }}
        >

<div className=" text-[#141417] font-Inter text-[20px] font-[600] mb-2">Personal information</div>
         <div className=" flex justify-center items-center gap-6 mb-1">
          <img src={profile2} alt="" />
<div className="flex flex-col justify-center items-center gap-4">
<div className="rounded-[4px] w-[25rem] bg-white shadow-inner [box-shadow:0px_0px_4px_0px_#83818E_inset] px-4 py-1">
  <h2 className=" text-[#666] text-[12px] font-[500] text-start">Full Name</h2>
  <h1 className=" text-[#212121] text-[14px] font-[400] text-start">Khalid Rabiu</h1>
</div>

<div className="rounded-[4px] w-[25rem] bg-white shadow-inner [box-shadow:0px_0px_4px_0px_#83818E_inset] px-4 py-1">
  <h2 className=" text-[#666] text-[12px] font-[500] text-start">User Name</h2>
  <h1 className=" text-[#212121] text-[14px] font-[400] text-start">Eng. Khalid</h1>
</div>
</div>

<div className="flex flex-col justify-center items-center gap-4">
<div className="rounded-[4px] w-[25rem] bg-white shadow-inner [box-shadow:0px_0px_4px_0px_#83818E_inset] px-4 py-1">
  <h2 className=" text-[#666] text-[12px] font-[500] text-start">Email</h2>
  <h1 className=" text-[#212121] text-[14px] font-[400] text-start">khalidrabiu@gmail.com</h1>
</div>

<div className="rounded-[4px] w-[25rem] bg-white shadow-inner [box-shadow:0px_0px_4px_0px_#83818E_inset] px-4 py-1">
  <h2 className=" text-[#666] text-[12px] font-[500] text-start">Phone number</h2>
  <h1 className=" text-[#212121] text-[14px] font-[400] text-start">08085499803</h1>
</div>
</div>
         </div>


          <div className="RecentPickUpOrders mt-4">
            <h2 className="text-[20px] font-semibold text-[#212121] font-Inter">Recent Pick Up Orders</h2>
            <p className=" text-[#666] font-Inter text-[14px] font-[500] mb-4">Your recent orders appear here</p>
            <table className="min-w-full table-auto bg-white shadow-md rounded-md py-5">
              <thead>
              <tr>
                <th className=" font-sans text-[#8B909A] text-[13px] font-[500] px-0 py-2">ID</th>
                <th className="font-sans text-[#8B909A] text-[13px] font-[500] px-0 py-2">DATE</th>
                <th className="font-sans text-[#8B909A] text-[13px] font-[500] px-0 py-2">NUMBER OF ITEMS</th>
                <th className="font-sans text-[#8B909A] text-[13px] font-[500] px-0 py-2 uppercase">category</th>
                <th className="font-sans text-[#8B909A] text-[13px] font-[500] px-0 py-2 uppercase">Status</th>
                <th className="px-0 py-2"></th>
              </tr>
              </thead>
              <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b">
                  <td className="px-[45px] py-2">{order.id}</td>
                  <td className="px-[45px] py-2">{order.date}</td>
                  <td className="px-[45px] py-2">{order.items}</td>
                  <td className="px-[45px] py-2">{order.category}</td>
                  <td className="px-4 py-2">
                    {order.status === "Pending" ? (
                      <span className="text-yellow-500 bg-yellow-50 p-1">Pending</span>
                    ) : (
                      <span className="text-green-500 bg-green-50 p-1">Completed</span>
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
      </main>
    </div>
  );
};

export default Dashboard;
