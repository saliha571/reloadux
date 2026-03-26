import type {
  HomePageData,
  AboutPageData,
  ContactPageData,
  UXRedesignPageData,
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

import {
  getStrapiHomepage,
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
  return uxRedesignData as UXRedesignPageData;
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
