import React from "react";
import Sidebar from "../../components/Sidebar";

const Settings = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar activePage="settings" />
      <main>{/* Your dashboard content */}</main>
    </div>
  );
};

export default Settings;
