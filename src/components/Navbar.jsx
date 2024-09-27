import logo from "../assets/logo.png";
function Nav() {
  return (
    <>
      <div className="flex justify-around items-center pt-4">
        <a className=" h-[50px] w-[50px]" href="#">
          <img src={logo} alt="Logo" />
        </a>

        <nav>
          <ul className="flex gap-[30px] text-neutral-700 mt-4">
            <li className=" border-white border-[2.5px] border-transparent hover:border-[2.5px] hover:text-light-green hover:border-b-custom ">
              <a href="#">Home</a>
            </li>
            <li className=" border-white border-[2.5px] border-transparent hover:border-[2.5px] hover:text-light-green hover:border-b-custom ">
              <a href="#">About</a>
            </li>
            <li className=" border-white border-[2.5px] border-transparent hover:border-[2.5px] hover:text-light-green hover:border-b-custom ">
              <a href="#">Services</a>
            </li>
            <li className=" border-white border-[2.5px] border-transparent hover:border-[2.5px] hover:text-light-green hover:border-b-custom ">
              <a href="#">Contact</a>
            </li>
          </ul>
        </nav>

        <div className="flex justify-center items-center gap-[30px]">
          <button>
            <a href="#">Sign In</a>
          </button>
          <button className="text-white bg-light-green px-[14px] py-[10px] rounded-[4px] ">
            <a href="#">Sign Up</a>
          </button>
        </div>
      </div>
    </>
  );
}
export default Nav;
