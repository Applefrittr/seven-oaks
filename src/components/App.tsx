import Navagation from "./Navagation";
import Hero from "./Hero";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const variants = {
  open: { width: 300, height: "100svh", margin: 0, padding: 20 },
  closed: {
    width: "fit-content",
    height: "fit-content",
    margin: 20,
    padding: 0,
  },
};

function App() {
  const [nav, setNav] = useState<boolean>(false);

  const toggleNav = () => {
    setNav((prev) => !prev);
  };

  return (
    <section className="flex h-svh relative bg-[url('./assets/front-blue-door.jpg')] bg-no-repeat bg-cover">
      {/* <Hero /> */}
      <div className=" bg-slate-400 text-white rounded-md absolute top-5 left-5 p-4">
        LOGO
      </div>

      <motion.nav
        className="bg-slate-400 text-white rounded-md absolute top-0 right-0 p-5 flex justify-end"
        onClick={toggleNav}
        variants={variants}
        animate={nav ? "open" : "closed"}
      >
        <div className="p-4">MENU</div>
        <AnimatePresence>{nav && <Navagation />}</AnimatePresence>
      </motion.nav>
    </section>
  );
}

export default App;
