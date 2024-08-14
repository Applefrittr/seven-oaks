import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import useDimensions from "../useDimensions";
import Navagation from "./Navagation";
import NavToggle from "./NavToggle";

const navigation = {
  open: (height: number) => ({
    clipPath: `rect(-5px 300px ${height + 100}px 0px round 0px)`,
    transition: { type: "ease-in", duration: 0.75 },
  }),
  closed: {
    clipPath: "rect(10px 285px 50px 235px round 15px)",
    transition: { type: "ease-out", delay: 0.2, duration: 0.75 },
  },
};

function Nav2() {
  const [isOpen, setIsOpen] = useState(false);
  const { height } = useDimensions();

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    console.log(height);
  }, [height]);

  return (
    <motion.nav
      className="w-[300px] absolute top-0 right-0 bottom-0"
      initial={false}
      animate={isOpen ? "open" : "closed"}
      variants={navigation}
      custom={height}
    >
      <div className="w-[300px] absolute top-0 right-0 bottom-0 bg-black"></div>
      {/* <button
        className="absolute top-4 right-4 text-white"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        MENU
      </button> */}
      <NavToggle toggle={toggle} />
      <Navagation />
    </motion.nav>
  );
}

export default Nav2;
