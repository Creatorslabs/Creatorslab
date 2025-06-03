import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import ParentComponent from "./components/ParentComponent";
import { ThemeModeScript } from "flowbite-react";
import { HeroUIProvider } from "@heroui/system";
import { Flowbite } from "flowbite-react";

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
  keywords: [
    "CreatorLab",
    "Creator Lab",
    "creator tools",
    "digital creators",
    "content monetization",
    "web3 for creators",
    "NFT creators",
    "AI tools for creators",
    "influencer marketing",
    "social media growth tools",
    "membership platforms",
    "subscription-based creator tools",
    "passive income for creators",
    "crypto payments for creators",
    "no-code tools for creators",
    "content automation tools",
    "digital marketing for creators",
    "monetization for creators",
    "best platform for creators",
    "creator economy",
  ],
  openGraph: {
    title: "Creators Lab - Empowering Global Creativity with Web3",
    description:
      "Join the movement to enable creators worldwide to grow, engage, and earn. Built on the lightning-fast, low-fee Solana blockchain, backed by Solana Foundation and SuperteamNG.",
    url: "https://creatorslab.cc/",
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
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "CreatorsLab",
    url: "https://creatorslab.cc",
    logo: "https://creatorslab.cc/logo.png",
    description:
      "CreatorLab provides AI-powered tools and monetization solutions for digital creators and content entrepreneurs.",
    sameAs: [
      "https://twitter.com/creatorslabseed",
      "https://www.linkedin.com/company/creatorslab",
      "https://www.instagram.com/creatorslab",
      "https://www.facebook.com/creatorslab",
      "https://www.tiktok.com/@creatorslab",
      "https://www.youtube.com/@creatorslab",
    ],
  };

  return (
    <html lang="en" className="dark:bg-[#101214] dark:text-white">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <ThemeModeScript />
      </head>
      <body
        className={`${inter.variable} ${syne.variable} antialiased w-full overflow-x-hidden max-w-[1440px] mx-auto px-2 md:px-5 lg:px-7`}
      ><Flowbite>
        <HeroUIProvider>
            <ParentComponent>{children}</ParentComponent>
        </HeroUIProvider>
        </Flowbite>
      </body>
    </html>
  );
}
