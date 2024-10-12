import React from "react";
import Sidebar from "../../components/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      <Sidebar activePage="dashboard" />
      <main className="flex-1 p-8 mt-[64px]">
        {" "}
        {/* Adjust the margin here */}
        <h1>TEST FOR DASHBOARD</h1>
        {/* Your dashboard content */}
      </main>
    </div>
  );
};

export default Dashboard;
