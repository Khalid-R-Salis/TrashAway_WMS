import React from "react";
import Sidebar from "../../components/Sidebar";

const Support = () => {
  return (
    <div className="flex h-screen">
      <Sidebar activePage="support" />
      <main className="flex-1 p-8 mt-[64px]">
        {" "}
        {/* Adjust the margin here */}
        <h1>TEST FOR Support</h1>
        {/* Your dashboard content */}
      </main>
    </div>
  );
};

export default Support;
