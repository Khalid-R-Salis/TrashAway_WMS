import React from "react";
import Sidebar from "../../components/Sidebar";

const Collection = () => {
  return (
    <div className="points-layout">
      <Sidebar activePage="collection" />
      <main>{/* Point content */}</main>
    </div>
  );
};
export default Collection;
