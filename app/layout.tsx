import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  display: "swap",
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Outdoors — Your AI, unboxed",
  description:
    "Pepper intelligence running quietly on your desktop. No browser. No tabs. Just a conversation.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="font-body grain">{children}</body>
    </html>
  );
}
