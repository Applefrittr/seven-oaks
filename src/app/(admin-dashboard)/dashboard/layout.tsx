import DashboardNav from "./DashboardNav";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`flex justify-center items-center flex-auto h-full relative text-black`}
    >
      <DashboardNav />
      <main
        className={`h-full w-full bg-slate-100 p-4 sm:p-8 overflow-y-scroll`}
      >
        {children}
      </main>
    </div>
  );
}
