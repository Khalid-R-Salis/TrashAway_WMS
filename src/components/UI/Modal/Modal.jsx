/* eslint-disable react/prop-types */
import ReactDOM from "react-dom";
import cancelIcon from "../../../assets/close.svg";

// desc: backdrop overlay component
const Backdrop = ({ onClicks }) => {
  return (
    <div
      className="fixed inset-0 bg-black opacity-50 z-10"
      onClick={onClicks}
    ></div>
  );
};

const ShowModal = (props) => {
  return (
    <div className="absolute right-[35rem] bottom-[25rem] mt-[23rem] w-[370px] bg-white p-6 rounded-lg shadow-sm z-10">
      <div className="flex justify-between items-center pb-[32px]">
        <h3 className="text-[#1E1E1E] font-Inter text-[20px] font-semibold capitalize">
          {props.children}
        </h3>
        <img
          src={cancelIcon}
          alt="Close"
          className="cursor-pointer right-[10px] top-[10px] h-4 w-4"
          onClick={props.onClicks}
        />
      </div>
    </div>
  );
};

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClicks={props.onClickBg} />,
        document.querySelector(".backdrop-overlay")
      )}
      {ReactDOM.createPortal(
        <ShowModal onClicks={props.onClickBg}>{props.children}</ShowModal>,
        document.querySelector(".modal-overlay")
      )}
    </>
  );
};

export default Modal;
