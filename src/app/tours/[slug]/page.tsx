import type { Metadata } from "next";
import { SiteLayout } from "@/components/SiteLayout";
import TourDetail from "@/pages/TourDetail";
import { TOURS } from "@/data/tours";

export const metadata: Metadata = {
  title: "Tour Details · Konijet Ethiopia",
  description: "Explore tour packages and itineraries across Ethiopia.",
};

export function generateStaticParams() {
  return TOURS.map((tour) => ({ slug: tour.slug }));
}

export default function TourDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <SiteLayout>
      <TourDetail params={params} />
    </SiteLayout>
  );
}
