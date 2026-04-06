import type { Metadata } from "next";
import { getProcessPage } from "@/lib/content";
import { ProcessPageClient } from "./ProcessPageClient";

export const metadata: Metadata = {
  title: "Process - Our formula for building the right product | reloadux",
  description:
    "Our end-to-end process for building the right product that generates ROI and wins hearts. Discover, Define, Design, Deliver.",
};

export default async function ProcessPage() {
  const data = await getProcessPage();

  return <ProcessPageClient data={data} />;
}
