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
  description: "The digital gateway for verified African businesses. Connect with partners, ensure regulatory compliance, and browse a trusted directory of businesses across the continent.",
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

