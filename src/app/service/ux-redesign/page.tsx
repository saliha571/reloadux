import type { Metadata } from "next";
import { getUXRedesignPage } from "@/lib/content";
import { UXRedesignPageClient } from "./UXRedesignPageClient";

export const metadata: Metadata = {
  title: "AI-Ready UX Redesign for B2B & SaaS Products | reloadux",
  description:
    "If you're planning to integrate AI into your existing product experience, you're in the right place. Our AI-native UX redesign services help B2B and SaaS teams ship AI features users actually adopt.",
};

export default async function UXRedesignPage() {
  const data = await getUXRedesignPage();
  return <UXRedesignPageClient data={data} />;
}
