import type { Metadata } from "next";
import { getCaseStudyBySlug, getCaseStudies } from "@/lib/content";
import { notFound } from "next/navigation";
import Image from "next/image";
import { CTASection } from "@/components/sections/CTASection";
import styles from "./page.module.css";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);
  if (!study) return {};
  return {
    title: `${study.client} Case Study`,
    description: study.description,
  };
}

export async function generateStaticParams() {
  const studies = await getCaseStudies();
  return studies.map((s) => ({ slug: s.slug }));
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);

  if (!study) notFound();

  return (
    <>
      <section className="section section--dark">
        <div className="container">
          <div className={styles.hero}>
            <span className={styles.client}>[ {study.client} ]</span>
            <h1 className={styles.title}>{study.title}</h1>
            <p className={styles.description}>{study.description}</p>
          </div>
          {study.image && (
            <div className={styles.imageWrapper}>
              <Image
                src={study.image}
                alt={study.client}
                fill
                className={styles.image}
                priority
              />
            </div>
          )}
        </div>
      </section>

      <CTASection
        title="Want similar results?"
        subtitle="Let's discuss your project."
        ctaText="Contact Us"
        ctaHref="/contact-us/"
      />
    </>
  );
}
