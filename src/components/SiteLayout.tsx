"use client";

import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { WhatsAppButton } from "./WhatsAppButton";

interface SiteLayoutProps {
  children: React.ReactNode;
  slug?: string;
}

export const SiteLayout = ({ children, slug }: SiteLayoutProps) => (
  <div className="min-h-screen flex flex-col bg-background">
    <Navbar slug={slug} />
    <main className="flex-1">{children}</main>
    <Footer />
    <WhatsAppButton />
  </div>
);
