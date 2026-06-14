import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
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
      <head>
        {/* Google AdSense verification script — plain <script> tag in <head>
            so Google's crawler finds it for site verification (AdSense requires
            the snippet between <head></head> tags). Ad units via <AdBanner />
            still respect the marketing cookie consent. */}
        {process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID ? (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID}`}
            crossOrigin="anonymous"
          />
        ) : null}
      </head>
      <body>
        <Providers>
          {children}
          <CookieConsent />
        </Providers>
      </body>
    </html>
  );
}
