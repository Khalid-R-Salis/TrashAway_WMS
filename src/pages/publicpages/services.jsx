import React from "react";
// import bgLogo1 from "../../assets/bg1.png";
import bgServices from "../../assets/image.png";

import logo from "../../assets/logo.png";
import symbol2 from "../../assets/symbolAbout1.png";
import bg2 from "../../assets/bg2.png";
import raechusabout from "../../assets/raechusAbout.png";
import servicesimg1 from "../../assets/servicesimg1.png";
import servicesimg2 from "../../assets/servicesimg2.png";
import servicesimg3 from "../../assets/servicesimg3.png";
import servicesimg4 from "../../assets/servicesimg4.png";
import servicesimg5 from "../../assets/servicesimg5.png";

const Services = () => {
  return (
    <>
      <div
        className=" rounded-b-[25px] bg-no-repeat bg-cover bg-center w-full  min-h-screen pt-12"
        style={{ backgroundImage: `url(${bgServices})` }}
      >
        <div
          className="absolute inset-0 bg-black opacity-65 rounded-b-[25px]"
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
                  <a href="/about">About</a>
                </li>
                <li className=" border-[2.5px] border-transparent hover:border-[2.5px] hover:text-light-green hover:border-b-custom ">
                  <a href="/services" className=" underline">
                    Services
                  </a>
                </li>
                <li className=" border-[2.5px] border-transparent hover:border-[2.5px] hover:text-light-green hover:border-b-custom ">
                  <a href="/contact">Contact</a>
                </li>
              </ul>
            </nav>

            <div className="flex justify-center items-center gap-[30px] text-white font-Inter tracking-wider">
              <button>
                <a href="/login">Log In</a>
              </button>
              <button className="text-white bg-light-green px-[14px] py-[10px] rounded-[4px] ">
                <a href="/singup">Sign Up</a>
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center font-Inter text-center w-auto text-white mt-[180px]  ">
            <h1 className=" text-[36px] sm:text-[48px] z-10">Our Services</h1>

            <div>
              <h2 className=" text-[20px] mt-[28px] font-[400px] tracking-[2px] w-[60rem]">
                Explore the range of waste management solutions we offer to help
                keep Kano State clean and sustainable.
              </h2>
            </div>
          </div>
          <div className=" flex gap-8 mt-[40px] justify-center items-center">
            <div className=" flex justify-center items-center gap-2">
              <h4 className=" font-Inter text-white tracking-wide">
                Our Service
              </h4>
              <img src={symbol2} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div
        className=" bg-center bg-cover min-h-screen px-20"
        style={{ backgroundImage: `url(${bg2})` }}
      >
        <div className=" flex justify-center items-center gap-[80px] pt-[112px] mb-[140px]">
          <div className=" flex flex-col justify-center items-start gap-[16px]">
            <h1 className=" text-[35px] font-semibold text-light-black">
              Waste Collection:
            </h1>
            <p className=" w-[35rem] text-start text-[20px] text-gray-black">
              Reliable waste collection services tailored to your convenience.
              Schedule regular pickups from designated collection points and
              ensure timely disposal of your waste
            </p>
            <h3 className=" text-[24px] font-semibold text-light-black">
              Key Features
            </h3>
            <ul className="text-start text-[20px] text-gray-black list-disc ml-8">
              <li>Flexible scheduling options.</li>
              <li>Notifications for upcoming collections.</li>
              <li>GPS tracking of collection vehicles.</li>
            </ul>
          </div>
          <div className="img">
            <img src={servicesimg1} alt="" />
          </div>
        </div>

        <div className=" flex justify-center items-center gap-[80px] pt-[112px] mb-[140px]">
          <div className="img">
            <img src={servicesimg2} alt="" />
          </div>
          <div className=" flex flex-col justify-center items-start gap-[16px]">
            <h1 className=" text-[35px] font-semibold text-light-black">
              Waste Categorization:
            </h1>
            <p className=" w-[35rem] text-start text-[20px] text-gray-black">
              Proper categorization of waste for more effective disposal and
              recycling. We support the segregation of organic, recyclable, and
              hazardous waste to minimize environmental impact.
            </p>
            <h3 className=" text-[24px] font-semibold text-light-black">
              Key Features
            </h3>
            <ul className="text-start text-[20px] text-gray-black list-disc ml-8">
              <li>Easy-to-follow waste categorization guidelines.</li>
              <li>Dedicated collection points for different waste types.</li>
              <li>Educational resources on waste segregation.</li>
            </ul>
          </div>
        </div>

        <div className=" flex justify-center items-center gap-[80px] pt-[112px] mb-[140px]">
          <div className=" flex flex-col justify-center items-start gap-[16px]">
            <h1 className=" text-[35px] font-semibold text-light-black">
              Real-Time Tracking:
            </h1>
            <p className=" w-[35rem] text-start text-[20px] text-gray-black">
              Monitor waste collection vehicles in real-time, ensuring
              transparency and reliability in our waste management process. Know
              exactly when your waste will be collected.
            </p>
            <h3 className=" text-[24px] font-semibold text-light-black">
              Key Features
            </h3>
            <ul className="text-start text-[20px] text-gray-black list-disc ml-8">
              <li>Live tracking on a map.</li>
              <li>Estimated time of arrival notifications.</li>
              <li>Route optimization for efficient collection.</li>
            </ul>
          </div>
          <div className="img">
            <img src={servicesimg3} alt="" />
          </div>
        </div>

        <div className=" flex justify-center items-center gap-[80px] pt-[112px] mb-[140px]">
          <div className="img">
            <img src={servicesimg4} alt="" />
          </div>
          <div className=" flex flex-col justify-center items-start gap-[16px]">
            <h1 className=" text-[35px] font-semibold text-light-black">
              Reporting and Analytics:
            </h1>
            <p className=" w-[35rem] text-start text-[20px] text-gray-black">
              Gain insights into waste collection performance and environmental
              impact with our detailed reports and analytics. Make data-driven
              decisions to improve waste management practices.
            </p>
            <h3 className=" text-[24px] font-semibold text-light-black">
              Key Features
            </h3>
            <ul className="text-start text-[20px] text-gray-black list-disc ml-8">
              <li>
                Customizable reports on waste volume and collection efficiency.
              </li>
              <li>Dashboards for monitoring environmental impact.</li>
              <li>Performance tracking of waste management efforts.</li>
            </ul>
          </div>
        </div>

        <div className=" flex justify-center items-center gap-[80px] pt-[112px] mb-[140px]">
          <div className=" flex flex-col justify-center items-start gap-[16px]">
            <h1 className=" text-[35px] font-semibold text-light-black">
              Sustainability Programs:
            </h1>
            <p className=" w-[35rem] text-start text-[20px] text-gray-black">
              Join our initiatives aimed at promoting sustainable waste
              management practices. From recycling programs to community
              clean-up events, we are committed to building a greener future for
              Kano State.
            </p>
            <h3 className=" text-[24px] font-semibold text-light-black">
              Key Features
            </h3>
            <ul className="text-start text-[20px] text-gray-black list-disc ml-8">
              <li>Community recycling drives.</li>
              <li>Educational workshops on waste reduction.</li>
              <li>Support for local environmental projects.</li>
            </ul>
          </div>
          <div className="img">
            <img src={servicesimg5} alt="" />
          </div>
        </div>

        <div className=" flex flex-col justify-center items-center gap-[16px] font-Inter mt-[224px] pb-[142px]">
          <div className=" flex justify-center items-center p-[50px] rounded-xl bg-gray-green gap-[50px] text-white ">
            <div className="1">
              <h1 className=" text-[40px] w-[20rem] leading-[45px] mb-2 font-Inter font-[400px]">
                Feel the push? join us for free
              </h1>
              <p className=" mb-[25px] tracking-[2px] font-[1px] font-Inter">
                Enter your email below for our News Letter.
              </p>
              <div className=" flex justify-center items-center gap-3 ">
                <input
                  type="text"
                  placeholder={"✉️Email Address"}
                  className=" p-2 rounded-[4px] text-gray-700 w-[20rem] bg-slate-100 focus: outline-none "
                />
                <button className="text-white bg-light-green px-[14px] py-[8px] rounded-[4px] ">
                  <a href="#">Sign Up</a>
                </button>
              </div>
            </div>
            <div className="">
              <img src={raechusabout} alt="" className=" h-[20rem] w-[25rem]" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
