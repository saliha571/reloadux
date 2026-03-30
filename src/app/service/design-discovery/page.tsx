import type { Metadata } from "next";
import { getDesignDiscoveryPage } from "@/lib/content";
import { DesignDiscoveryPageClient } from "./DesignDiscoveryPageClient";

export const metadata: Metadata = {
  title: "Design Discovery Services | Product Visualization | reloadux",
  description:
    "Design discovery helps you visualize your product for clarity in scoping and roadmap. Get UI/UX design, user journey maps, interactive prototypes, and a project roadmap in just 2-4 weeks.",
};

export default async function DesignDiscoveryPage() {
  const data = await getDesignDiscoveryPage();
  return <DesignDiscoveryPageClient data={data} />;
}
