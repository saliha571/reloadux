/**
 * UI/UX Design Page Seed Script
 * Run after Strapi starts: node seed-ui-ux-design.js
 */

const http = require("http");
const fallback = require("../content/pages/ui-ux-design.json");

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
    if (token) opts.headers.Authorization = `Bearer ${token}`;

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

function toPageData(data) {
  return {
    heroTag: data.hero.tag,
    heroTitle: data.hero.title,
    heroCtaText: data.hero.ctaText,
    heroCtaHref: data.hero.ctaHref,
    challengesTag: data.challenges.tag,
    challengesHeading: data.challenges.heading,
    challengesDescription: data.challenges.description,
    challengeCards: data.challenges.cards,
    auditWorkTag: data.auditWork.tag,
    auditWorkHeading: data.auditWork.heading,
    auditWorkStats: data.auditWork.stats,
    auditWorkCaseStudies: data.auditWork.caseStudies,
    midCtaTitle: data.midCta.title,
    midCtaText: data.midCta.ctaText,
    midCtaHref: data.midCta.ctaHref,
    processTag: data.process.tag,
    processHeading: data.process.heading,
    processSteps: data.process.steps,
    deliverables: data.process.deliverables,
    uiuxServicesTag: data.uiuxServices.tag,
    uiuxServicesHeading: data.uiuxServices.heading,
    uiuxServicesCards: data.uiuxServices.cards,
    keyDeliverablesTag: data.keyDeliverables.tag,
    keyDeliverablesHeading: data.keyDeliverables.heading,
    keyDeliverablesItems: data.keyDeliverables.items,
    bottomCtaTitle: data.bottomCta.title,
    bottomCtaSubtitle: data.bottomCta.subtitle,
    bottomCtaText: data.bottomCta.ctaText,
    bottomCtaHref: data.bottomCta.ctaHref,
    faqsTag: data.faqs.tag,
    faqsHeading: data.faqs.heading,
    faqItems: data.faqs.items,
    nextSteps: data.nextSteps,
    contactPhone: data.contactInfo.phone,
    contactEmail: data.contactInfo.email,
    contactTeam: data.contactInfo.team,
  };
}

async function main() {
  const adminToken = await getAdminToken();
  const PAGE_DATA = toPageData(fallback);

  await request(
    "PUT",
    "/content-manager/single-types/api::ui-ux-design-page.ui-ux-design-page",
    PAGE_DATA,
    adminToken
  );
  await request(
    "POST",
    "/content-manager/single-types/api::ui-ux-design-page.ui-ux-design-page/actions/publish",
    {},
    adminToken
  );

  const token = process.env.STRAPI_API_TOKEN;
  const test = await request("GET", "/api/ui-ux-design-page", null, token);
  console.log("UI/UX Design API test status:", test.status);
}

main().catch(console.error);
