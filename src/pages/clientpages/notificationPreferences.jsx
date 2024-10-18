import React from "react";

const NotificationPreferences = () => {
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

          <div className="">
            <input type="radio" />
            <h2>Email notifications</h2>
            <p>
              {/* We will send updates associated with your role to the email
              address associated with your account. */}
              <h1> THIS PAGE IS UNDER DEVLOPMENT</h1>
            </p>
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

export default NotificationPreferences;
