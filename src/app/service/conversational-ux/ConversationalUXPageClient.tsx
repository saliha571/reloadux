"use client";

import type { ConversationalUXPageData } from "@/lib/types";
import { ScrollRevealProvider } from "@/components/ui";
import { ConversationalHeroSection } from "@/components/sections/ConversationalHeroSection";
import { GenAIStatementSection } from "@/components/sections/GenAIStatementSection";
import { FeatureGridSection } from "@/components/sections/FeatureGridSection";
import { ConversationalProcessSection } from "@/components/sections/ConversationalProcessSection";
import { FreeTrialBanner } from "@/components/sections/FreeTrialBanner";
import { ServiceFAQSection } from "@/components/sections/ServiceFAQSection";
import { ContactFormSection } from "@/components/sections/ContactFormSection";

interface Props {
  data: ConversationalUXPageData;
}

export function ConversationalUXPageClient({ data }: Props) {
  return (
    <ScrollRevealProvider disabled>
      <ConversationalHeroSection
        titleItalic={data.hero.titleItalic}
        titleBold={data.hero.titleBold}
        subtitle={data.hero.subtitle}
        ctaText={data.hero.ctaText}
        ctaHref={data.hero.ctaHref}
        videoSrc={data.hero.videoSrc}
        videoPoster={data.hero.videoPoster}
        stat={data.hero.stat}
      />

      <GenAIStatementSection
        heading={data.genaiStatement.heading}
        subheading={data.genaiStatement.subheading}
        ctaText={data.genaiStatement.ctaText}
        ctaHref={data.genaiStatement.ctaHref}
      />

      <FeatureGridSection
        heading={data.featureGrid.heading}
        features={data.featureGrid.features}
      />

      <ConversationalProcessSection
        tag={data.process.tag}
        heading={data.process.heading}
        steps={data.process.steps}
        deliverablesTag={data.process.deliverablesTag}
        deliverables={data.process.deliverables}
      />

      <FreeTrialBanner
        heading={data.freeTrial.heading}
        headingAccent={data.freeTrial.headingAccent}
        headingEnd={data.freeTrial.headingEnd}
        benefits={data.freeTrial.benefits}
        ctaText={data.freeTrial.ctaText}
        ctaHref={data.freeTrial.ctaHref}
      />

      <ServiceFAQSection {...data.faqs} />

      <ContactFormSection
        tag="CONNECT WITH US"
        heading="Let&apos;s talk about your product."
        nextSteps={data.nextSteps}
        contactInfo={data.contactInfo}
      />
    </ScrollRevealProvider>
  );
}
