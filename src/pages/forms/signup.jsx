import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "../../services/api";
import logo from "../../assets/logo.png";
import formbg from "../../assets/formsbg.png";
import googleicon from "../../assets/googleicon.png";
import eyeicon from "../../assets/eyeicon.png";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Update formData state on input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      // const response = await axios.post("/register", formData);
      const response = await fetch(
        "https://waste-mangement-backend-3qg6.onrender.com/api/register",
        {
          method: "POST",
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );

      // console.log({ name: formData.name, email: formData.email, phone: formData.phone, password: formData.password })

      const data = await response.json();
      console.log(data);
      setSuccess("Registration successful! You can now log in.");
      setFormData({ name: "", email: "", phone: "", password: "" });
    } catch (error) {
      setError(
        error.response?.data?.message || "Registration failed. Try again."
      );
    }
  };

  // Redirect to login page after a delay when registration is successful
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 1500); // Redirect after 3 seconds

      // Clear the timer if the component unmounts
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  return (
    <>
      <div
        className="bg-no-repeat bg-cover bg-center w-full pt-12 overflow-hidden"
        style={{ backgroundImage: `url(${formbg})` }}
      >
        <form
          onSubmit={handleSubmit}
          className="font-Inter text-[#191D23] flex flex-col justify-center items-center gap-[24px]"
        >
          <a href="/" className="mb-[40px]">
            <img src={logo} alt="" />
          </a>
          <h2 className="text-[24px] font-[700]">Create an Account</h2>
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}

          <div className="flex flex-col justify-center items-start gap-[8px]">
            <p className="text-[16px] font-[500]">Name</p>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Khalid Rabiu Salis"
              className="outline-none rounded-[8px] px-[16px] py-[12px] w-[400px] h-[48px] border-[#4B5768] border-[1px]"
              required
            />
          </div>

          <div className="flex flex-col justify-center items-start gap-[8px]">
            <p className="text-[16px] font-[500]">Email Address</p>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="khalidrabiu@gmail.com"
              className="outline-none rounded-[8px] px-[16px] py-[12px] w-[400px] h-[48px] border-[#4B5768] border-[1px]"
              required
            />
          </div>

          <div className="flex flex-col justify-center items-start gap-[8px]">
            <p className="text-[16px] font-[500]">Phone Number</p>
            <input
              type="number"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="08011111111"
              className="outline-none rounded-[8px] px-[16px] py-[12px] w-[400px] h-[48px] border-[#4B5768] border-[1px]"
              onInput={(e) => {
                if (e.target.value.length > 11) {
                  e.target.value = e.target.value.slice(0, 11);
                }
              }}
              required
            />
          </div>

          <div className="flex flex-col justify-center items-start gap-[8px]">
            <div className="flex justify-between items-center w-full">
              <p className="text-[16px] font-[500]">Password</p>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="bg-no-repeat bg-[20px_center] bg-[length:20px_20px] outline-none rounded-[8px] pl-[48px] pr-[16px] py-[12px] w-[400px] h-[48px] border-[#4B5768] border-[1px]"
                style={{ backgroundImage: `url(${eyeicon})` }}
                placeholder="Enter Your Password"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 left-2 w-10 h-full"
                aria-label="Toggle password visibility"
              />
            </div>
          </div>

          <div className="mt-[8px] mb-[-10px] flex justify-start items-center gap-[16px] w-full ml-[74%]">
            <p className="text-[14px] font-[400]">
              By continuing, you agree to our{" "}
              <a href="/ourterms" className="text-[#549877]">
                terms of service.
              </a>
            </p>
          </div>

          <button
            className="text-white bg-[#549877] py-[16px] rounded-[4px] w-[400px]"
            type="submit"
          >
            Sign up
          </button>

          <div className="flex justify-center items-center gap-4">
            <div className="border-[0.5px] border-solid border-[#4B5768] w-[115px] opacity-[0.2]"></div>
            <p>or sign up with</p>
            <div className="border-[1px] border-solid border-[#4B5768] w-[115px] opacity-[0.2]"></div>
          </div>

          <div className="flex justify-center items-center gap-[16px] py-[12px] bg-[#E4E7EB] rounded-[4px] w-[400px]">
            <img src={googleicon} alt="" />
            <a href="" className="text-[#4B5768] text-[16px] font-[400]">
              Continue with Google
            </a>
          </div>

          <div className="flex justify-center items-center gap-1 mb-10">
            <p>Already have an account?</p>
            <a href="/login" className="text-[#549877] font-[600]">
              Login here
            </a>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
