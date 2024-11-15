import React from "react";
import { useState } from "react";

const StaffNotificationPreferences = () => {
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [textMessage, setTextMessage] = useState(false);

  return (
    <div>
      <div className="p-6 bg-[#f1f4f8]/35 w-[80%] h-full">
        <h2 className="text-[#141417] font-semibold text-2xl font-Inter text-[20px] ">
          Notification preferences
        </h2>
        <p className="text-[#4F4E59] mb-6 text-[16px] font-Inter font-[400]">
          Manage and update how you receive notifications.
        </p>

        <div className="mb-6">
          <h3 className="text-black font-medium my-4 font-Inter text-[16px]">
            General notifications
          </h3>
          <div className="flex flex-col justify-start items-start gap-[20px]">
            <div className="Email notifications flex justify-start items-start gap-2">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={emailNotifications}
                  onChange={() => setEmailNotifications(!emailNotifications)}
                  className="sr-only peer"
                />
                <div className="w-10 h-6 bg-gray-200 rounded-full peer dark:bg-[#E6E5EA] peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#83818E] after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2CDB86]"></div>
              </label>

              <div className="flex flex-col justify-start items-start gap-1 font-Inter">
                <h1 className="text-[16px] font-[500] text-[#2B2A31]">
                  Email notifications
                </h1>
                <p className="text-[14px] font-[400] text-[#83818E] w-[25rem]">
                  We will send updates associated with your role to the email
                  address associated with your account.
                </p>
              </div>
            </div>

            <div className="Email notifications flex justify-start items-start  gap-2">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={textMessage}
                  onChange={() => setTextMessage(!textMessage)}
                  className="sr-only peer"
                  disabled
                />
                <div className="w-10 h-6 bg-gray-200 rounded-full peer dark:bg-[#E6E5EA] peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#83818E] after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2CDB86]"></div>
              </label>

              <div className="flex flex-col justify-start items-start gap-1 font-Inter">
                <h1 className="text-[16px] font-[500] text-[#2B2A31]">
                  Text message
                </h1>
                <p className="text-[14px] font-[400] text-[#83818E] w-[25rem]">
                  We will send you sensitive updates and activities regarding
                  your role.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            className="text-gray-500"
            onClick={() => console.log("Cancel")}
          >
            Cancel
          </button>
          <button
            className="bg-black text-white px-4 py-2 rounded"
            // onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default StaffNotificationPreferences;
