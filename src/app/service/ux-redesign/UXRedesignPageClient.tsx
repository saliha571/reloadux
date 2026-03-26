"use client";

import type { UXRedesignPageData } from "@/lib/types";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ServiceHero } from "@/components/sections/ServiceHero";
import { ChallengesSection } from "@/components/sections/ChallengesSection";
import { CaseStudiesCarousel } from "@/components/sections/CaseStudiesCarousel";
import { ApproachSection } from "@/components/sections/ApproachSection";
import { HowWeWorkSection } from "@/components/sections/HowWeWorkSection";
import { WhoThisIsForSection } from "@/components/sections/WhoThisIsForSection";
import { CTASection } from "@/components/sections/CTASection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { WhyUsSection } from "@/components/sections/WhyUsSection";
import { SprintCTASection } from "@/components/sections/SprintCTASection";
import { ServiceFAQSection } from "@/components/sections/ServiceFAQSection";
import { ContactFormSection } from "@/components/sections/ContactFormSection";
import { NextStepsSection } from "@/components/sections/NextStepsSection";

interface Props {
  data: UXRedesignPageData;
}

export function UXRedesignPageClient({ data }: Props) {
  return (
    <>
      <ServiceHero
        tag={data.hero.tag}
        title={data.hero.title}
        subtitle={data.hero.subtitle}
        ctaText={data.hero.ctaText}
        ctaHref={data.hero.ctaHref}
        clientLogos={data.clientLogos}
        backgroundImage="/images/hero/bg-1-1.webp"
      />

      <ScrollReveal>
        <ChallengesSection {...data.challenges} />
      </ScrollReveal>

      <ScrollReveal>
        <CaseStudiesCarousel {...data.caseStudies} />
      </ScrollReveal>

      <ScrollReveal>
        <ApproachSection {...data.approach} />
      </ScrollReveal>

      <ScrollReveal>
        <HowWeWorkSection {...data.howWeWork} />
      </ScrollReveal>

      <ScrollReveal>
        <WhoThisIsForSection {...data.whoThisIsFor} />
      </ScrollReveal>

      <ScrollReveal>
        <CTASection
          title={data.midCta.title}
          subtitle={data.midCta.subtitle}
          ctaText={data.midCta.ctaText}
          ctaHref={data.midCta.ctaHref}
          hideLogos
        />
      </ScrollReveal>

      <ScrollReveal>
        <TestimonialsSection testimonials={data.testimonials} tagText="WHAT OUR CLIENTS SAY" />
      </ScrollReveal>

      <ScrollReveal>
        <WhyUsSection {...data.whyUs} />
      </ScrollReveal>

      <ScrollReveal>
        <SprintCTASection {...data.sprintCta} />
      </ScrollReveal>

      <ScrollReveal>
        <ServiceFAQSection {...data.faqs} />
      </ScrollReveal>

      <ScrollReveal>
        <ContactFormSection
          tag="Connect with us"
          heading="Let's talk about your product."
        />
      </ScrollReveal>

      <ScrollReveal>
        <NextStepsSection
          steps={data.nextSteps}
          contactInfo={data.contactInfo}
        />
      </ScrollReveal>
    </>
  );
}
