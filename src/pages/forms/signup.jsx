import React from "react";
import { useState } from "react";
import logo from "../../assets/logo.png";
import formbg from "../../assets/formsbg.png";
import googleicon from "../../assets/googleicon.png";
import eyeicon from "../../assets/eyeicon.png";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div
        className=" bg-no-repeat bg-cover bg-center w-full pt-12 overflow-hidden"
        style={{ backgroundImage: `url(${formbg})` }}
      >
        <form
          action=""
          className=" font-Inter text-[#191D23] flex flex-col justify-center items-center gap-[24px]"
        >
          <img src={logo} alt="" className=" mb-[40px]" />
          <h2 className=" text-[24px] font-[700]">Create an Account</h2>
          <div className=" flex flex-col justify-center items-start gap-[8px]">
            <p className=" text-[16px] font-[500] ">Name</p>
            <input
              type="text"
              placeholder="Khalid Rabiu Salis"
              className=" outline-none rounded-[8px] px-[16px] py-[12px] w-[400px] h-[48px] border-[#4B5768] border-[1px] "
              required
            />
          </div>

          <div className=" flex flex-col justify-center items-start gap-[8px]">
            <p className=" text-[16px] font-[500] ">Email Address</p>
            <input
              type="email"
              placeholder="khalidrabiu@gmail.com"
              className=" outline-none rounded-[8px] px-[16px] py-[12px] w-[400px] h-[48px] border-[#4B5768] border-[1px] "
              required
            />
          </div>

          <div className=" flex flex-col justify-center items-start gap-[8px]">
            <p className=" text-[16px] font-[500] ">Phone Number</p>
            <input
              type="number"
              placeholder="08011111111"
              className=" outline-none rounded-[8px] px-[16px] py-[12px] w-[400px] h-[48px] border-[#4B5768] border-[1px] "
              onInput={(e) => {
                if (e.target.value.length > 11) {
                  e.target.value = e.target.value.slice(0, 11);
                }
              }}
              required
            />
          </div>

          <div className=" flex flex-col justify-center items-start gap-[8px]">
            <div className=" flex justify-between items-center w-full">
              <p className=" text-[16px] font-[500] ">Password</p>
            </div>
            <div className="relative">
              <input
                type={showPassword ? " text" : "password"}
                className="bg-no-repeat bg-[20px_center] bg-[length:20px_20px] outline-none rounded-[8px] pl-[48px] pr-[16px] py-[12px] w-[400px] h-[48px] border-[#4B5768] border-[1px]"
                style={{ backgroundImage: `url(${eyeicon})` }}
                placeholder="Enter Your Password"
                required
              />
              {/* Hidden button overlay to detect click on the icon */}
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 left-2 w-10 h-full"
                aria-label="Toggle password visibility"
              />
            </div>
          </div>
          <div className=" mt-[8px] mb-[-10px] flex justify-start items-center gap-[16px] w-full ml-[74%] ">
            <p className=" text-[14px] font-[400]">
              By continuring, you agree to our{" "}
              <a href="/ourterms" className=" text-[#549877]">
                terms of service.
              </a>
            </p>
          </div>
          <button
            class="text-white bg-[#549877] py-[16px] rounded-[4px] w-[400px]"
            type="submit"
          >
            Sign up
          </button>
          <div className=" flex justify-center items-center gap-4">
            <div class=" border-[0.5px] border-solid border-[#4B5768] w-[115px] opacity-[0.2]"></div>
            <p>or sign up with</p>
            <div class=" border-[1px] border-solid border-[#4B5768] w-[115px] opacity-[0.2]"></div>
          </div>
          <div className=" flex justify-center items-center gap-[16px] py-[12px] bg-[#E4E7EB] rounded-[4px] w-[400px]">
            <img src={googleicon} alt="" />
            <a href="" className=" text-[#4B5768] text-[16px] font-[400]">
              {" "}
              Continue with Google
            </a>
          </div>
          <div className=" flex justify-center items-center gap-1 mb-10">
            <p>Already have an account?</p>
            <a href="/login" className=" text-[#549877] font-[600]">
              {" "}
              Login in here
            </a>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
