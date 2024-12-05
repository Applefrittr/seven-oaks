import { motion } from "framer-motion";
import React from "react";

type PathProps = {
  variants: {
    open: { d?: string; opacity?: number };
    closed: { d?: string; opacity?: number };
  };
  transition: { duration: number };
  d?: string;
};

const Path = (props: PathProps) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="#ffffff"
    strokeLinecap="round"
    {...props}
  />
);

type NavTogglePropFn = {
  toggle: () => void;
};

function NavToggle({ toggle }: NavTogglePropFn) {
  return (
    <button onClick={toggle} className="absolute top-5 right-7">
      <svg
        width="23"
        height="23"
        viewBox="0 0 23 23"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          variants={{
            closed: { d: "M 2 2.5 L 20 2.5" },
            open: { d: "M 3 16.5 L 17 2.5" },
          }}
          transition={{ duration: 0.4 }}
        />
        <Path
          d="M 2 9.423 L 20 9.423"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          transition={{ duration: 0.1 }}
        />
        <Path
          variants={{
            closed: { d: "M 2 16.346 L 20 16.346" },
            open: { d: "M 3 2.5 L 17 16.346" },
          }}
          transition={{ duration: 0.4 }}
        />
      </svg>
    </button>
  );
}

export default NavToggle;
