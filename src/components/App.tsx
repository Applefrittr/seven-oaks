import Navagation from "./Navagation";
import Hero from "./Hero";
import { useState } from "react";
import { motion } from "framer-motion";

const variants = {
  open: { scale: 1.5 },
  closed: { scale: 1 },
};

function App() {
  const [nav, setNav] = useState<boolean>(false);

  const toggleNav = () => {
    setNav((prev) => !prev);
  };

  return (
    <section className="flex h-svh relative">
      <Hero />
      <div className="absolute top-5 right-5 p-5 bg-slate-400 text-white rounded-md">
        LOGO
      </div>
      <motion.nav
        className="absolute top-5 left-5 p-5 bg-slate-400 text-white rounded-md"
        onClick={toggleNav}
        variants={variants}
        animate={nav ? "open" : "closed"}
      >
        MENU
        {nav && <Navagation />}
      </motion.nav>
    </section>
  );
}

export default App;
