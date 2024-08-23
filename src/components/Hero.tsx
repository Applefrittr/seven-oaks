import { useState, useEffect, Fragment } from "react";
import BlueFront from "../assets/front-blue-door.jpg";
import RightFront from "../assets/right-pan-front.jpg";
import WideFront from "../assets/wide-front.jpg";
import Logo from "../assets/SO-logo.png";
import HeroImg from "./HeroImg";

const imgArray = [BlueFront, RightFront, WideFront];

function Hero() {
  const [currIndex, setCurrIndex] = useState<number>(0);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrIndex((prev) => {
        return prev + 1 > imgArray.length - 1 ? 0 : prev + 1;
      });
    }, 10000);

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
