import type { Metadata } from "next";
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
      <body className={`antialiased min-h-svh relative`}>
        <Sidebar />
        <WelcomePopup />
        {children}
      </body>
    </html>
  );
}
