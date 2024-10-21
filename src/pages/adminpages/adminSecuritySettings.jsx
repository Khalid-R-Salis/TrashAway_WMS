import React, { useState } from "react";

import eyeicon from "../../assets/eyeicon.png";

const AdminSecuritySettings = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const toggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // authentication process
    const user = { currentPassword, newPassword };
    console.log(user);
  };

  return (
    <div>
      <div className="p-6 bg-[#f1f4f8]/35 w-[80%] h-full">
        <h2 className="text-[#141417] font-semibold text-2xl font-Inter text-[20px] ">
          Security
        </h2>
        <p className="text-[#4F4E59] mb-6 text-[16px] font-Inter font-[400]">
          Manage your account security.
        </p>

        <div className="mb-6">
          <h3 className="text-black font-medium my-4 font-Inter text-[16px]">
            Change your password
          </h3>
        </div>

        <div className="flex flex-col justify-start gap-4">
          {/* Current Password Input */}
          <div className="relative">
            <input
              type={showCurrentPassword ? "text" : "password"}
              className="bg-no-repeat bg-[20px_center] bg-[length:20px_20px] outline-none rounded-[8px] pl-[48px] pr-[16px] py-[12px] w-[400px] h-[48px] border-[#4B5768] border-[1px]"
              style={{ backgroundImage: `url(${eyeicon})` }}
              placeholder="Current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={toggleCurrentPasswordVisibility}
              className="absolute inset-y-0 left-2 w-10 h-full"
              aria-label="Toggle current password visibility"
            />
          </div>

          {/* New Password Input */}
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              className="bg-no-repeat bg-[20px_center] bg-[length:20px_20px] outline-none rounded-[8px] pl-[48px] pr-[16px] py-[12px] w-[400px] h-[48px] border-[#4B5768] border-[1px]"
              style={{ backgroundImage: `url(${eyeicon})` }}
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={toggleNewPasswordVisibility}
              className="absolute inset-y-0 left-2 w-10 h-full"
              aria-label="Toggle new password visibility"
            />
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
            onClick={handleLogin} // Call the login function on Save
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSecuritySettings;
