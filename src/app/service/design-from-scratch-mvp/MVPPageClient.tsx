"use client";

import type { MVPPageData } from "@/lib/types";
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
  data: MVPPageData;
}

export function MVPPageClient({ data }: Props) {
  return (
    <>
      <ServiceHero
        tag={data.hero.tag}
        title={data.hero.title}
        titleAccent={data.hero.titleAccent}
        ctaText={data.hero.ctaText}
        ctaHref={data.hero.ctaHref}
        clientLogos={data.clientLogos}
        backgroundImage="/images/hero/mvp-hero-bg.webp"
      />

      <MVPChallengesSection {...data.challenges} />

      <MVPCaseStudiesSection {...data.caseStudies} />

      <CTASection
        title={data.midCta.title}
        ctaText={data.midCta.ctaText}
        ctaHref={data.midCta.ctaHref}
        hideLogos
        backgroundImage="/images/cta/mvp-cta-bg.webp"
        accentWord="product"
      />

      <MVPProcessSection {...data.process} />

      <OutcomesSection {...data.outcomes} />

      <TestimonialsSection
        testimonials={data.testimonials}
        tagText="WHAT OUR CLIENTS SAY"
        tagVariant="dark"
      />

      <CTASection
        title={data.bottomCta.title}
        ctaText={data.bottomCta.ctaText}
        ctaHref={data.bottomCta.ctaHref}
        hideLogos
        backgroundImage="/images/cta/mvp-cta-bg.webp"
        accentWord="product"
      />

      <ServiceFAQSection {...data.faqs} />

      <ContactFormSection
        tag="CONNECT WITH US"
        heading="Let's talk about your product."
        nextSteps={data.nextSteps}
        contactInfo={data.contactInfo}
      />
    </>
  );
}
