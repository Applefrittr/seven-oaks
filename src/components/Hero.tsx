import { useState, useEffect, Fragment } from "react";
import BlueFront from "../assets/front-blue-door.jpg";
import RightFront from "../assets/right-pan-front.jpg";
import WideFront from "../assets/wide-front.jpg";
import Logo from "../assets/SO-logo.png";
import HeroImg from "./HeroImg";
import { motion } from "framer-motion";

const imgArray = [BlueFront, RightFront, WideFront];

interface PopupState {
  surveyPopup: boolean;
  displaySurveyPopup: (arg: boolean) => void;
}

function Hero({ surveyPopup, displaySurveyPopup }: PopupState) {
  const [currIndex, setCurrIndex] = useState<number>(0);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrIndex((prev) => {
        return prev + 1 > imgArray.length - 1 ? 0 : prev + 1;
      });
    }, 10000);

    setTimeout(() => {
      displaySurveyPopup(true);
    }, 1500);
    return () => {
      clearInterval(stepInterval);
    };
  }, []);

  return (
    <section className="flex-1 flex relative">
      <div className="absolute w-96 sm:w-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-auto z-10 opacity-75">
        <img src={Logo}></img>
      </div>
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-white opacity-25 z-[5]"></div>
      {surveyPopup && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-fit h-fit absolute top-4 right-20 z-10 flex items-center"
        >
          <div className=" rounded-lg bg-black p-4 text-white w-[105px] sm:w-fit">
            <p>Please complete Welcome Survey</p>
          </div>
          <svg width="100px" height="70px">
            <path
              d="M 0 20 C 5 25, 75 20, 80 15 L 75 0 L 100 13 L 87 40 L 82 25 C 75 30, 10 52, 0 52 V 25"
              stroke="black"
              fill="black"
            />
          </svg>
        </motion.section>
      )}
      {imgArray.map((img, i) => (
        <Fragment key={i}>
          <HeroImg img={img} index={i} currIndex={currIndex} />
        </Fragment>
      ))}
      <div className="absolute bg-black rounded-2xl bottom-4 left-1/2 right 1/2 -translate-x-2/4 w-14 h-6 sm:w-20 sm:h-8 flex gap-2 items-center justify-center z-10 opacity-70">
        {imgArray.map((img, i) => {
          return (
            <div
              key={img}
              className={`${
                currIndex === i ? "bg-white" : "bg-transparent"
              }  w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ease-in duration-[1000ms] border-white border-[1px]`}
            ></div>
          );
        })}
      </div>
    </section>
  );
}

export default Hero;
