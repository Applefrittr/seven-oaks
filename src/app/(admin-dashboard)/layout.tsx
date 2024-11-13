import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Seven Oaks - Admin Dashboard",
  description: "Luxury living in Arnaudville, LA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased h-svh relative flex justify-center items-center bg-cover bg-no-repeat bg-[url('/close-front-stencil.jpg')]`}
      >
        <div className="absolute top-0 bottom-0 left-0 right-0 -z-10 bg-[rgba(255,255,255,0.25)]" />
        {children}
      </body>
    </html>
  );
}
