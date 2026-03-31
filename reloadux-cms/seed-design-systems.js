/**
 * Design Systems Page Seed Script
 */

const http = require("http");

const STRAPI = "http://localhost:1337";

async function request(method, path, body, token) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, STRAPI);
    const opts = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method,
      headers: { "Content-Type": "application/json" },
    };
    if (token) opts.headers["Authorization"] = `Bearer ${token}`;
    const req = http.request(opts, (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });
    req.on("error", reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function getAdminToken() {
  const attempts = [
    { email: "shahzaib44pk@gmail.com", password: "Admin1234!" },
    { email: "salihashahzad23@gmail.com", password: "Admin1234!" },
  ];
  for (const creds of attempts) {
    const res = await request("POST", "/admin/login", creds);
    if (res.body?.data?.token) return res.body.data.token;
  }
  throw new Error("Cannot login to Strapi admin");
}

const PAGE_DATA = {
  heroTag: "Design Systems",
  heroTitle: "Build cohesive, developer-friendly digital experiences with design systems.",
  heroCtaText: "Build my design system",
  heroCtaHref: "#contact-form",
  challengesTag: "CHALLENGES",
  challengesHeading: "Not having a design system comes with hidden costs.",
  challengesDescription: "It is a recurring problem: the more your business scales, the more you struggle with design debt.",
  challengeCards: [
    { tag: "INCONSISTENT UI", description: "Visuals and components vary across products." },
    { tag: "SLOW DEVELOPMENT", description: "Teams waste time reinventing design elements." },
    { tag: "POOR COLLABORATION", description: "Misalignment between designers and developers." },
    { tag: "BRAND DILUTION", description: "Inconsistent branding weakens your identity." },
    { tag: "COMPETITIVE DISADVANTAGE", description: "Teams struggle to keep a clear product direction." },
    { tag: "INCREASING CHAOS", description: "Designers struggle with complex products like ERPs." },
    { tag: "TROUBLE ONBOARDING", description: "New members cannot keep up without guidelines." },
  ],
  auditWorkTag: "REAL-WORLD WINS",
  auditWorkHeading: "We help product teams like yours ship smarter, better, and faster.",
  auditWorkStats: [
    { value: "70%", label: "faster collaboration during developer handoffs" },
    { value: "2x", label: "less time spent fixing design-related bugs" },
    { value: "100+", label: "scalable design systems successfully implemented" },
  ],
  auditWorkCaseStudies: [
    {
      name: "PROFIT OPTICS",
      description: "Drove 10x efficiency gains for an Inc. 5000 consulting firm with a custom design system and Figma plugin.",
      slides: [
        { type: "image", src: "/images/design-systems/profit-optics-case-study.jpg" },
        { type: "image", src: "/images/design-systems/profit-optics-case-study.jpg" },
      ],
      href: "#",
      comingSoon: true,
    },
    {
      name: "OCC DESIGN SYSTEM",
      description: "Streamlined product development with a design system for a construction sales platform serving 8.5k+ contractors.",
      slides: [
        { type: "image", src: "/images/design-systems/occ-design-system-case-study.jpg" },
        { type: "image", src: "/images/design-systems/occ-design-system-case-study.jpg" },
      ],
      href: "#",
      comingSoon: true,
    },
  ],
  midCtaTitle: "Accelerate development time with a scalable design system.",
  midCtaText: "Build my design system",
  midCtaHref: "#contact-form",
  processTag: "OUR end-to-end process",
  processHeading: "Our trusted formula for crafting scalable design systems.",
  processSteps: [
    { counter: "01", title: "Initial assessment [free]", content: "We begin with a comprehensive audit of your existing design system, workflows, and team collaboration to identify inefficiencies in contribution, versioning, and structure." },
    { counter: "02", title: "Action plan", content: "We translate findings into actionable strategy: define scope, roadmap, and workflow standards for designers and developers." },
    { counter: "03", title: "Design system refactoring", content: "Based on audit findings, we either build a new design system or optimize your existing one with tokens, components, and frontend integration patterns." },
    { counter: "04", title: "Documentation & onboarding", content: "We create practical documentation and run onboarding sessions so teams can adopt, contribute to, and scale the system confidently." },
    { counter: "05", title: "Maintenance & evolution", content: "If you opt in, we provide ongoing governance, updates, troubleshooting, and enhancements to keep the system healthy and future-ready." },
  ],
  deliverables: [
    "Design tokens and variables",
    "Reusable UI components",
    "Patterns and usage guidelines",
    "Developer handoff standards",
    "Documentation and governance",
  ],
  keyDeliverablesTag: "Deliverables",
  keyDeliverablesHeading: "What you will get in your design system engagement.",
  keyDeliverablesItems: [
    { title: "Token architecture", description: "A robust foundation of colors, typography, spacing, and semantic design tokens." },
    { title: "Component library", description: "Reusable, scalable components that increase consistency and speed across products." },
    { title: "Documentation", description: "Clear standards, edge cases, and contribution flows for product, design, and engineering teams." },
    { title: "Handoff workflow", description: "A practical designer-to-developer workflow that reduces ambiguity and rework." },
    { title: "Adoption support", description: "Enablement and onboarding guidance so teams can use and evolve the system effectively." },
  ],
  bottomCtaTitle: "Ready to scale with a unified design system?",
  bottomCtaSubtitle: "We help your team move faster with consistency, stronger collaboration, and lower design debt.",
  bottomCtaText: "Build my design system",
  bottomCtaHref: "#contact-form",
  faqsTag: "FAQS",
  faqsHeading: "Your questions, answered.",
  faqItems: [
    { question: "What is a design system, and why does my business need one?", answer: "A design system is a set of reusable components, principles, and rules that keeps your digital products consistent and scalable while improving design and engineering efficiency." },
    { question: "Can you customize a design system to fit my brand?", answer: "Yes. We tailor systems to your brand language, product requirements, and team workflows while preserving flexibility and scalability." },
    { question: "Can you integrate the design system with our development tools?", answer: "Yes. We align the system with your current toolchain and frontend stack through tokens, component standards, and practical handoff workflows." },
    { question: "How long does it take to build or refactor a design system?", answer: "Timelines vary by scope, but foundational systems typically take 6 to 12 weeks with a phased roadmap." },
  ],
  nextSteps: [
    { number: "01", text: "We will respond within 24 hours." },
    { number: "02", text: "Our UX expert will gather context and define scope." },
    { number: "03", text: "We will share estimates and a clear execution plan." },
  ],
  contactPhone: "(202) 978 3410",
  contactEmail: "info@reloadux.com",
  contactTeam: [
    { name: "Sahar", role: "Key Account Manager", linkedin: "https://www.linkedin.com/in/sahar-asif-284a9955/" },
    { name: "Lara Kazan", role: "Business Development Executive", linkedin: "https://www.linkedin.com/in/lara-kazan-82a24113b/" },
  ],
};

async function main() {
  const adminToken = await getAdminToken();
  await request(
    "PUT",
    "/content-manager/single-types/api::design-systems-page.design-systems-page",
    PAGE_DATA,
    adminToken
  );
  await request(
    "POST",
    "/content-manager/single-types/api::design-systems-page.design-systems-page/actions/publish",
    {},
    adminToken
  );
  const token = process.env.STRAPI_API_TOKEN;
  const test = await request("GET", "/api/design-systems-page", null, token);
  console.log("Design Systems API test status:", test.status);
}

main().catch(console.error);
