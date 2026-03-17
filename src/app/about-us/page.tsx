import type { Metadata } from "next";
import { getAboutPage } from "@/lib/content";
import { AboutHeroSection } from "@/components/sections/AboutHeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { ValuesSection } from "@/components/sections/ValuesSection";
import { GlanceSection } from "@/components/sections/GlanceSection";
import { TeamGrid } from "@/components/sections/TeamGrid";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "We're a UI/UX design agency specializing in AI-native product experiences for B2B and SaaS companies.",
};

export default async function AboutPage() {
  const data = await getAboutPage();

  return (
    <>
      <AboutHeroSection {...data.hero} />
      <StatsSection stats={data.stats} />
      <ValuesSection values={data.values} />
      <GlanceSection items={data.glance} />
      <TeamGrid team={data.team} />
      <CTASection {...data.cta} />
    </>
  );
}
