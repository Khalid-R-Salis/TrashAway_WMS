import { useState } from "react";

import Modal from "../../components/UI/Modal/Modal";
import eyeicon from "../../assets/eyeicon.png";

const SecuritySettings = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const [showModal, setShowModal] = useState(false);

  const toggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handlePasswordHandler = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const userSession = JSON.parse(localStorage.getItem("userSession"));
      const token = userSession?.token;
      const userId = userSession?.id;

      // authentication process
      const response = await fetch(
        `https://waste-mangement-backend-3qg6.onrender.com/api/users/${userId}/password`,
        {
          method: "PUT",
          body: JSON.stringify({ currentPassword, newPassword }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      console.log(data);

      if (!response.ok && data.message) {
        setIsLoading(false);
        setShowModal(true);
        throw new Error(data.message || "Server Error, Please Try Again Later");
      }

      setSuccessMessage(data.success);
      setShowModal(true);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setError(error.message);
      setIsLoading(false);
    }
  };

  // @desc: hide modal handler
  const toggleModalHandler = () => {
    setShowModal(false);
  };
  return (
    <>
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

          <form onSubmit={handlePasswordHandler}>
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
              <button className="bg-black text-white px-4 py-2 rounded">
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

export default SecuritySettings;
