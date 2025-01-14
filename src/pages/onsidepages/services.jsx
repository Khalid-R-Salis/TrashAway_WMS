import { useState, useEffect, useCallback } from "react";

// import React from "react";
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
import locationImage from "../../assets/location.png";
import cancel_onlogin from "../../assets/cancel_onlogin.png";
import profileicon from "../../assets/profileicon.png";
import arrow_down from "../../assets/arrow_down.svg";
import { useNavigate } from "react-router-dom";
import { PaystackButton } from "react-paystack";

const Services = () => {
  // State to track the form's visibility
  // State variables
  // const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [capacity, setCapacity] = useState(1);
  const [location, setLocation] = useState("");
  const [time, setTime] = useState("");
  const [category, setCategory] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  // Handle form submission
  const handlePickupRequest = async () => {
    setError("");

    try {
      // Retrieve token and userId from localStorage
      const userSession = JSON.parse(localStorage.getItem("userSession"));
      const token = userSession?.token;
      const userId = userSession?.id;

      // Check for token and userId
      if (!token || !userId) {
        alert("User not authenticated");
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

      if (!response.ok) {
        console.log(data.error);
        throw new Error(data.error);
      }

      if (data.message === "jwt expired") {
        navigate("/login");
      }

      // // Handle success response
      if (data && data.message) {
        setShowForm(false); // Close form
      }

      setCapacity("");
      setLocation("");
      setTime("");
      setCategory("");
    } catch (error) {
      console.error("Pickup request failed:", error);
      setError(error.message);
    }
  };

  // @desc: handle payment modal not needed because paystack handles all the heavy lifting
  // const openPaymentForm = () => {
  //   setError("");
  //   setShowForm(false);
  //   setShowPaymentForm(true);
  // };

  // @desc: getting user email from the local storage
  useEffect(() => {
    const userSession = JSON.parse(localStorage.getItem("userSession"));
    const email = userSession?.email;
    setEmail(email);
  }, []);

  // @desc: PAYSTACK CONFIGURATION
  const PUBLIC_KEY = "pk_test_2148e071016bd11a6dd37489549cafe567b6f67c";

  const componentProps = {
    email: email,
    amount: capacity * 3000 * 100, // Paystack requires amount in kobo (Naira * 100)
    publicKey: PUBLIC_KEY,
    text: "Proceed to Payment",
    onSuccess: (response) => {
      handlePickupRequest();
      setIsDisabled(true);
      alert(`Pickup Order Submitted. Transaction ID ${response.reference}`);
    },
    onClose: () => {
      setIsDisabled(true);
      alert("Pickup Order Cancelled");
    },
  };

  const validateFields = useCallback(() => {
    const errors = {};
    if (!capacity || !location || !time || !category) {
      errors.allErrors = "errors available";
    }
    return Object.keys(errors).length === 0;
  }, [capacity, location, category, time]);

  useEffect(() => {
    const isValid = validateFields();
    setIsDisabled(!isValid);
  }, [validateFields]);

  useEffect(() => {
    if (!isDisabled) {
      document.body.classList.add("overflow-hidden", "h-screen");
    }

    // Cleanup: Remove classes when component unmounts
    return () =>
      document.body.classList.remove("overflow-hidden", "h-screen", "fixed");
  }, [isDisabled]);
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
                  <a href="/loginhome" className="">
                    Home
                  </a>
                </li>
                <li className="  border-[2.5px] border-transparent hover:border-[2.5px] hover:text-light-green hover:border-b-custom ">
                  <a href="/loginabout">About</a>
                </li>
                <li className=" border-[2.5px] border-transparent hover:border-[2.5px] hover:text-light-green hover:border-b-custom ">
                  <a href="/loginservices" className=" underline">
                    Services
                  </a>
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
                onClick={() => setShowForm(true)}
              >
                Request for Pickup
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

      {/* Pickup Request Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 flex justify-center items-center overflow-hidden">
          <div className="font-Inter bg-[#EEF5F1] flex flex-col py-[14.793px] px-[11.834px] justify-center items-center rounded-[11.834px] gap-[17.751px]">
            <div className="relative w-full">
              <button
                type="button"
                className="absolute top-4 right-4 bg-black text-white p-2 rounded-full"
                onClick={() => {
                  setShowForm(false);
                  setCapacity("");
                  setLocation("");
                  setTime("");
                  setCategory("");
                  setError("");
                }}
              >
                X
              </button>

              <h2 className="text-[20px] font-[600] text-center mt-4">
                Enter Amount of Recyclables
              </h2>
            </div>

            <input
              type="number"
              placeholder="1"
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

            <PaystackButton
              {...componentProps}
              disabled={isDisabled}
              className={`${
                isDisabled
                  ? "bg-gray-400 cursor-not-allowed font-Inter text-[600] text-[16.646px] py-[8.136px] px-[96.893px] rounded-[2.959px] w-[476px] h-[37px]"
                  : "text-white font-Inter text-[600] text-[16.646px] bg-[#549877] py-[8.136px] px-[96.893px] rounded-[2.959px] w-[476px] h-[37px] overflow-hidden"
              }`}
            />
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {/* {showPaymentForm && (
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
                
              </button>
            </div>
          </form>
        </div>
      )} */}
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
