import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { GoogleAdSense } from "@/components/AdSense";
import { CookieConsent } from "@/components/CookieConsent";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Konijet Ethiopia · Tours, Culture & Heritage of the Roof of Africa",
  description:
    "Discover Ethiopia with Konijet — curated tours through Lalibela, Axum, Danakil, Omo Valley and the Simien Mountains. 13 months of sunshine.",
  openGraph: {
    title: "Konijet Ethiopia · Tours & Heritage",
    description:
      "Curated journeys through the cradle of humanity — UNESCO sites, festivals, wildlife and coffee origin tours.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body>
        <GoogleAdSense />
        <Providers>
          {children}
          <CookieConsent />
        </Providers>
      </body>
    </html>
  );
}
