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
      <body className={`antialiased min-h-svh relative`}>
        <h1>ADMIN DASHBOARD LAYOUT</h1>
        {children}
      </body>
    </html>
  );
}
