import React from "react";
import Sidebar from "../../components/Sidebar";

const Collection = () => {
  return (
    <div className="flex h-screen">
      <Sidebar activePage="collection" />
      <main className="flex-1 p-8 mt-[64px]">
        {" "}
        {/* Adjust the margin here */}
        <h1>TEST FOR collection</h1>
        {/* Your dashboard content */}
      </main>
    </div>
  );
};

export default Collection;
