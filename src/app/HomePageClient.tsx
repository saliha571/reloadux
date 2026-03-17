"use client";

import type { HomePageData } from "@/lib/types";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { HeroSection } from "@/components/sections/HeroSection";
import { PortfolioCarousel } from "@/components/sections/PortfolioCarousel";
import { OurServicesSection } from "@/components/sections/OurServicesSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { AboutStatsSection } from "@/components/sections/AboutStatsSection";
import { ExpertiseSection } from "@/components/sections/ExpertiseSection";
import { WorkShowcase } from "@/components/sections/WorkShowcase";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { BlogSection } from "@/components/sections/BlogSection";
import { CTASection } from "@/components/sections/CTASection";

interface Props {
  data: HomePageData;
}

export function HomePageClient({ data }: Props) {
  return (
    <>
      <HeroSection {...data.hero} clientLogos={data.clientLogos} />

      <ScrollReveal>
        <PortfolioCarousel items={data.portfolio} />
      </ScrollReveal>

      <ScrollReveal>
        <OurServicesSection services={data.ourServices} />
      </ScrollReveal>

      <ScrollReveal>
        <ServicesSection categories={data.serviceCategories} />
      </ScrollReveal>

      <ScrollReveal>
        <AboutStatsSection {...data.aboutStats} />
      </ScrollReveal>

      <ScrollReveal>
        <ExpertiseSection domains={data.expertise} />
      </ScrollReveal>

      <ScrollReveal>
        <WorkShowcase caseStudies={data.caseStudies} />
      </ScrollReveal>

      <ScrollReveal>
        <TestimonialsSection testimonials={data.testimonials} />
      </ScrollReveal>

      <ScrollReveal>
        <BlogSection posts={data.latestPosts} />
      </ScrollReveal>

      <ScrollReveal>
        <CTASection {...data.cta} />
      </ScrollReveal>
    </>
  );
}
