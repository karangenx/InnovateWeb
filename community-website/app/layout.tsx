import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Innovate Web | Community for Developers & Builders",
  description: "Empowering businesses and communities through innovation, collaboration, and meaningful digital experiences. Join us to connect, grow, and help each other.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} antialiased`}
    >
      <body className="font-sans">{children}</body>
    </html>
  );
}
