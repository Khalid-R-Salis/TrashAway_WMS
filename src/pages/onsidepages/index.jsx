import React, { useState } from "react";
import api from "../../services/api";
import { useRef } from "react";
import bgLogo from "../../assets/bg1.png";
import logo from "../../assets/logo.png";
import vector1 from "../../assets/Vector1.png";
import symbol1 from "../../assets/symbol1.png";
import bg2 from "../../assets/bg2.png";
import healthIcon from "../../assets/healthIcon.png";
import clockIcon from "../../assets/clockIcon.png";
import calenderIcon from "../../assets/calendarIcon.png";
import settingIcon from "../../assets/settingIcon.png";
import line7 from "../../assets/Line7.png";
import icon1 from "../../assets/Icon1.png";
import icon2 from "../../assets/Icon2.png";
import icon3 from "../../assets/Icon3.png";
import icon4 from "../../assets/Icon4.png";
import group1 from "../../assets/Group1.png";
import group2 from "../../assets/Group2.png";
import group3 from "../../assets/Group3.png";
import kanologo from "../../assets/Kanologo.png";
import wapanlogo from "../../assets/WAPANlogo.png";
import fglogo from "../../assets/FGlogo.png";
import nesrealogo from "../../assets/NESREALogo.png";
import workers1 from "../../assets/workers1.png";
import remsablogo from "../../assets/REMSABLogo.png";
import arrowleft from "../../assets/Arrowleft.png";
import arrowright from "../../assets/ArrowRight.png";
import staricon from "../../assets/StarIcon.png";
import aishapic from "../../assets/Aishapic.png";
import sundayPic from "../../assets/SundayPic.png";
import location from "../../assets/location.png";
import cancel_onlogin from "../../assets/cancel_onlogin.png";
import profileicon from "../../assets/profileicon.png";
import arrow_down from "../../assets/arrow_down.svg";

const scrollToTestimonials = () => {
  const testimonialsSection = document.getElementById("testimonials");
  if (testimonialsSection) {
    testimonialsSection.scrollIntoView({ behavior: "smooth" });
  }
};

const Landing = () => {
  // State variables
  const [isOpen, setIsOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [capacity, setCapacity] = useState(1);
  const [location, setLocation] = useState("");
  const [time, setTime] = useState("");
  const [category, setCategory] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Handle form submission
  const handlePickupRequest = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Retrieve token and userId from localStorage
      const userSession = JSON.parse(localStorage.getItem("userSession"));
      const token = userSession?.token;
      const userId = userSession?.userId;

      // Check for token and userId
      if (!token || !userId) {
        alert("User not authenticated");
        setIsSubmitting(false);
        return;
      }

      // API request
      const response = await api.post(`/user/request-pickup/${userId}`, {
        capacity,
        location,
        time,
        category,
      });

      // Handle success response
      if (response.data && response.data.message) {
        alert(response.data.message);
        setShowForm(false); // Close form
      }
    } catch (error) {
      console.error("Pickup request failed:", error);
      setError(
        error.response?.data?.message || "Failed to create pickup request"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="new">
      <h2 className="md:hidden sm:block text-wrap text-[5rem] p-5 text-center flex justify-center items-center">
        MOBILE VIEW COMING SOON
      </h2>
      <p className=" md:hidden sm:block text-center">
        please view on wide screen
      </p>
      <body className="hidden md:block">
        {/* ---------------------------START--------------------------------------- */}
        <div
          className=" rounded-b-[25px] bg-no-repeat bg-cover bg-center w-full  min-h-screen pt-12"
          style={{ backgroundImage: `url(${bgLogo})` }}
        >
          <div
            className="absolute inset-0 bg-black opacity-50 rounded-b-[25px]"
            style={{ zIndex: 0 }}
          ></div>

          <div className="relative z-10">
            <div className="flex justify-between items-center px-20">
              <a className=" h-[50px] w-[50px]" href="#">
                <img src={logo} alt="Logo" />
              </a>

              <nav className=" font-Inter tracking-widest">
                <ul className="flex gap-[35px] text-white ml-[120px]">
                  <li className="border-[2.5px] border-transparent hover:border-[2.5px] hover:text-light-green hover:border-b-custom ">
                    <a href="/loginhome" className="">
                      Home
                    </a>
                  </li>
                  <li className="  border-[2.5px] border-transparent hover:border-[2.5px] hover:text-light-green hover:border-b-custom ">
                    <a href="/loginabout">About</a>
                  </li>
                  <li className=" border-[2.5px] border-transparent hover:border-[2.5px] hover:text-light-green hover:border-b-custom ">
                    <a href="/loginservices">Services</a>
                  </li>
                  <li className=" border-[2.5px] border-transparent hover:border-[2.5px] hover:text-light-green hover:border-b-custom ">
                    <a href="/logincontact">Contact</a>
                  </li>
                </ul>
              </nav>

              <div className="flex justify-center items-center gap-[30px] text-white font-Inter tracking-wider">
                <div className="relative flex justify-center items-center gap-[10px]">
                  <img src={profileicon} alt="Profile" />
                  <h3>Profile</h3>
                  <button onClick={() => setIsOpen(!isOpen)}>
                    <img src={arrow_down} alt="Toggle Dropdown" />
                  </button>

                  {isOpen && (
                    <ul className="absolute top-full mt-2 bg-[#EEF5F1]/60 shadow-lg rounded-md w-[150px] text-left text-black">
                      <li className="hover:bg-white p-2 font-[500]">
                        <a href="/dashboard">Dashboard</a>
                      </li>
                      <li className="hover:bg-gray-100 p-2 font-[500]">
                        <a href="/orders">Orders</a>
                      </li>
                      <li className="hover:bg-gray-100 p-2 font-[500]">
                        <a href="/collection">Collection Point</a>
                      </li>
                      <li className="hover:bg-gray-100 p-2 font-[500]">
                        <a href="/">Log out</a>
                      </li>
                    </ul>
                  )}
                </div>

                <div className=" border-white border-[1px] h-[18px]"></div>

                <button
                  id="pickuprequest"
                  className="text-white bg-light-green px-[10px] py-[10px] rounded-[4px] font-[600] text-[16px]"
                  onClick={() => setShowForm(true)}
                >
                  Request for Pickup
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center font-Inter text-center w-auto text-white mt-[180px]  ">
              <h1 className=" text-[36px] sm:text-[48px] z-10">
                Transforming Waste Management <br /> in Kano State
              </h1>

              <div className=" absolute mt-[35px] z-0">
                <img src={vector1} alt="" />
              </div>

              <div>
                <h2 className=" text-[22px] mt-[28px] font-[400px] tracking-widest">
                  Efficient waste collection and tracking for a cleaner, greener
                  Kano.
                </h2>
              </div>
            </div>
            <div className=" flex gap-8 mt-[40px] justify-center items-center">
              <button
                className="flex justify-center items-center gap-2"
                onClick={scrollToTestimonials}
              >
                <h4 className="font-Inter text-white tracking-wide">
                  View Testimonials
                </h4>
                <img src={symbol1} alt="" />
              </button>
            </div>
          </div>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-30 flex justify-center items-center overflow-hidden">
            <form
              className="font-Inter bg-[#EEF5F1] flex flex-col py-[14.793px] px-[11.834px] justify-center items-center rounded-[11.834px] gap-[17.751px]"
              onSubmit={handlePickupRequest}
            >
              <button
                type="button"
                className="absolute right-0 top-0 mt-[205px] mr-[530px]"
                onClick={() => setShowForm(false)}
              >
                Close
              </button>

              <h2 className="text-[20px] font-[600] text-center">
                Enter Amount of Recyclables
              </h2>

              <input
                type="number"
                placeholder="Capacity"
                min={1}
                max={99}
                className="outline-none w-[59px] h-[52px] py-[11.834px] px-[8.876px] rounded-[5.917px] border-[0.74px] border-solid border-[#626262] bg-[#549877] text-white"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                required
              />

              <input
                type="text"
                className="outline-none rounded-[5.917px] pl-[7.4px] py-[11px] w-[476px] h-[37px] border-[#549877] border-[1px]"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />

              <input
                type="datetime-local"
                className="outline-none rounded-[5.917px] pl-[7.4px] py-[11px] w-[476px] h-[37px] border-[#549877] border-[1px]"
                placeholder="Pickup Time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />

              <input
                type="text"
                className="outline-none rounded-[5.917px] pl-[7.4px] py-[11px] w-[476px] h-[37px] border-[#549877] border-[1px] mb-3"
                placeholder="Category of Waste"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />

              {/* Error message */}
              {error && <p className="text-red-500">{error}</p>}

              <button
                className="text-white font-Inter text-[600] text-[16.646px] bg-[#549877] py-[8.136px] px-[96.893px] rounded-[2.959px] w-[476px] h-[37px]"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Request for Pickup"}
              </button>
            </form>
          </div>
        )}

        {/* ---------------------------END--------------------------------------- */}

        {/* ---------------------------START--------------------------------------- */}
        <div
          className=" bg-center bg-cover min-h-screen"
          style={{ backgroundImage: `url(${bg2})` }}
        >
          <div className=" flex flex-col justify-center items-center gap-[16px] pt-[150px] font-Inter">
            <h4 className="text-white px-6 py-0 rounded-xl bg-gradient-to-r from-light-green/0 via-light-green/100 to-light-green/0">
              Features
            </h4>

            <h1 className=" text-[35px] font-semibold text-light-black">
              Our Features
            </h1>
            <p className=" w-[45rem] text-center text-[20px] text-gray-black">
              Efficient waste collection and real-time tracking at your
              fingertips, driving a cleaner and more sustainable future for our
              communities.
            </p>
          </div>

          <div className=" flex justify-center items-center flex-wrap gap-6 mt-[32px] ">
            <div className=" flex flex-col justify-start gap-4 p-[24px] bg-white rounded-md shadow-lg w-[19rem] ">
              <div className="h-[42px] w-[42px] bg-light-green bg-opacity-10 rounded-full flex items-center justify-center">
                <img src={clockIcon} alt="" className="h-[30px] w-[30px]" />
              </div>
              <h2 className=" text-[24px] font-bold text-section-black">
                Real-Time <br />
                Tracking
              </h2>
              <p className=" w-[17rem] text-[16px] text-section-gray">
                Monitor the exact location of waste collection vehicles in
                real-time, ensuring timely and efficient waste pickup.
              </p>
            </div>

            <div className=" flex flex-col justify-start gap-4 p-[24px] bg-white rounded-md shadow-lg w-[19rem]">
              <div className="h-[42px] w-[42px] bg-light-green bg-opacity-10 rounded-full flex items-center justify-center">
                <img src={calenderIcon} alt="" className="h-[30px] w-[30px]" />
              </div>
              <h2 className=" text-[24px] font-bold text-section-black">
                Easy
                <br />
                Scheduling
              </h2>
              <p className=" w-[17rem] text-[16px]  text-section-gray">
                Book and manage your waste collection appointments with just a
                few clicks, tailored to your convenience.
              </p>
            </div>

            <div className=" flex flex-col justify-start gap-4 p-[24px] bg-white rounded-md shadow-lg w-[19rem]">
              <div className="h-[42px] w-[42px] bg-light-green bg-opacity-10 rounded-full flex items-center justify-center">
                <img src={healthIcon} alt="" className="h-[30px] w-[30px]" />
              </div>
              <h2 className=" text-[24px] font-bold text-section-black">
                Reporting & <br />
                Analytics
              </h2>
              <p className=" w-[17rem] text-[16px]  text-section-gray">
                Access comprehensive reports and insights on waste collection
                performance, helping you stay informed.
              </p>
            </div>

            <div className=" flex flex-col justify-start gap-4 p-[24px] bg-white rounded-md shadow-lg w-[19rem]">
              <div className="h-[42px] w-[42px] bg-light-green bg-opacity-10 rounded-full flex items-center justify-center">
                <img src={settingIcon} alt="" className="h-[30px] w-[30px]" />
              </div>
              <h2 className=" text-[24px] font-bold text-section-black">
                Sustainable
                <br />
                Practices
              </h2>
              <p className=" w-[14rem] text-[16px]  text-section-gray">
                Contribute to Kano's sustainability efforts by categorizing your
                waste correctly.
              </p>
            </div>
          </div>
        </div>
        {/* ---------------------------END--------------------------------------- */}

        {/* ---------------------------START--------------------------------------- */}
        <div
          className=" bg-center bg-cover min-h-screen"
          style={{ backgroundImage: `url(${bg2})` }}
        >
          <div className=" flex flex-col justify-center items-center gap-[16px] pt-[40px] font-Inter">
            <h4 className="text-white px-6 py-0 rounded-xl bg-gradient-to-r from-light-green/0 via-light-green/100 to-light-green/0">
              Process
            </h4>
            <h1 className=" text-[35px] font-semibold text-light-black ">
              How It Works
            </h1>
            <p className=" w-[45rem] text-center text-[20px] text-gray-black">
              Discover the step-by-step journey we take to transform your
              environment.
            </p>
          </div>
          {/* END */}

          {/* ---------------------------START--------------------------------------- */}
          <div className=" flex justify-around items-center mt-[32px]">
            <div className=" flex justify-center items-center gap-3">
              <div className=" flex flex-col justify-center items-center">
                <img src={icon1} alt="" />
                <img src={line7} alt="" />
                <img src={icon2} alt="" />
              </div>
              <div className=" flex flex-col justify-center items-left gap-16">
                <div className=" flex flex-col justify-center items-left">
                  <h1 className=" text-[24px] font-Inter text-light-black font-semibold">
                    Sign Up
                  </h1>
                  <p className=" text-section-gray font-Inter">
                    Reach out to us with your shipping inquiries or to get
                    started.
                  </p>
                </div>

                <div className=" flex flex-col justify-center items-left">
                  <h1 className=" text-[24px] font-Inter text-light-black font-semibold">
                    Select Collection Point
                  </h1>
                  <p className=" text-section-gray font-Inter">
                    After contacting us, request a quote for your shipment.
                  </p>
                </div>
              </div>
            </div>

            <div className=" flex justify-center items-center gap-3">
              <div className=" flex flex-col justify-center items-center">
                <img src={icon3} alt="" />
                <img src={line7} alt="" />
                <img src={icon4} alt="" />
              </div>
              <div className=" flex flex-col justify-center items-left gap-16">
                <div className=" flex flex-col justify-center items-left">
                  <h1 className=" text-[24px] font-Inter text-light-black font-semibold">
                    Schedule Collection
                  </h1>
                  <p className=" text-section-gray font-Inter">
                    Our experts will professionally pack and handle your items
                  </p>
                </div>

                <div className=" flex flex-col justify-center items-left">
                  <h1 className=" text-[24px] font-Inter text-light-black font-semibold">
                    Track and Monitor
                  </h1>
                  <p className=" text-section-gray font-Inter">
                    Track your shipment in real-time using our online tracking
                    system.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* ---------------------------END--------------------------------------- */}

          {/* ---------------------------START--------------------------------------- */}

          <div className=" flex flex-col justify-center items-center gap-[16px] pt-[150px] font-Inter">
            <h4 className="text-white px-6 py-0 rounded-xl bg-gradient-to-r from-light-green/0 via-light-green/100 to-light-green/0">
              Statistics
            </h4>

            <h1 className=" text-[35px] font-semibold text-light-black">
              Impact Statistics
            </h1>
            <p className=" w-[60rem] text-center text-[20px] text-gray-black">
              Explore the significant strides we've made in waste management,
              from reducing pollution to enhancing community health and
              sustainability across the state.
            </p>
          </div>
          <div className=" flex justify-center items-center gap-[32px] mt-[32px]">
            <div className=" flex flex-col justify-center items-center">
              <div className="relative flex justify-center items-center">
                <img
                  src={group1}
                  alt=""
                  className="w-full h-full object-contain"
                />
                <p className="absolute inset-0 flex justify-center items-center text-section-gray text-[20px] font-semibold">
                  15,000 kg
                </p>
              </div>

              <p className=" mt-6 text-[20px] text-light-black text-center">
                Total Plastic Recycled
              </p>
            </div>
            <div className=" flex flex-col justify-center items-center">
              <div className="relative flex justify-center items-center">
                <img
                  src={group2}
                  alt=""
                  className="w-full h-full object-contain"
                />
                <p className="absolute inset-0 flex justify-center items-center text-section-gray text-[20px] font-semibold">
                  70,000 kg
                </p>
              </div>

              <p className=" mt-6 text-[20px] text-light-black text-center">
                Plastic Waste into New Products
              </p>
            </div>
            <div className=" flex flex-col justify-center items-center">
              <div className="relative flex justify-center items-center">
                <img
                  src={group3}
                  alt=""
                  className="w-full h-full object-contain"
                />
                <p className="absolute inset-0 flex justify-center items-center text-section-gray text-[20px] font-semibold text-center">
                  20% compared to last month
                </p>
              </div>

              <p className=" mt-6 text-[20px] text-light-black text-center">
                Increase in Recycling Rate
              </p>
            </div>
          </div>

          {/* ---------------------------END--------------------------------------- */}

          {/* ---------------------------START--------------------------------------- */}

          <div className=" flex flex-col justify-center items-center gap-[16px] font-Inter">
            <h4 className="text-white mt-[8rem] px-6 py-0 rounded-xl bg-gradient-to-r from-light-green/0 via-light-green/100 to-light-green/0">
              partners
            </h4>

            <h1 className=" text-[35px] font-semibold text-light-black">
              Our Partners
            </h1>
            <div className="relative overflow-hidden w-full h-auto">
              <div className="animate-marquee flex whitespace-nowrap">
                {/* First Set of Images */}
                <img src={kanologo} alt="Kanologo" className="" />
                <img src={wapanlogo} alt="WAPANlogo" className="" />
                <img src={fglogo} alt="FGLogo" className="" />
                <img src={nesrealogo} alt="NESREALogo" className="" />
                <img src={remsablogo} alt="REMSAB" className=" w-[8rem]" />
                <img src={kanologo} alt="Kanologo" className="" />
                <img src={wapanlogo} alt="WAPANlogo" className="" />
                <img src={fglogo} alt="FGLogo" className="" />
                <img src={nesrealogo} alt="NESREALogo" className="" />
                <img src={remsablogo} alt="REMSAB" className=" w-[8rem]" />

                {/* Second Set of Images (Identical to the First) */}
                <img src={kanologo} alt="Kanologo" className="" />
                <img src={wapanlogo} alt="WAPANlogo" className="" />
                <img src={fglogo} alt="FGLogo" className="" />
                <img src={nesrealogo} alt="NESREALogo" className="" />
                <img src={remsablogo} alt="REMSAB" className=" w-[8rem]" />
                <img src={kanologo} alt="Kanologo" className="" />
                <img src={wapanlogo} alt="WAPANlogo" className="" />
                <img src={fglogo} alt="FGLogo" className="" />
                <img src={nesrealogo} alt="NESREALogo" className="" />
                <img src={remsablogo} alt="REMSAB" className=" w-[8rem]" />
              </div>
            </div>

            {/* FEEL THE PUSH SECTION */}
            <div className=" flex justify-center items-center p-[50px] rounded-xl bg-gray-green gap-[50px] text-white mt-[8rem]">
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
                <img src={workers1} alt="" className=" h-[20rem] w-[25rem]" />
              </div>
            </div>
          </div>

          {/* ---------------------------END--------------------------------------- */}

          {/* ---------------------------START--------------------------------------- */}

          <div
            id="testimonials"
            className="flex flex-col justify-center items-center gap-[16px] font-Inter mt-[8rem]"
          >
            <h4 className="text-white px-6 py-0 rounded-xl bg-gradient-to-r from-light-green/0 via-light-green/100 to-light-green/0">
              Testimonials
            </h4>
            <h1 className="text-[35px] font-semibold text-light-black">
              User Testimonials
            </h1>
            <p className="w-[45rem] text-center text-[20px] text-gray-black">
              Hear from residents and partners who have experienced the positive
              impact of our waste management system in their daily lives.
            </p>
            <div className=" flex justify-center items-center gap-[50px] mt-[28px]">
              <div className="arrowpic">
                {" "}
                <img src={arrowleft} alt="" />{" "}
              </div>
              <div className=" flex flex-col justify-center items-center gap-6">
                <div className=" flex justify-center items-center gap-1">
                  <img src={staricon} alt="" />
                  <img src={staricon} alt="" />
                  <img src={staricon} alt="" />
                  <img src={staricon} alt="" />
                  <img src={staricon} alt="" />
                </div>
                <div className=" items-center w-[30rem]">
                  <h2 className=" text-center text-[18px] font-[500px] leading-[160%] text-testimony-gray">
                    Thanks to the Trash Away System, Dan Agundi is now clean!
                  </h2>
                </div>
                <div className=" flex flex-col justify-center items-center gap-1">
                  <img src={sundayPic} alt="" />
                  <p className=" text-testimony-gray tracking-[2px]">
                    Jeramiah Sunday
                  </p>
                </div>
              </div>
              <div className=" flex flex-col justify-center items-center gap-6">
                <div className=" flex justify-center items-center gap-1">
                  <img src={staricon} alt="" />
                  <img src={staricon} alt="" />
                  <img src={staricon} alt="" />
                  <img src={staricon} alt="" />
                  <img src={staricon} alt="" />
                </div>
                <div className=" items-center w-[30rem]">
                  <h2 className=" text-center text-[18px] font-[500px] leading-[160%] text-testimony-gray">
                    Thanks to This Waste Managment System. No MORE TRASH!!
                  </h2>
                </div>
                <div className=" flex flex-col justify-center items-center gap-1">
                  <img src={aishapic} alt="" />
                  <p className=" text-testimony-gray tracking-[2px]">
                    Aishat Kabiru
                  </p>
                </div>
              </div>
              <div className="arrowpic">
                {" "}
                <img src={arrowright} alt="" />{" "}
              </div>
            </div>
          </div>

          <div className=" w-full h-[8rem] "></div>

          {/* ---------------------------END--------------------------------------- */}
          {/* ---------------------------START FOOTER--------------------------------------- */}

          {/* ---------------------------END--------------------------------------- */}
        </div>
      </body>
    </div>
  );
};

export default Landing;
