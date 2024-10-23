"use client";

import { useState, useEffect, Fragment } from "react";
import HeroImg from "./HeroImg";

const imgArray = [
  { src: "/front-blue-door.jpg", alt: "Seven Oaks front door" },
  { src: "/right-pan-front.jpg", alt: "Seven Oaks pan right" },
  { src: "/wide-front.jpg", alt: "Seven Oaks wide" },
];

export default function HomeImages() {
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
    <section>
      {imgArray.map((img, i) => (
        <Fragment key={i}>
          <HeroImg
            img={img.src}
            alt={img.alt}
            index={i}
            currIndex={currIndex}
          />
        </Fragment>
      ))}
      <div className="absolute bg-black rounded-2xl bottom-4 left-1/2 right 1/2 -translate-x-2/4 w-14 h-6 sm:w-20 sm:h-8 flex gap-2 items-center justify-center z-10 opacity-70">
        {imgArray.map((img, i) => {
          return (
            <div
              key={i}
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
