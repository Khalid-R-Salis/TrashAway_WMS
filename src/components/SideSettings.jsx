import React, { useState } from "react";
import PersonalInformation from "./PersonalInformation";
import NotificationPreferences from "./NotificationPreferences";
import Security from "./Security";

const SideSettings = () => {
  const [activePage, setActivePage] = useState("personal");

  const renderContent = () => {
    switch (activePage) {
      case "personal":
        return <PersonalInformation />;
      case "notifications":
        return <NotificationPreferences />;
      case "security":
        return <Security />;
      default:
        return <PersonalInformation />;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-100 p-4">
        <button
          onClick={() => setActivePage("personal")}
          className={`block w-full ${
            activePage === "personal" ? "bg-gray-200" : ""
          }`}
        >
          Personal Information
        </button>
        <button
          onClick={() => setActivePage("notifications")}
          className={`block w-full ${
            activePage === "notifications" ? "bg-gray-200" : ""
          }`}
        >
          Notification Preferences
        </button>
        <button
          onClick={() => setActivePage("security")}
          className={`block w-full ${
            activePage === "security" ? "bg-gray-200" : ""
          }`}
        >
          Security
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-white">{renderContent()}</div>
    </div>
  );
};

export default SideSettings;
