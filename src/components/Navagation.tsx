import { motion } from "framer-motion";
import NavButton from "./NavButton";

const list = {
  closed: {
    opacity: 0,
    transition: {
      staggerDirection: -1,
      staggerChildren: 0.05,
      duration: 0.5,
    },
  },
  open: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      delayChildren: 0.25,
      staggerChildren: 0.25,
    },
  },
};

const item = {
  closed: { opacity: 0, y: -25 },
  open: { opacity: 1, y: 0 },
};

function Navagation() {
  const btnList: string[] = ["Home", "About", "Survey"];

  return (
    <motion.ul
      className="p-4 text-white flex flex-col gap-2 absolute top-20 right-4 items-end"
      variants={list}
    >
      {btnList.map((name, i) => {
        return (
          <motion.li variants={item} key={i}>
            <NavButton name={name} />
          </motion.li>
        );
      })}
    </motion.ul>
  );
}

export default Navagation;
