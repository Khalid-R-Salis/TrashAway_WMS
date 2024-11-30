// import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import bgLogo from "../../assets/bg1About.png";
import logo from "../../assets/logo.png";
import symbol1 from "../../assets/symbol1.png";
import bg2 from "../../assets/bg2.png";
import aboutbg1 from "../../assets/aboutbg1.png";
import aboutbg2 from "../../assets/aboutbg2.png";
import abouticon1 from "../../assets/abouticon1.svg";
import raechusabout from "../../assets/raechusAbout.png";
import locationImage from "../../assets/location.png";
import cancel_onlogin from "../../assets/cancel_onlogin.png";
import profileicon from "../../assets/profileicon.png";
import arrow_down from "../../assets/arrow_down.svg";

const scrollToValues = () => {
  const valiuesSection = document.getElementById("values");
  if (valiuesSection) {
    valiuesSection.scrollIntoView({ behavior: "smooth" });
  }
};

const About = () => {
  // State to track the form's visibility
  const [showForm, setShowForm] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [capacity, setCapacity] = useState(1);
  const [location, setLocation] = useState("");
  const [time, setTime] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  // @desc: handling pickup requests
  const handlePickupRequest = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Retrieve token and userId from localStorage
      const userSession = JSON.parse(localStorage.getItem("userSession"));
      const token = userSession?.token;
      const userId = userSession?.id;

      // Check for token and userId
      if (!token || !userId) {
        alert("User not authenticated");
        setIsSubmitting(false);
        console.log("Tokon and Id matched");
        return;
      }

      const categoryValue =
        category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();

      const response = await fetch(
        `https://waste-mangement-backend-3qg6.onrender.com/api/user/request-pickup/${userId}`,
        {
          method: "POST",
          body: JSON.stringify({
            capacity,
            location,
            time,
            category: categoryValue,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        setIsSubmitting(false);
        console.log(data.error);
        throw new Error(data.error);
      }

      if (data.message === "jwt expired") {
        navigate("/login");
      }

      // // Handle success response
      if (data && data.message) {
        alert(data.message);
        setShowForm(false); // Close form
      }

      setIsSubmitting(false);
    } catch (error) {
      console.error("Pickup request failed:", error);
      setError(error.message);
      setIsSubmitting(false);
    }
  };

  // Handle Payment Modal
  const openPaymentForm = () => {
    if (!capacity || !location || !time || !category) {
      setError("Please fill all fields before proceeding to payment.");
      return;
    }
    setError("");
    setShowForm(false);
    setShowPaymentForm(true);
  };

  const handlePayment = (e) => {
    e.preventDefault(); // Prevent the default behavior of form submission
    setShowPaymentForm(false); // Close the payment modal
    alert("Payment successful! Pickup request created.");
    // Add any payment API logic here if needed
  };
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
                  <a href="/loginhome" className="">
                    Home
                  </a>
                </li>
                <li className="  border-[2.5px] border-transparent hover:border-[2.5px] hover:text-light-green hover:border-b-custom ">
                  <a href="/loginabout" className=" underline">
                    About
                  </a>
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
                    {/* <li className="hover:bg-gray-100 p-2 font-[500]">
                      <a href="/collection">Collection Point</a>
                    </li> */}
                  </ul>
                )}
              </div>

              <div className=" border-white border-[1px] h-[18px]"></div>

              <button
                id="pickuprequest"
                className="text-white bg-light-green px-[10px] py-[10px] rounded-[4px] font-[600] text-[16px]"
                onClick={() => setShowForm(true)} // Show the form when clicked
              >
                Request for Pickup
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

      {/* Pickup Request Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 flex justify-center items-center overflow-hidden">
          <form className="font-Inter bg-[#EEF5F1] flex flex-col py-[14.793px] px-[11.834px] justify-center items-center rounded-[11.834px] gap-[17.751px]">
            <button
              type="button"
              className="absolute right-0 bottom-[33rem] mt-[205px] mr-[530px]"
              onClick={() => {
                setShowForm(false);
                // Clear form fields when closed
                setCapacity("");
                setLocation("");
                setTime("");
                setCategory("");
                setError("");
              }}
            >
              X
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
              type="date"
              className="outline-none rounded-[5.917px] pl-[7.4px] py-[11px] w-[476px] h-[37px] border-[#549877] border-[1px]"
              placeholder="Pickup Time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />

            <select
              className="outline-none rounded-[5.917px] pl-[7.4px] py-[9px] w-[476px] h-[37px] border-[#549877] border-[1px] mb-3"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="Organic">Organic</option>
              <option value="Recyclable">Recyclable</option>
              <option value="Hazardous">Hazardous</option>
            </select>

            {error && <p className="text-red-500">{error}</p>}

            <button
              className="text-white font-Inter text-[600] text-[16.646px] bg-[#549877] py-[8.136px] px-[96.893px] rounded-[2.959px] w-[476px] h-[37px]"
              type="button"
              onClick={openPaymentForm} // Trigger payment modal
            >
              Proceed to Payment
            </button>
          </form>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 flex justify-center items-center">
          <form
            className="font-Inter bg-[#EEF5F1] flex flex-col py-[14.793px] px-[11.834px] justify-center items-center rounded-[11.834px] gap-[17.751px]"
            onSubmit={(e) => {
              e.preventDefault();
              const cardNumber = document
                .getElementById("cardNumber")
                .value.trim();
              const expiryDate = document
                .getElementById("expiryDate")
                .value.trim();
              const cvv = document.getElementById("cvv").value.trim();
              const pin = document.getElementById("pin").value.trim();

              const errors = [];
              if (cardNumber.length !== 16)
                errors.push("Card Number must be 16 digits.");
              if (!/^\d{2}\/\d{2}$/.test(expiryDate))
                errors.push("Expiry Date must be in MM/YY format.");
              if (cvv.length !== 3) errors.push("CVV must be 3 digits.");
              if (pin.length !== 4) errors.push("Pin must be 4 digits.");

              if (errors.length > 0) {
                alert(errors.join("\n"));
              } else {
                handlePayment();
              }
            }}
          >
            <button
              type="button"
              className="absolute right-[32rem] top-[13.5rem] mt-[20px] mr-[20px] text-[16px] text-[#626262]"
              onClick={() => {
                setShowPaymentForm(false);
                // Clear form fields when closed
                document.getElementById("cardNumber").value = "";
                document.getElementById("expiryDate").value = "";
                document.getElementById("cvv").value = "";
                document.getElementById("pin").value = "";
              }}
            >
              X
            </button>

            <h2 className="text-[20px] font-[600] text-center">
              Make Payment via Card
            </h2>

            <div className="relative w-[476px] h-[37px]">
              <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[#ffffff] text-md">
                Total Amount:
              </span>
              <input
                type="text"
                placeholder={`NGN ${capacity * 3000}`}
                className="outline-none w-full h-[37px] py-[11.834px] pl-[120px] pr-[8.876px] rounded-[5.917px] border-[0.74px] border-solid border-[#626262] bg-[#549877] text-white"
                value={`NGN ${capacity * 3000}`}
                disabled
              />
            </div>

            <input
              id="cardNumber"
              type="text"
              placeholder="Card Number"
              maxLength={16}
              className="outline-none rounded-[5.917px] pl-[7.4px] py-[11px] w-[476px] h-[37px] border-[#549877] border-[1px]"
              required
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, "");
              }}
            />

            <div className="flex justify-between gap-3">
              <input
                id="expiryDate"
                type="text"
                placeholder="Expire: MM / YY"
                maxLength={5}
                className="outline-none rounded-[5.917px] pl-[7.4px] py-[11px] w-[230px] h-[37px] border-[#549877] border-[1px]"
                required
                onInput={(e) => {
                  let value = e.target.value.replace(/[^0-9]/g, "");
                  if (value.length > 2) {
                    value = value.slice(0, 2) + "/" + value.slice(2, 4);
                  }
                  e.target.value = value.slice(0, 5);
                }}
              />

              <input
                id="cvv"
                type="text"
                placeholder="CVV"
                maxLength={3}
                className="outline-none rounded-[5.917px] pl-[7.4px] py-[11px] w-[230px] h-[37px] border-[#549877] border-[1px]"
                required
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, "");
                }}
              />
            </div>

            <input
              id="pin"
              type="password"
              placeholder="Card Pin"
              maxLength={4}
              className="outline-none rounded-[5.917px] pl-[7.4px] py-[11px] w-[476px] h-[37px] border-[#549877] border-[1px]"
              required
            />

            <div className="flex justify-center items-center gap-8">
              <button
                type="button"
                className="text-white font-Inter text-[600] text-[16.646px] bg-[#374840] py-[8.136px] px-[20px] rounded-[2.959px] h-[37px]"
                onClick={() => {
                  setShowPaymentForm(false);
                  setShowForm(true);
                }}
              >
                {"<"} Back
              </button>
              <button
                className="text-white font-Inter text-[600] text-[16.646px] bg-[#549877] py-[8.136px] px-[80px] rounded-[2.959px] h-[37px]"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Request for Pickup"}
                {/* Request for Pickup */}
              </button>
            </div>
          </form>
        </div>
      )}

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
