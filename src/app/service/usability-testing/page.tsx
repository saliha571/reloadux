import type { Metadata } from "next";
import { getUsabilityTestingPage } from "@/lib/content";
import { UsabilityTestingPageClient } from "./UsabilityTestingPageClient";

export const metadata: Metadata = {
  title: "Usability Testing Services to Validate UX Decisions | reloadux",
  description:
    "Turn usability issues into growth opportunities with real user feedback, clear insights, and actionable UX improvements.",
};

export default async function UsabilityTestingPage() {
  const data = await getUsabilityTestingPage();
  return <UsabilityTestingPageClient data={data} />;
}
