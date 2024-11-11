import React from "react";
import LayoutRecoil from "./layout.recoil";
import "./globals.css";

export const metadata = {
  title: "myfair front pre-course",
  description: "todolist",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="kr">
      <body>
        <LayoutRecoil>{children}</LayoutRecoil>
      </body>
    </html>
  );
}