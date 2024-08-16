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
    // <section className="flex-1 flex bg-fixed bg-[url('./assets/front-blue-door.jpg')] bg-no-repeat bg-cover">
    <section className="flex-1 flex bg-green-900 relative">
      {/* <div className=" bg-slate-400 text-white rounded-md absolute top-5 left-5 p-4">
        LOGO
      </div> */}
      {imgArray.map((img, i) => (
        <Fragment key={i}>
          <HeroImg img={img} index={i} currIndex={currIndex} />
        </Fragment>
      ))}
    </section>
  );
}

export default Hero;
