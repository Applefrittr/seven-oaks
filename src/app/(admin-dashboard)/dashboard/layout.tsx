import Logo from "../../../../public/SO-logo-inverse.png";
import { logout } from "@/server/actions";
import Navigation from "@/app/components/Navigation";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`flex justify-center items-center flex-auto h-full`}>
      <DashboardNav />
      <main className={`h-full w-full bg-slate-100 overflow-y-hidden`}>
        {children}
      </main>
    </div>
  );
}

function DashboardNav() {
  return (
    <nav className={`flex flex-col bg-black w-96 h-full items-center`}>
      <img
        src={Logo.src}
        alt="Seven Oak Logo"
        className={`w-52 h-auto mx-auto my-4`}
      />
      <div className={`flex-auto text-white pt-16`}>
        <Navigation
          btnList={["Dashboard", "Reservations", "Codes", "Settings"]}
        />
      </div>
      <Logout />
    </nav>
  );
}

function Logout() {
  return (
    <form action={logout} className={`p-8`}>
      <button
        type="submit"
        className={`px-4 py-1 rounded-md bg-slate-500 w-max text-white`}
      >
        Logout
      </button>
    </form>
  );
}
