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

// ─── UX Redesign Page ───────────────────────────────────────────────────────

export interface StrapiChallengeCard {
  tag: string;
  description: string;
}

export interface StrapiCaseStudySlide {
  type: "video" | "image";
  src: string;
}

export interface StrapiCaseStudyVideo {
  tag: string;
  description: string;
  videoUrl?: string;
  image?: string;
  slides?: StrapiCaseStudySlide[];
}

export interface StrapiPrinciple {
  number: string;
  title: string;
  description: string;
  gif?: string;
}

export interface StrapiProcessStage {
  title: string;
  counter: string;
  description: string;
  deliverables?: string;
  note?: string;
  href?: string;
}

export interface StrapiIdealClientCard {
  title: string;
  description: string;
}

export interface StrapiValueProp {
  title: string;
  description: string;
}

export interface StrapiSprintStep {
  number: string;
  text: string;
}

export interface StrapiNextStep {
  number: string;
  text: string;
}

export interface StrapiTeamContact {
  name: string;
  role: string;
  linkedin?: string;
  image?: StrapiMedia;
}

export interface StrapiUXRedesignPage {
  id: number;
  heroTag?: string;
  heroTitle: string;
  heroSubtitle?: string;
  heroCtaText?: string;
  heroCtaHref?: string;
  clientLogos?: string;
  challengesTag?: string;
  challengesHeading?: string;
  challengesDescription?: string;
  challengeCards?: StrapiChallengeCard[];
  caseStudyItems?: StrapiCaseStudyVideo[];
  caseStudyCtaText?: string;
  caseStudyCtaHref?: string;
  approachTag?: string;
  approachHeading?: string;
  approachHeadingItalic?: string;
  approachDescription?: string;
  principles?: StrapiPrinciple[];
  howWeWorkTag?: string;
  howWeWorkSubtitle?: string;
  stages?: StrapiProcessStage[];
  whoThisIsForTag?: string;
  whoThisIsForHeading?: string;
  idealClientCards?: StrapiIdealClientCard[];
  midCtaTitle?: string;
  midCtaSubtitle?: string;
  midCtaText?: string;
  midCtaHref?: string;
  whyUsTag?: string;
  whyUsHeading?: string;
  valueProps?: StrapiValueProp[];
  sprintHeading?: string;
  sprintSubheading?: string;
  sprintDescription?: string;
  sprintSteps?: StrapiSprintStep[];
  sprintCtaText?: string;
  sprintCtaHref?: string;
  faqsTag?: string;
  faqsHeading?: string;
  faqItems?: { question: string; answer: string }[];
  nextSteps?: StrapiNextStep[];
  contactPhone?: string;
  contactEmail?: string;
  contactTeam?: StrapiTeamContact[];
  seoTitle?: string;
  seoDescription?: string;
}

export async function getStrapiUXRedesignPage() {
  return fetchStrapi<StrapiSingle<StrapiUXRedesignPage>>(
    "/api/ux-redesign-page?populate[challengeCards]=*&populate[caseStudyItems][populate]=slides&populate[principles]=*&populate[stages]=*&populate[idealClientCards]=*&populate[valueProps]=*&populate[sprintSteps]=*&populate[faqItems]=*&populate[nextSteps]=*&populate[contactTeam][populate]=image"
  );
}

// ─── MVP Page ────────────────────────────────────────────────────────────────

export interface StrapiMVPChallengeCard {
  actorImage: string;
  actorName: string;
  content: string;
}

export interface StrapiMVPCaseStudyItem {
  name: string;
  description: string;
  desktopImage: string;
  mobileImage: string;
  href: string;
  comingSoon?: boolean;
}

export interface StrapiMVPProcessStep {
  counter: string;
  title: string;
  content: string;
}

export interface StrapiClientLogoItem {
  src: string;
  alt: string;
  width: number;
}

export interface StrapiMVPPage {
  id: number;
  heroTag?: string;
  heroTitle: string;
  heroTitleAccent?: string;
  heroCtaText?: string;
  heroCtaHref?: string;
  clientLogos?: StrapiClientLogoItem[];
  challengesTag?: string;
  challengesHeading?: string;
  challengeCards?: StrapiMVPChallengeCard[];
  caseStudiesTag?: string;
  caseStudiesHeading?: string;
  caseStudiesDescription?: string;
  caseStudyItems?: StrapiMVPCaseStudyItem[];
  midCtaTitle?: string;
  midCtaText?: string;
  midCtaHref?: string;
  processTag?: string;
  processHeading?: string;
  processSteps?: StrapiMVPProcessStep[];
  deliverables?: { title: string }[];
  outcomesTag?: string;
  outcomesHeading?: string;
  outcomeItems?: { text: string }[];
  bottomCtaTitle?: string;
  bottomCtaText?: string;
  bottomCtaHref?: string;
  faqsTag?: string;
  faqsHeading?: string;
  faqItems?: { question: string; answer: string }[];
  nextSteps?: StrapiNextStep[];
  contactPhone?: string;
  contactEmail?: string;
  contactTeam?: StrapiTeamContact[];
  seoTitle?: string;
  seoDescription?: string;
}

export async function getStrapiMVPPage() {
  return fetchStrapi<StrapiSingle<StrapiMVPPage>>(
    "/api/mvp-page?populate=*"
  );
}

// ─── Team Extension Page ──────────────────────────────────────────────────────

export type StrapiTeamExtensionPage = StrapiMVPPage;

export async function getStrapiTeamExtensionPage() {
  return fetchStrapi<StrapiSingle<StrapiTeamExtensionPage>>(
    "/api/team-extension-page?populate=*"
  );
}

// ─── UX Audit Page ──────────────────────────────────────────────────────────

export interface StrapiUXAuditPage {
  id: number;
  heroTag?: string;
  heroTitle: string;
  heroCtaText?: string;
  heroCtaHref?: string;
  challengesTag?: string;
  challengesHeading?: string;
  challengesDescription?: string;
  challengeCards?: { tag: string; description: string }[];
  auditWorkTag?: string;
  auditWorkHeading?: string;
  auditWorkStats?: { value: string; label: string }[];
  auditWorkCaseStudies?: {
    name: string;
    description: string;
    slides: { type: "video" | "image"; src: string }[];
    href: string;
    comingSoon?: boolean;
  }[];
  midCtaTitle?: string;
  midCtaText?: string;
  midCtaHref?: string;
  processTag?: string;
  processHeading?: string;
  processSteps?: { counter: string; title: string; content: string }[];
  deliverables?: string[];
  keyDeliverablesTag?: string;
  keyDeliverablesHeading?: string;
  keyDeliverablesItems?: { title: string; description: string }[];
  pricingTag?: string;
  pricingDescription?: string;
  pricingPlanName?: string;
  pricingPrice?: string;
  pricingPricePer?: string;
  pricingFeatures?: string[];
  pricingCtaText?: string;
  pricingCtaHref?: string;
  whenToDoItTag?: string;
  whenToDoItHeading?: string;
  whenToDoItItems?: { title: string; description: string }[];
  whatHappensAfterTag?: string;
  whatHappensAfterHeading?: string;
  whatHappensAfterPaths?: { title: string; description: string }[];
  bottomCtaTitle?: string;
  bottomCtaSubtitle?: string;
  bottomCtaText?: string;
  bottomCtaHref?: string;
  faqsTag?: string;
  faqsHeading?: string;
  faqItems?: { question: string; answer: string }[];
  nextSteps?: { number: string; text: string }[];
  contactPhone?: string;
  contactEmail?: string;
  contactTeam?: { name: string; role: string; linkedin?: string }[];
  seoTitle?: string;
  seoDescription?: string;
}

export async function getStrapiUXAuditPage() {
  return fetchStrapi<StrapiSingle<StrapiUXAuditPage>>(
    "/api/ux-audit-page?populate=*"
  );
}

// ─── Legacy Modernization Page ──────────────────────────────────────────────

export interface StrapiLegacyModernizationPage {
  id: number;
  heroTag?: string;
  heroTitle: string;
  heroSubtitle?: string;
  heroCtaText?: string;
  heroCtaHref?: string;
  challengesTag?: string;
  challengesHeading?: string;
  challengesDescription?: string;
  challengeCards?: { tag: string; description: string }[];
  caseStudiesTag?: string;
  caseStudiesHeading?: string;
  caseStudiesStats?: { value: string; label: string }[];
  caseStudyItems?: {
    name: string;
    description: string;
    slides?: { type: "video" | "image"; src: string }[];
    href?: string;
    comingSoon?: boolean;
  }[];
  videoBannerHeading?: string;
  videoBannerHeadingAccent?: string;
  videoBannerDescription?: string;
  videoBannerCtaText?: string;
  videoBannerCtaHref?: string;
  processTag?: string;
  processHeading?: string;
  processPhases?: { label: string; title: string; description: string }[];
  processNote?: string;
  keyDeliverablesTag?: string;
  keyDeliverablesHeading?: string;
  keyDeliverablesItems?: { title: string; description: string }[];
  whenToDoItTag?: string;
  whenToDoItHeading?: string;
  whenToDoItItems?: { title: string; description: string }[];
  otherServicesTag?: string;
  otherServicesItems?: { title: string; description: string; href?: string }[];
  bottomCtaTitle?: string;
  bottomCtaSubtitle?: string;
  bottomCtaText?: string;
  bottomCtaHref?: string;
  faqsTag?: string;
  faqsHeading?: string;
  faqItems?: { question: string; answer: string }[];
  nextSteps?: { number: string; text: string }[];
  contactPhone?: string;
  contactEmail?: string;
  contactTeam?: StrapiTeamContact[];
  seoTitle?: string;
  seoDescription?: string;
}

// ─── Conversational UX Page ──────────────────────────────────────────────────

export interface StrapiConversationalUXPage {
  id: number;
  heroTitleItalic?: string;
  heroTitleBold: string;
  heroSubtitle?: string;
  heroCtaText?: string;
  heroCtaHref?: string;
  heroVideoSrc?: string;
  heroVideoPoster?: string;
  heroStatValue?: string;
  heroStatText?: string;
  heroStatSource?: string;
  genaiHeading?: string;
  genaiSubheading?: string;
  genaiCtaText?: string;
  genaiCtaHref?: string;
  featureGridHeading?: string;
  features?: { image: string; imageAlt?: string; title: string; description: string }[];
  processTag?: string;
  processHeading?: string;
  deliverablesTag?: string;
  deliverables?: string;
  freeTrialHeading?: string;
  freeTrialAccent?: string;
  freeTrialEnd?: string;
  freeTrialBenefits?: string;
  freeTrialCtaText?: string;
  freeTrialCtaHref?: string;
  faqsTag?: string;
  faqsHeading?: string;
  faqItems?: { question: string; answer: string }[];
  nextSteps?: { number: string; text: string }[];
  contactPhone?: string;
  contactEmail?: string;
  contactTeam?: StrapiTeamContact[];
  seoTitle?: string;
  seoDescription?: string;
}

export async function getStrapiConversationalUXPage() {
  return fetchStrapi<StrapiSingle<StrapiConversationalUXPage>>(
    "/api/conversational-ux-page?populate[features]=*&populate[faqItems]=*&populate[nextSteps]=*&populate[contactTeam][populate]=image"
  );
}

// ─── Design Discovery Page ──────────────────────────────────────────────────

export interface StrapiDesignDiscoveryPage {
  id: number;
  heroTag?: string;
  heroTitle: string;
  heroCtaText?: string;
  heroCtaHref?: string;
  challengesTag?: string;
  challengesHeading?: string;
  challengesDescription?: string;
  challengeCards?: { tag: string; description: string }[];
  auditWorkTag?: string;
  auditWorkHeading?: string;
  auditWorkStats?: { value: string; label: string }[];
  auditWorkCaseStudies?: {
    name: string;
    description: string;
    slides: { type: "video" | "image"; src: string }[];
    href: string;
    comingSoon?: boolean;
  }[];
  midCtaTitle?: string;
  midCtaText?: string;
  midCtaHref?: string;
  processTag?: string;
  processHeading?: string;
  processSteps?: { counter: string; title: string; content: string }[];
  deliverables?: string[];
  keyDeliverablesTag?: string;
  keyDeliverablesHeading?: string;
  keyDeliverablesItems?: { title: string; description: string }[];
  bottomCtaTitle?: string;
  bottomCtaSubtitle?: string;
  bottomCtaText?: string;
  bottomCtaHref?: string;
  faqsTag?: string;
  faqsHeading?: string;
  faqItems?: { question: string; answer: string }[];
  nextSteps?: { number: string; text: string }[];
  contactPhone?: string;
  contactEmail?: string;
  contactTeam?: { name: string; role: string; linkedin?: string }[];
  seoTitle?: string;
  seoDescription?: string;
}

export async function getStrapiDesignDiscoveryPage() {
  return fetchStrapi<StrapiSingle<StrapiDesignDiscoveryPage>>(
    "/api/design-discovery-page?populate=*"
  );
}

// ─── Legacy Modernization Page ──────────────────────────────────────────────

export async function getStrapiLegacyModernizationPage() {
  return fetchStrapi<StrapiSingle<StrapiLegacyModernizationPage>>(
    "/api/legacy-modernization-page?populate[challengeCards]=*&populate[caseStudiesStats]=*&populate[caseStudyItems][populate]=slides&populate[processPhases]=*&populate[keyDeliverablesItems]=*&populate[whenToDoItItems]=*&populate[otherServicesItems]=*&populate[faqItems]=*&populate[nextSteps]=*&populate[contactTeam][populate]=image"
  );
}
