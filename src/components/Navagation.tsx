import { motion } from "framer-motion";
import { useState } from "react";

function Navagation() {
  const [display, setDisplay] = useState<boolean>(false);

  return (
    <motion.nav className="p-4  bg-slate-400 text-white flex flex-col gap-2 absolute top-0 left-0 w-full h-svh sm:w-56">
      <ul>
        <li>
          <button>About</button>
        </li>
        <li>
          <button>Survey</button>
        </li>
      </ul>
    </motion.nav>
  );
}

export default Navagation;
