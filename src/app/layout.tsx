import type { Metadata } from "next";
import { Syne, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Francis Reuben R — Portfolio",
  description:
    "CS Engineer at RV University. Building systems across AI/ML, embedded hardware, cybersecurity, and full-stack web.",
  keywords: [
    "Francis Reuben",
    "portfolio",
    "CS engineer",
    "AI/ML",
    "embedded systems",
    "cybersecurity",
    "full-stack",
    "RV University",
  ],
  authors: [{ name: "Francis Reuben R" }],
  openGraph: {
    title: "Francis Reuben R — Portfolio",
    description:
      "CS Engineer at RV University. Building systems across AI/ML, embedded hardware, cybersecurity, and full-stack web.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
