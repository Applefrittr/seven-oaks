import Logo from "../../../../public/SO-logo-inverse.png";
import { logout } from "@/server/actions";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={`flex justify-center items-center flex-auto h-full`}>
      <DashboardNav />
      {children}
    </main>
  );
}

function DashboardNav() {
  return (
    <section className={`flex flex-col bg-black w-96 h-full`}>
      <img
        src={Logo.src}
        alt="Seven Oak Logo"
        className={`w-52 h-auto mx-auto my-4`}
      />
      {/* <h1
        className={
          "text-lg sm:text-4xl text-center px-5 font-serif font-bold text-white"
        }
      >
        <i>Admin Portal</i>
      </h1> */}
      <div className={`flex-auto text-white`}>Nav Links</div>
      <Logout />
    </section>
  );
}

function Logout() {
  return (
    <form action={logout} className={`mx-auto p-8`}>
      <button
        type="submit"
        className={`px-4 py-1 rounded-md bg-slate-500 w-max text-white`}
      >
        Logout
      </button>
    </form>
  );
}
