/**
 * UX Audit Page Seed Script
 * Seeds the UX Audit & AI Readiness page content into Strapi.
 * Run after Strapi is started with: node seed-ux-audit.js
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
    if (res.body?.data?.token) {
      console.log(`✅ Logged in as ${creds.email}`);
      return res.body.data.token;
    }
    if (res.status === 429) {
      console.log("⚠️  Rate limited, waiting 65s...");
      await new Promise((r) => setTimeout(r, 65000));
      const res2 = await request("POST", "/admin/login", creds);
      if (res2.body?.data?.token) return res2.body.data.token;
    }
  }

  console.error("❌ Cannot login.");
  process.exit(1);
}

async function enablePublicPermissions(adminToken) {
  const upRolesRes = await request("GET", "/api/users-permissions/roles", null, adminToken);
  const upRoles = upRolesRes.body?.roles || [];
  const publicRole = upRoles.find((r) => r.type === "public");

  if (!publicRole) {
    console.log("⚠️  Could not find public role");
    return;
  }

  const permRes = await request("GET", `/api/users-permissions/roles/${publicRole.id}`, null, adminToken);
  const permissions = permRes.body?.role?.permissions || {};

  if (!permissions["api::ux-audit-page"]) permissions["api::ux-audit-page"] = { controllers: {} };
  if (!permissions["api::ux-audit-page"].controllers["ux-audit-page"])
    permissions["api::ux-audit-page"].controllers["ux-audit-page"] = {};
  permissions["api::ux-audit-page"].controllers["ux-audit-page"]["find"] = { enabled: true };

  const putRes = await request("PUT", `/api/users-permissions/roles/${publicRole.id}`, { permissions }, adminToken);

  if (putRes.status === 200) {
    console.log("✅ Public permissions enabled for ux-audit-page");
  } else {
    console.log("⚠️  Permissions update:", JSON.stringify(putRes.body).slice(0, 200));
  }
}

const PAGE_DATA = {
  heroTag: "UX AUDIT + AI READINESS",
  heroTitle: "Find out whether your product is ready for an AI-native experience and what needs to change in just one week.",
  heroCtaText: "Audit My Product",
  heroCtaHref: "#contact-form",
  challengesTag: "CHALLENGES",
  challengesHeading: "Your UX roadblocks are stopping your product from going AI-native.",
  challengesDescription: "If these challenges resonate, a UX assessment will show exactly what needs to evolve for an AI-native experience.",
  challengeCards: [
    { tag: "High Bounce Rates", description: "Users are leaving your site without taking any action?" },
    { tag: "Inconsistent Experience", description: "Disconnected product areas that would make any AI integration feel even more fragmented?" },
    { tag: "Market Challenges", description: "Competitors are shipping AI-native experiences. You need to know if your product foundation is strong enough to compete." },
    { tag: "Limited Resources", description: "Don't have time for in-depth testing?" },
    { tag: "Low Engagement", description: "Users aren't engaging with your product?" },
  ],
  auditWorkTag: "OUR UX AUDIT WORK",
  auditWorkHeading: "Our detailed AI readiness & UX audit can help uncover how an AI experience can improve usability and drive conversions.",
  auditWorkStats: [
    { value: "12+", label: "years combined UX research experience across our team" },
    { value: "94%", label: "client satisfaction rate with actionable insights provided" },
    { value: "3.2x", label: "more tasks completed after AI-guided UX improvements" },
  ],
  auditWorkCaseStudies: [
    { name: "Wild Tide", description: "We audited the product\u2019s UX, uncovered navigation complexity as the core barrier, and redesigned toward a conversational, chatbot-driven shopping experience.", slides: [{ type: "image", src: "/images/audit/wild-tide-slide-1.webp" }, { type: "image", src: "/images/audit/wild-tide-slide-2.webp" }, { type: "image", src: "/images/audit/wild-tide-slide-3.webp" }], href: "#", comingSoon: true },
    { name: "PEOPLE GURU", description: "Our UX assessment exposed how the review system forced managers to rely on memory and mapped the shift to an AI-native HRMS where intelligence takes over.", slides: [{ type: "image", src: "/images/audit/people-guru-slide-1.webp" }, { type: "image", src: "/images/audit/people-guru-slide-2.webp" }], href: "#", comingSoon: false },
    { name: "NFM", description: "Our UX audit pinpointed where the retail journey was losing users and laid the foundation for an agentic, AI-enabled shopping experience.", slides: [{ type: "image", src: "/images/audit/nfm-slide-1.webp" }, { type: "image", src: "/images/audit/nfm-slide-2.webp" }, { type: "image", src: "/images/audit/nfm-slide-3.webp" }], href: "#", comingSoon: false },
  ],
  midCtaTitle: "Let\u2019s find out whether your product is ready for AI integration.",
  midCtaText: "Audit My Product",
  midCtaHref: "#contact-form",
  processTag: "HOW IT WORKS",
  processHeading: "Our quick and flexible process uncovers pain points and delivers actionable UX insights in just 1 week.",
  processSteps: [
    { counter: "01", title: "Set goals for the audit", content: "We hold a discovery session to:\n\u2022 Understand your business domain, goals, and where AI fits into your product vision\n\u2022 Identify your target users and how they currently interact with the product\n\u2022 Clarify what a successful AI integration would look like, and what failure would cost" },
    { counter: "02", title: "Perform the audit", content: "The audit covers two layers:\n\u2022 Heuristic evaluation of your existing UX: friction points, navigation gaps, consistency issues\n\u2022 AI readiness assessment: which workflows can absorb AI, where user trust is fragile, and what patterns would feel natural vs. invasive\n\u2022 Competitor and industry benchmarking on AI feature expectations\n\u2022 Issues prioritized by severity and risk to user trust" },
    { counter: "03", title: "Prepare report", content: "You get a detailed report with:\n\u2022 An in-depth analysis of your product\u2019s current UX health\n\u2022 A specific assessment of where AI can be integrated safely.\n\u2022 A clear roadmap to transform your product from its current UX to AI-ready, focusing on highest business impact." },
  ],
  deliverables: ["Enhanced User Satisfaction", "Streamlined Product Navigation", "Increased User Engagement", "Improved Brand Perception", "Reduced Bounce Rates", "Higher Conversion Rates"],
  keyDeliverablesTag: "KEY Deliverables",
  keyDeliverablesHeading: "What you'll get in your design audit.",
  keyDeliverablesItems: [
    { title: "Heuristic evaluation", description: "To begin with, our team of product specialists assesses your product based on industry-standard UX principles, identifying friction points and usability concerns." },
    { title: "AI readiness review", description: "We analyze your core workflows, user behavior patterns, and product analytics to identify where AI would enhance the experience, and where it would introduce risk, confusion, or broken trust." },
    { title: "Visual design analysis", description: "Next, we dive deep into your user interface to make sure that your product\u2019s design is visually cohesive and up-to-date." },
    { title: "Accessibility review", description: "In accordance with WCAG 2.2, we ensure that your product complies with international standards and provides an inclusive experience." },
    { title: "Action plan", description: "We go the extra mile and provide you with a clear roadmap of improvements to lead to better usability and increased conversions for your product." },
  ],
  pricingTag: "PRICING",
  pricingDescription: "We evaluate your product\u2019s current UX and identify exactly where integrating AI would improve it, and where it wouldn\u2019t.",
  pricingPlanName: "UX Audit + AI Readiness Assessment",
  pricingPrice: "$6000",
  pricingPricePer: "/ month",
  pricingFeatures: [
    "UX heuristic & conversion analysis: Usability issues + friction points impacting conversions.",
    "ADA & accessibility check: Review for WCAG/ADA compliance to ensure inclusive design.",
    "AI readiness checklist: Assessment of your product\u2019s AI readiness and next steps.",
    "Actionable recommendations: Prioritized fixes with severity, effort, and impact levels.",
    "Implementation roadmap: Step-by-step plan to apply changes efficiently.",
  ],
  pricingCtaText: "Get Started",
  pricingCtaHref: "#contact-form",
  whenToDoItTag: "WHEN TO DO IT",
  whenToDoItHeading: "The right time to ask if your product is AI-ready is before you commit to building it in.",
  whenToDoItItems: [
    { title: "Pre-Launch", description: "Validate your UX foundation before AI-native experiences goes on the roadmap." },
    { title: "Post-Launch", description: "Capture early signals on where users trust your product and where they don\u2019t, before AI amplifies either." },
    { title: "Before an AI-ready Redesign", description: "Know what to keep, what to fix, and what your product structurally needs before AI can be integrated." },
    { title: "During Underperformance", description: "Identify whether UX gaps are blocking your AI experience from performing." },
    { title: "Yearly Health Check", description: "Keep your product\u2019s UX and AI readiness aligned as both your product and user expectations evolve." },
  ],
  whatHappensAfterTag: "WHAT HAPPENS AFTER",
  whatHappensAfterHeading: "You have three ways to move forward",
  whatHappensAfterPaths: [
    { title: "Find where AI belongs in your product\u2019s UX", description: "If you\u2019re not sure where AI fits, we move into AI Opportunity Mapping. We identify, score, and prioritize the right opportunities before you spend a dollar on engineering." },
    { title: "Design the AI-native experience", description: "If you know what to build, we move into AI Feature Design. Interaction patterns, edge cases, error states, production-ready UX, everything your engineers need to build it right." },
    { title: "Fix the foundation first", description: "Sometimes the audit reveals that AI isn\u2019t the priority, UX debt is. We can help you modernize older interfaces that weren\u2019t built for intelligent features, so AI has somewhere to live when you\u2019re ready." },
  ],
  bottomCtaTitle: "Start with a free 1-day AI readiness check.",
  bottomCtaSubtitle: "We\u2019ll review your core flows and highlight 3 UX/UI improvements to address before AI integration. See the value, then move to a full audit.",
  bottomCtaText: "Start AI Readiness UX Audit",
  bottomCtaHref: "#contact-form",
  faqsTag: "FAQS",
  faqsHeading: "Still curious about UX audits? We\u2019ve got the answers you need.",
  faqItems: [
    { question: "What is an AI readiness assessment?", answer: "An AI readiness assessment evaluates whether your product\u2019s existing user experience and workflows can support AI integration. It looks at data infrastructure, user journeys, and design patterns to determine where AI would improve the experience and where it might introduce risks." },
    { question: "How is this different from a regular UX audit?", answer: "A standard UX audit focuses on usability and conversion barriers based on user behaviour and heuristic evaluation. Our combined audit includes this plus an AI-readiness layer, mapping out where AI can be safely incorporated and highlighting workflows where AI would not add value." },
    { question: "Why do I need both a UX audit and an AI readiness assessment?", answer: "AI success depends on a solid UX foundation. If navigation is confusing or data is inconsistent, AI features can amplify frustration instead of helping. Conducting both audits ensures your product is prepared to leverage AI effectively." },
    { question: "What does the audit process look like?", answer: "It typically begins with a discovery session to understand your goals, followed by a heuristic UX evaluation and an AI readiness assessment. Competitor and industry benchmarking help prioritise opportunities. You receive a detailed report with findings and a roadmap within one week." },
    { question: "How long does the audit take?", answer: "Our streamlined process delivers a full UX audit and AI readiness assessment within one week. This timeframe includes discovery, evaluation, and report preparation." },
    { question: "What if the assessment shows we\u2019re not ready for AI?", answer: "That outcome is valuable. It tells you where UX debt or workflow issues will hinder AI adoption. We prioritise fixes and can help you modernise your UX before investing in AI features." },
    { question: "Do you evaluate our technical infrastructure?", answer: "We focus on user experience and AI readiness from a design and behavioural perspective. While we review data flow and analytics access, a full technical feasibility study involving engineering is a separate engagement." },
    { question: "How much access do you need to our product?", answer: "We typically require access to a staging or test environment, analytics data (if available), and a few hours with your team to understand current workflows and goals." },
    { question: "Can we purchase just the AI readiness assessment?", answer: "We don\u2019t recommend separating them because AI readiness depends on UX quality. However, if you\u2019ve recently completed a thorough UX audit, we can adapt the assessment accordingly." },
    { question: "How much does the audit cost?", answer: "Pricing starts at $6,000 for the combined UX audit & AI readiness assessment. We provide a fixed quote after understanding your product\u2019s scope and complexity." },
  ],
  nextSteps: [
    { number: "01", text: "We\u2019ll respond within 24 hours." },
    { number: "02", text: "Our UX Expert will collect project details and create a brief." },
    { number: "03", text: "We\u2019ll prepare estimates and share a project proposal." },
  ],
  contactPhone: "(202) 978 3410",
  contactEmail: "info@reloadux.com",
  contactTeam: [
    { name: "Sahar", role: "Key Account Manager", linkedin: "https://www.linkedin.com/in/sahar-asif-284a9955/" },
    { name: "Lara Kazan", role: "Business Development Executive", linkedin: "https://www.linkedin.com/in/lara-kazan-82a24113b/" },
  ],
};

async function main() {
  console.log("🚀 Starting UX Audit Page seed...\n");

  const adminToken = await getAdminToken();

  await enablePublicPermissions(adminToken);

  console.log("\n📝 Seeding UX Audit Page via Content Manager API...");
  const cmRes = await request(
    "PUT",
    "/content-manager/single-types/api::ux-audit-page.ux-audit-page",
    PAGE_DATA,
    adminToken
  );

  if (cmRes.status === 200 || cmRes.status === 201) {
    console.log("✅ UX Audit Page seeded successfully!");
  } else {
    console.log("⚠️  Seed response:", cmRes.status, JSON.stringify(cmRes.body).slice(0, 300));
  }

  console.log("\n📢 Publishing...");
  const pubRes = await request(
    "POST",
    "/content-manager/single-types/api::ux-audit-page.ux-audit-page/actions/publish",
    {},
    adminToken
  );

  if (pubRes.status === 200) {
    console.log("✅ UX Audit Page published!");
  } else {
    console.log("Publish response:", pubRes.status, JSON.stringify(pubRes.body).slice(0, 200));
  }

  console.log("\n🔍 Testing public API...");
  const testRes = await request("GET", "/api/ux-audit-page");
  if (testRes.status === 200 && testRes.body?.data) {
    console.log("✅ Public API working! heroTag:", testRes.body.data.heroTag);
  } else {
    console.log("⚠️  Public API response:", testRes.status);
  }

  console.log("\n✅ UX Audit Page seed complete!");
}

main().catch(console.error);
