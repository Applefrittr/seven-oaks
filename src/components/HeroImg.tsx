interface Img {
  img: string;
  index: number;
  currIndex: number;
}

function HeroImg({ img, index, currIndex }: Img) {
  return (
    <img
      src={img}
      className={`${
        index === currIndex ? "opacity-100" : "opacity-0"
      } w-full h-full object-cover object-center absolute top-0 left-0 bottom-0 right-0 transition-opacity duration-[1500ms] ease-in-out`}
    />
  );
}

export default HeroImg;
