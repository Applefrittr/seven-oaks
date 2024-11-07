import Logo from "../../../../public/SO-logo.png";
import { dancingScript } from "../../fonts";

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
          <form className="flex flex-col gap-2">
            <label htmlFor="date" className="font-bold">
              Date of arrival
            </label>
            <input
              type="date"
              id="date"
              name="date"
              className="text-black w-fit rounded p-1"
            />
            <label htmlFor="number" className="font-bold">
              Length of stay
            </label>
            <input
              type="number"
              id="number"
              min="1"
              max="14"
              step="1"
              name="number"
              className="text-black w-fit rounded p-1"
            ></input>
            <label htmlFor="beverage" className="font-bold">
              Beverage Preference
            </label>
            <select
              id="beverage"
              name="beverage"
              className="text-black w-fit rounded p-1"
            >
              <option value="Tea">Tea</option>
              <option value="Coffee">Coffee</option>
              <option value="None">None</option>
            </select>
            <label htmlFor="diet" className="font-bold">
              Allergies and/or Dietary Specifications
            </label>
            <textarea
              id="diet"
              name="diet"
              rows={5}
              className="text-black rounded p-1"
            ></textarea>
            <label htmlFor="other" className="font-bold">
              Any other requests and/or requirements
            </label>
            <textarea
              id="other"
              name="other"
              rows={5}
              className="text-black rounded p-1"
            ></textarea>
            <button className="bg-slate-500 rounded w-fit pl-2 pr-4 pt-1 pb-1 font-bold">
              Submit
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
