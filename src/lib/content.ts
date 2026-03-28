import type {
  HomePageData,
  AboutPageData,
  ContactPageData,
  UXRedesignPageData,
  MVPPageData,
  TeamExtensionPageData,
  UXAuditPageData,
  LegacyModernizationPageData,
  Service,
  CaseStudy,
  BlogPost,
  PaginatedPosts,
  Testimonial,
  SiteSettings,
  ClientLogo,
  TeamMember,
  ExpertiseDomain,
} from "./types";

import { getStrapiMediaUrl } from "./media";

import homeData from "../../content/pages/home.json";
import aboutData from "../../content/pages/about.json";
import contactData from "../../content/pages/contact.json";
import uxRedesignData from "../../content/pages/ux-redesign.json";
import mvpData from "../../content/pages/design-from-scratch-mvp.json";
import teamExtensionData from "../../content/pages/team-extension.json";
import uxAuditData from "../../content/pages/ux-audit-ai-readiness.json";
import legacyModernizationData from "../../content/pages/legacy-ux-modernization.json";

import {
  getStrapiHomepage,
  getStrapiMVPPage,
  getStrapiTeamExtensionPage,
  getStrapiUXAuditPage,
  getStrapiCaseStudies,
  getStrapiCaseStudyBySlug,
  getStrapiServices,
  getStrapiServiceBySlug,
  getStrapiBlogPosts,
  getStrapiBlogPostBySlug,
  getStrapiTestimonials,
  getStrapiClientLogos,
  getStrapiTeamMembers,
  getStrapiIndustries,
  getStrapiSiteSettings,
  getStrapiUXRedesignPage,
} from "./strapi";

// ─── Homepage ─────────────────────────────────────────────────────────────────

export async function getHomePage(): Promise<HomePageData> {
  const fallback = homeData as HomePageData;

  try {
    const res = await getStrapiHomepage();
    if (res?.data) {
      const d = res.data;

      return {
        ...fallback,
        hero: {
          ...fallback.hero,
          ...(d.heroTitle && { title: d.heroTitle }),
          ...(d.heroTitleAccent && { titleAccent: d.heroTitleAccent }),
          ...(d.heroSubtitle && { subtitle: d.heroSubtitle }),
          ...(d.heroCtaText && { ctaText: d.heroCtaText }),
          ...(d.heroCtaLink && { ctaHref: d.heroCtaLink }),
        },
        ...(d.ourServices?.length && {
          ourServices: d.ourServices.map((s) => ({
            title: s.title,
            href: s.link,
          })),
        }),
        ...(d.stats?.length && {
          aboutStats: {
            tag: d.aboutSectionLabel ?? fallback.aboutStats.tag,
            heading: d.aboutSectionTitle ?? fallback.aboutStats.heading,
            stats: d.stats.map((s) => ({
              value: `${s.prefix ?? ""}${s.value}${s.suffix ?? ""}`,
              label: s.label,
            })),
          },
        }),
        cta: {
          ...fallback.cta,
          ...(d.ctaSectionTitle && { title: d.ctaSectionTitle }),
          ...(d.ctaSectionButtonText && { ctaText: d.ctaSectionButtonText }),
          ...(d.ctaSectionButtonLink && { ctaHref: d.ctaSectionButtonLink }),
          ...(d.ctaSectionSubtitle && { subtitle: d.ctaSectionSubtitle }),
        },
      };
    }
  } catch {
    // fall through to JSON
  }

  return fallback;
}

// ─── About / Contact (static JSON for now) ───────────────────────────────────

export async function getAboutPage(): Promise<AboutPageData> {
  return aboutData as AboutPageData;
}

export async function getContactPage(): Promise<ContactPageData> {
  return contactData as ContactPageData;
}

// ─── UX Redesign Page ────────────────────────────────────────────────────────

export async function getUXRedesignPage(): Promise<UXRedesignPageData> {
  const fallback = uxRedesignData as UXRedesignPageData;

  try {
    const res = await getStrapiUXRedesignPage();
    if (res?.data) {
      const d = res.data;
      return {
        hero: {
          tag: d.heroTag ?? fallback.hero.tag,
          title: d.heroTitle ?? fallback.hero.title,
          subtitle: d.heroSubtitle ?? fallback.hero.subtitle,
          ctaText: d.heroCtaText ?? fallback.hero.ctaText,
          ctaHref: d.heroCtaHref ?? fallback.hero.ctaHref,
        },
        clientLogos: d.clientLogos
          ? d.clientLogos.split(",").map((s: string) => s.trim()).filter(Boolean)
          : fallback.clientLogos,
        challenges: {
          tag: d.challengesTag ?? fallback.challenges.tag,
          heading: d.challengesHeading ?? fallback.challenges.heading,
          description: d.challengesDescription ?? fallback.challenges.description,
          cards: d.challengeCards?.length
            ? d.challengeCards.map((c) => ({ tag: c.tag, description: c.description }))
            : fallback.challenges.cards,
        },
        caseStudies: {
          items: d.caseStudyItems?.length
            ? d.caseStudyItems.map((cs) => ({
                tag: cs.tag,
                description: cs.description,
                videoUrl: cs.videoUrl,
                image: cs.image,
                slides: cs.slides?.map((s) => ({ type: s.type, src: s.src })),
              }))
            : fallback.caseStudies.items,
          ctaText: d.caseStudyCtaText ?? fallback.caseStudies.ctaText,
          ctaHref: d.caseStudyCtaHref ?? fallback.caseStudies.ctaHref,
        },
        approach: {
          tag: d.approachTag ?? fallback.approach.tag,
          heading: d.approachHeading ?? fallback.approach.heading,
          headingItalic: d.approachHeadingItalic ?? fallback.approach.headingItalic,
          description: d.approachDescription ?? fallback.approach.description,
          principles: d.principles?.length
            ? d.principles.map((p) => ({ number: p.number, title: p.title, description: p.description, gif: p.gif }))
            : fallback.approach.principles,
        },
        howWeWork: {
          tag: d.howWeWorkTag ?? fallback.howWeWork.tag,
          subtitle: d.howWeWorkSubtitle ?? fallback.howWeWork.subtitle,
          stages: d.stages?.length
            ? d.stages.map((s) => ({
                title: s.title,
                counter: s.counter,
                description: s.description,
                deliverables: s.deliverables ? s.deliverables.split("\n").filter(Boolean) : [],
                note: s.note,
                href: s.href,
              }))
            : fallback.howWeWork.stages,
        },
        whoThisIsFor: {
          tag: d.whoThisIsForTag ?? fallback.whoThisIsFor.tag,
          heading: d.whoThisIsForHeading ?? fallback.whoThisIsFor.heading,
          cards: d.idealClientCards?.length
            ? d.idealClientCards.map((c) => ({ title: c.title, description: c.description }))
            : fallback.whoThisIsFor.cards,
        },
        midCta: {
          title: d.midCtaTitle ?? fallback.midCta.title,
          subtitle: d.midCtaSubtitle ?? fallback.midCta.subtitle,
          ctaText: d.midCtaText ?? fallback.midCta.ctaText,
          ctaHref: d.midCtaHref ?? fallback.midCta.ctaHref,
        },
        testimonials: fallback.testimonials,
        whyUs: {
          tag: d.whyUsTag ?? fallback.whyUs.tag,
          heading: d.whyUsHeading ?? fallback.whyUs.heading,
          cards: d.valueProps?.length
            ? d.valueProps.map((v) => ({ title: v.title, description: v.description }))
            : fallback.whyUs.cards,
        },
        sprintCta: {
          heading: d.sprintHeading ?? fallback.sprintCta.heading,
          subheading: d.sprintSubheading ?? fallback.sprintCta.subheading,
          description: d.sprintDescription ?? fallback.sprintCta.description,
          steps: d.sprintSteps?.length
            ? d.sprintSteps.map((s) => ({ number: s.number, text: s.text }))
            : fallback.sprintCta.steps,
          ctaText: d.sprintCtaText ?? fallback.sprintCta.ctaText,
          ctaHref: d.sprintCtaHref ?? fallback.sprintCta.ctaHref,
        },
        faqs: {
          tag: d.faqsTag ?? fallback.faqs.tag,
          heading: d.faqsHeading ?? fallback.faqs.heading,
          items: d.faqItems?.length
            ? d.faqItems.map((f) => ({ question: f.question, answer: f.answer }))
            : fallback.faqs.items,
        },
        nextSteps: d.nextSteps?.length
          ? d.nextSteps.map((n) => ({ number: n.number, text: n.text }))
          : fallback.nextSteps,
        contactInfo: {
          phone: d.contactPhone ?? fallback.contactInfo.phone,
          email: d.contactEmail ?? fallback.contactInfo.email,
          team: d.contactTeam?.length
            ? d.contactTeam.map((t) => ({
                name: t.name,
                role: t.role,
                linkedin: t.linkedin ?? "",
                image: t.image ? getStrapiMediaUrl(t.image) : undefined,
              }))
            : fallback.contactInfo.team,
        },
      };
    }
  } catch {
    // fall through to fallback
  }

  return fallback;
}

// ─── MVP Page ─────────────────────────────────────────────────────────────────

export async function getMVPPage(): Promise<MVPPageData> {
  const fallback = mvpData as MVPPageData;

  try {
    const res = await getStrapiMVPPage();
    const s = res?.data;
    if (!s) return fallback;

    return {
      hero: {
        tag: s.heroTag ?? fallback.hero.tag,
        title: s.heroTitle ?? fallback.hero.title,
        titleAccent: s.heroTitleAccent ?? fallback.hero.titleAccent,
        ctaText: s.heroCtaText ?? fallback.hero.ctaText,
        ctaHref: s.heroCtaHref ?? fallback.hero.ctaHref,
      },
      clientLogos: s.clientLogos?.length
        ? s.clientLogos.map((l) => ({ src: l.src, alt: l.alt, width: l.width }))
        : fallback.clientLogos,
      challenges: {
        tag: s.challengesTag ?? fallback.challenges.tag,
        heading: s.challengesHeading ?? fallback.challenges.heading,
        cards: s.challengeCards?.length
          ? s.challengeCards.map((c) => ({
              actorImage: c.actorImage,
              actorName: c.actorName,
              content: c.content,
            }))
          : fallback.challenges.cards,
      },
      caseStudies: {
        tag: s.caseStudiesTag ?? fallback.caseStudies.tag,
        heading: s.caseStudiesHeading ?? fallback.caseStudies.heading,
        description: s.caseStudiesDescription ?? fallback.caseStudies.description,
        items: s.caseStudyItems?.length
          ? s.caseStudyItems.map((i) => ({
              name: i.name,
              description: i.description,
              desktopImage: i.desktopImage,
              mobileImage: i.mobileImage,
              href: i.href,
              comingSoon: i.comingSoon ?? false,
            }))
          : fallback.caseStudies.items,
      },
      midCta: {
        title: s.midCtaTitle ?? fallback.midCta.title,
        ctaText: s.midCtaText ?? fallback.midCta.ctaText,
        ctaHref: s.midCtaHref ?? fallback.midCta.ctaHref,
      },
      process: {
        tag: s.processTag ?? fallback.process.tag,
        heading: s.processHeading ?? fallback.process.heading,
        steps: s.processSteps?.length
          ? s.processSteps.map((p) => ({
              counter: p.counter,
              title: p.title,
              content: p.content,
            }))
          : fallback.process.steps,
        deliverables: s.deliverables?.length
          ? s.deliverables.map((d) => d.title)
          : fallback.process.deliverables,
      },
      outcomes: {
        tag: s.outcomesTag ?? fallback.outcomes.tag,
        heading: s.outcomesHeading ?? fallback.outcomes.heading,
        items: s.outcomeItems?.length
          ? s.outcomeItems.map((o) => o.text)
          : fallback.outcomes.items,
      },
      testimonials: fallback.testimonials,
      bottomCta: {
        title: s.bottomCtaTitle ?? fallback.bottomCta.title,
        ctaText: s.bottomCtaText ?? fallback.bottomCta.ctaText,
        ctaHref: s.bottomCtaHref ?? fallback.bottomCta.ctaHref,
      },
      faqs: {
        tag: s.faqsTag ?? fallback.faqs.tag,
        heading: s.faqsHeading ?? fallback.faqs.heading,
        items: s.faqItems?.length
          ? s.faqItems.map((f) => ({ question: f.question, answer: f.answer }))
          : fallback.faqs.items,
      },
      nextSteps: s.nextSteps?.length
        ? s.nextSteps.map((n) => ({ number: n.number, text: n.text }))
        : fallback.nextSteps,
      contactInfo: {
        phone: s.contactPhone ?? fallback.contactInfo.phone,
        email: s.contactEmail ?? fallback.contactInfo.email,
        team: s.contactTeam?.length
          ? s.contactTeam.map((t) => ({
              name: t.name,
              role: t.role,
              linkedin: t.linkedin ?? "",
              image: t.image ? getStrapiMediaUrl(t.image) : undefined,
            }))
          : fallback.contactInfo.team,
      },
    };
  } catch {
    return fallback;
  }
}

// ─── Team Extension Page ──────────────────────────────────────────────────────

export async function getTeamExtensionPage(): Promise<TeamExtensionPageData> {
  const fallback = teamExtensionData as TeamExtensionPageData;

  try {
    const res = await getStrapiTeamExtensionPage();
    const s = res?.data;
    if (!s) return fallback;

    return {
      hero: {
        tag: s.heroTag ?? fallback.hero.tag,
        title: s.heroTitle ?? fallback.hero.title,
        titleAccent: s.heroTitleAccent ?? fallback.hero.titleAccent,
        ctaText: s.heroCtaText ?? fallback.hero.ctaText,
        ctaHref: s.heroCtaHref ?? fallback.hero.ctaHref,
      },
      clientLogos: s.clientLogos?.length
        ? s.clientLogos.map((l) => ({ src: l.src, alt: l.alt, width: l.width }))
        : fallback.clientLogos,
      challenges: {
        tag: s.challengesTag ?? fallback.challenges.tag,
        heading: s.challengesHeading ?? fallback.challenges.heading,
        cards: s.challengeCards?.length
          ? s.challengeCards.map((c) => ({
              actorImage: c.actorImage,
              actorName: c.actorName,
              content: c.content,
            }))
          : fallback.challenges.cards,
      },
      caseStudies: {
        tag: s.caseStudiesTag ?? fallback.caseStudies.tag,
        heading: s.caseStudiesHeading ?? fallback.caseStudies.heading,
        description: s.caseStudiesDescription ?? fallback.caseStudies.description,
        items: s.caseStudyItems?.length
          ? s.caseStudyItems.map((i) => ({
              name: i.name,
              description: i.description,
              desktopImage: i.desktopImage,
              mobileImage: i.mobileImage,
              href: i.href,
              comingSoon: i.comingSoon ?? false,
            }))
          : fallback.caseStudies.items,
      },
      midCta: {
        title: s.midCtaTitle ?? fallback.midCta.title,
        ctaText: s.midCtaText ?? fallback.midCta.ctaText,
        ctaHref: s.midCtaHref ?? fallback.midCta.ctaHref,
      },
      process: {
        tag: s.processTag ?? fallback.process.tag,
        heading: s.processHeading ?? fallback.process.heading,
        steps: s.processSteps?.length
          ? s.processSteps.map((p) => ({
              counter: p.counter,
              title: p.title,
              content: p.content,
            }))
          : fallback.process.steps,
        deliverables: s.deliverables?.length
          ? s.deliverables.map((d) => d.title)
          : fallback.process.deliverables,
      },
      outcomes: {
        tag: s.outcomesTag ?? fallback.outcomes.tag,
        heading: s.outcomesHeading ?? fallback.outcomes.heading,
        items: s.outcomeItems?.length
          ? s.outcomeItems.map((o) => o.text)
          : fallback.outcomes.items,
      },
      testimonials: fallback.testimonials,
      bottomCta: {
        title: s.bottomCtaTitle ?? fallback.bottomCta.title,
        ctaText: s.bottomCtaText ?? fallback.bottomCta.ctaText,
        ctaHref: s.bottomCtaHref ?? fallback.bottomCta.ctaHref,
      },
      faqs: {
        tag: s.faqsTag ?? fallback.faqs.tag,
        heading: s.faqsHeading ?? fallback.faqs.heading,
        items: s.faqItems?.length
          ? s.faqItems.map((f) => ({ question: f.question, answer: f.answer }))
          : fallback.faqs.items,
      },
      nextSteps: s.nextSteps?.length
        ? s.nextSteps.map((n) => ({ number: n.number, text: n.text }))
        : fallback.nextSteps,
      contactInfo: {
        phone: s.contactPhone ?? fallback.contactInfo.phone,
        email: s.contactEmail ?? fallback.contactInfo.email,
        team: s.contactTeam?.length
          ? s.contactTeam.map((t) => ({
              name: t.name,
              role: t.role,
              linkedin: t.linkedin ?? "",
              image: t.image ? getStrapiMediaUrl(t.image) : undefined,
            }))
          : fallback.contactInfo.team,
      },
    };
  } catch {
    return fallback;
  }
}

// ─── Legacy UX Modernization Page ────────────────────────────────────────────

export async function getLegacyModernizationPage(): Promise<LegacyModernizationPageData> {
  return legacyModernizationData as LegacyModernizationPageData;
}

// ─── UX Audit & AI Readiness Page ─────────────────────────────────────────────

export async function getUXAuditPage(): Promise<UXAuditPageData> {
  const fallback = uxAuditData as UXAuditPageData;

  try {
    const res = await getStrapiUXAuditPage();
    const s = res?.data;
    if (!s) return fallback;

    return {
      hero: {
        tag: s.heroTag ?? fallback.hero.tag,
        title: s.heroTitle ?? fallback.hero.title,
        ctaText: s.heroCtaText ?? fallback.hero.ctaText,
        ctaHref: s.heroCtaHref ?? fallback.hero.ctaHref,
      },
      challenges: {
        tag: s.challengesTag ?? fallback.challenges.tag,
        heading: s.challengesHeading ?? fallback.challenges.heading,
        description: s.challengesDescription ?? fallback.challenges.description,
        cards: s.challengeCards ?? fallback.challenges.cards,
      },
      auditWork: {
        tag: s.auditWorkTag ?? fallback.auditWork.tag,
        heading: s.auditWorkHeading ?? fallback.auditWork.heading,
        stats: s.auditWorkStats ?? fallback.auditWork.stats,
        caseStudies: s.auditWorkCaseStudies ?? fallback.auditWork.caseStudies,
      },
      midCta: {
        title: s.midCtaTitle ?? fallback.midCta.title,
        ctaText: s.midCtaText ?? fallback.midCta.ctaText,
        ctaHref: s.midCtaHref ?? fallback.midCta.ctaHref,
      },
      process: {
        tag: s.processTag ?? fallback.process.tag,
        heading: s.processHeading ?? fallback.process.heading,
        steps: s.processSteps ?? fallback.process.steps,
        deliverables: s.deliverables ?? fallback.process.deliverables,
      },
      testimonials: fallback.testimonials,
      keyDeliverables: {
        tag: s.keyDeliverablesTag ?? fallback.keyDeliverables.tag,
        heading: s.keyDeliverablesHeading ?? fallback.keyDeliverables.heading,
        items: s.keyDeliverablesItems ?? fallback.keyDeliverables.items,
      },
      pricing: {
        tag: s.pricingTag ?? fallback.pricing.tag,
        description: s.pricingDescription ?? fallback.pricing.description,
        planName: s.pricingPlanName ?? fallback.pricing.planName,
        price: s.pricingPrice ?? fallback.pricing.price,
        pricePer: s.pricingPricePer ?? fallback.pricing.pricePer,
        features: s.pricingFeatures ?? fallback.pricing.features,
        ctaText: s.pricingCtaText ?? fallback.pricing.ctaText,
        ctaHref: s.pricingCtaHref ?? fallback.pricing.ctaHref,
      },
      whenToDoIt: {
        tag: s.whenToDoItTag ?? fallback.whenToDoIt.tag,
        heading: s.whenToDoItHeading ?? fallback.whenToDoIt.heading,
        items: s.whenToDoItItems ?? fallback.whenToDoIt.items,
      },
      whatHappensAfter: {
        tag: s.whatHappensAfterTag ?? fallback.whatHappensAfter.tag,
        heading: s.whatHappensAfterHeading ?? fallback.whatHappensAfter.heading,
        paths: s.whatHappensAfterPaths ?? fallback.whatHappensAfter.paths,
      },
      bottomCta: {
        title: s.bottomCtaTitle ?? fallback.bottomCta.title,
        subtitle: s.bottomCtaSubtitle ?? fallback.bottomCta.subtitle,
        ctaText: s.bottomCtaText ?? fallback.bottomCta.ctaText,
        ctaHref: s.bottomCtaHref ?? fallback.bottomCta.ctaHref,
      },
      faqs: {
        tag: s.faqsTag ?? fallback.faqs.tag,
        heading: s.faqsHeading ?? fallback.faqs.heading,
        items: s.faqItems ?? fallback.faqs.items,
      },
      nextSteps: s.nextSteps ?? fallback.nextSteps,
      contactInfo: {
        phone: s.contactPhone ?? fallback.contactInfo.phone,
        email: s.contactEmail ?? fallback.contactInfo.email,
        team: s.contactTeam
          ? s.contactTeam.map((t) => ({
              name: t.name,
              role: t.role,
              linkedin: t.linkedin ?? "",
            }))
          : fallback.contactInfo.team,
      },
    };
  } catch {
    return fallback;
  }
}

// ─── Services ─────────────────────────────────────────────────────────────────

export async function getServices(): Promise<Service[]> {
  try {
    const res = await getStrapiServices();
    if (res?.data?.length) {
      return res.data.map((s) => ({
        slug: s.slug,
        title: s.title,
        description: s.heroDescription ?? s.tagline ?? "",
        heroTitle: s.heroTitle ?? s.title,
        heroSubtitle: s.heroDescription ?? "",
        icon: s.icon ? getStrapiMediaUrl(s.icon) : undefined,
      }));
    }
  } catch {
    // fall through
  }
  return [];
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  try {
    const res = await getStrapiServiceBySlug(slug);
    if (res?.data?.length) {
      const s = res.data[0];
      return {
        slug: s.slug,
        title: s.title,
        description: s.heroDescription ?? s.tagline ?? "",
        heroTitle: s.heroTitle ?? s.title,
        heroSubtitle: s.heroDescription ?? "",
        icon: s.icon ? getStrapiMediaUrl(s.icon) : undefined,
      };
    }
  } catch {
    // fall through
  }
  const services = await getServices();
  return services.find((s) => s.slug === slug) || null;
}

// ─── Case Studies ─────────────────────────────────────────────────────────────

export async function getCaseStudies(): Promise<CaseStudy[]> {
  try {
    const res = await getStrapiCaseStudies();
    if (res?.data?.length) {
      return res.data.map((c) => ({
        slug: c.slug,
        title: c.title,
        client: c.client ?? "",
        description: c.tagline ?? "",
        image: c.featuredImage ? getStrapiMediaUrl(c.featuredImage) : "",
        href: `/case-study/${c.slug}/`,
        comingSoon: c.comingSoon,
      }));
    }
  } catch {
    // fall through
  }
  const home = await getHomePage();
  return home.caseStudies;
}

export async function getCaseStudyBySlug(
  slug: string
): Promise<CaseStudy | null> {
  try {
    const res = await getStrapiCaseStudyBySlug(slug);
    if (res?.data?.length) {
      const c = res.data[0];
      return {
        slug: c.slug,
        title: c.title,
        client: c.client ?? "",
        description: c.tagline ?? "",
        image: c.featuredImage ? getStrapiMediaUrl(c.featuredImage) : "",
        href: `/case-study/${c.slug}/`,
        comingSoon: c.comingSoon,
      };
    }
  } catch {
    // fall through
  }
  const studies = await getCaseStudies();
  return studies.find((s) => s.slug === slug) || null;
}

// ─── Blog Posts ───────────────────────────────────────────────────────────────

export async function getBlogPosts(page: number = 1): Promise<PaginatedPosts> {
  try {
    const res = await getStrapiBlogPosts(page, 10);
    if (res?.data?.length) {
      const posts: BlogPost[] = res.data.map((p) => ({
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt ?? "",
        category: p.category?.replace(/_/g, " ") ?? "General",
        date: p.publishedAt
          ? new Date(p.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          : "",
        readTime: p.readTime ?? "5 min read",
        image: p.featuredImage ? getStrapiMediaUrl(p.featuredImage) : undefined,
        href: `/blog/${p.slug}/`,
      }));

      return {
        posts,
        total: res.meta.pagination.total,
        page,
        totalPages: res.meta.pagination.pageCount,
      };
    }
  } catch {
    // fall through
  }

  const home = await getHomePage();
  const posts = home.latestPosts.map((p) => ({
    ...p,
    href: `/blog/${p.slug}/`,
  })) as BlogPost[];

  return { posts, total: posts.length, page, totalPages: 1 };
}

export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  try {
    const res = await getStrapiBlogPostBySlug(slug);
    if (res?.data?.length) {
      const p = res.data[0];
      return {
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        content: p.content,
        category: p.category?.replace(/_/g, " ") ?? "General",
        date: p.publishedAt
          ? new Date(p.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          : "",
        readTime: p.readTime ?? "5 min read",
        image: p.featuredImage ? getStrapiMediaUrl(p.featuredImage) : undefined,
        href: `/blog/${p.slug}/`,
      };
    }
  } catch {
    // fall through
  }
  const { posts } = await getBlogPosts();
  return posts.find((p) => p.slug === slug) || null;
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const res = await getStrapiTestimonials();
    if (res?.data?.length) {
      return res.data.map((t, i) => ({
        index: `/${String(i + 1).padStart(2, "0")}`,
        quote: t.quote,
        name: t.authorName,
        role: t.authorRole ?? "",
        company: t.authorCompany ?? "",
        avatar: t.authorPhoto ? getStrapiMediaUrl(t.authorPhoto) : undefined,
        companyLogo: t.companyLogo
          ? getStrapiMediaUrl(t.companyLogo)
          : undefined,
      }));
    }
  } catch {
    // fall through
  }
  const home = homeData as HomePageData;
  return home.testimonials;
}

// ─── Client Logos ─────────────────────────────────────────────────────────────

export async function getClientLogos(): Promise<ClientLogo[]> {
  try {
    const res = await getStrapiClientLogos();
    if (res?.data?.length) {
      return res.data.map((l) => ({
        name: l.name,
        logoUrl: l.logo ? getStrapiMediaUrl(l.logo) : "",
        website: l.website,
        order: l.order ?? 0,
      }));
    }
  } catch {
    // fall through
  }
  const home = homeData as HomePageData;
  return home.clientLogos.map((name, i) => ({
    name,
    logoUrl: "",
    order: i,
  }));
}

// ─── Team Members ─────────────────────────────────────────────────────────────

export async function getTeamMembers(
  filter?: "about" | "contact"
): Promise<TeamMember[]> {
  try {
    const res = await getStrapiTeamMembers();
    if (res?.data?.length) {
      let members = res.data;
      if (filter === "about")
        members = members.filter((m) => m.showInAbout);
      if (filter === "contact")
        members = members.filter((m) => m.showInContact);

      return members.map((m) => ({
        name: m.name,
        role: m.role,
        image: m.photo ? getStrapiMediaUrl(m.photo) : "",
        linkedin: m.linkedin,
      }));
    }
  } catch {
    // fall through
  }
  return [];
}

// ─── Industries / Expertise ───────────────────────────────────────────────────

export async function getIndustries(): Promise<ExpertiseDomain[]> {
  try {
    const res = await getStrapiIndustries();
    if (res?.data?.length) {
      return res.data.map((ind) => ({
        title: ind.name,
        tags: ind.tags ? ind.tags.split(",").map((t) => t.trim()) : [],
        href: ind.link ?? `/expertise/${ind.slug}/`,
      }));
    }
  } catch {
    // fall through
  }
  const home = homeData as HomePageData;
  return home.expertise;
}

// ─── Site Settings ────────────────────────────────────────────────────────────

export async function getSiteSettings(): Promise<SiteSettings> {
  const fallback: SiteSettings = {
    siteName: "reloadux",
    siteTagline: "UX design agency for AI-native experiences",
    logoUrl: "/images/reloadux-logo.svg",
    logoFooterUrl: "/images/reloadux-logo.svg",
    email: "info@reloadux.com",
    phone: "(202) 978 3410",
    address: "Freedom Drive 13th Floor\nReston, VA 20190",
    footerCopyright: "© 2026 Reloadux - all rights reserved",
    socialLinks: [],
    defaultSeoTitle:
      "Expert UI UX Design and Development Services | reloadux",
    defaultSeoDescription: "",
    defaultSeoImageUrl: "",
  };

  try {
    const res = await getStrapiSiteSettings();
    if (res?.data) {
      const d = res.data;
      return {
        siteName: d.siteName ?? fallback.siteName,
        siteTagline: d.siteTagline ?? fallback.siteTagline,
        logoUrl: d.logo ? getStrapiMediaUrl(d.logo) : fallback.logoUrl,
        logoFooterUrl: d.logoFooter
          ? getStrapiMediaUrl(d.logoFooter)
          : fallback.logoFooterUrl,
        email: d.email ?? fallback.email,
        phone: d.phone ?? fallback.phone,
        address: d.address ?? fallback.address,
        footerCopyright: d.footerCopyright ?? fallback.footerCopyright,
        socialLinks: d.socialLinks ?? fallback.socialLinks,
        defaultSeoTitle: d.defaultSeoTitle ?? fallback.defaultSeoTitle,
        defaultSeoDescription:
          d.defaultSeoDescription ?? fallback.defaultSeoDescription,
        defaultSeoImageUrl: d.defaultSeoImage
          ? getStrapiMediaUrl(d.defaultSeoImage)
          : fallback.defaultSeoImageUrl,
      };
    }
  } catch {
    // fall through
  }

  return fallback;
}
