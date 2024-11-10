import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Modal from "../../components/UI/Modal/Modal";
import profiledb1 from "../../assets/profiledb1.png";

const AdminPersonalInformation = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const updateProfileHandler = async (event) => {
    event.preventDefault();
    
    try {
      setIsLoading(true);
      const userSession = JSON.parse(localStorage.getItem("userSession"));
      const token = userSession?.token;
      const userId = userSession?.id;

      const response = await fetch(
        `https://waste-mangement-backend-3qg6.onrender.com/api/users/${userId}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            name: fullName,
            email,
            phone: phoneNumber,
            username,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok && data.message) {
        setIsLoading(false);
        setShowModal(true);
        throw new Error(
          data.message || "Sorry something happened, Try again later"
        );
      }

      if (data.message === "jwt expired") {
        setIsLoading(false);
        navigate('/login');
      }

      setSuccessMessage("Profile Updated Successfully");
      setShowModal(true);

      // @desc: updating user details in local storage
      let updateUserSession = localStorage.getItem("userSession");

      if (updateUserSession) {
        updateUserSession = JSON.parse(updateUserSession);

        updateUserSession.name = data.user.name;
        updateUserSession.email = data.user.email;
        updateUserSession.phone = data.user.phone;
        updateUserSession.username = data.user.username;

        localStorage.setItem("userSession", JSON.stringify(updateUserSession));

        // @desc: set loading to false to show the modal
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

    // @desc: hide modal handler
    const toggleModalHandler = () => {
      setShowModal(false);
    };  

  return (
    <>
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
        <form className="space-y-4">
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
            />
          </div>
          <div className="flex justify-end space-x-4">
        <button className="text-gray-500" onClick={() => console.log("Cancel")}>
          Cancel
        </button>
        <button
          className="bg-black text-white px-4 py-2 rounded"
          onClick={updateProfileHandler}
        >
          Save
        </button>
      </div>
        </form>
      </div>

    </div>
    {!isLoading && error && showModal && (
        <Modal onClickBg={toggleModalHandler}>{error}</Modal>
      )}
      {!isLoading && successMessage && showModal && (
        <Modal onClickBg={toggleModalHandler}>{successMessage}</Modal>
      )}
    </>
  );
};

export default AdminPersonalInformation;
