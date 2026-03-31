"use client";

import type { DesignSystemsPageData } from "@/lib/types";
import { ServiceHero } from "@/components/sections/ServiceHero";
import { ChallengesSection } from "@/components/sections/ChallengesSection";
import { AuditWorkSection } from "@/components/sections/AuditWorkSection";
import { MVPCaseStudiesSection } from "@/components/sections/MVPCaseStudiesSection";
import { DesignSystemsRepositorySection } from "@/components/sections/DesignSystemsRepositorySection";
import { CTASection } from "@/components/sections/CTASection";
import { MVPProcessSection } from "@/components/sections/MVPProcessSection";
import { ClientPoolSection } from "@/components/sections/ClientPoolSection";
import { ServiceFAQSection } from "@/components/sections/ServiceFAQSection";
import { ContactFormSection } from "@/components/sections/ContactFormSection";
import pageStyles from "./DesignSystemsPage.module.css";

interface Props {
  data: DesignSystemsPageData;
}

export function DesignSystemsPageClient({ data }: Props) {
  const safeCaseStudies = (data?.auditWork?.caseStudies ?? []).map((item) => {
    const first = item.slides?.[0]?.src ?? "";
    const second = item.slides?.[1]?.src ?? first;
    return {
      name: item.name,
      description: item.description,
      desktopImage: first,
      mobileImage: second,
      href: item.href || "#",
      comingSoon: item.comingSoon ?? true,
    };
  });

  return (
    <>
      <ServiceHero
        tag={data.hero.tag}
        title={data.hero.title}
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
        caseStudies={[]}
        className={pageStyles.auditWorkNoBottom}
      />

      <MVPCaseStudiesSection
        tag={data.auditWork.tag}
        heading={data.auditWork.heading}
        description=""
        hideHeader
        className={pageStyles.mvpNoTop}
        items={safeCaseStudies}
      />

      <DesignSystemsRepositorySection />

      <MVPProcessSection
        tag={data.process.tag}
        heading={data.process.heading}
        steps={data.process.steps}
        deliverables={data.process.deliverables}
      />

      <CTASection
        title={data.midCta.title}
        ctaText={data.midCta.ctaText}
        ctaHref={data.midCta.ctaHref}
        hideLogos
        backgroundImage="/images/backgrounds/design-systems-accelerate-bg.png"
        accentWord="design system"
        headingClassName={pageStyles.ctaHeading}
        className={pageStyles.midCtaWithBottomBorder}
      />

      <ClientPoolSection />

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
