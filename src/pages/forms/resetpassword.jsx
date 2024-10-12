import React from "react";
import logo from "../../assets/logo.png";
import formbg from "../../assets/formsbg.png";

const Resetpassword = () => {
  return (
    <>
      <div
        className=" bg-no-repeat bg-cover bg-center w-full pt-12 overflow-hidden h-[100vh]"
        style={{ backgroundImage: `url(${formbg})` }}
      >
        <form
          action=""
          className=" font-Inter text-[#191D23] flex flex-col justify-center items-center gap-[35px] mt-[40px]"
        >
          <a href="/" className=" mb-[40px]">
            <img src={logo} alt="" />
          </a>
          <h2 className=" text-[24px] font-[700]">Forgot Password?</h2>
          <p className=" text-[#666] text-[18px] w-[342px] text-center leading-6 mt-[-30px]">
            Enter your email address to get the password reset link.
          </p>
          <div className=" flex flex-col justify-center items-start gap-[8px]">
            <p className=" text-[16px] font-[500] ">Email Address</p>
            <input
              type="email"
              placeholder="khalidrabiu@gmail.com"
              className=" outline-none rounded-[8px] px-[16px] py-[12px] w-[400px] h-[48px] border-[#4B5768] border-[1px] "
              required
            />
          </div>
          <button
            class="text-white bg-[#549877] py-[16px] rounded-[4px] w-[400px]"
            type="submit"
          >
            Password Reset
          </button>
          <a href="/login" className=" text-[#878787] font-[600]">
            {" "}
            Back to login
          </a>
        </form>
      </div>
    </>
  );
};
export default Resetpassword;
