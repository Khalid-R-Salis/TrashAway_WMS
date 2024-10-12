import React from "react";
import Sidebar from "../../components/Sidebar";

const Orders = () => {
  return (
    <div className="order-layout">
      <Sidebar activePage="orders" />
      <main>{/* Orders content */}</main>
    </div>
  );
};
export default Orders;
