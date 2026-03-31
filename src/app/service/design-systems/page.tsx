import type { Metadata } from "next";
import { getDesignSystemsPage } from "@/lib/content";
import { DesignSystemsPageClient } from "./DesignSystemsPageClient";

export const metadata: Metadata = {
  title: "Design System Services for Scalable UI | reloadux",
  description:
    "Build cohesive, developer-friendly digital experiences with a scalable design system tailored to your product.",
};

export default async function DesignSystemsPage() {
  const data = await getDesignSystemsPage();
  return <DesignSystemsPageClient data={data} />;
}
