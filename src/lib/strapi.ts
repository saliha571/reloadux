/**
 * Strapi CMS API Client
 * Connects the Next.js frontend to Strapi v5
 */

import type { StrapiMedia } from "./media";

const STRAPI_URL = process.env.STRAPI_API_URL || "http://localhost:1337";

// ─── Base Fetcher ────────────────────────────────────────────────────────────

async function fetchStrapi<T>(
  path: string,
  options: RequestInit = {},
  revalidateSeconds = 60
): Promise<T | null> {
  try {
    const url = `${STRAPI_URL}${path}`;
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...(process.env.STRAPI_API_TOKEN
          ? { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` }
          : {}),
      },
      next: { revalidate: revalidateSeconds },
      ...options,
    });

    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

// ─── Strapi Response Shapes ──────────────────────────────────────────────────

interface StrapiSingle<T> {
  data: T | null;
  meta: object;
}

interface StrapiCollection<T> {
  data: T[];
  meta: { pagination: { total: number; page: number; pageCount: number } };
}

// ─── Strapi Data Types ───────────────────────────────────────────────────────

export interface StrapiHomepage {
  id: number;
  heroTitle: string;
  heroTitleAccent?: string;
  heroSubtitle?: string;
  heroCtaText?: string;
  heroCtaLink?: string;
  heroImage?: StrapiMedia;
  ourServices?: { title: string; link: string; isNew?: boolean }[];
  servicesSectionLabel?: string;
  servicesSectionTitle?: string;
  aboutSectionLabel?: string;
  aboutSectionTitle?: string;
  stats?: { value: string; suffix?: string; prefix?: string; label: string; order?: number }[];
  industriesSectionLabel?: string;
  industriesSectionTitle?: string;
  workSectionLabel?: string;
  workSectionTitle?: string;
  testimonialsSectionLabel?: string;
  blogSectionLabel?: string;
  blogSectionTitle?: string;
  ctaSectionTitle?: string;
  ctaSectionButtonText?: string;
  ctaSectionButtonLink?: string;
  ctaSectionSubtitle?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoImage?: StrapiMedia;
}

export interface StrapiCaseStudy {
  id: number;
  documentId?: string;
  title: string;
  slug: string;
  client?: string;
  tagline?: string;
  backgroundText?: string;
  description?: string;
  featuredImage?: StrapiMedia;
  sliderImage?: StrapiMedia;
  mobileImage?: StrapiMedia;
  industry?: string;
  results?: { metric: string; value: string }[];
  featured?: boolean;
  showInSlider?: boolean;
  showInWorkGrid?: boolean;
  comingSoon?: boolean;
  order?: number;
}

export interface StrapiService {
  id: number;
  documentId?: string;
  title: string;
  slug: string;
  heroTitle?: string;
  heroDescription?: string;
  tagline?: string;
  category?: string;
  homepageCategory?: string;
  showOnHomepage?: boolean;
  showInNavServices?: boolean;
  showInNavCapabilities?: boolean;
  showInNavExpertise?: boolean;
  icon?: StrapiMedia;
  featuredImage?: StrapiMedia;
  order?: number;
}

export interface StrapiBlogPost {
  id: number;
  documentId?: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  category?: string;
  readTime?: string;
  publishedAt?: string;
  featured?: boolean;
  featuredImage?: StrapiMedia;
}

export interface StrapiTestimonial {
  id: number;
  documentId?: string;
  quote: string;
  authorName: string;
  authorRole?: string;
  authorCompany?: string;
  authorPhoto?: StrapiMedia;
  companyLogo?: StrapiMedia;
  featured?: boolean;
  order?: number;
}

export interface StrapiTeamMember {
  id: number;
  documentId?: string;
  name: string;
  role: string;
  bio?: string;
  photo?: StrapiMedia;
  linkedin?: string;
  email?: string;
  phone?: string;
  showInAbout?: boolean;
  showInContact?: boolean;
  order?: number;
}

export interface StrapiClientLogo {
  id: number;
  documentId?: string;
  name: string;
  logo?: StrapiMedia;
  website?: string;
  featured?: boolean;
  order?: number;
}

export interface StrapiIndustry {
  id: number;
  documentId?: string;
  name: string;
  slug: string;
  tagline?: string;
  tags?: string;
  icon?: StrapiMedia;
  link?: string;
  order?: number;
}

export interface StrapiSiteSettings {
  id: number;
  siteName?: string;
  siteTagline?: string;
  logo?: StrapiMedia;
  logoFooter?: StrapiMedia;
  email?: string;
  phone?: string;
  address?: string;
  footerCopyright?: string;
  socialLinks?: { platform: string; url: string; icon?: string }[];
  defaultSeoTitle?: string;
  defaultSeoDescription?: string;
  defaultSeoImage?: StrapiMedia;
  favicon?: StrapiMedia;
}

// ─── Homepage ────────────────────────────────────────────────────────────────

export async function getStrapiHomepage() {
  return fetchStrapi<StrapiSingle<StrapiHomepage>>(
    "/api/homepage?populate=*"
  );
}

// ─── Case Studies ────────────────────────────────────────────────────────────

export async function getStrapiCaseStudies() {
  return fetchStrapi<StrapiCollection<StrapiCaseStudy>>(
    "/api/case-studies?populate=*&sort=order:asc"
  );
}

export async function getStrapiCaseStudyBySlug(slug: string) {
  return fetchStrapi<StrapiCollection<StrapiCaseStudy>>(
    `/api/case-studies?filters[slug][$eq]=${slug}&populate=*`,
    {},
    300
  );
}

// ─── Services ────────────────────────────────────────────────────────────────

export async function getStrapiServices() {
  return fetchStrapi<StrapiCollection<StrapiService>>(
    "/api/services?populate=*&sort=order:asc"
  );
}

export async function getStrapiServiceBySlug(slug: string) {
  return fetchStrapi<StrapiCollection<StrapiService>>(
    `/api/services?filters[slug][$eq]=${slug}&populate=*`,
    {},
    300
  );
}

// ─── Blog Posts ──────────────────────────────────────────────────────────────

export async function getStrapiBlogPosts(page = 1, pageSize = 10) {
  return fetchStrapi<StrapiCollection<StrapiBlogPost>>(
    `/api/blog-posts?populate=*&sort=publishedAt:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`
  );
}

export async function getStrapiBlogPostBySlug(slug: string) {
  return fetchStrapi<StrapiCollection<StrapiBlogPost>>(
    `/api/blog-posts?filters[slug][$eq]=${slug}&populate=*`,
    {},
    300
  );
}

// ─── Testimonials ────────────────────────────────────────────────────────────

export async function getStrapiTestimonials() {
  return fetchStrapi<StrapiCollection<StrapiTestimonial>>(
    "/api/testimonials?populate=*&sort=order:asc"
  );
}

// ─── Team Members ────────────────────────────────────────────────────────────

export async function getStrapiTeamMembers() {
  return fetchStrapi<StrapiCollection<StrapiTeamMember>>(
    "/api/team-members?populate=*&sort=order:asc"
  );
}

// ─── Client Logos ────────────────────────────────────────────────────────────

export async function getStrapiClientLogos() {
  return fetchStrapi<StrapiCollection<StrapiClientLogo>>(
    "/api/client-logos?populate=*&sort=order:asc"
  );
}

// ─── Industries ──────────────────────────────────────────────────────────────

export async function getStrapiIndustries() {
  return fetchStrapi<StrapiCollection<StrapiIndustry>>(
    "/api/industries?populate=*&sort=order:asc"
  );
}

// ─── Site Settings ───────────────────────────────────────────────────────────

export async function getStrapiSiteSettings() {
  return fetchStrapi<StrapiSingle<StrapiSiteSettings>>(
    "/api/site-setting?populate=*"
  );
}
