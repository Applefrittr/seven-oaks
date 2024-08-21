import { useState } from "react";
import Sidebar from "./Sidebar";
import RouteSwitch from "./RouteSwitch";

function App() {
  const [surveyPopup, setSurveyPopup] = useState<boolean>(false);

  const displaySurveyPopup = (arg: boolean) => {
    setSurveyPopup(arg);
  };
  return (
    <section className="flex h-lvh relative">
      <RouteSwitch
        surveyPopup={surveyPopup}
        displaySurveyPopup={displaySurveyPopup}
      />
      <Sidebar displaySurveyPopup={displaySurveyPopup} />
    </section>
  );
}

export default App;
