"use client";

import "./globals.scss";
import withTheme from "../../theme";
import Header from "@/app/header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return withTheme(
    <html lang="en">
      <body>
        <div className="max-w-[1080px] mx-auto">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
