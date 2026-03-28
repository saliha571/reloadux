import type { Schema, Struct } from '@strapi/strapi';

export interface AdminApiToken extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_api_tokens';
  info: {
    description: '';
    displayName: 'Api Token';
    name: 'Api Token';
    pluralName: 'api-tokens';
    singularName: 'api-token';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    accessKey: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Schema.Attribute.DefaultTo<''>;
    encryptedKey: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    expiresAt: Schema.Attribute.DateTime;
    lastUsedAt: Schema.Attribute.DateTime;
    lifespan: Schema.Attribute.BigInteger;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::api-token'> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'admin::api-token-permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    type: Schema.Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'read-only'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_api_token_permissions';
  info: {
    description: '';
    displayName: 'API Token Permission';
    name: 'API Token Permission';
    pluralName: 'api-token-permissions';
    singularName: 'api-token-permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::api-token-permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    token: Schema.Attribute.Relation<'manyToOne', 'admin::api-token'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminPermission extends Struct.CollectionTypeSchema {
  collectionName: 'admin_permissions';
  info: {
    description: '';
    displayName: 'Permission';
    name: 'Permission';
    pluralName: 'permissions';
    singularName: 'permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    conditions: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<[]>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::permission'> &
      Schema.Attribute.Private;
    properties: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    publishedAt: Schema.Attribute.DateTime;
    role: Schema.Attribute.Relation<'manyToOne', 'admin::role'>;
    subject: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminRole extends Struct.CollectionTypeSchema {
  collectionName: 'admin_roles';
  info: {
    description: '';
    displayName: 'Role';
    name: 'Role';
    pluralName: 'roles';
    singularName: 'role';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    code: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::role'> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<'oneToMany', 'admin::permission'>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    users: Schema.Attribute.Relation<'manyToMany', 'admin::user'>;
  };
}

export interface AdminSession extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_sessions';
  info: {
    description: 'Session Manager storage';
    displayName: 'Session';
    name: 'Session';
    pluralName: 'sessions';
    singularName: 'session';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
    i18n: {
      localized: false;
    };
  };
  attributes: {
    absoluteExpiresAt: Schema.Attribute.DateTime & Schema.Attribute.Private;
    childId: Schema.Attribute.String & Schema.Attribute.Private;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    deviceId: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private;
    expiresAt: Schema.Attribute.DateTime &
      Schema.Attribute.Required &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::session'> &
      Schema.Attribute.Private;
    origin: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    sessionId: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.Unique;
    status: Schema.Attribute.String & Schema.Attribute.Private;
    type: Schema.Attribute.String & Schema.Attribute.Private;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    userId: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private;
  };
}

export interface AdminTransferToken extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_transfer_tokens';
  info: {
    description: '';
    displayName: 'Transfer Token';
    name: 'Transfer Token';
    pluralName: 'transfer-tokens';
    singularName: 'transfer-token';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    accessKey: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Schema.Attribute.DefaultTo<''>;
    expiresAt: Schema.Attribute.DateTime;
    lastUsedAt: Schema.Attribute.DateTime;
    lifespan: Schema.Attribute.BigInteger;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminTransferTokenPermission
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    description: '';
    displayName: 'Transfer Token Permission';
    name: 'Transfer Token Permission';
    pluralName: 'transfer-token-permissions';
    singularName: 'transfer-token-permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token-permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    token: Schema.Attribute.Relation<'manyToOne', 'admin::transfer-token'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminUser extends Struct.CollectionTypeSchema {
  collectionName: 'admin_users';
  info: {
    description: '';
    displayName: 'User';
    name: 'User';
    pluralName: 'users';
    singularName: 'user';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    blocked: Schema.Attribute.Boolean &
      Schema.Attribute.Private &
      Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email: Schema.Attribute.Email &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    firstname: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    isActive: Schema.Attribute.Boolean &
      Schema.Attribute.Private &
      Schema.Attribute.DefaultTo<false>;
    lastname: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::user'> &
      Schema.Attribute.Private;
    password: Schema.Attribute.Password &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    preferedLanguage: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    registrationToken: Schema.Attribute.String & Schema.Attribute.Private;
    resetPasswordToken: Schema.Attribute.String & Schema.Attribute.Private;
    roles: Schema.Attribute.Relation<'manyToMany', 'admin::role'> &
      Schema.Attribute.Private;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    username: Schema.Attribute.String;
  };
}

export interface ApiBlogPostBlogPost extends Struct.CollectionTypeSchema {
  collectionName: 'blog_posts';
  info: {
    description: 'Blog articles';
    displayName: 'Blog Post';
    pluralName: 'blog-posts';
    singularName: 'blog-post';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    category: Schema.Attribute.Enumeration<
      [
        'Artificial_Intelligence',
        'Design',
        'Development',
        'Business',
        'Tutorial',
      ]
    > &
      Schema.Attribute.DefaultTo<'Artificial_Intelligence'>;
    content: Schema.Attribute.RichText;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    excerpt: Schema.Attribute.Text;
    featured: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    featuredImage: Schema.Attribute.Media<'images'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::blog-post.blog-post'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    readTime: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'10 min read'>;
    seoDescription: Schema.Attribute.Text;
    seoTitle: Schema.Attribute.String;
    slug: Schema.Attribute.UID<'title'> & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiCaseStudyCaseStudy extends Struct.CollectionTypeSchema {
  collectionName: 'case_studies';
  info: {
    description: 'Portfolio case studies';
    displayName: 'Case Study';
    pluralName: 'case-studies';
    singularName: 'case-study';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    backgroundText: Schema.Attribute.String;
    client: Schema.Attribute.String;
    comingSoon: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.RichText;
    featured: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    featuredImage: Schema.Attribute.Media<'images' | 'videos'>;
    industry: Schema.Attribute.Enumeration<
      [
        'AI',
        'SaaS',
        'Fintech',
        'Healthcare',
        'Web3_Blockchain',
        'Media_Communication',
        'Other',
      ]
    > &
      Schema.Attribute.DefaultTo<'SaaS'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::case-study.case-study'
    > &
      Schema.Attribute.Private;
    mobileImage: Schema.Attribute.Media<'images'>;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    publishedAt: Schema.Attribute.DateTime;
    results: Schema.Attribute.Component<'shared.result', true>;
    seoDescription: Schema.Attribute.Text;
    seoTitle: Schema.Attribute.String;
    showInSlider: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    showInWorkGrid: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    sliderImage: Schema.Attribute.Media<'images'>;
    sliderMobileImage: Schema.Attribute.Media<'images'>;
    slug: Schema.Attribute.UID<'title'> & Schema.Attribute.Required;
    tagline: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiClientLogoClientLogo extends Struct.CollectionTypeSchema {
  collectionName: 'client_logos';
  info: {
    description: 'Client logos for marquee display';
    displayName: 'Client Logo';
    pluralName: 'client-logos';
    singularName: 'client-logo';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    featured: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::client-logo.client-logo'
    > &
      Schema.Attribute.Private;
    logo: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    website: Schema.Attribute.String;
  };
}

export interface ApiHomepageHomepage extends Struct.SingleTypeSchema {
  collectionName: 'homepages';
  info: {
    description: 'Homepage content for reloadux.com';
    displayName: 'Homepage';
    pluralName: 'homepages';
    singularName: 'homepage';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    aboutSectionLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'ABOUT US'>;
    aboutSectionTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Our work delivers results you can measure. The numbers below say it all.'>;
    blogSectionLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'LATEST ARTICLES'>;
    blogSectionTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'AI insights from our UX leaders.'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    ctaSectionButtonLink: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'/contact-us'>;
    ctaSectionButtonText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Contact Us'>;
    ctaSectionSubtitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Join our list of clients.'>;
    ctaSectionTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Ready to make your product experience AI-native?'>;
    heroCtaLink: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'/contact-us'>;
    heroCtaText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<"Let's talk">;
    heroImage: Schema.Attribute.Media<'images' | 'videos'>;
    heroSubtitle: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'We help B2B and SaaS companies design products that are intelligent, usable, and built for adoption.'>;
    heroTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'UX design agency for'>;
    heroTitleAccent: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'AI-native experiences'>;
    industriesSectionLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'DIVERSITY'>;
    industriesSectionTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'We design AI experiences for complex domains.'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::homepage.homepage'
    > &
      Schema.Attribute.Private;
    ourServices: Schema.Attribute.Component<'shared.service-link', true>;
    publishedAt: Schema.Attribute.DateTime;
    seoDescription: Schema.Attribute.Text;
    seoImage: Schema.Attribute.Media<'images'>;
    seoTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Expert UI UX Design and Development Services | reloadux'>;
    servicesSectionLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'OUR SERVICES'>;
    servicesSectionTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Start, improve, or scale an AI-native product experience.'>;
    stats: Schema.Attribute.Component<'shared.stat', true>;
    testimonialsSectionLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'WORDS OF OUR CLIENTS'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    workSectionLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'OUR WORK'>;
    workSectionTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<"From intelligent redesigns to AI-native products, we've got success stories showcasing our impact.">;
  };
}

export interface ApiIndustryIndustry extends Struct.CollectionTypeSchema {
  collectionName: 'industries';
  info: {
    description: 'Industry categories (AI, SaaS, Fintech, Healthcare)';
    displayName: 'Industry';
    pluralName: 'industries';
    singularName: 'industry';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    complianceNote: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    icon: Schema.Attribute.Media<'images'>;
    link: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::industry.industry'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    publishedAt: Schema.Attribute.DateTime;
    slug: Schema.Attribute.UID<'name'> & Schema.Attribute.Required;
    tagline: Schema.Attribute.Text;
    tags: Schema.Attribute.Text;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiMvpPageMvpPage extends Struct.SingleTypeSchema {
  collectionName: 'mvp_pages';
  info: {
    description: 'Design from Scratch \u2013 MVP service page content';
    displayName: 'MVP Page';
    pluralName: 'mvp-pages';
    singularName: 'mvp-page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    bottomCtaHref: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'#contact-form'>;
    bottomCtaText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Build my product'>;
    bottomCtaTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Transform your idea into a successful product.'>;
    caseStudiesDescription: Schema.Attribute.Text;
    caseStudiesHeading: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Transform your ideas & vision into reality'>;
    caseStudiesTag: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'WE HEAR YOU'>;
    caseStudyItems: Schema.Attribute.Component<
      'shared.mvp-case-study-item',
      true
    >;
    challengeCards: Schema.Attribute.Component<
      'shared.mvp-challenge-card',
      true
    >;
    challengesHeading: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'We know what frustrates you'>;
    challengesTag: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'CHALLENGES'>;
    clientLogos: Schema.Attribute.Component<'shared.client-logo-item', true>;
    contactEmail: Schema.Attribute.Email &
      Schema.Attribute.DefaultTo<'info@reloadux.com'>;
    contactPhone: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'(202) 978 3410'>;
    contactTeam: Schema.Attribute.Component<'shared.team-contact', true>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    deliverables: Schema.Attribute.Component<'shared.deliverable', true>;
    faqItems: Schema.Attribute.Component<'shared.faq', true>;
    faqsHeading: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Starting from scratch? Get your design questions answered'>;
    faqsTag: Schema.Attribute.String & Schema.Attribute.DefaultTo<'FAQS'>;
    heroCtaHref: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'#contact-form'>;
    heroCtaText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Build my product'>;
    heroTag: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'MVP DEVELOPMENT'>;
    heroTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Craft a winning product.'>;
    heroTitleAccent: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Your Idea, Our Expertise'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::mvp-page.mvp-page'
    > &
      Schema.Attribute.Private;
    midCtaHref: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'#contact-form'>;
    midCtaText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Build my product'>;
    midCtaTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Launch a winning product from the ground up.'>;
    nextSteps: Schema.Attribute.Component<'shared.next-step', true>;
    outcomeItems: Schema.Attribute.Component<'shared.outcome', true>;
    outcomesHeading: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Our solutions that bring visions to life.'>;
    outcomesTag: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'OUTCOMES'>;
    processHeading: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<"From concept to execution, we turn your ideas into reality with strategic planning and technical expertise, ensuring your product's success from the ground up">;
    processSteps: Schema.Attribute.Component<'shared.mvp-process-step', true>;
    processTag: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'HOW WE DO IT'>;
    publishedAt: Schema.Attribute.DateTime;
    seoDescription: Schema.Attribute.Text;
    seoTitle: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiServiceService extends Struct.CollectionTypeSchema {
  collectionName: 'services';
  info: {
    description: 'Service pages (UI/UX Design, Web Design, etc.)';
    displayName: 'Service';
    pluralName: 'services';
    singularName: 'service';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    category: Schema.Attribute.Enumeration<
      ['Services', 'Capabilities', 'Research', 'Design', 'Deliver']
    > &
      Schema.Attribute.DefaultTo<'Services'>;
    challenges: Schema.Attribute.Component<'shared.challenge', true>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    deliverables: Schema.Attribute.Component<'shared.deliverable', true>;
    faqs: Schema.Attribute.Component<'shared.faq', true>;
    featuredImage: Schema.Attribute.Media<'images'>;
    heroCtaLink: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'/contact-us'>;
    heroCtaText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Book a call'>;
    heroDescription: Schema.Attribute.Text;
    heroTitle: Schema.Attribute.Text;
    homepageCategory: Schema.Attribute.Enumeration<
      ['Main', 'Research', 'Design', 'Deliver']
    > &
      Schema.Attribute.DefaultTo<'Main'>;
    icon: Schema.Attribute.Media<'images'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::service.service'
    > &
      Schema.Attribute.Private;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    outcomes: Schema.Attribute.Component<'shared.outcome', true>;
    process: Schema.Attribute.Component<'shared.process-step', true>;
    publishedAt: Schema.Attribute.DateTime;
    seoDescription: Schema.Attribute.Text;
    seoTitle: Schema.Attribute.String;
    showInNavCapabilities: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    showInNavExpertise: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    showInNavServices: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    showOnHomepage: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    slug: Schema.Attribute.UID<'title'> & Schema.Attribute.Required;
    tagline: Schema.Attribute.String;
    targetAudience: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiSiteSettingSiteSetting extends Struct.SingleTypeSchema {
  collectionName: 'site_settings';
  info: {
    description: 'Global site settings (logo, contact, social links)';
    displayName: 'Site Settings';
    pluralName: 'site-settings';
    singularName: 'site-setting';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    address: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Freedom Drive 13th Floor\nReston, VA 20190'>;
    contactFormTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<"Let's talk about your product.">;
    contactNextSteps: Schema.Attribute.Component<'shared.outcome', true>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    defaultSeoDescription: Schema.Attribute.Text;
    defaultSeoImage: Schema.Attribute.Media<'images'>;
    defaultSeoTitle: Schema.Attribute.String;
    email: Schema.Attribute.Email &
      Schema.Attribute.DefaultTo<'info@reloadux.com'>;
    favicon: Schema.Attribute.Media<'images'>;
    footerCopyright: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'\u00A9 2026 Reloadux - all rights reserved'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::site-setting.site-setting'
    > &
      Schema.Attribute.Private;
    logo: Schema.Attribute.Media<'images'>;
    logoFooter: Schema.Attribute.Media<'images'>;
    phone: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'(202) 978 3410'>;
    publishedAt: Schema.Attribute.DateTime;
    siteName: Schema.Attribute.String & Schema.Attribute.DefaultTo<'reloadux'>;
    siteTagline: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'UX design agency for AI-native experiences'>;
    socialLinks: Schema.Attribute.Component<'shared.social-link', true>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiTeamExtensionPageTeamExtensionPage
  extends Struct.SingleTypeSchema {
  collectionName: 'team_extension_pages';
  info: {
    description: 'Team Extension service page content';
    displayName: 'Team Extension Page';
    pluralName: 'team-extension-pages';
    singularName: 'team-extension-page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    bottomCtaHref: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'#contact-form'>;
    bottomCtaText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Extend my team'>;
    bottomCtaTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Expand your team\u2019s capabilities with our design experts.'>;
    caseStudiesDescription: Schema.Attribute.Text;
    caseStudiesHeading: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Transform your team\u2019s gaps into strength'>;
    caseStudiesTag: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'WE HEAR YOU'>;
    caseStudyItems: Schema.Attribute.Component<
      'shared.mvp-case-study-item',
      true
    >;
    challengeCards: Schema.Attribute.Component<
      'shared.mvp-challenge-card',
      true
    >;
    challengesHeading: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'We know what frustrates you'>;
    challengesTag: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'CHALLENGES'>;
    clientLogos: Schema.Attribute.Component<'shared.client-logo-item', true>;
    contactEmail: Schema.Attribute.Email &
      Schema.Attribute.DefaultTo<'info@reloadux.com'>;
    contactPhone: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'(202) 978 3410'>;
    contactTeam: Schema.Attribute.Component<'shared.team-contact', true>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    deliverables: Schema.Attribute.Component<'shared.deliverable', true>;
    faqItems: Schema.Attribute.Component<'shared.faq', true>;
    faqsHeading: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Ready to extend your team? Get your design questions answered'>;
    faqsTag: Schema.Attribute.String & Schema.Attribute.DefaultTo<'FAQS'>;
    heroCtaHref: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'#contact-form'>;
    heroCtaText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Extend my team'>;
    heroTag: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'TEAM EXTENSION'>;
    heroTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Empower your design vision'>;
    heroTitleAccent: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'with our Expert Team'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::team-extension-page.team-extension-page'
    > &
      Schema.Attribute.Private;
    midCtaHref: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'#contact-form'>;
    midCtaText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Extend my team'>;
    midCtaTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Outpace the competition with expert design support.'>;
    nextSteps: Schema.Attribute.Component<'shared.next-step', true>;
    outcomeItems: Schema.Attribute.Component<'shared.outcome', true>;
    outcomesHeading: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Our extension outcomes that drive excellence.'>;
    outcomesTag: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'OUTCOMES'>;
    processHeading: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Whether you need to fill skill gaps or expand your team, we provide expert talent to uplift your product and ensure timely delivery with our extension service'>;
    processSteps: Schema.Attribute.Component<'shared.mvp-process-step', true>;
    processTag: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'HOW WE DO IT'>;
    publishedAt: Schema.Attribute.DateTime;
    seoDescription: Schema.Attribute.Text;
    seoTitle: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiTeamMemberTeamMember extends Struct.CollectionTypeSchema {
  collectionName: 'team_members';
  info: {
    description: 'Team members for contact and about pages';
    displayName: 'Team Member';
    pluralName: 'team-members';
    singularName: 'team-member';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    bio: Schema.Attribute.Text;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email: Schema.Attribute.Email;
    linkedin: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::team-member.team-member'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    phone: Schema.Attribute.String;
    photo: Schema.Attribute.Media<'images'>;
    publishedAt: Schema.Attribute.DateTime;
    role: Schema.Attribute.String;
    showInAbout: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    showInContact: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    slug: Schema.Attribute.UID<'name'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiTestimonialTestimonial extends Struct.CollectionTypeSchema {
  collectionName: 'testimonials';
  info: {
    description: 'Client testimonials';
    displayName: 'Testimonial';
    pluralName: 'testimonials';
    singularName: 'testimonial';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    authorCompany: Schema.Attribute.String;
    authorName: Schema.Attribute.String & Schema.Attribute.Required;
    authorPhoto: Schema.Attribute.Media<'images'>;
    authorRole: Schema.Attribute.String;
    companyLogo: Schema.Attribute.Media<'images'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    featured: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::testimonial.testimonial'
    > &
      Schema.Attribute.Private;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    publishedAt: Schema.Attribute.DateTime;
    quote: Schema.Attribute.Text & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiUxAuditPageUxAuditPage extends Struct.SingleTypeSchema {
  collectionName: 'ux_audit_pages';
  info: {
    description: 'UX Audit & AI Readiness service page content';
    displayName: 'UX Audit Page';
    pluralName: 'ux-audit-pages';
    singularName: 'ux-audit-page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    auditWorkCaseStudies: Schema.Attribute.JSON;
    auditWorkHeading: Schema.Attribute.Text;
    auditWorkStats: Schema.Attribute.JSON;
    auditWorkTag: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'OUR UX AUDIT WORK'>;
    bottomCtaHref: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'#contact-form'>;
    bottomCtaSubtitle: Schema.Attribute.Text;
    bottomCtaText: Schema.Attribute.String;
    bottomCtaTitle: Schema.Attribute.Text;
    challengeCards: Schema.Attribute.JSON;
    challengesDescription: Schema.Attribute.Text;
    challengesHeading: Schema.Attribute.Text;
    challengesTag: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'CHALLENGES'>;
    contactEmail: Schema.Attribute.Email &
      Schema.Attribute.DefaultTo<'info@reloadux.com'>;
    contactPhone: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'(202) 978 3410'>;
    contactTeam: Schema.Attribute.JSON;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    deliverables: Schema.Attribute.JSON;
    faqItems: Schema.Attribute.JSON;
    faqsHeading: Schema.Attribute.Text;
    faqsTag: Schema.Attribute.String & Schema.Attribute.DefaultTo<'FAQS'>;
    heroCtaHref: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'#contact-form'>;
    heroCtaText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Audit My Product'>;
    heroTag: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'UX AUDIT + AI READINESS'>;
    heroTitle: Schema.Attribute.Text & Schema.Attribute.Required;
    keyDeliverablesHeading: Schema.Attribute.String;
    keyDeliverablesItems: Schema.Attribute.JSON;
    keyDeliverablesTag: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'KEY Deliverables'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::ux-audit-page.ux-audit-page'
    > &
      Schema.Attribute.Private;
    midCtaHref: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'#contact-form'>;
    midCtaText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Audit My Product'>;
    midCtaTitle: Schema.Attribute.Text;
    nextSteps: Schema.Attribute.JSON;
    pricingCtaHref: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'#contact-form'>;
    pricingCtaText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Get Started'>;
    pricingDescription: Schema.Attribute.Text;
    pricingFeatures: Schema.Attribute.JSON;
    pricingPlanName: Schema.Attribute.String;
    pricingPrice: Schema.Attribute.String;
    pricingPricePer: Schema.Attribute.String;
    pricingTag: Schema.Attribute.String & Schema.Attribute.DefaultTo<'PRICING'>;
    processHeading: Schema.Attribute.Text;
    processSteps: Schema.Attribute.JSON;
    processTag: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'HOW IT WORKS'>;
    publishedAt: Schema.Attribute.DateTime;
    seoDescription: Schema.Attribute.Text;
    seoTitle: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    whatHappensAfterHeading: Schema.Attribute.String;
    whatHappensAfterPaths: Schema.Attribute.JSON;
    whatHappensAfterTag: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'WHAT HAPPENS AFTER'>;
    whenToDoItHeading: Schema.Attribute.Text;
    whenToDoItItems: Schema.Attribute.JSON;
    whenToDoItTag: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'WHEN TO DO IT'>;
  };
}

export interface ApiUxRedesignPageUxRedesignPage
  extends Struct.SingleTypeSchema {
  collectionName: 'ux_redesign_pages';
  info: {
    description: 'AI-Ready UX Redesign service page content';
    displayName: 'UX Redesign Page';
    pluralName: 'ux-redesign-pages';
    singularName: 'ux-redesign-page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    approachDescription: Schema.Attribute.Text;
    approachHeading: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'How we think about'>;
    approachHeadingItalic: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'AI-ready UX redesign'>;
    approachTag: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'AI-READY UX REDESIGN'>;
    caseStudyCtaHref: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'/case-studies/'>;
    caseStudyCtaText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Explore More Cases'>;
    caseStudyItems: Schema.Attribute.Component<'shared.case-study-video', true>;
    challengeCards: Schema.Attribute.Component<'shared.challenge-card', true>;
    challengesDescription: Schema.Attribute.Text;
    challengesHeading: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'You want AI in your product. Your users already expect it.'>;
    challengesTag: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'CHALLENGES'>;
    clientLogos: Schema.Attribute.Text & Schema.Attribute.DefaultTo<''>;
    contactEmail: Schema.Attribute.Email &
      Schema.Attribute.DefaultTo<'info@reloadux.com'>;
    contactPhone: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'(202) 978 3410'>;
    contactTeam: Schema.Attribute.Component<'shared.team-contact', true>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    faqItems: Schema.Attribute.Component<'shared.faq', true>;
    faqsHeading: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Reimagine your product experience with our AI-native redesign services.'>;
    faqsTag: Schema.Attribute.String & Schema.Attribute.DefaultTo<'FAQS'>;
    heroCtaHref: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'/contact-us/'>;
    heroCtaText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Get Started'>;
    heroSubtitle: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<"If you're planning to integrate AI into your existing product experience, you're in the right place.">;
    heroTag: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'UX REDESIGN'>;
    heroTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'AI-Ready UX Redesign for B2B & SaaS Products'>;
    howWeWorkSubtitle: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'A 5-stage process from product insight to an AI-native experience users love.'>;
    howWeWorkTag: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'HOW WE WORK'>;
    idealClientCards: Schema.Attribute.Component<
      'shared.ideal-client-card',
      true
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::ux-redesign-page.ux-redesign-page'
    > &
      Schema.Attribute.Private;
    midCtaHref: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'/contact-us/'>;
    midCtaSubtitle: Schema.Attribute.Text;
    midCtaText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Book a Call'>;
    midCtaTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Ready to build an AI-native user experience?'>;
    nextSteps: Schema.Attribute.Component<'shared.next-step', true>;
    principles: Schema.Attribute.Component<'shared.principle', true>;
    publishedAt: Schema.Attribute.DateTime;
    seoDescription: Schema.Attribute.Text;
    seoTitle: Schema.Attribute.String;
    sprintCtaHref: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'/contact-us/'>;
    sprintCtaText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Start a 3 Day Trial'>;
    sprintDescription: Schema.Attribute.Text;
    sprintHeading: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Still figuring out where AI fits?'>;
    sprintSteps: Schema.Attribute.Component<'shared.sprint-step', true>;
    sprintSubheading: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<"We'll show you in 3 days.">;
    stages: Schema.Attribute.Component<'shared.process-stage', true>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    valueProps: Schema.Attribute.Component<'shared.value-prop', true>;
    whoThisIsForHeading: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'We work with companies who have'>;
    whoThisIsForTag: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'WHO THIS IS FOR'>;
    whyUsHeading: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Why teams choose reloadux'>;
    whyUsTag: Schema.Attribute.String & Schema.Attribute.DefaultTo<'WHY US'>;
  };
}

export interface PluginContentReleasesRelease
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_releases';
  info: {
    displayName: 'Release';
    pluralName: 'releases';
    singularName: 'release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    actions: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    releasedAt: Schema.Attribute.DateTime;
    scheduledAt: Schema.Attribute.DateTime;
    status: Schema.Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Schema.Attribute.Required;
    timezone: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_release_actions';
  info: {
    displayName: 'Release Action';
    pluralName: 'release-actions';
    singularName: 'release-action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    contentType: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    entryDocumentId: Schema.Attribute.String;
    isEntryValid: Schema.Attribute.Boolean;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release-action'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    release: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::content-releases.release'
    >;
    type: Schema.Attribute.Enumeration<['publish', 'unpublish']> &
      Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginI18NLocale extends Struct.CollectionTypeSchema {
  collectionName: 'i18n_locale';
  info: {
    collectionName: 'locales';
    description: '';
    displayName: 'Locale';
    pluralName: 'locales';
    singularName: 'locale';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    code: Schema.Attribute.String & Schema.Attribute.Unique;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::i18n.locale'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.SetMinMax<
        {
          max: 50;
          min: 1;
        },
        number
      >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginReviewWorkflowsWorkflow
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_workflows';
  info: {
    description: '';
    displayName: 'Workflow';
    name: 'Workflow';
    pluralName: 'workflows';
    singularName: 'workflow';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    contentTypes: Schema.Attribute.JSON &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'[]'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    stageRequiredToPublish: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::review-workflows.workflow-stage'
    >;
    stages: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow-stage'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginReviewWorkflowsWorkflowStage
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_workflows_stages';
  info: {
    description: '';
    displayName: 'Stages';
    name: 'Workflow Stage';
    pluralName: 'workflow-stages';
    singularName: 'workflow-stage';
  };
  options: {
    draftAndPublish: false;
    version: '1.1.0';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    color: Schema.Attribute.String & Schema.Attribute.DefaultTo<'#4945FF'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow-stage'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    permissions: Schema.Attribute.Relation<'manyToMany', 'admin::permission'>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    workflow: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::review-workflows.workflow'
    >;
  };
}

export interface PluginUploadFile extends Struct.CollectionTypeSchema {
  collectionName: 'files';
  info: {
    description: '';
    displayName: 'File';
    pluralName: 'files';
    singularName: 'file';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    alternativeText: Schema.Attribute.Text;
    caption: Schema.Attribute.Text;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    ext: Schema.Attribute.String;
    focalPoint: Schema.Attribute.JSON;
    folder: Schema.Attribute.Relation<'manyToOne', 'plugin::upload.folder'> &
      Schema.Attribute.Private;
    folderPath: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    formats: Schema.Attribute.JSON;
    hash: Schema.Attribute.String & Schema.Attribute.Required;
    height: Schema.Attribute.Integer;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::upload.file'
    > &
      Schema.Attribute.Private;
    mime: Schema.Attribute.String & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    previewUrl: Schema.Attribute.Text;
    provider: Schema.Attribute.String & Schema.Attribute.Required;
    provider_metadata: Schema.Attribute.JSON;
    publishedAt: Schema.Attribute.DateTime;
    related: Schema.Attribute.Relation<'morphToMany'>;
    size: Schema.Attribute.Decimal & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    url: Schema.Attribute.Text & Schema.Attribute.Required;
    width: Schema.Attribute.Integer;
  };
}

export interface PluginUploadFolder extends Struct.CollectionTypeSchema {
  collectionName: 'upload_folders';
  info: {
    displayName: 'Folder';
    pluralName: 'folders';
    singularName: 'folder';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    children: Schema.Attribute.Relation<'oneToMany', 'plugin::upload.folder'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    files: Schema.Attribute.Relation<'oneToMany', 'plugin::upload.file'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::upload.folder'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    parent: Schema.Attribute.Relation<'manyToOne', 'plugin::upload.folder'>;
    path: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    pathId: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_permissions';
  info: {
    description: '';
    displayName: 'Permission';
    name: 'permission';
    pluralName: 'permissions';
    singularName: 'permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    role: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_roles';
  info: {
    description: '';
    displayName: 'Role';
    name: 'role';
    pluralName: 'roles';
    singularName: 'role';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.role'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    type: Schema.Attribute.String & Schema.Attribute.Unique;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    users: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.user'
    >;
  };
}

export interface PluginUsersPermissionsUser
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_users';
  info: {
    description: '';
    displayName: 'User';
    name: 'user';
    pluralName: 'users';
    singularName: 'user';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    blocked: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    confirmationToken: Schema.Attribute.String & Schema.Attribute.Private;
    confirmed: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email: Schema.Attribute.Email &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.user'
    > &
      Schema.Attribute.Private;
    password: Schema.Attribute.Password &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    resetPasswordToken: Schema.Attribute.String & Schema.Attribute.Private;
    role: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    username: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ContentTypeSchemas {
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::permission': AdminPermission;
      'admin::role': AdminRole;
      'admin::session': AdminSession;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'admin::user': AdminUser;
      'api::blog-post.blog-post': ApiBlogPostBlogPost;
      'api::case-study.case-study': ApiCaseStudyCaseStudy;
      'api::client-logo.client-logo': ApiClientLogoClientLogo;
      'api::homepage.homepage': ApiHomepageHomepage;
      'api::industry.industry': ApiIndustryIndustry;
      'api::mvp-page.mvp-page': ApiMvpPageMvpPage;
      'api::service.service': ApiServiceService;
      'api::site-setting.site-setting': ApiSiteSettingSiteSetting;
      'api::team-extension-page.team-extension-page': ApiTeamExtensionPageTeamExtensionPage;
      'api::team-member.team-member': ApiTeamMemberTeamMember;
      'api::testimonial.testimonial': ApiTestimonialTestimonial;
      'api::ux-audit-page.ux-audit-page': ApiUxAuditPageUxAuditPage;
      'api::ux-redesign-page.ux-redesign-page': ApiUxRedesignPageUxRedesignPage;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::review-workflows.workflow': PluginReviewWorkflowsWorkflow;
      'plugin::review-workflows.workflow-stage': PluginReviewWorkflowsWorkflowStage;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
    }
  }
}
