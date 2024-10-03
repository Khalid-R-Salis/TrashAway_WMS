import React from "react";
// import bgLogo1 from "../../assets/bg1.png";
import logo from "../../assets/logo.png";
import bgcontact from "../../assets/bgcontact.png";

const Contact = () => {
  return (
    <>
      <div
        className=" bg-no-repeat bg-cover bg-center w-full  h-[1022px] pt-12"
        style={{ backgroundImage: `url(${bgcontact})` }}
      >
        <div
          className="absolute inset-0 bg-black opacity-65 h-[1022px]"
          style={{ zIndex: 0 }}
        ></div>
        <div className="relative z-10">
          <div className="flex justify-between items-center px-20">
            <a className=" h-[50px] w-[50px]" href="#">
              <img src={logo} alt="Logo" />
            </a>

            <nav className=" font-Inter tracking-widest">
              <ul className="flex gap-[35px] text-white ">
                <li className="border-[2.5px] border-transparent hover:border-[2.5px] hover:text-light-green hover:border-b-custom ">
                  <a href="/" className="">
                    Home
                  </a>
                </li>
                <li className="  border-[2.5px] border-transparent hover:border-[2.5px] hover:text-light-green hover:border-b-custom ">
                  <a href="about">About</a>
                </li>
                <li className=" border-[2.5px] border-transparent hover:border-[2.5px] hover:text-light-green hover:border-b-custom ">
                  <a href="services">Services</a>
                </li>
                <li className=" border-[2.5px] border-transparent hover:border-[2.5px] hover:text-light-green hover:border-b-custom ">
                  <a href="#">Contact</a>
                </li>
              </ul>
            </nav>

            <div className="flex justify-center items-center gap-[30px] text-white font-Inter tracking-wider">
              <button>
                <a href="#">Sign In</a>
              </button>
              <button className="text-white bg-light-green px-[14px] py-[10px] rounded-[4px] ">
                <a href="#">Sign Up</a>
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center mt-[70px]">
          <div className="flex flex-col justify-center items-center gap-[32px] rounded-[32px] border-[#299D91] border-[5px] border-solid bg-[#ffffff80] w-[1216px] h-[700px] p-[32px] ">
            <div className=" z-10 ">
              <div className=" flex flex-col justify-center items-center mb-[32px]">
                <h4 className="text-white px-6 py-0 rounded-xl bg-gradient-to-r from-light-green/0 via-light-green/100 to-light-green/0 w-[8rem]">
                  Contact Us
                </h4>

                <h1 className=" text-[35px] font-semibold text-black">
                  Get in Touch
                </h1>
                <p className=" w-[35rem] text-center text-[20px] text-white">
                  Any question or remarks? Just write us a message!
                </p>
              </div>

              <div className=" flex gap-4 justify-center items-center ">
                <div className=" rounded-[32px] shadow-[custom-sh2] h-[450px] w-[23rem] bg-white"></div>
                <div className=" rounded-[32px] shadow-[custom-sh2] h-[450px] w-[23rem] bg-white"></div>
              </div>

              {/*  */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
