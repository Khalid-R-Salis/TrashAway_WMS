import React, { useState } from "react";
import profiledb1 from "../../assets/profiledb1.png";

const AdminPersonalInformation = () => {
  const [fullName, setFullName] = useState("Khalid Rabiu");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSave = () => {
    console.log({ fullName, username, email, phoneNumber });
  };

  return (
    <div className="p-6 bg-[#f1f4f8]/35 w-[80%] h-full">
      <h2 className="text-[#141417] font-semibold text-2xl font-Inter text-[20px] ">
        Personal information
      </h2>
      <p className="text-[#4F4E59] mb-6 text-[16px] font-Inter font-[400]">
        Manage and update your personal information
      </p>

      <div className="mb-6">
        <h3 className="text-black font-medium my-4 font-Inter text-[16px]">
          Basic information
        </h3>

        <div className="flex items-center mb-4">
          <div className="relative w-20 h-20">
            <img
              src={profiledb1}
              alt="profiledb1"
              className="w-full h-full object-cover rounded-full"
            />
            <button className="absolute bottom-0 right-0 bg-green-500/80 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs">
              +
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-[50%] p-2 border border-gray-300 rounded-[4px] shadow-sm outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-[50%] p-2 border border-gray-300 rounded-[4px] shadow-sm outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm mb-1">
              New email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-[50%] p-2 border border-gray-300 rounded-[4px] shadow-sm outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm mb-1">
              New number
            </label>
            <input
              type="number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-[50%] p-2 border border-gray-300 rounded-[4px] shadow-sm outline-none"
              required
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button className="text-gray-500" onClick={() => console.log("Cancel")}>
          Cancel
        </button>
        <button
          className="bg-black text-white px-4 py-2 rounded"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AdminPersonalInformation;
