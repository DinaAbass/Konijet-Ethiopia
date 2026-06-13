import { SiteLayout } from "@/components/SiteLayout";
import Index from "@/pages/Index";

export default function Home() {
  return (
    <SiteLayout>
      <Index />
    </SiteLayout>
  );
}

export const metadata = {
  title: "Konijet Ethiopia · Tours, Culture & Heritage",
  description: "Discover Ethiopia with Konijet — curated tours through Lalibela, Axum, Danakil, Omo Valley and the Simien Mountains.",
};
