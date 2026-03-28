import type { Metadata } from "next";
import { getLegacyModernizationPage } from "@/lib/content";
import { LegacyModernizationPageClient } from "./LegacyModernizationPageClient";

export const metadata: Metadata = {
  title: "Legacy UX Modernization for AI-Ready B2B SaaS Products | reloadux",
  description:
    "Modernize legacy workflows into efficient, AI-native products built to scale intelligently. Progressive modernization without breaking what works.",
};

export default async function LegacyModernizationPage() {
  const data = await getLegacyModernizationPage();
  return <LegacyModernizationPageClient data={data} />;
}
