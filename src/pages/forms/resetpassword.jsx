import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import formbg from "../../assets/formsbg.png";

const Resetpassword = () => {
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://waste-mangement-backend-3qg6.onrender.com/api/reset-password",
        {
          method: "PUT",
          body: JSON.stringify({ email }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      console.log(data);

      if (!response.ok && data.error) {
        setIsLoading(false);
        throw new Error(data.error);
      }

      if (data.message) {
        setIsLoading(false);
        throw new Error(data.message);
      }

      setSuccessMessage("Password Reset Successfull");

      setTimeout(() => {
        setIsLoading(false);
        setSuccessMessage("");
      }, 1500);

      setTimeout(() => {
        navigate("/login");
      }, 3000);

      setIsLoading(false);
      setError("");
    } catch (error) {
      console.log("error from reset password", error);
      setIsLoading(false);
      setError(error.message);
      setTimeout(() => {
        setError("");
      }, 1500);
    }
  };

  // @desc: showing error message when an error is encounted
  const showError = (
    <div className="absolute right-[44rem] bottom-[46rem] mt-[23rem] w-[300px] bg-[#549877] p-5 rounded-lg shadow-sm z-10">
      <div className="flex justify-between items-center pb-[-1px]">
        <h3 className="text-white font-Inter text-[16px] capitalize">
          {error}
        </h3>
      </div>
    </div>
  );

  // @desc: showing success message afer staff has been created
  const showSuccessMessage = (
    <div className="absolute right-[44rem] bottom-[46rem] mt-[23rem] w-[300px] bg-[#549877] p-6 rounded-lg shadow-sm z-10">
      <div className="flex justify-between items-center pb-[-1px]">
        <h3 className="text-white font-Inter text-[16px] capitalize">
          {successMessage}
        </h3>
      </div>
    </div>
  );

  return (
    <div
      className="bg-no-repeat bg-cover bg-center w-full pt-12 overflow-hidden h-[100vh]"
      style={{ backgroundImage: `url(${formbg})` }}
    >
      <form
        onSubmit={handleSubmit}
        className="font-Inter text-[#191D23] flex flex-col justify-center items-center gap-[35px] mt-[40px]"
      >
        <a href="/" className="mb-[40px]">
          <img src={logo} alt="" />
        </a>
        <h2 className="text-[24px] font-[700]">Forgot Password?</h2>
        <p className="text-[#666] text-[18px] w-[342px] text-center leading-6 mt-[-30px]">
          Enter your email address to get the password reset link.
        </p>
        <div className="flex flex-col justify-center items-start gap-[8px]">
          <p className="text-[16px] font-[500]">Email Address</p>
          <input
            type="email"
            placeholder="khalidrabiu@gmail.com"
            onChange={(event) => {
              const emailValue = event.target.value;

              const validateEmail = (value) => {
                const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return regex.test(value);
              };

              if (validateEmail(emailValue)) {
                setEmail(emailValue);
                setEmailError("");
              } else setEmailError("Invalid Email");
            }}
            className="outline-none rounded-[8px] px-[16px] py-[12px] w-[400px] h-[48px] border-[#4B5768] border-[1px]"
            required
          />
        </div>
        <p className="text-red-600 absolute bottom-[19.5rem] left-[40rem]">
          {emailError}
        </p>

        {/* Show spinner when loading */}
        {isLoading ? (
          <div className="spinner-border text-[#549877] w-[40px] h-[40px] border-4 border-solid border-t-[#549877] rounded-full animate-spin"></div>
        ) : (
          <button
            className="text-white bg-[#549877] py-[16px] rounded-[4px] w-[400px]"
            type="submit"
          >
            Password Reset
          </button>
        )}

        <a href="/login" className="text-[#878787] font-[600]">
          Back to login
        </a>
      </form>

      {/* Showing error conditionally */}
      {!isLoading && error && showError}

      {/* Showing staff created modal */}
      {!isLoading && successMessage && showSuccessMessage}
    </div>
  );
};

export default Resetpassword;
