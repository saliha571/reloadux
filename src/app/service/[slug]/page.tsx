import type { Metadata } from "next";
import { getServiceBySlug, getServices } from "@/lib/content";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { CTASection } from "@/components/sections/CTASection";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.description,
  };
}

const DEDICATED_PAGES = ["ux-redesign", "design-from-scratch-mvp", "team-extension", "ux-audit", "legacy-ux-modernization", "conversational-ux", "design-discovery", "design-systems", "usability-testing"];

export async function generateStaticParams() {
  const services = await getServices();
  return services
    .filter((s) => !DEDICATED_PAGES.includes(s.slug))
    .map((s) => ({ slug: s.slug }));
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) notFound();

  return (
    <>
      <section className="section section--dark">
        <div className="hero">
          <h1 className="hero__title">{service.heroTitle}</h1>
          <p className="hero__subtitle">{service.heroSubtitle}</p>
          <Button href="/contact-us/">Get Started</Button>
        </div>
      </section>

      {service.features && service.features.length > 0 && (
        <section className="section section--light">
          <div className="container">
            <div className="services-grid">
              {service.features.map((feature, i) => (
                <div key={i} className="service-card">
                  <h3 className="service-card__title">{feature}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {service.process && service.process.length > 0 && (
        <section className="section section--surface">
          <div className="container">
            <h2
              className="section-header__title"
              style={{ textAlign: "center", marginBottom: "var(--space-48)" }}
            >
              Our Process
            </h2>
            <div className="process-grid">
              {service.process.map((step) => (
                <div key={step.number} className="process-step">
                  <span className="process-step__number">{step.number}</span>
                  <h3 className="process-step__title">{step.title}</h3>
                  <p className="process-step__text">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection
        title="Ready to get started?"
        subtitle="Let's discuss how we can help with your project."
        ctaText="Contact Us"
        ctaHref="/contact-us/"
      />
    </>
  );
}
