import type { Metadata } from "next";
import { Providers } from "./providers";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-instrument-sans",
});

export const metadata: Metadata = {
  title: "BIZLINK - Pan-African Investment & Business Facilitation Platform",
  description: "The leading digital platform connecting African businesses with global investors. Verified business registry, AI-powered matchmaking, and seamless regulatory compliance across Africa.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={instrumentSans.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

