import type { Core } from '@strapi/strapi';

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // Set public permissions for all content types via users-permissions plugin
    try {
      const pluginStore = strapi.store({ type: 'plugin', name: 'users-permissions' });
      const publicRole = await strapi
        .query('plugin::users-permissions.role')
        .findOne({ where: { type: 'public' } });

      if (publicRole) {
        const apiNames = [
          'homepage', 'service', 'case-study', 'blog-post',
          'testimonial', 'team-member', 'client-logo', 'industry',
          'site-setting', 'ux-redesign-page',
        ];

        for (const apiName of apiNames) {
          const uid = `api::${apiName}.${apiName}`;
          for (const action of ['find', 'findOne']) {
            const fullAction = `${uid}.${action}`;
            const exists = await strapi
              .query('plugin::users-permissions.permission')
              .findOne({ where: { action: fullAction, role: publicRole.id } });
            if (!exists) {
              await strapi
                .query('plugin::users-permissions.permission')
                .create({ data: { action: fullAction, role: publicRole.id, enabled: true } });
            }
          }
        }
        strapi.log.info('Public API permissions set for all content types');
      }
    } catch (e) {
      strapi.log.warn('Could not set public permissions automatically: ' + (e as Error).message);
    }

    // Seed UX Redesign page if empty
    const existing = await strapi.documents('api::ux-redesign-page.ux-redesign-page').findFirst();
    if (!existing) {
      strapi.log.info('Seeding UX Redesign page data...');
      await strapi.documents('api::ux-redesign-page.ux-redesign-page').create({
        data: {
          heroTag: 'UX REDESIGN',
          heroTitle: 'AI-Ready UX Redesign for B2B & SaaS Products',
          heroSubtitle: "If you're planning to integrate AI into your existing product experience, you're in the right place.",
          heroCtaText: 'Get Started',
          heroCtaHref: '/contact-us/',
          clientLogos: '/images/logos/barclays-2.svg,/images/logos/nokia-2.svg,/images/logos/nbc-1.svg,/images/logos/nitro-2.svg,/images/logos/digno-2.svg,/images/logos/encore-1.svg,/images/logos/peopleguru-2.svg',
          challengesTag: 'CHALLENGES',
          challengesHeading: 'You want AI in your product. Your users already expect it.',
          challengesDescription: "Your users' expectations are evolving fast and you already know it. What you don't know is where to start or how to do it right. That's where we help.",
          challengeCards: [
            { tag: 'Placement Uncertainty', description: "We don't know where AI fits into our users' journeys." },
            { tag: 'Idea Overload', description: 'We have too many AI ideas, but no way to prioritize what improves UX.' },
            { tag: 'Adoption Risk', description: 'Adding AI might confuse our existing users or disrupt workflows.' },
            { tag: 'Feature Bloat', description: 'The product already feels cluttered; AI could make it harder to navigate.' },
            { tag: 'Behavior Stagnation', description: "We shipped AI features, but users aren't engaging differently." },
            { tag: 'Budget Pressure', description: "Leadership wants an AI roadmap, but we can't redesign the UX from scratch." },
            { tag: 'Execution Risk', description: "We can't risk implementing AI that frustrates users or lowers satisfaction." },
          ],
          caseStudyItems: [
            {
              tag: 'Case Study 01',
              description: 'We transformed the performance review system in a legacy HRMS with an AI-native experience.',
              image: '/images/case-studies/case-study-01.webp',
              slides: [
                { type: 'video', src: 'https://reloadux.com/wp-content/uploads/2026/02/Untitled-design.mkv' },
                { type: 'image', src: '/images/case-studies/people-guru-7.png' },
                { type: 'image', src: '/images/case-studies/people-guru-1-1.png' },
              ],
            },
            {
              tag: 'Case Study 02',
              description: 'We replaced manual onboarding coordination with an AI-orchestrated, role-based onboarding experience.',
              image: '/images/case-studies/case-study-02.webp',
              slides: [
                { type: 'video', src: 'https://reloadux.com/wp-content/uploads/2026/02/Untitled-design-1.mkv' },
                { type: 'image', src: '/images/case-studies/omne-1.png' },
                { type: 'image', src: '/images/case-studies/omne-1-1.png' },
              ],
            },
          ],
          caseStudyCtaText: 'Explore More Cases',
          caseStudyCtaHref: '/case-studies/',
          approachTag: 'AI-READY UX REDESIGN',
          approachHeading: 'How we think about',
          approachHeadingItalic: 'AI-ready UX redesign',
          approachDescription: "Your users are starting to expect products to behave more intelligently. Adding AI to the experience isn't just about shipping a new feature. It changes how users navigate, what they expect, and how much they trust your product. Successful AI integration follows three principles:",
          principles: [
            { number: '01', title: 'Redesign with purpose', description: 'We never start with AI features. We start with your product, your users, and your business goals.', gif: '/images/approach/subscribe.gif' },
            { number: '02', title: 'Protect user trust', description: 'Your users trust your product. Introducing AI carelessly breaks that trust.', gif: '/images/approach/get-matched.gif' },
            { number: '03', title: 'Measure adoption', description: "A shipped feature that nobody uses is a failed feature. We design for adoption.", gif: '/images/approach/get-started.gif' },
          ],
          howWeWorkTag: 'HOW WE WORK',
          howWeWorkSubtitle: 'A 5-stage process from product insight to an AI-native experience users love.',
          stages: [
            { title: 'UX Audit & AI Readiness', counter: '01', description: "We learn your business, goals, and audience fast.", deliverables: 'UX audit report with prioritized findings\nAI readiness scorecard', href: '/service/ux-audit/' },
            { title: 'AI Opportunity Mapping', counter: '02', description: 'We pinpoint the 2-3 highest-impact AI opportunities.', deliverables: 'AI opportunity map across your product\nTop 3 recommendations with success criteria', href: '/service/ai-opportunity-mapping/' },
            { title: 'AI Feature Experience Design', counter: '03', description: 'We design an AI-native experience including every interaction.', deliverables: 'Interactive prototypes\nAI interaction patterns\nDeveloper handoff package', href: '/service/ai-feature-experience-design/' },
            { title: 'Legacy UX Modernization', counter: '04', description: "Sometimes AI can't sit on top of your current interface.", deliverables: 'Restructured information architecture\nUpdated design system\nRedesigned key flows\nPhased rollout strategy', note: 'Not always required, Stage 1 determines if you need this.', href: '/service/legacy-ux-modernization/' },
            { title: 'Adoption & Optimization', counter: '05', description: "Shipping isn't success. Adoption is.", deliverables: 'Iteration recommendations\nUsability testing findings\nAnalytics dashboard for AI feature adoption' },
          ],
          whoThisIsForTag: 'WHO THIS IS FOR',
          whoThisIsForHeading: 'We work with companies who have',
          idealClientCards: [
            { title: 'An established product with real users', description: "You're not starting from zero." },
            { title: 'Enterprise or B2B customers', description: 'Your users are professionals who need AI that respects their expertise.' },
            { title: 'Complex workflows or data-heavy products', description: 'The kind of software where AI can genuinely reduce friction.' },
            { title: 'Pressure to add AI but no clear roadmap', description: 'You need a structured approach, not guesswork.' },
          ],
          midCtaTitle: 'Ready to build an AI-native user experience?',
          midCtaSubtitle: "We create AI-native experiences and make products launch-ready with a clear roadmap.",
          midCtaText: 'Book a Call',
          midCtaHref: '/contact-us/',
          whyUsTag: 'WHY US',
          whyUsHeading: 'Why teams choose reloadux',
          valueProps: [
            { title: 'AI UX specialists, not generalists', description: "Our AI redesign services exclusively focus on AI interface design." },
            { title: 'B2B & SaaS experts', description: 'We design for enterprise workflows and complex data products.' },
            { title: 'Backed by engineering reality', description: "We're part of the Tkxel network, a 1000+ person software company." },
            { title: 'Strategy before pixels', description: "We don't start with wireframes. We start with understanding where AI makes sense." },
            { title: 'Obsessed with adoption', description: "A feature nobody uses is a failed feature." },
          ],
          sprintHeading: 'Still figuring out where AI fits?',
          sprintSubheading: "We'll show you in 3 days.",
          sprintDescription: "Start with our 3-Day AI-Readiness Sprint, so you get clarity before committing to anything.",
          sprintSteps: [
            { number: '1', text: 'We pick one use-case of your app to run a proper UX audit.' },
            { number: '2', text: 'Identify where AI actually makes sense for your users within the workflows.' },
            { number: '3', text: 'Flag the structural gaps that could block adoption.' },
            { number: '4', text: 'Redesign 1-2 screens so you can see the direction before going all in.' },
          ],
          sprintCtaText: 'Start a 3 Day Trial',
          sprintCtaHref: '/contact-us/',
          faqsTag: 'FAQS',
          faqsHeading: 'Reimagine your product experience with our AI-native redesign services.',
          faqItems: [
            { question: 'How long does it take to redesign a product for an AI-native experience?', answer: 'It depends on scope. A single AI feature can be designed in 4-6 weeks. A comprehensive AI integration typically takes 12-16 weeks.' },
            { question: 'Do we need to redesign our whole product?', answer: "Not always. Sometimes AI can be layered onto your existing interface." },
            { question: "What if we don't know where AI fits?", answer: "That's exactly what our AI opportunity assessment solves." },
            { question: 'How do you ensure users actually adopt the AI features?', answer: 'We design for adoption from day one with progressive disclosure and clear explanations.' },
            { question: 'How do you prioritize which AI features to build first?', answer: 'We start by looking at how your users actually work and pick the top 2-3 that make the biggest difference.' },
            { question: 'Can you work with our existing design system?', answer: 'Yes. We extend your existing design system to include AI-specific components.' },
            { question: "What's the difference between redesigning and building from scratch?", answer: "AI integrated product redesign focuses on adding intelligence to products that already have users." },
            { question: 'Do you help with implementation?', answer: 'We create production-ready designs and offer implementation support.' },
            { question: 'What industries do you work with?', answer: 'We specialize in B2B SaaS across fintech, healthcare, HR tech, and enterprise software.' },
          ],
          nextSteps: [
            { number: '01', text: "We'll respond within 24 hours." },
            { number: '02', text: 'Our UX Expert will collect project details and create a brief.' },
            { number: '03', text: "We'll prepare estimates and share a project proposal." },
          ],
          contactPhone: '(202) 978 3410',
          contactEmail: 'info@reloadux.com',
          contactTeam: [
            { name: 'Sahar', role: 'Key Account Manager', linkedin: 'https://www.linkedin.com/in/sahar-asif-284a9955/' },
            { name: 'Lara Kazan', role: 'Business Development Executive', linkedin: 'https://www.linkedin.com/in/lara-kazan-82a24113b/' },
          ],
        } as any,
        status: 'published',
      });
      strapi.log.info('UX Redesign page seeded and published');
    } else {
      strapi.log.info('UX Redesign page already exists, skipping seed');
    }
  },
};
