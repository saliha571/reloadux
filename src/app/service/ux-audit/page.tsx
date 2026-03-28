import type { Metadata } from "next";
import { getUXAuditPage } from "@/lib/content";
import { UXAuditPageClient } from "./UXAuditPageClient";

export const metadata: Metadata = {
  title: "UX Audit Services | AI-Powered Readiness | reloadux",
  description:
    "Find out whether your product is ready for an AI-native experience and what needs to change in just one week. Comprehensive UX audit + AI readiness assessment.",
};

export default async function UXAuditPage() {
  const data = await getUXAuditPage();
  return <UXAuditPageClient data={data} />;
}
