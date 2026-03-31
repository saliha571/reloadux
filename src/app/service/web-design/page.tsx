import type { Metadata } from "next";
import { getWebDesignPage } from "@/lib/content";
import { WebDesignPageClient } from "./WebDesignPageClient";

export const metadata: Metadata = {
  title: "Web Design Services | High-Performance Websites | reloadux",
  description:
    "Web design services to visualize, structure, and launch conversion-focused digital experiences with clarity in scope and roadmap.",
};

export default async function WebDesignPage() {
  const data = await getWebDesignPage();
  return <WebDesignPageClient data={data} />;
}
