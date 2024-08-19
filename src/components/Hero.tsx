import { useState, useEffect, Fragment } from "react";
import BlueFront from "../assets/front-blue-door.jpg";
import RightFront from "../assets/right-pan-front.jpg";
import WideFront from "../assets/wide-front.jpg";
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
    <section className="flex-1 flex bg-green-900 relative">
      {imgArray.map((img, i) => (
        <Fragment key={i}>
          <HeroImg img={img} index={i} currIndex={currIndex} />
        </Fragment>
      ))}
      <div className="absolute bg-black rounded-2xl bottom-4 left-1/2 right 1/2 -translate-x-2/4 w-20 h-8 flex gap-2 items-center justify-center">
        {imgArray.map((img, i) => {
          return (
            <div
              className={`${
                currIndex === i ? "bg-white" : "bg-transparent"
              }  w-3 h-3 rounded-full transition-all ease-in duration-[1000ms] border-white border-[1px]`}
            ></div>
          );
        })}
      </div>
    </section>
  );
}

export default Hero;
