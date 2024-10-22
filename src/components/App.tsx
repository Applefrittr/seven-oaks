import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import RouteSwitch from "./RouteSwitch";
import WelcomePopup from "./WelcomePopup";
import { BrowserRouter } from "react-router-dom";

function App() {
  const [displayPopup, setDisplayPopup] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setDisplayPopup(true);
    }, 1000);
  }, []);
  return (
    <BrowserRouter>
      <section className="flex h-lvh relative">
        <RouteSwitch />
        <Sidebar />
        {displayPopup && <WelcomePopup setDisplayPopup={setDisplayPopup} />}
      </section>
    </BrowserRouter>
  );
}

export default App;
