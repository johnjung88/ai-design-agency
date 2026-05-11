"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { captureUtmFromUrl, trackEvent } from "@/lib/analytics/client";

export function AnalyticsInit() {
  const pathname = usePathname();

  useEffect(() => {
    captureUtmFromUrl();
    trackEvent("page_view", { path: pathname });
  }, [pathname]);

  return null;
}
