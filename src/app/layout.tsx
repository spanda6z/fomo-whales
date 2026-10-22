import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Fomo Whales — Token Promotion on Top Telegram Channels",
    template: "%s | Fomo Whales",
  },
  description:
    "Get your token promoted on curated Telegram channels. Free milestone calls and paid Pro Calls. Discover channels, track promotions, and grow visibility.",
  keywords: [
    "crypto promotion",
    "telegram channels",
    "token marketing",
    "crypto calls",
    "telegram promotion",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Fomo Whales",
    title: "Fomo Whales — Token Promotion on Top Telegram Channels",
    description:
      "Reach crypto communities with streamlined token promotions on selected Telegram channels.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fomo Whales",
    description: "Token promotion on top Telegram channels.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-black text-white antialiased`}
      >
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
