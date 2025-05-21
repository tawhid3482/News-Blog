import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Shared/Navbar/Navbar";
import Footer from "@/components/ui/Shared/Footer/Footer";
import { Toaster } from "react-hot-toast";
import Providers from "@/lib/Providers/Providers";
import AuthSessionHandler from "@/components/AuthSession/AuthSessionHandler";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "TIS-News | Stay Updated with the Latest News",
  description: "TIS-News provides the latest updates...",
  keywords: "news, breaking news, international news",
  authors: [{ name: "Tawhidul Islam" }],
  robots: "index, follow",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased max-w-7xl mx-auto`}>
          <Navbar />
          <main className="flex flex-col min-h-screen">
            <Toaster position="top-right" />
            <AuthSessionHandler /> 
            {children}
          </main>
          <Footer />
        </body>
      </html>
    </Providers>
  );
}
