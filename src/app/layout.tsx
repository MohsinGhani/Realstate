"use client";

import { ConfigProvider } from "antd";
import "./globals.scss";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#F9C70C",
          },
        }}
      >
        <body>{children}</body>
      </ConfigProvider>
    </html>
  );
}
