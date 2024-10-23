import Image from "next/image";
import HomeImages from "./components/HomeImages";

export default function Home() {
  return (
    <main>
      <div className="absolute w-96 sm:w-[500px] h-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 opacity-75">
        <Image
          src="/SO-logo.png"
          alt="Seven Oaks Logo"
          style={{ width: "100%", height: "auto" }}
          width={500}
          height={500}
          priority
        />
      </div>
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-white opacity-25 z-[5]"></div>
      <HomeImages />
    </main>
  );
}
