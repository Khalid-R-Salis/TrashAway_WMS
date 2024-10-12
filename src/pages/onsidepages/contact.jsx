import React, { useState } from "react";
import logo from "../../assets/logo.png";
import bgcontact from "../../assets/bgcontact.png";
import icons_phone from "../../assets/icons-phone.png";
import icons_mail from "../../assets/icons-mail.png";
import profileicon from "../../assets/profileicon.png";
import arrow_down from "../../assets/arrow_down.svg";

const Contact = () => {
  const [isOpen, setIsOpen] = useState(false);
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
              <ul className="flex gap-[60px] text-white ">
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
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center mt-[70px]">
          <div
            className="flex flex-col justify-center items-center gap-[32px]
      rounded-[32px] 
      bg-gradient-to-bl from-[#9DD2CC]/60 via-[#EEF5F1]/70 to-[#EAF5F4]/20 
      backdrop-blur-md 
      w-[1216px] h-[700px] p-[32px] 
      border-[5px] border-solid border-[#299D91]/70 shadow-lg"
          >
            <div className="z-10">
              <div className="flex flex-col justify-center items-center mb-[32px]">
                <h4 className="text-white px-6 py-0 rounded-xl bg-gradient-to-r from-light-green/0 via-light-green/100 to-light-green/0 w-[8rem]">
                  Contact Us
                </h4>

                <h1 className="text-[35px] font-semibold text-black">
                  Get in Touch
                </h1>
                <p className="w-[35rem] text-center text-[20px] text-black">
                  Any question or remarks? Just write us a message!
                </p>
              </div>

              <div className="flex gap-[50px] justify-center items-center">
                <div className=" flex flex-col justify-between gap-2 items-start rounded-[32px] shadow-[custom-sh2] px-[30px] py-[35px] font-Inter bg-white/30">
                  <div className=" flex justify-center items-center gap-[14px]">
                    <img src={icons_phone} alt="" />
                    <h2 className=" from-neutral-950 font-medium">
                      Call To Us
                    </h2>
                  </div>
                  <p className=" w-[18rem] text-[15px] text-[#1E1E1E] font-[400]">
                    Call us for immediate support, inquiries, or suggestions and
                    discussions.
                  </p>
                  <p className=" text-[#1E1E1E] font-[400]">
                    Phone: +234 (806) 918-2114
                  </p>
                  <div className=" border-[1px] border-solid border-[black] w-[280px] opacity-[0.12] mt-10 mb-10"></div>

                  <div className=" flex justify-center items-center gap-[14px]">
                    <img src={icons_mail} alt="" />
                    <h2 className=" from-neutral-950 font-medium">
                      Write To US
                    </h2>
                  </div>
                  <p className=" w-[18rem] text-[15px] text-[#1E1E1E]">
                    Email us about any concern, or any questions. We're here to
                    help.
                  </p>
                  <p className=" text-[#1E1E1E] font-[400]">
                    Emails: trashaway@gmail.com.com
                  </p>
                </div>
                <form>
                  <div className="rounded-[32px] shadow-[custom-sh2] h-[410px] px-[27px] py-[35px] bg-white/30 flex justify-center items-end flex-col gap-[24px]">
                    <div className="flex justify-between items-center gap-[14.3px]">
                      <input
                        className="w-[203px] h-[43px] pl-[14px] py-[11px] rounded-[4px] text-gray-700 outline-none"
                        type="text"
                        placeholder="Your Name"
                        required
                      />
                      <input
                        className="w-[203px] h-[43px] pl-[14px] py-[11px] rounded-[4px] text-gray-700 outline-none"
                        type="email"
                        placeholder="Your Email"
                        required
                      />
                      <input
                        className="w-[203px] h-[43px] pl-[14px] py-[11px] rounded-[4px] text-gray-700 outline-none"
                        type="number"
                        placeholder="Your Phone"
                        onInput={(e) => {
                          if (e.target.value.length > 11) {
                            e.target.value = e.target.value.slice(0, 11);
                          }
                        }}
                        required
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <textarea
                        className="w-[638px] h-[179px] px-[14px] py-[14px] rounded-[4px] text-gray-700 outline-none resize-none overflow-hidden"
                        placeholder="Your Message"
                        required
                      ></textarea>
                    </div>
                    <button
                      className="text-white bg-[#549877] px-[32px] py-[15px] rounded-[4px]"
                      type="submit"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
