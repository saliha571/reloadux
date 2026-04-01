/**
 * AI Opportunity Mapping Page Seed Script
 * Run after Strapi starts: node seed-ai-opportunity-mapping.js
 */

const http = require("http");
const fallback = require("../content/pages/ai-opportunity-mapping.json");

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
    includesTag: data.includes.tag,
    includesHeading: data.includes.heading,
    includesItems: data.includes.items,
    includesOutcomeTitle: data.includes.outcomeTitle,
    whoThisIsForTag: data.whoThisIsFor.tag,
    whoThisIsForHeading: data.whoThisIsFor.heading,
    whoThisIsForCards: data.whoThisIsFor.cards,
    keyDeliverablesTag: data.keyDeliverables.tag,
    keyDeliverablesHeading: data.keyDeliverables.heading,
    keyDeliverablesItems: data.keyDeliverables.items,
    processTag: data.process.tag,
    processHeading: data.process.heading,
    processSteps: data.process.steps,
    deliverables: data.process.deliverables,
    pricingTag: data.pricing.tag,
    pricingDescription: data.pricing.description,
    pricingPlanName: data.pricing.planName,
    pricingPrice: data.pricing.price,
    pricingPricePer: data.pricing.pricePer,
    pricingFeatures: data.pricing.features,
    pricingCtaText: data.pricing.ctaText,
    pricingCtaHref: data.pricing.ctaHref,
    whatHappensAfterTag: data.whatHappensAfter.tag,
    whatHappensAfterHeading: data.whatHappensAfter.heading,
    whatHappensAfterPaths: data.whatHappensAfter.paths,
    otherServicesTag: data.otherServices.tag,
    otherServicesItems: data.otherServices.items,
    whyUsTag: data.whyUs.tag,
    whyUsHeading: data.whyUs.heading,
    whyUsCards: data.whyUs.cards,
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
    "/content-manager/single-types/api::ai-opportunity-mapping-page.ai-opportunity-mapping-page",
    PAGE_DATA,
    adminToken
  );
  await request(
    "POST",
    "/content-manager/single-types/api::ai-opportunity-mapping-page.ai-opportunity-mapping-page/actions/publish",
    {},
    adminToken
  );

  const token = process.env.STRAPI_API_TOKEN;
  const test = await request("GET", "/api/ai-opportunity-mapping-page", null, token);
  console.log("AI Opportunity Mapping API test status:", test.status);
}

main().catch(console.error);
