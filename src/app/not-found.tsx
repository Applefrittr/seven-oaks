import Link from "next/link";
import DashboardButton from "./components/DashboardButton";

export default function NotFound() {
  return (
    <div
      className={`sm:flex sm:items-center font-sans min-h-svh bg-no-repeat bg-bottom bg-[url('/forest2.png')]`}
    >
      <div
        className={`p-4 rounded-sm bg-transparent text-black max-w-96 max-h-max m-12 flex flex-col gap-4`}
      >
        <h2>
          <b className={`flex items-center gap-2`}>
            <span className={`text-3xl`}>OOPS </span>
            <p>Took a wrong turn</p>
          </b>
        </h2>
        <p>Looks like you got lost. Try heading back to the previous page</p>
        <DashboardButton>
          <Link href={"/"}>Seven Oaks Home</Link>
        </DashboardButton>
      </div>
    </div>
  );
}
