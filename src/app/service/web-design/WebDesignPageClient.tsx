"use client";

import type { WebDesignPageData } from "@/lib/types";
import { ServiceHero } from "@/components/sections/ServiceHero";
import { ChallengesSection } from "@/components/sections/ChallengesSection";
import { AuditWorkSection } from "@/components/sections/AuditWorkSection";
import { CTASection } from "@/components/sections/CTASection";
import { MVPProcessSection } from "@/components/sections/MVPProcessSection";
import { KeyDeliverablesSection } from "@/components/sections/KeyDeliverablesSection";
import { WebDesignGoLiveSection } from "@/components/sections/WebDesignGoLiveSection";
import { WebDesignCMSSection } from "@/components/sections/WebDesignCMSSection";
import { ClientPoolSection } from "@/components/sections/ClientPoolSection";
import { ServiceFAQSection } from "@/components/sections/ServiceFAQSection";
import { ContactFormSection } from "@/components/sections/ContactFormSection";
import pageStyles from "./WebDesignPage.module.css";

interface Props {
  data: WebDesignPageData;
}

export function WebDesignPageClient({ data }: Props) {
  return (
    <>
      <ServiceHero
        tag={data.hero.tag}
        title={data.hero.title}
        titleNode={
          <>
            Website designs that{" "}
            <span style={{ fontFamily: "var(--font-serif)" }}>supercharge</span>{" "}
            your conversion funnel
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
        variant="webDesignGrid"
      />

      <WebDesignGoLiveSection
        headingBefore={data.goLivePromo.headingBefore}
        headingAccent={data.goLivePromo.headingAccent}
        headingAfter={data.goLivePromo.headingAfter}
        subtitle={data.goLivePromo.subtitle}
        ctaText={data.goLivePromo.ctaText}
        ctaHref={data.goLivePromo.ctaHref}
        backgroundImage={data.goLivePromo.backgroundImage}
      />

      <WebDesignCMSSection
        tag={data.cms.tag}
        heading={data.cms.heading}
        cards={data.cms.cards}
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
