import React from "react";
import Sidebar from "../../components/Sidebar";

const Orders = () => {
  return (
    <div className="flex h-screen">
      <Sidebar activePage="orders" />
      <main className="flex-1 p-8 mt-[64px]">
        {" "}
        {/* Adjust the margin here */}
        <h1>TEST FOR Orders</h1>
        {/* Your dashboard content */}
      </main>
    </div>
  );
};

export default Orders;
