import type { Metadata } from "next";
import { getUIUXDesignPage } from "@/lib/content";
import { UIUXDesignPageClient } from "./UIUXDesignPageClient";

export const metadata: Metadata = {
  title: "Expert UI/UX Design Services for SaaS & B2B | reloadux",
  description:
    "UI/UX design that helps B2B and SaaS products launch faster with conversion-focused flows and scalable systems.",
};

export default async function UIUXDesignPage() {
  const data = await getUIUXDesignPage();
  return <UIUXDesignPageClient data={data} />;
}
