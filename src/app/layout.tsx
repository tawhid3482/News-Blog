import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Shared/Navbar/Navbar";
import Footer from "@/components/ui/Shared/Footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"], // or other available weights like 500, 600 etc.
});

export const metadata: Metadata = {
  title: "TIS-News | Stay Updated with the Latest News",
  description:
    "TIS-News provides the latest updates on international, sports, and entertainment news. Stay informed with breaking news, articles, and in-depth reports.",
  keywords:
    "news, breaking news, international news, sports, entertainment, daily news, news blog",
  authors: [{ name: "Tawhidul Islam" }],
  viewport: "width=device-width, initial-scale=1.0", // For responsive design
  robots: "index, follow", // Tell search engines to index and follow links
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased max-w-7xl mx-auto  `}
      >
        <Navbar></Navbar>
        <main className="flex flex-col min-h-screen">
          <div className="flex-grow">{children}</div>
        </main>
        <Footer></Footer>
      </body>
    </html>
  );
}
