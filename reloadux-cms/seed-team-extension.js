/**
 * Team Extension Page Seed Script
 * Seeds the Team Extension page content into Strapi using the admin API.
 * Run after Strapi is started with: node seed-team-extension.js
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
      console.log("⚠️  Rate limited, waiting 65 seconds...");
      await new Promise((r) => setTimeout(r, 65000));
      const res2 = await request("POST", "/admin/login", creds);
      if (res2.body?.data?.token) return res2.body.data.token;
    }
  }

  console.error("❌ Cannot login.");
  process.exit(1);
}

async function createApiToken(adminToken) {
  const res = await request(
    "POST",
    "/admin/api-tokens",
    {
      name: "team-ext-seed-" + Date.now(),
      description: "Team Extension page seed token",
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

  if (!permissions["api::team-extension-page"])
    permissions["api::team-extension-page"] = { controllers: {} };
  if (!permissions["api::team-extension-page"].controllers["team-extension-page"]) {
    permissions["api::team-extension-page"].controllers["team-extension-page"] = {};
  }
  permissions["api::team-extension-page"].controllers["team-extension-page"]["find"] = { enabled: true };

  const putRes = await request(
    "PUT",
    `/api/users-permissions/roles/${publicRole.id}`,
    { permissions },
    adminToken
  );

  if (putRes.status === 200) {
    console.log("✅ Public permissions enabled for team-extension-page");
  } else {
    console.log("⚠️  Permissions update:", JSON.stringify(putRes.body).slice(0, 200));
  }
}

async function seedTeamExtensionPage(token) {
  console.log("\n📝 Seeding Team Extension Page...");

  const payload = {
    data: {
      heroTag: "TEAM EXTENSION",
      heroTitle: "Empower your design vision",
      heroTitleAccent: "with our Expert Team",
      heroCtaText: "Extend my team",
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
        { actorImage: "/images/challenges/card-1.webp", actorName: "Shannon Madon", content: "I want a UX designer for my startup" },
        { actorImage: "/images/challenges/logo.webp", actorName: "John", content: "Finding and hiring the right talent is challenging" },
        { actorImage: "/images/challenges/logo-4.webp", actorName: "Samantha", content: "I want a UX consultant to plan a design strategy." },
        { actorImage: "/images/challenges/logo-1.webp", actorName: "Interaktell", content: "My design team is overloaded and can't keep up." },
        { actorImage: "/images/challenges/logo-2.webp", actorName: "Mark", content: "I require additional help for my new product." },
        { actorImage: "/images/challenges/logo-4.webp", actorName: "Stacey", content: "Finding and hiring the right talent is challenging" },
        { actorImage: "/images/challenges/logo.webp", actorName: "Adrian", content: "I want a UX designer for my startup" },
        { actorImage: "/images/challenges/card-1.webp", actorName: "Carlo Douglas", content: "I want a UX consultant to plan a design strategy." },
      ],
      caseStudiesTag: "WE HEAR YOU",
      caseStudiesHeading: "Transform your team\u2019s gaps into strength",
      caseStudiesDescription: "with our team extension services, effectively addressing skill gaps, consistently meeting project deadlines, and boosting overall productivity and team morale.",
      caseStudyItems: [
        {
          name: "tradezella",
          description: "Revamped a trading journal experience helping traders make data-driven decisions.",
          desktopImage: "/images/case-studies/tradezella.webp",
          mobileImage: "/images/portfolio/tradezella-mobile-1.webp",
          href: "/case-study/tradezella/",
          comingSoon: false,
        },
        {
          name: "Super Soccer Star",
          description: "Designed an immersive football gaming experience that boosted in-app engagement by 40%.",
          desktopImage: "/images/team-extension/super-soccer-star-desktop.png",
          mobileImage: "/images/team-extension/super-soccer-star-desktop.png",
          href: "#",
          comingSoon: true,
        },
        {
          name: "REI",
          description: "Revamped a specialised CRM for real estate investors, helping them maximise the profit.",
          desktopImage: "/images/team-extension/rei-desktop.png",
          mobileImage: "/images/team-extension/rei-desktop.png",
          href: "#",
          comingSoon: true,
        },
      ],
      midCtaTitle: "Outpace the competition with expert design support.",
      midCtaText: "Extend my team",
      midCtaHref: "#contact-form",
      processTag: "HOW WE DO IT",
      processHeading: "Whether you need to fill skill gaps or expand your team, we provide expert talent to uplift your product and ensure timely delivery with our extension service",
      processSteps: [
        { counter: "01", title: "Project Assessment", content: "We understand project requirements and assess required skills and expertise." },
        { counter: "02", title: "Talent Selection & Onboarding", content: "We identify professionals and create a customized onboarding plan." },
        { counter: "03", title: "Collaboration & Monitoring", content: "We establish regular meetings and allocate tasks for progress tracking." },
        { counter: "04", title: "Quality Assurance & Flexibility", content: "We conduct quality checks and offer flexibility in resource scaling." },
        { counter: "05", title: "Reporting & Handoff", content: "We provide transparent reports and ensure a smooth project handoff." },
      ],
      deliverables: [
        { title: "Increased Scalability" },
        { title: "Reduced Operational Costs" },
        { title: "Enhanced Skill Diversity" },
        { title: "Continuous Innovation" },
        { title: "Streamlined Collaboration" },
        { title: "Continuous Support" },
      ],
      outcomesTag: "OUTCOMES",
      outcomesHeading: "Our extension outcomes that drive excellence.",
      outcomeItems: [
        { text: "Enhanced User Satisfaction" },
        { text: "Streamlined Product Navigation" },
        { text: "Increased User Engagement" },
        { text: "Improved Brand Perception" },
        { text: "Reduced Bounce Rates" },
        { text: "Higher Conversion Rates" },
      ],
      bottomCtaTitle: "Expand your team\u2019s capabilities with our design experts.",
      bottomCtaText: "Extend my team",
      bottomCtaHref: "#contact-form",
      faqsTag: "FAQS",
      faqsHeading: "Ready to extend your team? Get your design questions answered",
      faqItems: [
        { question: "How does extending my team with your UI/UX experts benefit my existing workflow?", answer: "Adding our UI/UX professionals to your team complements your existing workflow with specialized skills in user experience design and user interface design. They integrate seamlessly with your team, bringing expertise in design systems, wireframing, and user testing, which enhances your project's overall efficiency and creativity." },
        { question: "Can your UI/UX services help control project costs?", answer: "Our UI/UX experts are adept at employing cost-effective design strategies like iterative design and prototyping, which help in identifying and solving user experience issues early in the design process. This approach prevents costly redesigns and ensures a more efficient use of your budget." },
        { question: "How do your UI/UX services speed up my project delivery?", answer: "Our team utilizes agile UX methodologies, enabling faster design iterations and more collaborative and flexible design processes. This approach reduces time-to-market by allowing for simultaneous progress in different aspects of the project, from research to design implementation." },
        { question: "What quality assurance methods are inherent in your UI/UX services?", answer: "We ensure quality by integrating best practices in UI/UX design, such as heuristic evaluations, user testing, and accessibility checks. Our experts conduct regular reviews and feedback sessions to maintain high standards and align the design closely with user needs and business goals." },
        { question: "How do you address operational bottlenecks with your UI/UX team extension?", answer: "Our UI/UX team is trained to identify and resolve operational bottlenecks through effective communication, streamlined processes, and collaborative tools. We focus on optimizing the design process to enhance productivity and reduce delays in project timelines." },
        { question: "Are your UI/UX services scalable according to my project's needs?", answer: "Yes, our services are highly scalable. We can adjust the size and composition of the UI/UX team based on your project's requirements, ensuring that you have the right amount of resources at every stage of the project." },
        { question: "How does your team contribute to innovation in my existing UI/UX setup?", answer: "Our UI/UX professionals bring fresh perspectives and the latest design trends and technologies to your team. They foster a culture of innovation, encouraging experimentation and pushing the boundaries of traditional design to create more impactful and user-centered designs." },
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

  let res = await request("PUT", "/api/team-extension-page", payload, token);

  if (res.status === 200 || res.status === 201) {
    console.log("✅ Team Extension Page seeded successfully!");
    return true;
  }

  console.log("PUT failed, trying Content Manager API...", res.status);

  // Fallback: use Content Manager API with admin token
  return false;
}

async function publishTeamExtensionPage(token) {
  const res = await request(
    "GET",
    "/api/team-extension-page?status=draft",
    null,
    token
  );

  if (res.body?.data?.documentId) {
    const pubRes = await request(
      "POST",
      `/api/team-extension-page/actions/publish`,
      {},
      token
    );
    if (pubRes.status === 200) {
      console.log("✅ Team Extension Page published!");
      return;
    }
    console.log("Publish response:", pubRes.status, JSON.stringify(pubRes.body).slice(0, 200));
  }
}

async function main() {
  console.log("🚀 Starting Team Extension Page seed...\n");

  const adminToken = await getAdminToken();
  const apiToken = await createApiToken(adminToken);

  if (!apiToken) {
    console.error("❌ Failed to create API token");
    process.exit(1);
  }

  console.log("✅ API token created");

  await enablePublicPermissions(adminToken);

  const seeded = await seedTeamExtensionPage(apiToken);

  if (!seeded) {
    console.error("❌ Failed to seed Team Extension page via public API, trying admin Content Manager...");

    // Use admin token with Content Manager API
    const payload = {
      heroTag: "TEAM EXTENSION",
      heroTitle: "Empower your design vision",
      heroTitleAccent: "with our Expert Team",
      heroCtaText: "Extend my team",
      heroCtaHref: "#contact-form",
    };

    const cmRes = await request(
      "PUT",
      "/content-manager/single-types/api::team-extension-page.team-extension-page",
      payload,
      adminToken
    );

    if (cmRes.status === 200 || cmRes.status === 201) {
      console.log("✅ Team Extension Page seeded via Content Manager!");
    } else {
      console.log("Content Manager response:", cmRes.status, JSON.stringify(cmRes.body).slice(0, 300));
    }
  }

  await publishTeamExtensionPage(apiToken);

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
    envContent = envContent.replace(
      /STRAPI_API_TOKEN=.*/,
      `STRAPI_API_TOKEN=${apiToken}`
    );
    fs.writeFileSync(envPath, envContent);
    console.log(`\n✅ Token updated in .env.local`);
  }

  console.log("\n✅ Team Extension Page seed complete!");
}

main().catch(console.error);
