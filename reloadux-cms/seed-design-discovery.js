/**
 * Design Discovery Page Seed Script
 * Seeds the Design Discovery page content into Strapi.
 * Run after Strapi is started with: node seed-design-discovery.js
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

  if (!permissions["api::design-discovery-page"]) permissions["api::design-discovery-page"] = { controllers: {} };
  if (!permissions["api::design-discovery-page"].controllers["design-discovery-page"])
    permissions["api::design-discovery-page"].controllers["design-discovery-page"] = {};
  permissions["api::design-discovery-page"].controllers["design-discovery-page"]["find"] = { enabled: true };

  const putRes = await request("PUT", `/api/users-permissions/roles/${publicRole.id}`, { permissions }, adminToken);

  if (putRes.status === 200) {
    console.log("✅ Public permissions enabled for design-discovery-page");
  } else {
    console.log("⚠️  Permissions update:", JSON.stringify(putRes.body).slice(0, 200));
  }
}

const PAGE_DATA = {
  heroTag: "Design Discovery",
  heroTitle: "Design discovery helps you visualize your product for clarity in scoping & roadmap.",
  heroCtaText: "Discover my product",
  heroCtaHref: "#contact-form",
  challengesTag: "CHALLENGES",
  challengesHeading: "Neglecting design discovery leads to costly mistakes.",
  challengesDescription: "Without a clear design strategy and specifications, even the best of ideas can fail.",
  challengeCards: [
    { tag: "UNCLEAR SCOPE", description: "Projects spiral out of control with scope creep and budget overruns." },
    { tag: "HIGH RISK, LOW REWARD", description: "Features built without user validation lead to low adoption." },
    { tag: "ENDLESS REVISIONS", description: "Constant changes delay progress and drain resources." },
    { tag: "MISALIGNED STAKEHOLDERS", description: "Teams struggle to agree on a clear direction." },
    { tag: "COMPETITIVE DISADVANTAGE", description: "Lack of design strategy makes it hard to stand out." },
    { tag: "DEVELOPMENT BOTTLENECKS", description: "Engineers waste time on unclear requirements." },
    { tag: "COSTLY REBUILDS", description: "Late-stage changes force expensive rework." },
  ],
  auditWorkTag: "REAL-WORLD WINS",
  auditWorkHeading: "Our design experts and business analysts help you get it right the first time.",
  auditWorkStats: [
    { value: "$20K", label: "saved per project by reducing late-stage revisions" },
    { value: "150+", label: "design discoveries that led to complete product development" },
    { value: "90%", label: "of products we worked on achieved market success" },
  ],
  auditWorkCaseStudies: [
    {
      name: "vocable",
      description: "Boosted content efficiency by 300-500%, accelerating content marketing up to 4x through streamlined workflows and AI automation.",
      slides: [
        { type: "image", src: "/images/audit/vocable-dd-slide-1.jpg" },
        { type: "image", src: "/images/audit/vocable-dd-slide-2.jpg" },
        { type: "image", src: "/images/audit/vocable-dd-slide-3.jpg" },
      ],
      href: "/case-study/vocable/",
      comingSoon: false,
    },
    {
      name: "INSPHERE.AI",
      description: "Supercharging corporate potential with unified knowledge bases.",
      slides: [
        { type: "image", src: "/images/audit/digno-dd-slide-1.jpg" },
        { type: "image", src: "/images/audit/digno-dd-slide-2.jpg" },
        { type: "image", src: "/images/audit/digno-dd-slide-3.jpg" },
      ],
      href: "#",
      comingSoon: true,
    },
    {
      name: "NITRO",
      description: "A futuristic play to earn racing experience that secured $5M funding in 3 months.",
      slides: [
        { type: "image", src: "/images/audit/nitro-dd-slide-1.jpg" },
        { type: "image", src: "/images/audit/nitro-dd-slide-2.jpg" },
      ],
      href: "#",
      comingSoon: true,
    },
  ],
  midCtaTitle: "Ready to Visualize Your Product?",
  midCtaText: "Talk to us",
  midCtaHref: "#contact-form",
  processTag: "OUR end-to-end process",
  processHeading: "Inside our design discovery process.",
  processSteps: [
    { counter: "01", title: "Research & Understanding", content: "We begin by immersing ourselves in your business context: we study your users, analyze competitors through market research, and identify key features that will set your product apart." },
    { counter: "02", title: "UX Mapping & Scope Alignment", content: "Through collaborative workshops, we discern major use cases for your product and create targeted user personas. These insights are then used to define your user journeys and determine your product\u2019s scope." },
    { counter: "03", title: "Wireframing & Visual Direction", content: "Next, we translate these user flows into real screens that bring your product\u2019s major use cases to life. In doing so, we set up the look and feel of the product and establish the foundations of your design system." },
    { counter: "04", title: "Interactive Prototyping & User Stories", content: "We transform your concept screens into interactive prototypes that stakeholders can interact with, positioning you to attract funding and investor interest. We also meticulously document these flows as user stories to provide tangible product direction before development begins." },
    { counter: "05", title: "Roadmap for Development", content: "To wrap up the process, we create a strategic roadmap that outlines key milestones and collaborate with you on IT solutions, helping you seamlessly initiate product development." },
  ],
  deliverables: [
    "UI/UX design for MVP",
    "User journey maps",
    "Interactive prototypes",
    "Design system guidelines",
    "Project roadmap",
  ],
  keyDeliverablesTag: "Deliverables",
  keyDeliverablesHeading: "What you'll get in your design discovery.",
  keyDeliverablesItems: [
    { title: "UI/UX design for MVP", description: "We translate your idea into a comprehensive, user-friendly experience that drives clicks and engagement." },
    { title: "User journey maps", description: "We gather deep insights into customer interactions to optimize every touchpoint and enhance the UX." },
    { title: "Interactive prototypes", description: "We showcase core user flows in action with dynamic prototypes that demonstrate functionality before development." },
    { title: "Design system guidelines", description: "We ensure the scalability of your product with structured design principles and reusable components." },
    { title: "Project roadmap", description: "We help you align stakeholders and streamline execution by providing a clear understanding of budget and scoping." },
  ],
  bottomCtaTitle: "Ready to visualize your product?",
  bottomCtaSubtitle: "In just two weeks, our signature Design Discovery workshop will provide you with a design direction and product roadmap that sets you up for success.",
  bottomCtaText: "Discover my product",
  bottomCtaHref: "#contact-form",
  faqsTag: "FAQS",
  faqsHeading: "Your questions, answered.",
  faqItems: [
    { question: "How is a Design Discovery different from a full Discovery Workshop?", answer: "Design Discovery focuses specifically on the user experience and visual design aspects of your product, while a full Discovery Workshop covers broader aspects including technical feasibility, business model validation, and development planning." },
    { question: "Can we skip Design Discovery if we already have wireframes?", answer: "Wireframes are a great start, but Design Discovery goes deeper by validating those concepts with users, exploring visual language options, and creating interactive prototypes that stakeholders can experience and provide feedback on." },
    { question: "How long does the Design Discovery process take?", answer: "Most Design Discovery engagements take 2-4 weeks, depending on the complexity of your product and the number of user journeys that need to be explored." },
    { question: "What happens after the Design Discovery phase?", answer: "The insights and deliverables from Design Discovery feed directly into the development planning phase, providing clear direction for your engineering team and reducing implementation questions." },
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
  console.log("🚀 Starting Design Discovery Page seed...\n");

  const adminToken = await getAdminToken();

  await enablePublicPermissions(adminToken);

  console.log("\n📝 Seeding Design Discovery Page via Content Manager API...");
  const cmRes = await request(
    "PUT",
    "/content-manager/single-types/api::design-discovery-page.design-discovery-page",
    PAGE_DATA,
    adminToken
  );

  if (cmRes.status === 200 || cmRes.status === 201) {
    console.log("✅ Design Discovery Page seeded successfully!");
  } else {
    console.log("⚠️  Seed response:", cmRes.status, JSON.stringify(cmRes.body).slice(0, 300));
  }

  console.log("\n📢 Publishing...");
  const pubRes = await request(
    "POST",
    "/content-manager/single-types/api::design-discovery-page.design-discovery-page/actions/publish",
    {},
    adminToken
  );

  if (pubRes.status === 200) {
    console.log("✅ Design Discovery Page published!");
  } else {
    console.log("Publish response:", pubRes.status, JSON.stringify(pubRes.body).slice(0, 200));
  }

  console.log("\n🔍 Testing public API...");
  const testRes = await request("GET", "/api/design-discovery-page");
  if (testRes.status === 200 && testRes.body?.data) {
    console.log("✅ Public API working! heroTag:", testRes.body.data.heroTag);
  } else {
    console.log("⚠️  Public API response:", testRes.status);
  }

  console.log("\n✅ Design Discovery Page seed complete!");
}

main().catch(console.error);
