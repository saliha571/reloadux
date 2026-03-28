"use client";

import type { UXAuditPageData } from "@/lib/types";
import { ServiceHero } from "@/components/sections/ServiceHero";
import { ChallengesSection } from "@/components/sections/ChallengesSection";
import { AuditWorkSection } from "@/components/sections/AuditWorkSection";
import { CTASection } from "@/components/sections/CTASection";
import { MVPProcessSection } from "@/components/sections/MVPProcessSection";
import { KeyDeliverablesSection } from "@/components/sections/KeyDeliverablesSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { WhenToDoItSection } from "@/components/sections/WhenToDoItSection";
import { WhatHappensAfterSection } from "@/components/sections/WhatHappensAfterSection";
import { ClientPoolSection } from "@/components/sections/ClientPoolSection";
import { PromoBannerSection } from "@/components/sections/PromoBannerSection";
import { ServiceFAQSection } from "@/components/sections/ServiceFAQSection";
import { ContactFormSection } from "@/components/sections/ContactFormSection";
import pageStyles from "./UXAuditPage.module.css";

interface Props {
  data: UXAuditPageData;
}

export function UXAuditPageClient({ data }: Props) {
  return (
    <>
      <ServiceHero
        tag={data.hero.tag}
        title={data.hero.title}
        titleNode={
          <>
            Find out whether your product is ready for an{" "}
            <span style={{ fontFamily: "var(--font-serif)" }}>AI-native experience</span>{" "}
            and what needs to change in just{" "}
            <span style={{ fontFamily: "var(--font-serif)" }}>one week</span>.
          </>
        }
        titleSize="small"
        ctaText={data.hero.ctaText}
        ctaHref={data.hero.ctaHref}
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
          { src: "/images/logos/upskill-logo.svg", alt: "Upskill", width: 198 },
        ]}
        backgroundImage="/images/hero/ux-audit-hero-bg.png"
        className={pageStyles.heroSection}
      />

      <ChallengesSection
        tag={data.challenges.tag}
        heading={data.challenges.heading}
        description={data.challenges.description}
        cards={data.challenges.cards}
      />

      <AuditWorkSection
        tag={data.auditWork.tag}
        heading={data.auditWork.heading}
        stats={data.auditWork.stats}
        caseStudies={data.auditWork.caseStudies}
      />

      <CTASection
        title={data.midCta.title}
        ctaText={data.midCta.ctaText}
        ctaHref={data.midCta.ctaHref}
        hideLogos
        backgroundImage="/images/cta/mvp-cta-bg.webp"
        accentWord="AI"
        headingClassName={pageStyles.ctaHeading}
      />

      <MVPProcessSection
        tag={data.process.tag}
        heading={data.process.heading}
        steps={data.process.steps}
        deliverables={data.process.deliverables}
      />

      <KeyDeliverablesSection
        tag={data.keyDeliverables.tag}
        heading={data.keyDeliverables.heading}
        items={data.keyDeliverables.items}
      />

      <PricingSection
        tag={data.pricing.tag}
        description={data.pricing.description}
        planName={data.pricing.planName}
        price={data.pricing.price}
        pricePer={data.pricing.pricePer}
        features={data.pricing.features}
        ctaText={data.pricing.ctaText}
        ctaHref={data.pricing.ctaHref}
      />

      <WhenToDoItSection
        tag={data.whenToDoIt.tag}
        heading={data.whenToDoIt.heading}
        items={data.whenToDoIt.items}
      />

      <WhatHappensAfterSection
        tag={data.whatHappensAfter.tag}
        heading={data.whatHappensAfter.heading}
        paths={data.whatHappensAfter.paths}
      />

      <CTASection
        title={data.bottomCta.title}
        ctaText={data.bottomCta.ctaText}
        ctaHref={data.bottomCta.ctaHref}
        subtitle={data.bottomCta.subtitle}
        hideLogos
        backgroundImage="/images/cta/ux-audit-cta-bg.png"
        headingClassName={pageStyles.ctaHeading}
      />

      <ClientPoolSection />

      <PromoBannerSection />

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
