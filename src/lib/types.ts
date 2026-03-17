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
    team: { name: string; role: string; linkedin: string }[];
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
