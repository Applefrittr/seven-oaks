"use client";

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

type NavigationProps = {
  btnList: string[];
  positioning?: {
    position: string;
    top: string;
    left: string;
    bottom: string;
    right: string;
    align: string;
  };
};

export default function Navigation({ btnList, positioning }: NavigationProps) {
  return (
    <motion.ul
      className={`p-4 text-white flex flex-col gap-4 ${positioning?.position} ${positioning?.top} ${positioning?.left} ${positioning?.bottom} ${positioning?.right} ${positioning?.align}`}
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
