import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Hero from "./Hero";
import About from "./About";
import Survey from "./Survey";

function RouteSwitch() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={<Hero />} />
        <Route path="/about" element={<About />} />
        <Route path="/survey" element={<Survey />} />
      </Routes>
    </AnimatePresence>
  );
}

export default RouteSwitch;
