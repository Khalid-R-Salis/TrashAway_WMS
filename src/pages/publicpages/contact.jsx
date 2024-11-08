import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from "../../components/UI/Modal/Modal";
import logo from "../../assets/logo.png";
import bgcontact from "../../assets/bgcontact.png";
import icons_phone from "../../assets/icons-phone.png";
import icons_mail from "../../assets/icons-mail.png";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [succesMessage, setSuccessMessage] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // desc: validate phone and email on input
  const phoneChangeHanlder = (event) => {
    const phone = event.target.value;

    const validatePhone = (value) => {
      const regex = /^(0\d{10}|(\+234)\d{10})$/;
      return regex.test(value);
    };

    if (validatePhone(phone)) {
      setPhoneNumber(phone);
      setPhoneError("");
    } else setPhoneError("Invalid Phone Format.");
  };

  const emailChangeHanlder = (event) => {
    const emailValue = event.target.value;

    const validateEmail = (value) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(value);
    };

    if (validateEmail(emailValue)) {
      setEmail(emailValue);
      setEmailError("");
    } else setEmailError("Invalid Email.");
  };

  // @desc: handling modal visibility to show success message
  const toggleModalHandler = () => {
    setShowModal(false);
  };

  const handleSubmissionHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    // Retrieve token and userId from localStorage
    const userSession = JSON.parse(localStorage.getItem("userSession"));
    const token = userSession?.token;

    try {
      if (!token) return;

      const response = await fetch(
        "https://waste-mangement-backend-3qg6.onrender.com/api/user/get-in-touch",
        {
          method: "POST",
          body: JSON.stringify({ name, email, phoneNumber, message }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok && data.error) {
        setIsLoading(false);
        throw new Error(data.error);
      }

      if (data.errCode === 11000) {
        setIsLoading(false);
        throw new Error(
          "Submission already recieved, we will be in touch shorly."
        );
      }

      if (data.message === "jwt expired") {
        navigate("/login");
      }

      setSuccessMessage(data.successMessage);
      setShowModal(true);
      setError("");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setError(error.message);
      setShowModal(true);
      setIsLoading(false);
    }
  };

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
                <a href="/login">Log In</a>
              </button>
              <button className="text-white bg-light-green px-[14px] py-[10px] rounded-[4px] ">
                <a href="/singup">Sign Up</a>
              </button>
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
                    Email us about any concern, or any questions. We&apos;re
                    here to help.
                  </p>
                  <p className=" text-[#1E1E1E] font-[400]">
                    Emails: trashaway@gmail.com.com
                  </p>
                </div>
                <form onSubmit={handleSubmissionHandler}>
                  <div className="rounded-[32px] shadow-[custom-sh2] h-[410px] px-[27px] py-[35px] bg-white/30 flex justify-center items-end flex-col gap-[24px]">
                    <div className="flex justify-between items-center gap-[14.3px]">
                      <input
                        className="w-[203px] h-[43px] pl-[14px] py-[11px] rounded-[4px] text-gray-700 outline-none"
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="Your Name"
                        required
                      />
                      <input
                        className="w-[203px] h-[43px] pl-[14px] py-[11px] rounded-[4px] text-gray-700 outline-none"
                        type="email"
                        placeholder="Your Email"
                        onChange={emailChangeHanlder}
                        required
                      />
                      {emailError && (
                        <p className=" text-[red] font-[400]">{emailError}</p>
                      )}
                      <input
                        className="w-[203px] h-[43px] pl-[14px] py-[11px] rounded-[4px] text-gray-700 outline-none"
                        type="text"
                        placeholder="Your Phone"
                        onChange={phoneChangeHanlder}
                        required
                      />
                      {phoneError && (
                        <p className=" text-[red] font-[400]">{phoneError}</p>
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      <textarea
                        className="w-[638px] h-[179px] px-[14px] py-[14px] rounded-[4px] text-gray-700 outline-none resize-none overflow-hidden"
                        placeholder="Your Message"
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
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
      {!isLoading && succesMessage && showModal && (
        <Modal onClickBg={toggleModalHandler}>{succesMessage}</Modal>
      )}

      {/* showing error modal on error */}
      {!isLoading && error && showModal && (
        <Modal onClickBg={toggleModalHandler}>{error}</Modal>
      )}
    </>
  );
};

export default Contact;
