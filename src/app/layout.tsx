import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Seven Oaks",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Seven Oaks</title>
      </head> */}
      <body>
        {/* <div id="root"></div>
        <script type="module" src="/src/main.tsx"></script> */}
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
