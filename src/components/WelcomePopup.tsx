import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import Logo from "../assets/SO-logo.png";

interface props {
  setDisplayPopup: (x: boolean) => void;
}

function WelcomePopup({ setDisplayPopup }: props) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,.5)] flex items-center justify-center z-40"
    >
      <div className=" flex flex-col-reverse sm:flex-row m-6 sm:m-0">
        <div className="bg-white p-8 flex justify-center items-center">
          <img src={Logo.src} className="w-56 h-auto" />
        </div>
        <div className="p-4 bg-black text-white relative flex flex-col gap-1 items-center">
          <h1 className="self-center p-2 font-black">Welcome to Seven Oaks</h1>
          <p className="max-w-72 text-center">
            For first time visitors, please complete the Welcome Survey prior to
            your visit.
          </p>
          <p
            className="absolute top-1 right-3 hover:cursor-pointer"
            onClick={() => setDisplayPopup(false)}
          >
            x
          </p>
          <NavLink
            to="/Survey"
            onClick={() => setDisplayPopup(false)}
            className="bg-slate-500 p-2 rounded-md w-fit self-center text-white m-8"
          >
            Survey
          </NavLink>
        </div>
      </div>
    </motion.section>
  );
}

export default WelcomePopup;
