import type { Metadata } from "next";
import { getTeamExtensionPage } from "@/lib/content";
import { TeamExtensionPageClient } from "./TeamExtensionPageClient";

export const metadata: Metadata = {
  title: "Dedicated UI/UX Designers & Product Experts | reloadux",
  description:
    "Extend your team with expert UI/UX designers and product specialists. We help you address skill gaps, meet project deadlines, and boost overall productivity.",
};

export default async function TeamExtensionPage() {
  const data = await getTeamExtensionPage();
  return <TeamExtensionPageClient data={data} />;
}
