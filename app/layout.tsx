import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-display-src",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body-src",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://prateek-portfolio-ashen.vercel.app";
const TITLE = "Prateek Jha — AI Product & Program Leader";
const DESCRIPTION =
  "I scale products, teams, and the systems they run on. AI Product & Program Leader.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: "%s · Prateek Jha" },
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Prateek Jha",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
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
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-ground text-ink">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
