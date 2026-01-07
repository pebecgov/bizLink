import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "PEBEC BIZ LINK - Pan-African Investment & Business Facilitation Platform",
  description: "The leading digital platform connecting African businesses with global investors. Verified business registry, AI-powered matchmaking, and seamless regulatory compliance across Africa.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

