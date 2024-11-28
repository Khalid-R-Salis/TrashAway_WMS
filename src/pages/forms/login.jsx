import { useState, useEffect } from "react";
// import axios from "../../services/api";
import Spinner from "../../components/Spinner";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import formbg from "../../assets/formsbg.png";
import googleicon from "../../assets/googleicon.png";
import eyeicon from "../../assets/eyeicon.png";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Show the spinner when the login process starts
    setError('');

    try {
      const response = await fetch(
        "https://waste-mangement-backend-3qg6.onrender.com~/api/login",
        {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();

      if (data.token) {
        const user = { email, token: data.token, ...data.user };

        // Store the token in localStorage for authenticated requests
        localStorage.setItem("userSession", JSON.stringify(user));

        // Redirect based on the user's role
        if (user.role === "admin") {
          navigate("/admindashboard");
        } else if (user.role === "staff") {
          navigate("/staffdashboard");
        } else {
          navigate("/loginhome");
        }
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("Please check your credentials and try again.");
      console.log(err);
    } finally {
      setLoading(false); // Hide the spinner after login process
    }
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("userSession");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setEmail(parsedUser.email);
      // Do not set password for security reasons
    }
  }, []);

  return (
    <div
      className="bg-no-repeat bg-cover bg-center w-full pt-12 overflow-hidden"
      style={{ backgroundImage: `url(${formbg})` }}
    >
      <form
        onSubmit={handleLogin}
        className="font-Inter text-[#191D23] flex flex-col justify-center items-center gap-[24px]"
      >
        <a href="/" className="mb-[40px]">
          <img src={logo} alt="Logo" />
        </a>
        <h2 className="text-[24px] font-[700]">Login Account</h2>
        {error && <p className="text-red-500">{error}</p>} {/* Error message */}
        {/* Show spinner if loading */}
        {loading ? (
          <Spinner />
        ) : (
          <>
            <div className="flex flex-col justify-center items-start gap-[8px]">
              <p className="text-[16px] font-[500]">Email Address</p>
              <input
                type="email"
                placeholder="khalidrabiu@gmail.com"
                className="outline-none rounded-[8px] px-[16px] py-[12px] w-[400px] h-[48px] border-[#4B5768] border-[1px]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col justify-center items-start gap-[8px]">
              <div className="flex justify-between items-center w-full">
                <p className="text-[16px] font-[500]">Password</p>
                <p className="text-[12px] font-[500] text-[#549877]">
                  <a href="/reset">Forgot Password?</a>
                </p>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="bg-no-repeat bg-[20px_center] bg-[length:20px_20px] outline-none rounded-[8px] pl-[48px] pr-[16px] py-[12px] w-[400px] h-[48px] border-[#4B5768] border-[1px]"
                  style={{ backgroundImage: `url(${eyeicon})` }}
                  placeholder="Enter Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
            <div className="mt-[8px] mb-[-10px] flex justify-start items-center gap-[4px] w-full ml-[74%]">
              <input
                type="checkbox"
                className="border-[#549877] rounded-sm accent-[#549877]"
                checked={keepSignedIn}
                onChange={() => setKeepSignedIn(!keepSignedIn)}
              />
              <p className="text-[16px] font-[300]">Keep me signed in</p>
            </div>
            <button
              className="text-white bg-[#549877] py-[16px] rounded-[4px] w-[400px]"
              type="submit"
            >
              Login
            </button>
            <div className="flex justify-center items-center gap-4">
              <div className="border-[0.5px] border-solid border-[#4B5768] w-[115px] opacity-[0.2]"></div>
              <p>or sign in with</p>
              <div className="border-[1px] border-solid border-[#4B5768] w-[115px] opacity-[0.2]"></div>
            </div>
            <div className="flex justify-center items-center gap-[16px] py-[12px] bg-[#E4E7EB] rounded-[4px] w-[400px]">
              <img src={googleicon} alt="Google Icon" />
              <a
                href="/google-auth"
                className="text-[#4B5768] text-[16px] font-[400]"
              >
                Continue with Google
              </a>
            </div>
            <a href="/singup" className="text-[#549877] font-[600]">
              Create an account
            </a>
          </>
        )}
      </form>
    </div>
  );
};

export default Login;
