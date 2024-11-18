import Logo from "../../../../public/SO-logo.png";
import { dancingScript } from "../../fonts";
import SurveyForm from "./SurveyForm";

export default function Survey() {
  return (
    <main className="flex p-4 justify-center items-center flex-auto relative z-10 bg-cover bg-no-repeat bg-[url('/close-front-stencil.jpg')] h-svh overflow-hidden">
      <div className="absolute top-0 bottom-0 left-0 right-0 -z-10 bg-[rgba(255,255,255,0.25)]" />
      <div className="flex flex-col h-[95%]  overflow-scroll">
        <div className="flex justify-center items-center p-8 bg-white">
          <img src={Logo.src} alt="Seven Oak Logo" className="w-56 h-auto" />
        </div>
        <div className="bg-black text-white p-4 max-w-[500px] flex flex-col gap-2 rounded">
          <h1
            className={`font-black text-center ${dancingScript.className} font-black text-5xl`}
          >
            Welcome
          </h1>
          <p className="text-center">
            We at Seven Oaks pride ourselves in providing a memorable expirence
            to all our patrons. Please fill out the form below in prepration to
            your visit.
          </p>
          <SurveyForm />
        </div>
      </div>
    </main>
  );
}
