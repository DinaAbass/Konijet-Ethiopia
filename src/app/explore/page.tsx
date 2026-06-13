import type { Metadata } from "next";
import { SiteLayout } from "@/components/SiteLayout";
import { ExploreClient } from "@/components/ExploreClient";

export const metadata: Metadata = {
  title: "Explore Ethiopia · Konijet Ethiopia",
  description: "Spin the globe and discover Ethiopia's regions and tour packages.",
};

export const dynamic = "force-dynamic"; // Prevent static pre-rendering of client-only page

export default function ExplorePage() {
  return (
    <SiteLayout>
      <ExploreClient />
    </SiteLayout>
  );
}
