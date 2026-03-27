/**
 * MVP Page Seed Script
 * Seeds the MVP page content into Strapi using the admin API.
 * Run after Strapi is started with: node seed-mvp.js
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
  // Try both known admin emails
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
      console.log("⚠️  Rate limited, waiting 65 seconds...");
      await new Promise((r) => setTimeout(r, 65000));
      const res2 = await request("POST", "/admin/login", creds);
      if (res2.body?.data?.token) return res2.body.data.token;
    }
  }

  console.error("❌ Cannot login. Response:", JSON.stringify(arguments));
  process.exit(1);
}

async function createApiToken(adminToken) {
  const res = await request(
    "POST",
    "/admin/api-tokens",
    {
      name: "mvp-seed-" + Date.now(),
      description: "MVP page seed token",
      type: "full-access",
      lifespan: null,
    },
    adminToken
  );
  if (res.body?.data?.accessKey) return res.body.data.accessKey;
  console.log("Token response:", JSON.stringify(res.body));
  return null;
}

async function enablePublicPermissions(adminToken) {
  const upRolesRes = await request(
    "GET",
    "/api/users-permissions/roles",
    null,
    adminToken
  );
  const upRoles = upRolesRes.body?.roles || [];
  const publicRole = upRoles.find((r) => r.type === "public");

  if (!publicRole) {
    console.log("⚠️  Could not find public role");
    return;
  }

  const permRes = await request(
    "GET",
    `/api/users-permissions/roles/${publicRole.id}`,
    null,
    adminToken
  );
  const permissions = permRes.body?.role?.permissions || {};

  // Enable mvp-page find
  if (!permissions["api::mvp-page"]) permissions["api::mvp-page"] = { controllers: {} };
  if (!permissions["api::mvp-page"].controllers["mvp-page"]) {
    permissions["api::mvp-page"].controllers["mvp-page"] = {};
  }
  permissions["api::mvp-page"].controllers["mvp-page"]["find"] = { enabled: true };

  const putRes = await request(
    "PUT",
    `/api/users-permissions/roles/${publicRole.id}`,
    { permissions },
    adminToken
  );

  if (putRes.status === 200) {
    console.log("✅ Public permissions enabled for mvp-page");
  } else {
    console.log("⚠️  Permissions update:", JSON.stringify(putRes.body).slice(0, 200));
  }
}

async function seedMVPPage(token) {
  console.log("\n📝 Seeding MVP Page...");

  const payload = {
    data: {
      heroTag: "MVP DEVELOPMENT",
      heroTitle: "Craft a winning product.",
      heroTitleAccent: "Your Idea, Our Expertise",
      heroCtaText: "Build my product",
      heroCtaHref: "#contact-form",
      clientLogos: [
        { src: "/images/logos/vocable-1.svg", alt: "Vocable", width: 163 },
        { src: "/images/logos/nitro-2.svg", alt: "Nitro", width: 142 },
        { src: "/images/logos/digno-2.svg", alt: "Digno", width: 120 },
        { src: "/images/logos/nokia-2.svg", alt: "Nokia", width: 156 },
        { src: "/images/logos/sterne-kessler.svg", alt: "Sterne Kessler", width: 221 },
        { src: "/images/logos/artvisor-1.svg", alt: "Artvisor", width: 222 },
        { src: "/images/logos/today-1.svg", alt: "Today", width: 151 },
        { src: "/images/logos/excheqr-1.svg", alt: "Excheqr", width: 192 },
        { src: "/images/logos/barclays-2.svg", alt: "Barclays", width: 178 },
      ],
      challengesTag: "CHALLENGES",
      challengesHeading: "We know what frustrates you",
      challengeCards: [
        { actorImage: "/images/challenges/card-1.webp", actorName: "Shannon Madon", content: "I have an idea but i want to make a good UX product" },
        { actorImage: "/images/challenges/logo.webp", actorName: "John", content: "I need help in following best practices & standards." },
        { actorImage: "/images/challenges/logo-1.webp", actorName: "Interaktell", content: "I have a great idea but don't know where to start." },
        { actorImage: "/images/challenges/logo-2.webp", actorName: "Mark", content: "My concept feels unfinished and needs refinement." },
        { actorImage: "/images/challenges/logo-4.webp", actorName: "Samantha", content: "I'm struggling to translate my vision into a prototype." },
        { actorImage: "/images/challenges/logo-1.webp", actorName: "Shannon Madon", content: "I need help in following best practices & standards." },
        { actorImage: "/images/challenges/logo-4.webp", actorName: "Angelina Wayne", content: "I have an idea but i want to make a good UX product" },
        { actorImage: "/images/challenges/logo.webp", actorName: "Mark Bruce", content: "I need help in following best practices & standards." },
      ],
      caseStudiesTag: "WE HEAR YOU",
      caseStudiesHeading: "Transform your ideas & vision into reality",
      caseStudiesDescription: "with our start from scratch solutions, offering thorough planning, technical expertise, and support to transform your ideas into successful products.",
      caseStudyItems: [
        {
          name: "vocable",
          description: "Boosted content efficiency by 300-500%, accelerating content marketing up to 4x through streamlined workflows and AI automation.",
          desktopImage: "/images/mvp-case-studies/vocable-desktop.webp",
          mobileImage: "/images/mvp-case-studies/vocable-mobile.webp",
          href: "/case-study/vocable/",
          comingSoon: false,
        },
        {
          name: "Digno",
          description: "Enhanced profitability with an integrated scoring system, leading to a 15% increase in sales & a 20% reduction in operational costs.",
          desktopImage: "/images/mvp-case-studies/digno-desktop.webp",
          mobileImage: "/images/mvp-case-studies/digno-mobile.webp",
          href: "/case-study/digno/",
          comingSoon: false,
        },
        {
          name: "NITRO",
          description: "A futuristic play to earn racing experience that secured $5M funding in 3 months",
          desktopImage: "/images/mvp-case-studies/nitro-desktop.webp",
          mobileImage: "/images/mvp-case-studies/nitro-mobile.webp",
          href: "/case-study/nitro/",
          comingSoon: false,
        },
        {
          name: "Artvisor",
          description: "Streamlined art collection, enhancing efficiency for exhibitors.",
          desktopImage: "/images/mvp-case-studies/artvisor-desktop.webp",
          mobileImage: "/images/mvp-case-studies/artvisor-mobile.webp",
          href: "#",
          comingSoon: true,
        },
      ],
      midCtaTitle: "Launch a winning product from the ground up.",
      midCtaText: "Build my product",
      midCtaHref: "#contact-form",
      processTag: "HOW WE DO IT",
      processHeading: "From concept to execution, we turn your ideas into reality with strategic planning and technical expertise, ensuring your product's success from the ground up",
      processSteps: [
        { counter: "01", title: "Define Objectives", content: "We collaboratively define project goals and establish benchmarks." },
        { counter: "02", title: "Ideate & Prototype", content: "We generate innovative ideas, create prototypes, and validate concepts." },
        { counter: "03", title: "Design & Develop", content: "Our team designs user-centric solutions and collaborates closely with developers." },
        { counter: "04", title: "Usability Testing", content: "We conduct usability tests and iteratively refine the design." },
        { counter: "05", title: "Launch & Measure", content: "We ensure a smooth project launch and evaluate results." },
      ],
      deliverables: [
        { title: "Vision & Goals" },
        { title: "User flows" },
        { title: "Style-guide" },
        { title: "Wireframes" },
        { title: "Design System" },
        { title: "UI Design" },
        { title: "Prototypes" },
        { title: "Testing Reports" },
      ],
      outcomesTag: "OUTCOMES",
      outcomesHeading: "Our solutions that bring visions to life.",
      outcomeItems: [
        { text: "Enhanced User Satisfaction" },
        { text: "Streamlined Product Navigation" },
        { text: "Increased User Engagement" },
        { text: "Improved Brand Perception" },
        { text: "Reduced Bounce Rates" },
        { text: "Higher Conversion Rates" },
      ],
      bottomCtaTitle: "Transform your idea into a successful product.",
      bottomCtaText: "Build my product",
      bottomCtaHref: "#contact-form",
      faqsTag: "FAQS",
      faqsHeading: "Starting from scratch? Get your design questions answered",
      faqItems: [
        { question: "What services do you offer in UI/UX design?", answer: "We specialize in end-to-end UI/UX design services, including user research, wireframing, interactive prototypes, user interface design, user experience strategy, and usability testing." },
        { question: "How do you approach a new UI/UX project?", answer: "Our approach begins with understanding your business goals and user needs. We conduct thorough research and user interviews to gather insights." },
        { question: "Can you redesign an existing website/app?", answer: "Absolutely! We can evaluate your existing website or app to identify usability issues and redesign it for improved user experience and engagement." },
        { question: "How long does a typical UI/UX project take?", answer: "The duration varies based on complexity and scope. A basic UI/UX design project can take anywhere from a few weeks to a couple of months." },
        { question: "What makes your UI/UX design services unique?", answer: "Our unique strength lies in our tailored approach. We don't just create designs; we craft experiences that resonate with your target audience." },
        { question: "How do you ensure the design aligns with our brand?", answer: "We begin by understanding your brand identity, values, and target audience. Our designs are crafted to reflect your brand's personality." },
        { question: "Do you provide support after the project completion?", answer: "Yes, we offer post-launch support and maintenance services, including monitoring the design's performance and providing ongoing updates." },
        { question: "How do you measure the success of your UI/UX designs?", answer: "Success is measured through various metrics such as user engagement, conversion rates, user feedback, and usability testing results." },
        { question: "Can you work within our budget?", answer: "We strive to offer flexible solutions tailored to different budget ranges. We can discuss your budget constraints and adjust the scope accordingly." },
        { question: "How do we get started with a UI/UX design project?", answer: "Reach out to us with your project details. We will schedule an initial consultation to discuss your needs, goals, and timelines." },
      ],
      nextSteps: [
        { number: "01", text: "We'll respond within 24 hours." },
        { number: "02", text: "Our UX Expert will collect project details and create a brief." },
        { number: "03", text: "We'll prepare estimates and share a project proposal." },
      ],
      contactPhone: "(202) 978 3410",
      contactEmail: "info@reloadux.com",
      contactTeam: [
        { name: "Sahar", role: "Key Account Manager", linkedin: "https://www.linkedin.com/in/sahar-asif-284a9955/" },
        { name: "Lara Kazan", role: "Business Development Executive", linkedin: "https://www.linkedin.com/in/lara-kazan-82a24113b/" },
      ],
    },
  };

  // Try PUT (update) first, then POST if it fails
  let res = await request("PUT", "/api/mvp-page", payload, token);

  if (res.status === 200 || res.status === 201) {
    console.log("✅ MVP Page seeded successfully!");
    return true;
  }

  console.log("PUT failed, trying to create:", res.status, JSON.stringify(res.body).slice(0, 300));
  return false;
}

async function publishMVPPage(adminToken) {
  // Get the document ID
  const res = await request(
    "GET",
    "/api/mvp-page?status=draft",
    null,
    adminToken
  );

  if (res.body?.data?.documentId) {
    const docId = res.body.data.documentId;
    const pubRes = await request(
      "POST",
      `/api/mvp-page/actions/publish`,
      {},
      adminToken
    );
    if (pubRes.status === 200) {
      console.log("✅ MVP Page published!");
      return;
    }
    console.log("Publish response:", pubRes.status, JSON.stringify(pubRes.body).slice(0, 200));
  }
}

async function main() {
  console.log("🚀 Starting MVP Page seed...\n");

  const adminToken = await getAdminToken();
  const apiToken = await createApiToken(adminToken);

  if (!apiToken) {
    console.error("❌ Failed to create API token");
    process.exit(1);
  }

  console.log("✅ API token created");

  // Enable public permissions for mvp-page
  await enablePublicPermissions(adminToken);

  // Seed the content
  const seeded = await seedMVPPage(apiToken);

  if (!seeded) {
    console.error("❌ Failed to seed MVP page");
    process.exit(1);
  }

  // Publish
  await publishMVPPage(apiToken);

  // Save the token to .env.local
  const fs = require("fs");
  const envPath = "../.env.local";
  let envContent = "";
  try {
    envContent = fs.readFileSync(envPath, "utf8");
  } catch {}

  if (!envContent.includes("STRAPI_API_TOKEN")) {
    fs.appendFileSync(envPath, `\nSTRAPI_API_TOKEN=${apiToken}\n`);
    console.log(`\n✅ Token saved to .env.local`);
  } else {
    // Update existing token
    envContent = envContent.replace(
      /STRAPI_API_TOKEN=.*/,
      `STRAPI_API_TOKEN=${apiToken}`
    );
    fs.writeFileSync(envPath, envContent);
    console.log(`\n✅ Token updated in .env.local`);
  }

  console.log("\n✅ MVP Page seed complete!");
}

main().catch(console.error);
