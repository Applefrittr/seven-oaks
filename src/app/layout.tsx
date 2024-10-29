import type { Metadata } from "next";
import { Dancing_Script } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import WelcomePopup from "./components/WelcomePopup";

export const metadata: Metadata = {
  title: "Seven Oaks",
  description: "Luxury living in Arnaudville, LA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased min-h-screen relative`}>
        <Sidebar />
        <WelcomePopup />
        {children}
      </body>
    </html>
  );
}
