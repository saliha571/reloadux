import type { Metadata } from "next";
import { getContactPage } from "@/lib/content";
import { ContactHeroSection } from "@/components/sections/ContactHeroSection";
import { ContactFormSection } from "@/components/sections/ContactFormSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { NextStepsSection } from "@/components/sections/NextStepsSection";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Let's talk about your product. Get in touch with our UX design team.",
};

export default async function ContactPage() {
  const data = await getContactPage();

  return (
    <>
      <ContactHeroSection {...data.hero} />
      <ContactFormSection />
      <NextStepsSection steps={data.nextSteps} contactInfo={data.contactInfo} />
      <FAQSection faqs={data.faqs} />
    </>
  );
}
