import type { Metadata } from "next";
import Sidebar from "../components/Sidebar";
import WelcomePopup from "../components/WelcomePopup";

export const metadata: Metadata = {
  title: "Seven Oaks of Arnaudville",
  description: "Luxury living in Arnaudville, LA",
  keywords: ["Seven Oaks", "Arnaudville", "Lousianna", "LA"],
  authors: { name: "applefrittr" },
  openGraph: {
    title: "Seven Oaks of Arnaudville",
    description: "Luxury living in Arnaudville, LA",
    url: process.env.HOST_URL,
    siteName: "Seven Oaks",
    images: {
      url: `${process.env.HOST_URL}SO-logo.png`,
      width: 800,
      height: 525,
      alt: "Seven Oaks Logo",
    },
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
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
