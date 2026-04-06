"use client";

import { ServiceHero } from "@/components/sections/ServiceHero";
import { AuditWorkSection } from "@/components/sections/AuditWorkSection";
import { VideoBannerSection } from "@/components/sections/VideoBannerSection";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { KeyDeliverablesSection } from "@/components/sections/KeyDeliverablesSection";
import { OtherServicesSection } from "@/components/sections/OtherServicesSection";
import { CTASection } from "@/components/sections/CTASection";
import { ServiceFAQSection } from "@/components/sections/ServiceFAQSection";
import { ContactFormSection } from "@/components/sections/ContactFormSection";
import pageStyles from "./AIFeatureExperienceDesignPage.module.css";

const clientLogos = [
  { src: "/images/logos/barclays-2.svg", alt: "Barclays", width: 178 },
  { src: "/images/logos/digno-2.svg", alt: "Digno", width: 120 },
  { src: "/images/logos/vocable-1.svg", alt: "Vocable", width: 154 },
  { src: "/images/logos/nitro-2.svg", alt: "Nitro", width: 142 },
  { src: "/images/logos/today-1.svg", alt: "Today", width: 140 },
  { src: "/images/logos/excheqr-1.svg", alt: "Excheqr", width: 160 },
  { src: "/images/logos/groupon-1.svg", alt: "Groupon", width: 145 },
];

const contactNextSteps = [
  { number: "01", text: "We'll respond within 24 hours." },
  { number: "02", text: "Our UX Expert will collect project details and create a brief." },
  { number: "03", text: "We'll prepare estimates and share a project proposal." },
];

const contactInfo = {
  phone: "(202) 978 3410",
  email: "info@reloadux.com",
  team: [
    {
      name: "Sahar",
      role: "Key Account Manager",
      linkedin: "https://www.linkedin.com/in/sahar-asif-284a9955/",
      image: "/images/team/sahar.webp",
    },
    {
      name: "Lara Kazan",
      role: "Business Development Executive",
      linkedin: "https://www.linkedin.com/in/lara-kazan-82a24113b/",
      image: "/images/team/lara.webp",
    },
  ],
};

export function AIFeatureExperienceDesignPageClient() {
  return (
    <div className={pageStyles.page}>
      <ServiceHero
        tag="AI FEATURE EXPERIENCE DESIGN"
        hideTag
        title="AI Feature Experience Design"
        titleSize="small"
        subtitle="Your AI roadmap is clear. We'll design the experience your users will actually adopt."
        ctaText="Get Started"
        ctaHref="#contact-form"
        clientLogos={clientLogos}
        backgroundImage="/images/hero/ai-feature-hero-bg.png"
        className={pageStyles.heroSection}
      />

      <AuditWorkSection
        tag="WHY US"
        heading="We create AI-native experiences across industries that deliver real results."
        headingNode={
          <>
            We create{" "}
            <em style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}>
              AI-native experiences
            </em>{" "}
            across industries that deliver real results.
          </>
        }
        stats={[
          { value: "$10M+", label: "Raised across AI products we've designed" },
          { value: "12+", label: "Industries we've designed AI features for" },
          { value: "6+", label: "Years designing AI-native experiences" },
        ]}
        caseStudies={[
          {
            name: "AI + MARKETING",
            description: "An AI-native experience, conceived and designed from scratch for the modern content marketer.",
            slides: [
              { type: "image", src: "/images/audit/vocable-dd-slide-1.jpg" },
              { type: "image", src: "/images/audit/vocable-dd-slide-2.jpg" },
              { type: "image", src: "/images/audit/vocable-dd-slide-3.jpg" },
            ],
            href: "#",
            comingSoon: true,
          },
        ]}
      />

      <section className={pageStyles.caseDetailSection}>
        <div className={pageStyles.caseDetailInner}>
          <div className={pageStyles.caseDetailRow}>
            <span className={pageStyles.caseDetailTag}>[ VOCABLE ]</span>
            <p className={pageStyles.caseDetailText}>
              Built in collaboration with Iman Oubou, International Women
              Advocate of the year and former Miss New York, Vocable&apos;s{" "}
              <strong>AI copilot</strong> puts every stage of content creation
              at your fingertips through automated,{" "}
              <strong>generative</strong> workflows.
            </p>
          </div>

          <div className={pageStyles.caseDetailRow}>
            <span className={pageStyles.caseDetailTag}>[ OUR ROLE ]</span>
            <ul className={pageStyles.caseDetailList}>
              <li>
                Brought Iman&apos;s bold new product vision from concept to
                series a by defining the <strong>USP, features,</strong> and{" "}
                <strong>business model canvas</strong>.
              </li>
              <li>
                Built a comprehensive <strong>copilot dashboard</strong> for
                solopreneurs and content teams to accelerate{" "}
                <strong>AI-assisted</strong> campaign planning, delivery, and
                results.
              </li>
              <li>
                Successfully designed one of the most seamless omnichannel{" "}
                <strong>generative AI</strong> content experiences on the
                digital market.
              </li>
            </ul>
          </div>

          <div className={pageStyles.caseDetailRow}>
            <span className={pageStyles.caseDetailTag}>[ OUTCOME ]</span>
            <div className={pageStyles.caseDetailOutcome}>
              <span className={pageStyles.outcomeBrand}>mindvalley</span>
              <p className={pageStyles.outcomeText}>
                Launched at the mindvalley AI summit 2024 with 110k+ attendees
              </p>
              <div className={pageStyles.pressLogos}>
                <span className={pageStyles.pressLogo}>VENTURE CAPITAL POST</span>
                <span className={pageStyles.pressLogoDot}>●</span>
                <span className={pageStyles.pressLogo}>USATODAY.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AuditWorkSection
        tag="AI + FINTECH"
        heading="Redefining the future of fintech with a conversational AI agent built for smart, data-driven financial decisions."
        hideHeader
        caseStudies={[
          {
            name: "AI + FINTECH",
            description: "Redefining the future of fintech with a conversational AI agent built for smart, data-driven financial decisions.",
            slides: [
              { type: "image", src: "/images/audit/digno-dd-slide-1.jpg" },
              { type: "image", src: "/images/audit/digno-dd-slide-2.jpg" },
              { type: "image", src: "/images/audit/digno-dd-slide-3.jpg" },
            ],
            href: "#",
            comingSoon: true,
          },
        ]}
        stats={[]}
        className={pageStyles.fintechCaseStudy}
      />

      <section className={pageStyles.caseDetailSection}>
        <div className={pageStyles.caseDetailInner}>
          <div className={pageStyles.caseDetailRow}>
            <span className={pageStyles.caseDetailTag}>[ SIMPLA.AI ]</span>
            <p className={pageStyles.caseDetailText}>
              Ranked #12 on Product Hunt&apos;s list of top smart invoicing
              tools of 2024, Simpla is a pocket financial advisor powered by a{" "}
              <strong>conversational AI agent</strong> that makes complex
              financial decisions feel straightforward.
            </p>
          </div>

          <div className={pageStyles.caseDetailRow}>
            <span className={pageStyles.caseDetailTag}>[ OUR ROLE ]</span>
            <ul className={pageStyles.caseDetailList}>
              <li>
                Created Simpla&apos;s <strong>brand, website,</strong> and{" "}
                <strong>conversational AI interface</strong> from scratch with
                competitive research for product positioning.
              </li>
              <li>
                Interviewed Simpla&apos;s target audience of SMBs and
                enterprises to design three core AI modules:{" "}
                <strong>Advise, Process,</strong> and <strong>Analyze</strong>.
              </li>
              <li>
                Designed <strong>trust patterns</strong> and transparency
                features for <strong>AI-powered</strong> financial advice,
                increasing user trust and loyalty by 3x.
              </li>
            </ul>
          </div>

          <div className={pageStyles.caseDetailRow}>
            <span className={pageStyles.caseDetailTag}>[ OUTCOME ]</span>
            <div className={pageStyles.caseDetailOutcome}>
              <span className={pageStyles.outcomeStat}>260+</span>
              <p className={pageStyles.outcomeText}>
                260+ hours saved per user annually
              </p>
              <div className={pageStyles.pressLogos}>
                <span className={pageStyles.pressLogo}>
                  <span className={pageStyles.pressLogoIcon}>⬡</span> Openfuture
                </span>
                <span className={pageStyles.pressLogo}>
                  <span className={pageStyles.pressLogoDot}>●</span> Product Hunt
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AuditWorkSection
        tag="AI + AUTOMOTIVE"
        heading="Enabling intelligent, real-time health event detection on the road through agentic AI monitoring."
        hideHeader
        caseStudies={[
          {
            name: "AI + AUTOMOTIVE",
            description: "Enabling intelligent, real-time health event detection on the road through agentic AI monitoring.",
            slides: [
              { type: "image", src: "/images/audit/nitro-dd-slide-1.jpg" },
              { type: "image", src: "/images/audit/nitro-dd-slide-2.jpg" },
              { type: "image", src: "/images/usability-testing/nitro-slide-1.png" },
              { type: "image", src: "/images/usability-testing/nitro-slide-2.png" },
              { type: "image", src: "/images/usability-testing/nitro-slide-3.png" },
            ],
            href: "#",
            comingSoon: true,
          },
        ]}
        stats={[]}
        className={pageStyles.fintechCaseStudy}
      />

      <section className={pageStyles.caseDetailSection}>
        <div className={pageStyles.caseDetailInner}>
          <div className={pageStyles.caseDetailRow}>
            <span className={pageStyles.caseDetailTag}>[ MOMENT.AI ]</span>
            <p className={pageStyles.caseDetailText}>
              Based on cutting-edge image recognition algorithms developed at
              George Washington University, Moment uses an{" "}
              <strong>agentic AI</strong> monitoring system to detect driver
              health events in real time, improving safety and fleet operations.
            </p>
          </div>

          <div className={pageStyles.caseDetailRow}>
            <span className={pageStyles.caseDetailTag}>[ OUR ROLE ]</span>
            <ul className={pageStyles.caseDetailList}>
              <li>
                Helped the Moment team launch their <strong>first MVP</strong>{" "}
                in the automotive market and generate early revenue.
              </li>
              <li>
                Designed highly intuitive user flows for Moment&apos;s{" "}
                <strong>agentic</strong> alert system — built to detect
                distraction, fatigue, and health anomalies hands-free.
              </li>
              <li>
                Built a responsive, real-time feed for Moment&apos;s live
                monitoring interface, surfacing{" "}
                <strong>AI-generated</strong> health and safety signals from
                facial expressions.
              </li>
            </ul>
          </div>

          <div className={pageStyles.caseDetailRow}>
            <span className={pageStyles.caseDetailTag}>[ OUTCOME ]</span>
            <div className={pageStyles.caseDetailOutcome}>
              <span className={pageStyles.outcomeStat}>$3.3M</span>
              <p className={pageStyles.outcomeText}>
                $3.3M raised in funding
              </p>
              <div className={pageStyles.pressLogos}>
                <span className={pageStyles.pressLogo}>informa</span>
                <span className={pageStyles.pressLogo}>AI.BUSINESS</span>
                <span className={pageStyles.pressLogo}>
                  <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}>Business</span>Journal
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AuditWorkSection
        tag="AI + B2B SAAS"
        heading="Supercharging enterprise potential with a conversational AI agent trained on your organization's own knowledge base."
        hideHeader
        caseStudies={[
          {
            name: "AI + B2B SAAS",
            description: "Supercharging enterprise potential with a conversational AI agent trained on your organization's own knowledge base.",
            slides: [
              { type: "image", src: "/images/audit/people-guru-slide-1.webp" },
              { type: "image", src: "/images/audit/people-guru-slide-2.webp" },
              { type: "image", src: "/images/audit/people-guru-lg-1.png" },
              { type: "image", src: "/images/audit/people-guru-lg-2.png" },
              { type: "image", src: "/images/audit/people-guru-lg-3.png" },
            ],
            href: "#",
            comingSoon: true,
          },
        ]}
        stats={[]}
        className={pageStyles.fintechCaseStudy}
      />

      <section className={pageStyles.caseDetailSection}>
        <div className={pageStyles.caseDetailInner}>
          <div className={pageStyles.caseDetailRow}>
            <span className={pageStyles.caseDetailTag}>[ INSPHERE.AI ]</span>
            <p className={pageStyles.caseDetailText}>
              Designed in partnership with the Quantum Ambassador and former
              Data Science Lead at IBM, Insphere gives companies a{" "}
              <strong>conversational AI agent</strong> that delivers instant,
              trusted answers from their own organizational data.
            </p>
          </div>

          <div className={pageStyles.caseDetailRow}>
            <span className={pageStyles.caseDetailTag}>[ OUR ROLE ]</span>
            <ul className={pageStyles.caseDetailList}>
              <li>
                Defined Insphere&apos;s <strong>product roadmap</strong>,
                taking them from idea to <strong>fully-launched MVP</strong>{" "}
                in a matter of months.
              </li>
              <li>
                Conceptualized an original feature set for a suite of{" "}
                <strong>agentic AI tools</strong> designed for the diverse
                needs of sales, marketing, and HR teams.
              </li>
              <li>
                Designed the UX for an <strong>AI copilot</strong> that uses{" "}
                <strong>intelligent document processing</strong> to surface
                answers, automate workflows, and serve cross-functional teams.
              </li>
            </ul>
          </div>

          <div className={pageStyles.caseDetailRow}>
            <span className={pageStyles.caseDetailTag}>[ OUTCOME ]</span>
            <div className={pageStyles.caseDetailOutcome}>
              <p className={pageStyles.outcomeText}>
                Launched and now in early adoption.
              </p>
            </div>
          </div>
        </div>
      </section>

      <VideoBannerSection
        heading="Make"
        headingAccent="AI features simple, smart, and seamless."
        description="From copilots to intelligent workflows, we turn complex AI ideas into clear, actionable experiences."
        ctaText="Start Your AI Feature Design"
        ctaHref="#contact-form"
      />

      <TimelineSection
        tag="HOW WE DO IT"
        heading="From kickoff to clickable prototype in three weeks."
        className={pageStyles.timelineSection}
        phases={[
          {
            label: "Week 1",
            title: "Understand & Define",
            description:
              "We conduct a deep dive on prioritized features, map user goals, flows, and edge cases, and identify trust requirements and potential failure modes.",
          },
          {
            label: "Week 2",
            title: "Design & Prototype",
            description:
              "We create full interaction designs, develop conversation scripts where needed, and build high-fidelity clickable prototypes with simulated AI responses.",
          },
          {
            label: "Week 3",
            title: "Test & Refine",
            description:
              "We support user testing, incorporate feedback, finalize designs, and prepare comprehensive implementation documentation.",
          },
        ]}
        note="Timeline scales with complexity. Multiple features or complex agent flows may need 3–4 weeks."
      />

      <KeyDeliverablesSection
        tag="KEY DELIVERABLES"
        heading=""
        items={[
          {
            title: "Prototypes & interaction flows",
            description:
              "High-fidelity clickable prototypes with simulated AI responses, documented edge cases, and ready for user testing.",
          },
          {
            title: "Conversation scripts",
            description:
              "AI dialogue, recovery paths, and escalation flows, fully structured for implementation.",
          },
          {
            title: "Trust patterns",
            description:
              "Confidence indicators, explanation design, override controls, and feedback loops are built into every feature.",
          },
          {
            title: "Implementation notes",
            description:
              "Behavior specs, prompt guidelines for LLM-based features, and test scenarios for edge cases and failures.",
          },
        ]}
      />

      <OtherServicesSection
        tag="OTHER WAYS WE CAN HELP"
        items={[
          {
            title: "LEGACY UX MODERNIZATION",
            description:
              "Sometimes AI can't sit on top of your current interface. We modernize your UX to support intelligent features, without disrupting existing users.",
            href: "/service/ui-ux-design",
          },
        ]}
      />

      <CTASection
        title="Intelligent features fail without a foundation."
        accentWord="Intelligent features"
        subtitle="We create a UX foundation that makes intelligent features usable, trusted, and adopted."
        ctaText="Contact Us"
        ctaHref="#contact-form"
        buttonAfterSubtitle
        hideLogos
        backgroundImage="/images/covers/ai-feature-cta-bg.png"
        headingClassName={pageStyles.ctaHeading}
        className={pageStyles.ctaSection}
      />

      <ServiceFAQSection
        tag="FAQS"
        heading=""
        hideHeading
        items={[
          {
            question: "What if we haven't mapped our AI opportunities yet?",
            answer:
              "Start with AI Opportunity Mapping first. This engagement is built for teams who already know what to build.",
          },
          {
            question: "How do you design user experiences for generative AI features?",
            answer:
              "We combine conversational design, trust patterns, and interaction frameworks specifically built for AI-powered interfaces — from copilots to agentic workflows.",
          },
          {
            question: "Do you build the AI?",
            answer:
              "No. We design the experience layer. We work alongside your engineering and AI teams to ensure what gets built is usable, trusted, and adopted.",
          },
          {
            question: "What is agentic UX design?",
            answer:
              "Agentic UX is the design of AI systems that act autonomously — completing tasks, making decisions, and reporting back. We design the controls, transparency, and trust patterns that keep users informed and in charge.",
          },
          {
            question: "How do you prototype without a working AI?",
            answer:
              "We use simulated AI responses and scripted conversation flows to create high-fidelity clickable prototypes that feel real — perfect for testing and stakeholder buy-in before development begins.",
          },
          {
            question: "Can you design for specific models like GPT, Claude, others?",
            answer:
              "Yes. We're model-aware designers. We understand the capabilities and constraints of major LLMs and design interactions that work within their strengths.",
          },
          {
            question: "What if we only need part of this?",
            answer:
              "That's fine. We scope every engagement to your needs. Whether it's a single feature or a full product experience, we'll tailor the work accordingly.",
          },
          {
            question: "What happens after handoff?",
            answer:
              "You receive complete implementation documentation — prototypes, conversation scripts, trust patterns, and behavior specs — ready for your engineering team to build.",
          },
        ]}
      />

      <ContactFormSection
        tag="CONNECT WITH US"
        heading="Let's talk about your product."
        nextSteps={contactNextSteps}
        contactInfo={contactInfo}
      />
    </div>
  );
}
