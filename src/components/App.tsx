import Navagation from "./Navagation";
import Hero from "./Hero";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "./Sidebar";
import RouteSwitch from "./RouteSwitch";

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
      <RouteSwitch />
      <Sidebar />
    </section>
  );
}

export default App;
