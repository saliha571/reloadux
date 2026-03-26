/**
 * Strapi Seed Script
 * Populates all content types with reloadux.com homepage data
 * Run with: node seed.js
 */

const http = require("http");

const STRAPI = "http://localhost:1337";

// We'll create a fresh admin user to get a JWT, then use it to seed everything
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
  const res = await request("POST", "/admin/login", {
    email: "salihashahzad23@gmail.com",
    password: "Admin1234!",
  });
  if (res.body?.data?.token) return res.body.data.token;

  console.error("Cannot get admin token. Response:", JSON.stringify(res.body));
  process.exit(1);
}

// Instead of admin API, we'll use the public Content API with a full-access API token
// First, let's try creating content via the API directly

async function createApiToken(adminToken) {
  const res = await request(
    "POST",
    "/admin/api-tokens",
    {
      name: "seed-token-" + Date.now(),
      description: "Auto-generated seed token",
      type: "full-access",
      lifespan: null,
    },
    adminToken
  );
  if (res.body?.data?.accessKey) return res.body.data.accessKey;
  console.log("Token creation response:", JSON.stringify(res.body));
  return null;
}

async function setPublicPermissions(adminToken) {
  // Get public role
  const rolesRes = await request("GET", "/admin/roles", null, adminToken);
  const roles = rolesRes.body?.data || [];
  // Strapi v5 admin roles are different from users-permissions roles
  // We need to use the users-permissions plugin API instead
  
  const upRolesRes = await request("GET", "/api/users-permissions/roles", null, adminToken);
  const upRoles = upRolesRes.body?.roles || [];
  const publicRole = upRoles.find(r => r.type === "public");
  
  if (!publicRole) {
    console.log("Could not find public role, skipping permission setup");
    return;
  }

  // Get current permissions for public role
  const permRes = await request("GET", `/api/users-permissions/roles/${publicRole.id}`, null, adminToken);
  const permissions = permRes.body?.role?.permissions || {};
  
  // Enable find and findOne for all our content types
  const contentTypes = [
    "api::homepage",
    "api::service",
    "api::case-study",
    "api::blog-post",
    "api::testimonial",
    "api::team-member",
    "api::client-logo",
    "api::industry",
    "api::site-setting",
  ];

  for (const ct of contentTypes) {
    const [prefix, name] = ct.split("::");
    const ctKey = `${prefix}::${name}`;
    if (!permissions[ctKey]) permissions[ctKey] = { controllers: {} };
    const controllerName = name.replace(/-/g, "-");
    if (!permissions[ctKey].controllers[controllerName]) {
      permissions[ctKey].controllers[controllerName] = {};
    }
    permissions[ctKey].controllers[controllerName]["find"] = { enabled: true };
    permissions[ctKey].controllers[controllerName]["findOne"] = { enabled: true };
  }

  await request("PUT", `/api/users-permissions/roles/${publicRole.id}`, {
    permissions,
  }, adminToken);
  
  console.log("✅ Public permissions configured");
}

async function seedContent(token) {
  console.log("\n📝 Seeding Homepage...");
  await request("PUT", "/api/homepage", {
    data: {
      heroTitle: "UX design agency for",
      heroTitleAccent: "AI-native experiences",
      heroSubtitle: "We help B2B and SaaS companies design products that are intelligent, usable, and built for adoption.",
      heroCtaText: "Let's talk",
      heroCtaLink: "/contact-us/",
      servicesSectionLabel: "OUR SERVICES",
      servicesSectionTitle: "Start, improve, or scale an AI-native product experience.",
      aboutSectionLabel: "ABOUT US",
      aboutSectionTitle: "Our work delivers results you can measure. The numbers below say it all.",
      stats: [
        { value: "2.4", suffix: "x", label: "engagement with AI-personalized screens", order: 1 },
        { value: "32", prefix: "+", suffix: "%", label: "raise in activation by revamping user on boarding", order: 2 },
        { value: "25", prefix: "+", suffix: "%", label: "increase trial-to-paid after launch", order: 3 },
        { value: "40", suffix: "+", label: "AI-native engagements delivered", order: 4 },
      ],
      industriesSectionLabel: "DIVERSITY",
      industriesSectionTitle: "We design AI experiences for complex domains.",
      workSectionLabel: "OUR WORK",
      workSectionTitle: "From intelligent redesigns to AI-native products, we've got success stories showcasing our impact.",
      testimonialsSectionLabel: "WORDS OF OUR CLIENTS",
      blogSectionLabel: "LATEST ARTICLES",
      blogSectionTitle: "AI insights from our UX leaders.",
      ctaSectionTitle: "Ready to make your product experience AI-native?",
      ctaSectionButtonText: "Contact Us",
      ctaSectionButtonLink: "/contact-us/",
      ctaSectionSubtitle: "Join our list of clients.",
      seoTitle: "Expert UI UX Design and Development Services | reloadux",
      seoDescription: "We help B2B and SaaS companies design products that are intelligent, usable, and built for adoption.",
    },
  }, token);
  console.log("✅ Homepage seeded");

  console.log("\n📝 Seeding Services...");
  const services = [
    { title: "Design from Scratch - MVP", slug: "design-from-scratch-mvp", heroTitle: "Design from Scratch - MVP", heroDescription: "For startups building their first product", category: "Services", homepageCategory: "Main", showOnHomepage: true, order: 1 },
    { title: "UX Redesign", slug: "ux-redesign", heroTitle: "UX Redesign", heroDescription: "For B2B and SaaS companies looking to revamp", category: "Services", homepageCategory: "Main", showOnHomepage: true, order: 2 },
    { title: "AI-native Design Team", slug: "team-extension", heroTitle: "AI-native Design Team", heroDescription: "For existing companies needing design resources", category: "Services", homepageCategory: "Main", showOnHomepage: true, order: 3 },
    { title: "UX Audit & AI Readiness", slug: "ux-audit-ai-readiness", heroTitle: "UX Audit & AI Readiness", heroDescription: "Evaluate your product's UX and AI integration potential", category: "Research", homepageCategory: "Research", showOnHomepage: true, order: 4 },
    { title: "Usability Testing", slug: "usability-testing", heroTitle: "Usability Testing", heroDescription: "Data-driven testing to validate design decisions", category: "Research", homepageCategory: "Research", showOnHomepage: true, order: 5 },
    { title: "Design Discovery", slug: "design-discovery", heroTitle: "Design Discovery", heroDescription: "Deep-dive research phase to understand users and market", category: "Research", homepageCategory: "Research", showOnHomepage: true, order: 6 },
    { title: "AI Opportunity Mapping", slug: "ai-opportunity-mapping", heroTitle: "AI Opportunity Mapping", heroDescription: "Identify where AI can add the most value to your product", category: "Design", homepageCategory: "Design", showOnHomepage: true, order: 7 },
    { title: "UI/UX Design", slug: "ui-ux-design", heroTitle: "UI/UX Design", heroDescription: "End-to-end interface and experience design", category: "Design", homepageCategory: "Design", showOnHomepage: true, order: 8 },
    { title: "Conversational UX", slug: "conversational-ux", heroTitle: "Conversational UX", heroDescription: "Design for chat, voice, and AI-powered interactions", category: "Design", homepageCategory: "Design", showOnHomepage: true, order: 9 },
    { title: "AI Feature Experience Design", slug: "ai-feature-experience-design", heroTitle: "AI Feature Experience Design", heroDescription: "Design intelligent features that users love", category: "Design", homepageCategory: "Design", showOnHomepage: true, order: 10 },
    { title: "Marketing & Creatives", slug: "marketing-and-creatives", heroTitle: "Marketing & Creatives", heroDescription: "Brand and marketing design services", category: "Design", homepageCategory: "Design", showOnHomepage: true, order: 11 },
    { title: "Website Design", slug: "web-design", heroTitle: "Website Design", heroDescription: "Modern, conversion-focused website design", category: "Design", homepageCategory: "Design", showOnHomepage: true, order: 12 },
    { title: "Design System", slug: "design-systems", heroTitle: "Design System", heroDescription: "Scalable design systems for product consistency", category: "Design", homepageCategory: "Design", showOnHomepage: true, order: 13 },
    { title: "Web Development", slug: "web-development", heroTitle: "Web Development", heroDescription: "Frontend development with modern technologies", category: "Deliver", homepageCategory: "Deliver", showOnHomepage: true, order: 14 },
    { title: "No-code MVP", slug: "no-code-mvp", heroTitle: "No-code MVP", heroDescription: "Rapid MVP delivery using Framer and WebFlow", category: "Deliver", homepageCategory: "Deliver", showOnHomepage: true, order: 15 },
  ];
  for (const svc of services) {
    await request("POST", "/api/services", { data: svc }, token);
  }
  console.log(`✅ ${services.length} Services seeded`);

  console.log("\n📝 Seeding Case Studies...");
  const caseStudies = [
    { title: "Vocable", slug: "vocable", client: "vocable", tagline: "Designed Vocable from zero to launch. An AI-native platform helping marketers create, plan, and scale content in the age of AI.", backgroundText: "vocable.", industry: "AI", showInSlider: true, showInWorkGrid: true, order: 1 },
    { title: "OCC", slug: "occ", client: "OCC", tagline: "Empowering remodelers to sell faster through seamless estimating, measuring, and closing", backgroundText: "occ.", industry: "SaaS", showInSlider: true, showInWorkGrid: true, order: 2 },
    { title: "Tradezella", slug: "tradezella", client: "tradezella", tagline: "Revamped a trading journal experience helping traders make data-driven decisions.", backgroundText: "tradezella.", industry: "Fintech", showInWorkGrid: true, order: 3 },
    { title: "Global Parents", slug: "global-parents", client: "Global parents", tagline: "Designed an engaging social platform for building a strong parenting community.", backgroundText: "global-parents.", industry: "SaaS", showInWorkGrid: true, order: 4 },
    { title: "Mass Media Co.", slug: "mass-media-co", client: "Mass Media Co.", tagline: "An all-in-one B2B marketing platform for taking data orders, and running campaigns.", backgroundText: "mass-media.", industry: "Media_Communication", showInWorkGrid: true, order: 5 },
  ];
  for (const cs of caseStudies) {
    await request("POST", "/api/case-studies", { data: cs }, token);
  }
  console.log(`✅ ${caseStudies.length} Case Studies seeded`);

  console.log("\n📝 Seeding Testimonials...");
  const testimonials = [
    { quote: "We started with reloadux with an AI product and a lot of assumptions. They challenged most of them, in a good way. By the time we launched, we had an AI marketing tool marketers actually wanted. I loved the fact that they always spent time thinking through what they are building", authorName: "Iman Oubou", authorRole: "CEO at", authorCompany: "Vocable", order: 1 },
    { quote: "We had the AI product knowledge. What we didn't have was a way to present it that didn't overwhelm users, reloadux team took the time to understand the product and created end to end interactive flows that became the foundation of the product.", authorName: "Matthew Tarascio", authorRole: "Tech Entrepreneur at", authorCompany: "OCC", order: 2 },
    { quote: "The collaboration was smooth from start to finish. They asked the right questions, pushed back when we were off track, and helped us identify where AI actually made sense, then delivered ahead of schedule.", authorName: "Yuriy Shikhanovich", authorRole: "Manager at", authorCompany: "Tradezella", order: 3 },
    { quote: "Operations managers are skeptical people. reloadux team got that immediately. Everything they designed had a clear explanation behind it. That's why it actually got used.", authorName: "Viktor Misyutin", authorRole: "Manager at", authorCompany: "Mass Media Co.", order: 4 },
    { quote: "reloadux clear updates kept us informed every step of the way. Their straightforward approach made our partnership efficient and productive", authorName: "Mahir Iskender", authorRole: "CEO at", authorCompany: "Digno", order: 5 },
  ];
  for (const t of testimonials) {
    await request("POST", "/api/testimonials", { data: t }, token);
  }
  console.log(`✅ ${testimonials.length} Testimonials seeded`);

  console.log("\n📝 Seeding Blog Posts...");
  const blogPosts = [
    { title: "AI-First Product Redesign: A Guide for Digital Product Modernization", slug: "ai-first-product-redesign", excerpt: "Learn how to approach AI-first product redesign for modern digital products.", category: "Artificial_Intelligence", readTime: "10 min read", publishedAt: "2026-03-04T00:00:00.000Z" },
    { title: "How 5 products increased adoption with AI-Native Experience", slug: "case-studies-of-ai-native-experience", excerpt: "Case studies showing how AI-native experiences drive adoption.", category: "Artificial_Intelligence", readTime: "10 min read", publishedAt: "2026-02-28T00:00:00.000Z" },
    { title: "Top UI/UX Agencies for 2026 – Trusted Partners for Digital Products", slug: "top-ui-ux-agencies-for-digital-products", excerpt: "A comprehensive list of top UI/UX agencies for digital product design in 2026.", category: "Design", readTime: "10 min read", publishedAt: "2026-02-24T00:00:00.000Z" },
    { title: "AI Microcopy for UX: The Essential Guide", slug: "ai-microcopy-ux-clarity", excerpt: "How AI-powered microcopy improves user experience and clarity.", category: "Artificial_Intelligence", readTime: "10 min read", publishedAt: "2026-02-10T00:00:00.000Z" },
    { title: "How ReloadUX Uses AI Internally in Sprints", slug: "how-reloadux-uses-ai-internally-in-sprints", excerpt: "Behind the scenes of how we integrate AI into our design sprints.", category: "Artificial_Intelligence", readTime: "10 min read", publishedAt: "2026-01-29T00:00:00.000Z" },
    { title: "Predictive UX That Anticipates Problems", slug: "predictive-ux-that-anticipates-problems", excerpt: "Using predictive analytics to create proactive user experiences.", category: "Artificial_Intelligence", readTime: "10 min read", publishedAt: "2026-01-23T00:00:00.000Z" },
    { title: "From No-Code MVP to Investor-Ready Prototype", slug: "from-no-code-mvp-to-investor-ready-prototype", excerpt: "Transform your no-code MVP into a polished investor-ready prototype.", category: "Business", readTime: "10 min read", publishedAt: "2026-01-09T00:00:00.000Z" },
    { title: "How AI-Powered JTBD Mapping Transformed Our UX Strategy", slug: "how-ai-powered-jtbd-mapping-transformed-our-ux-strategy", excerpt: "Using AI to enhance Jobs-to-be-Done mapping for better UX strategy.", category: "Artificial_Intelligence", readTime: "10 min read", publishedAt: "2025-12-30T00:00:00.000Z" },
    { title: "Where No-Code Breaks and Where AI Helps Fix It", slug: "where-no-code-breaks-and-where-ai-helps-fix-it", excerpt: "Understanding the limitations of no-code and how AI bridges the gaps.", category: "Artificial_Intelligence", readTime: "10 min read", publishedAt: "2025-12-08T00:00:00.000Z" },
    { title: "Using AI in UI/UX Design: Productivity Booster or Process Wrecker?", slug: "using-ai-in-ui-ux-design-booster-or-wrecker", excerpt: "Examining the impact of AI tools on the UI/UX design process.", category: "Artificial_Intelligence", readTime: "10 min read", publishedAt: "2025-12-03T00:00:00.000Z" },
  ];
  for (const bp of blogPosts) {
    await request("POST", "/api/blog-posts", { data: bp }, token);
  }
  console.log(`✅ ${blogPosts.length} Blog Posts seeded`);

  console.log("\n📝 Seeding Client Logos...");
  const clientLogos = [
    { name: "NBCUniversal", order: 1 },
    { name: "BARCLAYS", order: 2 },
    { name: "GROUPON", order: 3 },
    { name: "7-ELEVEN", order: 4 },
    { name: "peopleguru", order: 5 },
    { name: "EasyWorkforce", order: 6 },
    { name: "Sterne Kessler", order: 7 },
  ];
  for (const cl of clientLogos) {
    await request("POST", "/api/client-logos", { data: cl }, token);
  }
  console.log(`✅ ${clientLogos.length} Client Logos seeded`);

  console.log("\n📝 Seeding Industries...");
  const industries = [
    { name: "AI", slug: "ai", tagline: "Design intelligent AI experiences", tags: "Assistants & Chatbots,Content AI,Marketing AI,Search & RAG,Support AI,HIPAA-aware / KYC/AML-aware", link: "/expertise/ai/", order: 1 },
    { name: "SaaS", slug: "saas", tagline: "Design scalable SaaS products", tags: "Analytics,Automation,Dev Tools,ERP,HR Tech,HIPAA-aware / KYC/AML-aware", link: "/expertise/saas/", order: 2 },
    { name: "Fintech", slug: "fintech", tagline: "Design secure fintech experiences", tags: "Banking,Payments,Taxation,Trading & Investing,Wealth Management,HIPAA-aware / KYC/AML-aware", link: "/expertise/fintech/", order: 3 },
    { name: "Healthcare", slug: "healthcare", tagline: "Design compliant healthcare solutions", tags: "Care Management,Mental Health,Patient Portals,Telehealth,Wellness & Fitness,HIPAA-aware / KYC/AML-aware", link: "/expertise/healthcare/", order: 4 },
  ];
  for (const ind of industries) {
    await request("POST", "/api/industries", { data: ind }, token);
  }
  console.log(`✅ ${industries.length} Industries seeded`);

  console.log("\n📝 Seeding Site Settings...");
  await request("PUT", "/api/site-setting", {
    data: {
      siteName: "reloadux",
      siteTagline: "UX design agency for AI-native experiences",
      email: "info@reloadux.com",
      phone: "(202) 978 3410",
      address: "Freedom Drive 13th Floor\nReston, VA 20190",
      footerCopyright: "© 2026 Reloadux - all rights reserved",
      defaultSeoTitle: "Expert UI UX Design and Development Services | reloadux",
      defaultSeoDescription: "We help B2B and SaaS companies design products that are intelligent, usable, and built for adoption.",
    },
  }, token);
  console.log("✅ Site Settings seeded");
}

async function main() {
  console.log("🚀 Starting Strapi Seed...\n");

  // Step 1: Get admin token
  console.log("🔑 Getting admin token...");
  const adminToken = await getAdminToken();
  console.log("✅ Got admin token\n");

  // Step 2: Create a full-access API token
  console.log("🔑 Creating API token...");
  const apiToken = await createApiToken(adminToken);
  if (apiToken) {
    console.log("✅ API token created");
    console.log(`\n📋 Add this to your .env.local:\nSTRAPI_API_TOKEN=${apiToken}\n`);
  }

  // Step 3: Set public permissions
  console.log("🔐 Setting public permissions...");
  await setPublicPermissions(adminToken);

  // Step 4: Seed content using the API token (admin JWT does NOT work with Content API in Strapi v5)
  const contentToken = apiToken || adminToken;
  await seedContent(contentToken);

  console.log("\n✨ Seed complete! All content has been populated.");
  console.log("📌 Next: Publish all content in Strapi admin at http://localhost:1337/admin");
}

main().catch(console.error);
