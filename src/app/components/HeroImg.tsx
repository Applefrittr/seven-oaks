import Image from "next/image";

type Img = {
  img: string;
  alt: string;
  index: number;
  currIndex: number;
};

function HeroImg({ img, alt, index, currIndex }: Img) {
  return (
    <Image
      src={img}
      alt={alt}
      className={`${
        index === currIndex ? "opacity-100" : "opacity-0"
      } w-full h-full object-cover object-center absolute top-0 left-0 bottom-0 right-0 transition-opacity duration-[1500ms] ease-in-out`}
      fill
      priority
    />
  );
}

export default HeroImg;
