"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const Explore = dynamic(() => import("@/pages/Explore").then((mod: any) => mod.default), {
  ssr: false,
});

export function ExploreClient() {
  return (
    <Suspense fallback={<div className="min-h-[600px] flex items-center justify-center text-muted-foreground">Loading globe…</div>}>
      <Explore />
    </Suspense>
  );
}
