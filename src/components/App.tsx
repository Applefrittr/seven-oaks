import Navagation from "./Navagation";
import About from "./About";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "./Sidebar";

const variants = {
  open: {
    width: 300,
    height: "100svh",
    margin: 0,
    padding: "20px",
  },
  closed: {
    width: "fit-content",
    height: "fit-content",
    margin: 20,
    padding: "0px",
  },
};

function App() {
  return (
    <section className="flex h-svh relative">
      {/* ROUTS HERE */}
      <About />
      <Sidebar />
    </section>
  );
}

export default App;
