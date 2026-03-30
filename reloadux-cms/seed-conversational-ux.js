/**
 * Conversational UX Page Seed Script
 * Seeds the Conversational UX page content into Strapi.
 * Run after Strapi is started with: node seed-conversational-ux.js
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

  if (!permissions["api::conversational-ux-page"]) permissions["api::conversational-ux-page"] = { controllers: {} };
  if (!permissions["api::conversational-ux-page"].controllers["conversational-ux-page"])
    permissions["api::conversational-ux-page"].controllers["conversational-ux-page"] = {};
  permissions["api::conversational-ux-page"].controllers["conversational-ux-page"]["find"] = { enabled: true };

  const putRes = await request("PUT", `/api/users-permissions/roles/${publicRole.id}`, { permissions }, adminToken);

  if (putRes.status === 200) {
    console.log("✅ Public permissions enabled for conversational-ux-page");
  } else {
    console.log("⚠️  Permissions update:", JSON.stringify(putRes.body).slice(0, 200));
  }
}

const PAGE_DATA = {
  heroTitleItalic: "Conversational UX Design",
  heroTitleBold: "Build Human-Like Chat & Voice Experiences",
  heroSubtitle: "Shift from static interfaces to GenAI-driven experiences.",
  heroCtaText: "Let\u2019s Get Started",
  heroCtaHref: "#contact-form",
  heroVideoSrc: "/videos/conversational-hero-video.mp4",
  heroVideoPoster: "/images/conversational/chat-voice-mock.png",
  heroStatValue: "71%",
  heroStatText: "of Consumers expect Personalized Interactions",
  heroStatSource: "\u2014 McKinsey & Company",
  genaiHeading: "Generative AI is transforming how users interact with digital products, moving beyond clicks to conversations.",
  genaiSubheading: "This is not just adding AI, it\u2019s about redesigning the experience",
  genaiCtaText: "Let\u2019s start with a Free Trial",
  genaiCtaHref: "#contact-form",
  featureGridHeading: "See how conversational UX can elevate your product",
  features: [
    {
      image: "/images/conversational/chat-voice.webp",
      imageAlt: "Calling UX",
      title: "Chat & Voice Interfaces",
      description: "We empower your users to interact naturally \u2014 like by chat or voice to find what they\u2019re looking for without having to dig through menus or help articles.",
    },
    {
      image: "/images/conversational/agentic-workflow.webp",
      imageAlt: "car repair app",
      title: "Agentic Workflow Automation",
      description: "We design AI agents that don\u2019t just answer questions \u2014 they take real actions, automate tasks, and help users get things done faster inside your product.",
    },
    {
      image: "/images/conversational/intelligent-ux.webp",
      imageAlt: "AI Button",
      title: "Intelligent UX Layer for Existing Products",
      description: "No need to rebuild it all: we help you layer GenAI features like chat assistants or personalized recommendations on top of your current system.",
    },
  ],
  processTag: "HOW We DO IT",
  processHeading: "Our process for creating intelligent experiences.",
  deliverablesTag: "DELIVERABLES EXPECTED",
  deliverables: "AI opportunity map\nUX flows\nTechnical architecture\nInteractive conversational prototypes\nLive implementation",
  freeTrialHeading: "Let\u2019s start with a",
  freeTrialAccent: "free",
  freeTrialEnd: "trial",
  freeTrialBenefits: "2-day free trial\nOne use case, fully prototyped\nNo risks. No commitments. Just results.",
  freeTrialCtaText: "Let\u2019s start with a Free Trial",
  freeTrialCtaHref: "#contact-form",
  faqsTag: "faqs",
  faqsHeading: "Got questions? We\u2019ve got answers.",
  faqItems: [
    { question: "What is Conversational UI design?", answer: "Conversational UI design is the practice of crafting user interfaces that mimic human conversation. Whether through text, voice, or hybrid inputs, it focuses on creating seamless, natural, and context-aware interactions that guide users through digital experiences just like a real dialogue would." },
    { question: "How does Conversational UI enhance the user experience?", answer: "Conversational UI transforms static interfaces into dynamic experiences by allowing users to interact in a more natural and personalized way. It reduces cognitive load, clarifies next steps, and adapts to user behavior\u2014making interactions feel fluid, responsive, and user-first." },
    { question: "Why should businesses invest in Conversational UI?", answer: "Conversational UI enables businesses to create more intuitive, human-centered interfaces that simplify user interactions. By integrating natural dialogue elements into apps, websites, or digital products, companies can drive engagement, reduce friction, and enhance customer satisfaction, ultimately improving conversion and retention rates." },
    { question: "How is Conversational UI different from traditional UI?", answer: "Unlike traditional interfaces with buttons and menus, Conversational UI uses natural language and dialogue patterns to interact with users. It simplifies navigation, provides contextual guidance, and reduces the need for users to learn complex workflows." },
    { question: "Which industries benefit the most from Conversational UI?", answer: "Industries like retail, fintech, healthcare, education, and customer service benefit significantly from Conversational UI. These sectors rely heavily on user engagement and personalized communication, where conversational interfaces can streamline tasks, improve accessibility, and elevate overall satisfaction." },
    { question: "Can Conversational UI be integrated into mobile and web apps?", answer: "Absolutely. Conversational UI elements, like chat widgets, guided flows, and voice assistants, can be integrated into mobile and web platforms with minimal disruption. Whether you\u2019re enhancing onboarding, product discovery, or support, it fits seamlessly into existing experiences." },
    { question: "Does Conversational UI support multilingual or localized experiences?", answer: "Yes. Conversational UI can be designed to support multiple languages, making it an excellent solution for global audiences. This helps brands offer personalized and accessible interactions across regions and demographics." },
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
  seoTitle: "Conversational UX Design | Build Human-Like Chat & Voice Experiences | Reloadux",
  seoDescription: "Shift from static interfaces to GenAI-driven conversational experiences. We design chat, voice, and agentic AI workflows that feel natural and drive engagement.",
};

async function main() {
  console.log("🚀 Starting Conversational UX Page seed...\n");

  const adminToken = await getAdminToken();

  await enablePublicPermissions(adminToken);

  console.log("\n📝 Seeding Conversational UX Page via Content Manager API...");
  const cmRes = await request(
    "PUT",
    "/content-manager/single-types/api::conversational-ux-page.conversational-ux-page",
    PAGE_DATA,
    adminToken
  );

  if (cmRes.status === 200 || cmRes.status === 201) {
    console.log("✅ Conversational UX Page seeded successfully!");
  } else {
    console.log("⚠️  Seed response:", cmRes.status, JSON.stringify(cmRes.body).slice(0, 300));
  }

  console.log("\n📢 Publishing...");
  const pubRes = await request(
    "POST",
    "/content-manager/single-types/api::conversational-ux-page.conversational-ux-page/actions/publish",
    {},
    adminToken
  );

  if (pubRes.status === 200) {
    console.log("✅ Conversational UX Page published!");
  } else {
    console.log("Publish response:", pubRes.status, JSON.stringify(pubRes.body).slice(0, 200));
  }

  console.log("\n🔍 Testing public API...");
  const testRes = await request(
    "GET",
    "/api/conversational-ux-page?populate[features]=*&populate[faqItems]=*&populate[nextSteps]=*&populate[contactTeam][populate]=image"
  );
  if (testRes.status === 200 && testRes.body?.data) {
    console.log("✅ Public API working!");
    console.log("   heroTitleBold:", testRes.body.data.heroTitleBold);
    console.log("   features:", testRes.body.data.features?.length ?? 0);
    console.log("   faqItems:", testRes.body.data.faqItems?.length ?? 0);
    console.log("   nextSteps:", testRes.body.data.nextSteps?.length ?? 0);
  } else {
    console.log("⚠️  Public API response:", testRes.status, JSON.stringify(testRes.body).slice(0, 200));
  }

  console.log("\n✅ Conversational UX Page seed complete!");
}

main().catch(console.error);
