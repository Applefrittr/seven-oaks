import { useState, useRef } from "react";
import { motion } from "framer-motion";
import useDimensions from "../useDimensions";
import Navagation from "./Navagation";
import NavToggle from "./NavToggle";

type DimensionData = {
  height: number;
  width: number;
};
const navigation = {
  open: (custom: DimensionData) => ({
    clipPath: `rect(-5px 100% ${custom.height + 100}px 0px round 0px)`,
    transition: { type: "ease-in", duration: 0.75 },
  }),
  closed: {
    clipPath: `rect(10px ${300 - 15}px 50px ${300 - 65}px round 15px)`,
    transition: { type: "ease-out", delay: 0.2, duration: 0.75 },
  },
};

function Nav2() {
  const [isOpen, setIsOpen] = useState(false);
  const { height, width } = useDimensions();
  const ref = useRef(null);

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <motion.nav
      className="w-[300px] absolute top-0 right-0 bottom-0 z-20"
      initial={false}
      animate={isOpen ? "open" : "closed"}
      variants={navigation}
      custom={{ height, width }}
      ref={ref}
    >
      <div className="w-full absolute top-0 right-0 bottom-0 bg-[rgba(0,0,0,0.85)]"></div>
      <NavToggle toggle={toggle} />
      <Navagation />
    </motion.nav>
  );
}

export default Nav2;
