import Link from "next/link";

function createPath(name: string) {
  const publicPaths = ["home", "about", "survey"];
  const privatePaths = ["dashboard", "surveys", "codes", "settings"];

  if (publicPaths.indexOf(name.toLowerCase()) >= 0) {
    return name === "Home"
      ? "/"
      : `/${publicPaths[publicPaths.indexOf(name.toLowerCase())]}`;
  } else {
    return name === "Dashboard"
      ? "/dashboard"
      : `/dashboard/${privatePaths[privatePaths.indexOf(name.toLowerCase())]}`;
  }
}

function NavButton({ name }: { name: string }) {
  const path = createPath(name);
  return (
    <Link
      href={path}
      className="pt-1 pb-1 pl-1 pr-1 font-bold text-xl bg-gradient-to-l from-white to-white bg-[length:0%_0.1em] [background-position-y:100%] [background-position-x:-100%] bg-no-repeat transition-all hover:bg-[length:100%_0.1em]"
    >
      {name}
    </Link>
  );
}
export default NavButton;
