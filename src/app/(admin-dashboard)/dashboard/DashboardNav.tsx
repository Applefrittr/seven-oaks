"use client";

import Logo from "../../../../public/SO-logo-inverse.png";
import { logout } from "@/server/actions";
import Navigation from "@/app/components/Navigation";
import DashboardButton from "@/app/components/DashboardButton";
import { useEffect, useState } from "react";
import useDimensions from "@/lib/hooks/useDimensions";

export default function DashboardNav() {
  const [display, setDisplay] = useState(true);
  const dimensions = useDimensions();

  const showNav = () => {
    setDisplay((prev) => !prev);
  };

  useEffect(() => {
    if (dimensions.width >= 640) setDisplay(true);
  }, [dimensions.width]);
  return (
    <nav
      className={`flex flex-col bg-black min-w-72 sm:min-w-80 h-full items-center absolute z-10 top-0 left-0 sm:static ${display ? "translate-x-0" : "-translate-x-full"} transition-all`}
    >
      <img
        src={Logo.src}
        alt="Seven Oak Logo"
        className={`w-52 h-auto mx-auto my-4`}
      />
      <div className={`flex-auto text-white pt-16`}>
        <Navigation btnList={["Dashboard", "Surveys", "Codes", "Settings"]} />
      </div>
      <Logout />
      <div
        className={`text-white absolute top-1/2 -right-7 bg-black -translate-y-1/2 sm:hidden ${display ? "-scale-x-100" : "scale-x-100"} hover:cursor-pointer`}
        onClick={showNav}
      >
        <svg viewBox="0 0 50 75" width="35" height="75">
          <path d="M20 10 L40 37.5 L20 65" stroke="white" strokeWidth="4" />
        </svg>
      </div>
    </nav>
  );
}

function Logout() {
  return (
    <form action={logout} className={`p-8`}>
      <DashboardButton>Logout</DashboardButton>
    </form>
  );
}
