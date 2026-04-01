import type { Metadata } from "next";
import { getAIOpportunityMappingPage } from "@/lib/content";
import { AIOpportunityMappingPageClient } from "./AIOpportunityMappingPageClient";

export const metadata: Metadata = {
  title: "AI Opportunity Mapping for B2B SaaS Products | reloadux",
  description:
    "Know exactly where AI fits in your product experience so every investment goes into the right experience.",
};

export default async function AIOpportunityMappingPage() {
  const data = await getAIOpportunityMappingPage();
  return <AIOpportunityMappingPageClient data={data} />;
}
