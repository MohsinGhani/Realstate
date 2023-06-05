"use client";

import "./globals.scss";
import withTheme from "../../theme";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return withTheme(
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
