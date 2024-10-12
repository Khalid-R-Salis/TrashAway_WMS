import React from "react";
import bgLogo from "../../assets/bg1About.png";
import logo from "../../assets/logo.png";
// import symbol2 from "../../assets/symbolAbout1.png";
import symbol1 from "../../assets/symbol1.png";
import bg2 from "../../assets/bg2.png";
import aboutbg1 from "../../assets/aboutbg1.png";
import aboutbg2 from "../../assets/aboutbg2.png";
import abouticon1 from "../../assets/abouticon1.svg";
import raechusabout from "../../assets/raechusAbout.png";

const scrollToValues = () => {
  const valiuesSection = document.getElementById("values");
  if (valiuesSection) {
    valiuesSection.scrollIntoView({ behavior: "smooth" });
  }
};

const About = () => {
  return (
    <>
      <div
        className=" rounded-b-[25px] bg-no-repeat bg-cover bg-center w-full  min-h-screen pt-12"
        style={{ backgroundImage: `url(${bgLogo})` }}
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
                  <a href="/services">Services</a>
                </li>
                <li className=" border-[2.5px] border-transparent hover:border-[2.5px] hover:text-light-green hover:border-b-custom ">
                  <a href="/contact">Contact</a>
                </li>
              </ul>
            </nav>

            <div className="flex justify-center items-center gap-[30px] text-white font-Inter tracking-wider">
              <button>
                <a href="/login">Sign In</a>
              </button>
              <button className="text-white bg-light-green px-[14px] py-[10px] rounded-[4px] ">
                <a href="/singup">Sign Up</a>
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center font-Inter text-center w-auto text-white mt-[180px]  ">
            <h1 className=" text-[36px] sm:text-[48px] z-10">
              About Our Waste Management
              <br /> System
            </h1>

            <div>
              <h2 className=" text-[20px] mt-[28px] font-[400px] tracking-[2px] w-[60rem]">
                Learn more about our mission to create a cleaner, greener Kano
                State through innovative waste management solutions
              </h2>
            </div>
          </div>
          <div className=" flex gap-8 mt-[40px] justify-center items-center">
            <button
              className=" flex justify-center items-center gap-2"
              onClick={scrollToValues}
            >
              <h4 className=" font-Inter text-white tracking-wide">
                View Values
              </h4>
              <img src={symbol1} alt="" />
            </button>
          </div>
        </div>
      </div>

      <div
        className=" bg-center bg-cover min-h-screen px-20"
        style={{ backgroundImage: `url(${bg2})` }}
      >
        <div className=" flex justify-center items-center gap-[80px] pt-[112px]">
          <img src={aboutbg1} alt="" />
          <div className=" flex flex-col justify-center items-start gap-[16px] font-Inter">
            <h4 className="text-white px-6 py-0 rounded-xl bg-gradient-to-r from-light-green/0 via-light-green/100 to-light-green/0">
              Mission
            </h4>

            <h1 className=" text-[35px] font-semibold text-light-black">
              Mission
            </h1>
            <p className=" w-[35rem] text-start text-[20px] text-gray-black">
              Our mission is to revolutionize waste management in Kano State by
              providing efficient, reliable, and sustainable solutions that
              benefit both the environment and the community.
            </p>
          </div>
        </div>

        <div className=" flex justify-center items-center gap-[80px] mt-[224px]">
          <div className=" flex flex-col justify-center items-start gap-[16px] font-Inter">
            <h4 className="text-white px-6 py-0 rounded-xl bg-gradient-to-r from-light-green/0 via-light-green/100 to-light-green/0">
              Vision
            </h4>

            <h1 className=" text-[35px] font-semibold text-light-black">
              Vision
            </h1>
            <p className=" w-[35rem] text-start text-[20px] text-gray-black">
              We envision a future where Kano State is a model of environmental
              sustainability, with a waste management system that is both
              effective and inclusive.
            </p>
          </div>
          <img src={aboutbg2} alt="" />
        </div>

        <div
          id="values"
          className=" flex flex-col justify-center items-center gap-[16px] font-Inter mt-[224px] mb-[32px]"
        >
          <h4 className="text-white px-6 py-0 rounded-xl bg-gradient-to-r from-light-green/0 via-light-green/100 to-light-green/0">
            Values
          </h4>

          <h1 className=" text-[35px] font-semibold text-light-black">
            Our Values
          </h1>
          <p className=" w-[70rem] text-center text-[20px] text-gray-black">
            Our core principles reflect our commitment to delivering innovative,
            efficient, and sustainable waste management solutions that benefit
            both the community and the environment.
          </p>
        </div>

        <div className=" flex justify-center flex-wrap items-center gap-[55px] mt-[32px]">
          <div className=" flex flex-col justify-center items-center gap-4 p-[24px] bg-white rounded-md shadow-custom-sh">
            <img src={abouticon1} alt="" className="h-[48px] w-[48px]" />

            <h2 className=" text-[24px] font-bold text-section-black">
              Sustainability
            </h2>
            <p className=" w-[20rem] text-[16px] text-center text-section-gray">
              We are dedicated to eco-friendly waste management, promoting
              recycling and minimizing environmental impact.
            </p>
          </div>

          <div className=" flex flex-col justify-center items-center gap-4 p-[24px] bg-white rounded-md shadow-custom-sh">
            <img src={abouticon1} alt="" className="h-[48px] w-[48px]" />

            <h2 className=" text-[24px] font-bold text-section-black">
              Efficiency
            </h2>
            <p className=" w-[20rem] text-[16px] text-center text-section-gray">
              We strive for timely, reliable, and optimized waste collection to
              ensure cleaner communities.
            </p>
          </div>

          <div className=" flex flex-col justify-center items-center gap-4 p-[24px] bg-white rounded-md shadow-custom-sh">
            <img src={abouticon1} alt="" className="h-[48px] w-[48px]" />

            <h2 className=" text-[24px] font-bold text-section-black">
              Innovation
            </h2>
            <p className=" w-[20rem] text-[16px] text-center text-section-gray">
              We use advanced technology for real-time tracking, data-driven
              insights, and automated waste solutions.
            </p>
          </div>

          <div className=" flex flex-col justify-center items-center gap-4 p-[24px] bg-white rounded-md shadow-custom-sh">
            <img src={abouticon1} alt="" className="h-[48px] w-[48px]" />

            <h2 className=" text-[24px] font-bold text-section-black">
              Community Engagement
            </h2>
            <p className=" w-[20rem] text-[16px] text-center text-section-gray">
              We work closely with local communities, addressing their waste
              management needs and fostering collaboration.
            </p>
          </div>

          <div className=" flex flex-col justify-center items-center gap-4 p-[24px] bg-white rounded-md shadow-custom-sh">
            <img src={abouticon1} alt="" className="h-[48px] w-[48px]" />

            <h2 className=" text-[24px] font-bold text-section-black">
              Accountability
            </h2>
            <p className=" w-[20rem] text-[16px] text-center text-section-gray">
              We ensure transparency and high service standards, delivering
              reliable waste management solutions.
            </p>
          </div>

          <div className=" flex flex-col justify-center items-center gap-4 p-[24px] bg-white rounded-md shadow-custom-sh">
            <img src={abouticon1} alt="" className="h-[48px] w-[48px]" />

            <h2 className=" text-[24px] font-bold text-section-black">
              Customer Satisfaction
            </h2>
            <p className=" w-[20rem] text-[16px] text-center text-section-gray">
              Our success is measured by the satisfaction of the residents,
              businesses, and municipalities we serve.
            </p>
          </div>

          {/*  */}
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

export default About;
