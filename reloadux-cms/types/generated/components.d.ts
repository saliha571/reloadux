import type { Schema, Struct } from '@strapi/strapi';

export interface SharedChallenge extends Struct.ComponentSchema {
  collectionName: 'components_shared_challenges';
  info: {
    description: 'Challenge/pain point for service pages';
    displayName: 'Challenge';
    icon: 'exclamation';
  };
  attributes: {
    icon: Schema.Attribute.String;
    label: Schema.Attribute.String;
    question: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedDeliverable extends Struct.ComponentSchema {
  collectionName: 'components_shared_deliverables';
  info: {
    description: 'Deliverable item';
    displayName: 'Deliverable';
    icon: 'check';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedFaq extends Struct.ComponentSchema {
  collectionName: 'components_shared_faqs';
  info: {
    description: 'Frequently asked question';
    displayName: 'FAQ';
    icon: 'question';
  };
  attributes: {
    answer: Schema.Attribute.RichText & Schema.Attribute.Required;
    question: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface SharedOutcome extends Struct.ComponentSchema {
  collectionName: 'components_shared_outcomes';
  info: {
    description: 'Outcome/benefit item';
    displayName: 'Outcome';
    icon: 'star';
  };
  attributes: {
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedPhase extends Struct.ComponentSchema {
  collectionName: 'components_shared_phases';
  info: {
    description: 'Phase within a process step';
    displayName: 'Phase';
    icon: 'list';
  };
  attributes: {
    items: Schema.Attribute.Text;
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedProcessStep extends Struct.ComponentSchema {
  collectionName: 'components_shared_process_steps';
  info: {
    description: 'Process step (Discover, Define, Design, Deliver)';
    displayName: 'Process Step';
    icon: 'arrowRight';
  };
  attributes: {
    number: Schema.Attribute.String;
    phases: Schema.Attribute.Component<'shared.phase', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedResult extends Struct.ComponentSchema {
  collectionName: 'components_shared_results';
  info: {
    description: 'Result/metric for case studies (e.g., $5M funding, 300% growth)';
    displayName: 'Result';
    icon: 'trophy';
  };
  attributes: {
    description: Schema.Attribute.String;
    metric: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedServiceLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_service_links';
  info: {
    description: 'Link to a service page';
    displayName: 'Service Link';
    icon: 'link';
  };
  attributes: {
    isNew: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    link: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_social_links';
  info: {
    description: 'Social media link';
    displayName: 'Social Link';
    icon: 'link';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images'>;
    platform: Schema.Attribute.Enumeration<
      [
        'LinkedIn',
        'Twitter',
        'Instagram',
        'Dribbble',
        'Behance',
        'Facebook',
        'YouTube',
      ]
    > &
      Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedStat extends Struct.ComponentSchema {
  collectionName: 'components_shared_stats';
  info: {
    description: 'Statistics display (e.g., 5x engagement, +61% activation)';
    displayName: 'Stat';
    icon: 'chartLine';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    prefix: Schema.Attribute.String;
    suffix: Schema.Attribute.String;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.challenge': SharedChallenge;
      'shared.deliverable': SharedDeliverable;
      'shared.faq': SharedFaq;
      'shared.outcome': SharedOutcome;
      'shared.phase': SharedPhase;
      'shared.process-step': SharedProcessStep;
      'shared.result': SharedResult;
      'shared.service-link': SharedServiceLink;
      'shared.social-link': SharedSocialLink;
      'shared.stat': SharedStat;
    }
  }
}
