"use client";

import type { UsabilityTestingPageData } from "@/lib/types";
import { ServiceHero } from "@/components/sections/ServiceHero";
import { ChallengesSection } from "@/components/sections/ChallengesSection";
import { AuditWorkSection } from "@/components/sections/AuditWorkSection";
import { MVPProcessSection } from "@/components/sections/MVPProcessSection";
import { WhenToDoItSection } from "@/components/sections/WhenToDoItSection";
import { CTASection } from "@/components/sections/CTASection";
import { ServiceFAQSection } from "@/components/sections/ServiceFAQSection";
import { ContactFormSection } from "@/components/sections/ContactFormSection";
import pageStyles from "./UsabilityTestingPage.module.css";

interface Props {
  data: UsabilityTestingPageData;
}

export function UsabilityTestingPageClient({ data }: Props) {
  return (
    <>
      <ServiceHero
        tag={data.hero.tag}
        title={data.hero.title}
        subtitle={data.hero.subtitle}
        ctaText={data.hero.ctaText}
        ctaHref={data.hero.ctaHref}
        backgroundImage="/images/hero/ux-audit-hero-bg.png"
        clientLogos={[
          { src: "/images/logos/vocable-logo.svg", alt: "Vocable", width: 154 },
          { src: "/images/logos/pendulum-logo.svg", alt: "Pendulum", width: 191 },
          { src: "/images/logos/super-ss-logo.svg", alt: "Super Soccer Star", width: 142 },
          { src: "/images/logos/black-book-logo.svg", alt: "Black Book", width: 198 },
          { src: "/images/logos/one-click-logo.svg", alt: "One Click", width: 182 },
          { src: "/images/logos/lopic-logo.svg", alt: "Lopic", width: 144 },
          { src: "/images/logos/verahealth-logo.svg", alt: "Verahealth", width: 188 },
          { src: "/images/logos/emerald-logo.svg", alt: "Emerald", width: 235 },
          { src: "/images/logos/excheqr-logo.svg", alt: "Excheqr", width: 193 },
          { src: "/images/logos/holacure-logo.svg", alt: "Holacure", width: 169 },
          { src: "/images/logos/livemore-logo.svg", alt: "Livemore", width: 178 },
          { src: "/images/logos/cured-logo.svg", alt: "Cured", width: 123 },
          { src: "/images/logos/upskill-logo.svg", alt: "Upskill", width: 198 }
        ]}
        className={pageStyles.heroSection}
      />

      <ChallengesSection
        tag={data.challenges.tag}
        heading={data.challenges.heading}
        description={data.challenges.description}
        cards={data.challenges.cards}
      />

      <AuditWorkSection
        tag={data.caseStudies.tag}
        heading={data.caseStudies.heading}
        stats={data.caseStudies.stats}
        caseStudies={data.caseStudies.items}
        removeCaseStudyTopBorder
        sliderVariant="singlePeek"
        className={pageStyles.auditWorkSection}
      />

      <MVPProcessSection
        tag={data.process.tag}
        heading={data.process.heading}
        steps={data.process.phases.map((phase) => ({
          counter: phase.label,
          title: phase.title,
          content: phase.description,
        }))}
        deliverables={data.keyDeliverables.items.map((item) => item.title)}
      />

      <CTASection
        title={data.keyDeliverables.heading}
        ctaText={data.hero.ctaText}
        ctaHref={data.hero.ctaHref}
        hideLogos
        backgroundImage="/images/backgrounds/design-systems-accelerate-bg.png"
        headingClassName={pageStyles.ctaHeading}
      />

      <WhenToDoItSection
        tag={data.whenToDoIt.tag}
        heading={data.whenToDoIt.heading}
        items={data.whenToDoIt.items}
      />

      <CTASection
        title={data.videoBanner.heading}
        subtitle={data.videoBanner.description}
        ctaText={data.videoBanner.ctaText}
        ctaHref={data.videoBanner.ctaHref}
        hideLogos
        backgroundImage="/images/backgrounds/design-systems-accelerate-bg.png"
        headingClassName={pageStyles.ctaHeading}
        className={pageStyles.ctaSection}
      />

      <ServiceFAQSection {...data.faqs} className={pageStyles.faqSection} />

      <ContactFormSection
        tag="CONNECT WITH US"
        heading="Let&apos;s talk about your product."
        nextSteps={data.nextSteps}
        contactInfo={data.contactInfo}
      />
    </>
  );
}
