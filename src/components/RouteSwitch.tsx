import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Hero from "./Hero";
import About from "./About";

interface PopupState {
  surveyPopup: boolean;
  displaySurveyPopup: (arg: boolean) => void;
}

function RouteSwitch({ surveyPopup, displaySurveyPopup }: PopupState) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes key={location.pathname} location={location}>
        <Route
          path="/"
          element={
            <Hero
              surveyPopup={surveyPopup}
              displaySurveyPopup={displaySurveyPopup}
            />
          }
        />
        <Route path="/about" element={<About />} />
      </Routes>
    </AnimatePresence>
  );
}

export default RouteSwitch;
