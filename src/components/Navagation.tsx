import { motion } from "framer-motion";
import NavButton from "./NavButton";

const list = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { when: "beforeChildren", staggerChildren: 0.25 },
  },
};

const item = {
  hidden: { opacity: 0, y: -25 },
  show: { opacity: 1, y: 0 },
};

function Navagation() {
  const btnList: string[] = ["About", "Survey"];

  return (
    <motion.ul
      className="p-4 text-white flex flex-col gap-2 absolute top-20 right-4 items-end"
      variants={list}
      initial="hidden"
      animate="show"
      exit="hidden"
    >
      {btnList.map((name) => {
        return (
          <motion.li variants={item}>
            <NavButton name={name} />
          </motion.li>
        );
      })}
    </motion.ul>
  );
}

export default Navagation;
