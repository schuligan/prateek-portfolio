import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display-src",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body-src",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Prateek Jha — AI Product & Program Leader",
  description: "Portfolio of Prateek Jha, AI Product & Program Leader.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-ground text-ink">
        {children}
      </body>
    </html>
  );
}
