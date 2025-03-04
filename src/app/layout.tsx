import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import ParentComponent from "./components/ParentComponent";
import { ThemeModeScript } from "flowbite-react";
import { HeroUIProvider } from "@heroui/system";

// Load Inter Variable Font Locally
const inter = localFont({
  src: "/fonts/Inter-VariableFont_opsz,wght.ttf",
  variable: "--font-inter",
  display: "swap",
});

// Load Syne Variable Font Locally
const syne = localFont({
  src: "/fonts/Syne-VariableFont_wght.ttf",
  variable: "--font-syne",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Creators Lab - Empowering Global Creativity with Web3",
  description:
    "Join the movement to enable creators worldwide to grow, engage, and earn. Built on the lightning-fast, low-fee Solana blockchain, backed by Solana Foundation and SuperteamNG.",
  openGraph: {
    title: "Creators Lab - Empowering Global Creativity with Web3",
    description:
      "Join the movement to enable creators worldwide to grow, engage, and earn. Built on the lightning-fast, low-fee Solana blockchain, backed by Solana Foundation and SuperteamNG.",
    url: "https://www.creatorslab.cc/",
    type: "website",
    images: [
      {
        url: "/images/1500x500.jpeg",
        width: 1200,
        height: 630,
        alt: "Creators Lab - Empowering Global Creativity with Web3",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@creatorslabseed",
    title: "Creators Lab - Empowering Global Creativity with Web3",
    description:
      "Join the movement to enable creators worldwide to grow, engage, and earn. Built on the lightning-fast, low-fee Solana blockchain, backed by Solana Foundation and SuperteamNG.",
    images: ["/images/1500x500.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "CreatorLab",
    url: "https://creatorlab.cc",
    logo: "https://creatorlab.cc/logo.png",
    sameAs: [
      "https://twitter.com/creatorlab",
      "https://linkedin.com/company/creatorlab",
    ],
  };
  
  return (
    <html lang="en" className="bg-[#161616] text-white">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <ThemeModeScript />
      </head>
      <body
        className={`${inter.variable} ${syne.variable} antialiased w-full overflow-x-hidden max-w-[1440px] mx-auto px-4 md:px-10 lg:px-14`}
      >
        <HeroUIProvider>
          <ParentComponent>{children}</ParentComponent>
        </HeroUIProvider>
      </body>
    </html>
  );
}
