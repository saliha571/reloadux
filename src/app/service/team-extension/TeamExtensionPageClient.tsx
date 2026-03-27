"use client";

import type { TeamExtensionPageData } from "@/lib/types";
import { ServiceHero } from "@/components/sections/ServiceHero";
import { MVPChallengesSection } from "@/components/sections/MVPChallengesSection";
import { MVPCaseStudiesSection } from "@/components/sections/MVPCaseStudiesSection";
import { CTASection } from "@/components/sections/CTASection";
import { MVPProcessSection } from "@/components/sections/MVPProcessSection";
import { OutcomesSection } from "@/components/sections/OutcomesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ServiceFAQSection } from "@/components/sections/ServiceFAQSection";
import { ContactFormSection } from "@/components/sections/ContactFormSection";

interface Props {
  data: TeamExtensionPageData;
}

export function TeamExtensionPageClient({ data }: Props) {
  return (
    <>
      <ServiceHero
        tag={data.hero.tag}
        title={data.hero.title}
        titleAccent={data.hero.titleAccent}
        titleAccentItalic={false}
        ctaText={data.hero.ctaText}
        ctaHref={data.hero.ctaHref}
        clientLogos={data.clientLogos}
        backgroundImage="/images/hero/team-extension-hero-bg.png"
      />

      <MVPChallengesSection {...data.challenges} />

      <MVPCaseStudiesSection {...data.caseStudies} />

      <CTASection
        title={data.midCta.title}
        ctaText={data.midCta.ctaText}
        ctaHref={data.midCta.ctaHref}
        hideLogos
        backgroundImage="/images/cta/mvp-cta-bg.webp"
        accentWord="competition"
      />

      <MVPProcessSection {...data.process} />

      <OutcomesSection {...data.outcomes} />

      <TestimonialsSection
        testimonials={data.testimonials}
        tagText="WORDS OF OUR CLIENTS"
        tagVariant="dark"
      />

      <CTASection
        title={data.bottomCta.title}
        ctaText={data.bottomCta.ctaText}
        ctaHref={data.bottomCta.ctaHref}
        hideLogos
        backgroundImage="/images/cta/mvp-cta-bg.webp"
        accentWord="team"
      />

      <ServiceFAQSection {...data.faqs} />

      <ContactFormSection
        tag="CONNECT WITH US"
        heading="Let&apos;s talk about your product."
        nextSteps={data.nextSteps}
        contactInfo={data.contactInfo}
      />
    </>
  );
}
