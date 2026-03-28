export interface HeroData {
  overline?: string;
  title: string;
  titleAccent?: string;
  subtitle?: string;
  ctaText: string;
  ctaHref: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
}

export interface PortfolioItem {
  title: string;
  subtitle?: string;
  slug?: string;
  backgroundText?: string;
  image: string;
  href?: string;
  comingSoon?: boolean;
}

export interface ServiceItem {
  tag: string;
  title: string;
  href: string;
}

export interface ServiceCategory {
  label: string;
  items: ServiceLink[];
}

export interface ServiceLink {
  title: string;
  href: string;
}

export interface Stat {
  value: string;
  prefix?: string;
  suffix?: string;
  label: string;
}

export interface ExpertiseDomain {
  title: string;
  tags: string[];
  href?: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  description: string;
  image: string;
  href?: string;
  comingSoon?: boolean;
}

export interface Testimonial {
  index: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar?: string;
  companyLogo?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt?: string;
  category: string;
  date: string;
  readTime: string;
  image?: string;
  content?: string;
  href?: string;
}

export interface PaginatedPosts {
  posts: BlogPost[];
  total: number;
  page: number;
  totalPages: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  linkedin?: string;
}

export interface ValueItem {
  title: string;
  description: string;
  icon?: string;
}

export interface NextStep {
  number: string;
  text: string;
}

export interface Service {
  slug: string;
  title: string;
  description: string;
  heroTitle: string;
  heroSubtitle: string;
  icon?: string;
  features?: string[];
  process?: ProcessStep[];
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface CapabilityItem {
  title: string;
  subitems: string[];
}

export interface GenAiBannerData {
  title: string;
  titleAccent: string;
  description: string;
  descriptionLine2?: string;
  ctaText: string;
  ctaHref: string;
}

export interface AboutStatsData {
  tag: string;
  heading: string;
  stats: Stat[];
}

export interface CapabilitiesData {
  tag: string;
  heading: string;
  items: CapabilityItem[];
}

export interface HomePageData {
  hero: HeroData;
  clientLogos: string[];
  portfolio: PortfolioItem[];
  ourServices: { title: string; href: string }[];
  serviceCategories: ServiceCategory[];
  aboutStats: AboutStatsData;
  expertise: ExpertiseDomain[];
  caseStudies: CaseStudy[];
  testimonials: Testimonial[];
  latestPosts: BlogPost[];
  cta: {
    title: string;
    titleAccent?: string;
    titleEnd?: string;
    subtitle?: string;
    ctaText: string;
    ctaHref: string;
  };
}

export interface AboutPageData {
  hero: HeroData;
  stats: Stat[];
  values: ValueItem[];
  team: TeamMember[];
  glance: { label: string; value: string }[];
  cta: {
    title: string;
    subtitle: string;
    ctaText: string;
    ctaHref: string;
  };
}

export interface ContactPageData {
  hero: HeroData;
  faqs: FAQItem[];
  nextSteps: NextStep[];
  testimonials: Testimonial[];
  contactInfo: {
    phone: string;
    email: string;
    team: { name: string; role: string; linkedin: string; image?: string }[];
  };
}

export interface SiteSettings {
  siteName: string;
  siteTagline: string;
  logoUrl: string;
  logoFooterUrl: string;
  email: string;
  phone: string;
  address: string;
  footerCopyright: string;
  socialLinks: SocialLink[];
  defaultSeoTitle: string;
  defaultSeoDescription: string;
  defaultSeoImageUrl: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon?: string;
}

export interface ClientLogo {
  name: string;
  logoUrl: string;
  website?: string;
  order: number;
}

export interface IndustryDomain {
  name: string;
  slug: string;
  tagline: string;
  tags: string[];
  iconUrl?: string;
  link?: string;
  order: number;
}

// ─── UX Redesign Page ──────────────────────────────────────────────────────────

export interface ChallengeCard {
  tag: string;
  description: string;
}

export interface CaseStudySlide {
  type: "video" | "image";
  src: string;
}

export interface CaseStudyVideo {
  tag: string;
  description: string;
  videoUrl?: string;
  image?: string;
  slides?: CaseStudySlide[];
}

export interface Principle {
  number: string;
  title: string;
  description: string;
  gif?: string;
}

export interface ProcessStageItem {
  title: string;
  counter: string;
  description: string;
  deliverables: string[];
  note?: string;
  href?: string;
}

export interface IdealClientCard {
  title: string;
  description: string;
}

export interface ValueProp {
  title: string;
  description: string;
}

export interface SprintStep {
  number: string;
  text: string;
}

export interface UXRedesignPageData {
  hero: {
    tag: string;
    title: string;
    subtitle: string;
    ctaText: string;
    ctaHref: string;
  };
  clientLogos: string[];
  challenges: {
    tag: string;
    heading: string;
    description: string;
    cards: ChallengeCard[];
  };
  caseStudies: {
    items: CaseStudyVideo[];
    ctaText: string;
    ctaHref: string;
  };
  approach: {
    tag: string;
    heading: string;
    headingItalic: string;
    description: string;
    principles: Principle[];
  };
  howWeWork: {
    tag: string;
    subtitle: string;
    stages: ProcessStageItem[];
  };
  whoThisIsFor: {
    tag: string;
    heading: string;
    cards: IdealClientCard[];
  };
  midCta: {
    title: string;
    subtitle: string;
    ctaText: string;
    ctaHref: string;
  };
  testimonials: Testimonial[];
  whyUs: {
    tag: string;
    heading: string;
    cards: ValueProp[];
  };
  sprintCta: {
    heading: string;
    subheading: string;
    description: string;
    steps: SprintStep[];
    ctaText: string;
    ctaHref: string;
  };
  faqs: {
    tag: string;
    heading: string;
    items: FAQItem[];
  };
  nextSteps: NextStep[];
  contactInfo: {
    phone: string;
    email: string;
    team: { name: string; role: string; linkedin: string }[];
  };
}

// ─── MVP / Team Extension Page ───────────────────────────────────────────────────

export interface MVPChallengeCard {
  actorImage: string;
  actorName: string;
  content: string;
}

export interface MVPCaseStudyItem {
  name: string;
  description: string;
  desktopImage: string;
  mobileImage: string;
  href: string;
  comingSoon?: boolean;
}

export interface MVPProcessStep {
  counter: string;
  title: string;
  content: string;
}

export type TeamExtensionPageData = MVPPageData;

export interface MVPPageData {
  hero: {
    tag: string;
    title: string;
    titleAccent: string;
    ctaText: string;
    ctaHref: string;
  };
  clientLogos: { src: string; alt: string; width: number }[];
  challenges: {
    tag: string;
    heading: string;
    cards: MVPChallengeCard[];
  };
  caseStudies: {
    tag: string;
    heading: string;
    description: string;
    items: MVPCaseStudyItem[];
  };
  midCta: {
    title: string;
    ctaText: string;
    ctaHref: string;
  };
  process: {
    tag: string;
    heading: string;
    steps: MVPProcessStep[];
    deliverables: string[];
  };
  outcomes: {
    tag: string;
    heading: string;
    items: string[];
  };
  testimonials: Testimonial[];
  bottomCta: {
    title: string;
    ctaText: string;
    ctaHref: string;
  };
  faqs: {
    tag: string;
    heading: string;
    items: FAQItem[];
  };
  nextSteps: NextStep[];
  contactInfo: {
    phone: string;
    email: string;
    team: { name: string; role: string; linkedin: string; image?: string }[];
  };
}

// ─── Legacy UX Modernization Page ─────────────────────────────────────────────

export interface LegacyModernizationPageData {
  hero: {
    tag: string;
    title: string;
    subtitle: string;
    ctaText: string;
    ctaHref: string;
  };
  challenges: {
    tag: string;
    heading: string;
    description: string;
    cards: { tag: string; description: string }[];
  };
  caseStudies: {
    tag: string;
    heading: string;
    stats: { value: string; label: string }[];
    items: {
      name: string;
      description: string;
      slides: { type: "video" | "image"; src: string }[];
      href: string;
      comingSoon?: boolean;
    }[];
  };
  videoBanner: {
    heading: string;
    headingAccent: string;
    description: string;
    ctaText: string;
    ctaHref: string;
  };
  process: {
    tag: string;
    heading: string;
    phases: { label: string; title: string; description: string }[];
    note?: string;
  };
  keyDeliverables: {
    tag: string;
    heading: string;
    items: { title: string; description: string }[];
  };
  whenToDoIt: {
    tag: string;
    heading: string;
    items: { title: string; description: string }[];
  };
  otherServices: {
    tag: string;
    items: { title: string; description: string; href: string }[];
  };
  bottomCta: {
    title: string;
    subtitle: string;
    ctaText: string;
    ctaHref: string;
  };
  faqs: {
    tag: string;
    heading: string;
    items: { question: string; answer: string }[];
  };
  nextSteps: { number: string; text: string }[];
  contactInfo: {
    phone: string;
    email: string;
    team: { name: string; role: string; linkedin: string; image?: string }[];
  };
}

// ─── UX Audit & AI Readiness Page ─────────────────────────────────────────────

export interface AuditCaseStudy {
  name: string;
  description: string;
  slides: { type: "video" | "image"; src: string }[];
  href: string;
  comingSoon?: boolean;
}

export interface UXAuditPageData {
  hero: {
    tag: string;
    title: string;
    ctaText: string;
    ctaHref: string;
  };
  challenges: {
    tag: string;
    heading: string;
    description: string;
    cards: { tag: string; description: string }[];
  };
  auditWork: {
    tag: string;
    heading: string;
    stats: { value: string; label: string }[];
    caseStudies: AuditCaseStudy[];
  };
  midCta: {
    title: string;
    ctaText: string;
    ctaHref: string;
  };
  process: {
    tag: string;
    heading: string;
    steps: { counter: string; title: string; content: string }[];
    deliverables: string[];
  };
  testimonials: Testimonial[];
  keyDeliverables: {
    tag: string;
    heading: string;
    items: { title: string; description: string }[];
  };
  pricing: {
    tag: string;
    description: string;
    planName: string;
    price: string;
    pricePer: string;
    features: string[];
    ctaText: string;
    ctaHref: string;
  };
  whenToDoIt: {
    tag: string;
    heading: string;
    items: { title: string; description: string }[];
  };
  whatHappensAfter: {
    tag: string;
    heading: string;
    paths: { title: string; description: string }[];
  };
  bottomCta: {
    title: string;
    subtitle: string;
    ctaText: string;
    ctaHref: string;
  };
  faqs: {
    tag: string;
    heading: string;
    items: { question: string; answer: string }[];
  };
  nextSteps: { number: string; text: string }[];
  contactInfo: {
    phone: string;
    email: string;
    team: { name: string; role: string; linkedin: string; image?: string }[];
  };
}
