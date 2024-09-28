import React from "react";
import LogoFooter from "../assets/LogoFooter.png";
import facebookIcon from "../assets/facebookIcon.png";
import twitterIcon from "../assets/twitterIcon.png";
import youtubeIcon from "../assets/youtubeIcon.png";

const downfooter = () => {
  return (
    <>
      <div className="new"></div>
      <footer className=" bg-[#234032] text-[#FFF] font-Inter py-[48px] px-[108px] hidden md:block">
        <div className="flex justify-between items-start">
          <div className="foot1">
            <a href="#">
              <img src={LogoFooter} alt="" />
            </a>
          </div>
          <div className=" flex flex-col justify-center items-start gap-6">
            <h2 className=" font-[500px] opacity-[0.4] ">INFOR</h2>
            <nav className=" flex flex-col justify-start items-center gap-1 ">
              <ul className=" text-[14px] font-[2px] leading-[200%] opacity-[0.8]">
                <li>
                  <a href="#">About us</a>
                </li>
                <li>
                  <a href="#">For customers</a>
                </li>
                <li>
                  <a href="#">Contacts</a>
                </li>
              </ul>
            </nav>
          </div>
          <div className=" flex flex-col justify-center items-start gap-6">
            <h2 className=" font-[500px] opacity-[0.4] ">CONTACT US</h2>
            <div className=" flex flex-col justify-center items-start gap-[4px] opacity-[0.8]">
              <h2>+234 80 6918 2114</h2>
              <h2>trashaway@gmail.com</h2>
            </div>
          </div>
          <div className=" flex flex-col justify-center items-start gap-6">
            <h2 className=" font-[500px] opacity-[0.4] ">FIND US</h2>
            <div className=" flex flex-col justify-center items-start gap-[4px] opacity-[0.8]">
              <h2>Kano</h2>
              <h2 className="">Everyday from 10am to 6pm</h2>
            </div>
          </div>
          <div className=" flex justify-center items-center gap-[32px]">
            <button>
              {" "}
              <img src={facebookIcon} alt="" />
            </button>

            <button>
              <img src={twitterIcon} alt="" />
            </button>
            <button>
              {" "}
              <img src={youtubeIcon} alt="" />{" "}
            </button>
          </div>
        </div>
        <div className=" flex justify-between items-center mt-[160px] opacity-[0.4] text-[10px]">
          <p className=" ">Copy& 2024 — Copyright</p>
          <p>Privacy</p>
        </div>
      </footer>
    </>
  );
};
export default downfooter;
