import type { Metadata } from "next";
import Sidebar from "../components/Sidebar";
import WelcomePopup from "../components/WelcomePopup";

export const metadata: Metadata = {
  title: "Seven Oaks",
  description: "Luxury living in Arnaudville, LA",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={`antialiased min-h-svh relative`}>
      <Sidebar />
      <WelcomePopup />
      {children}
    </main>
  );
}
