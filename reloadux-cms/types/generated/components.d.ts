import type { Schema, Struct } from '@strapi/strapi';

export interface SharedAuditCaseStudy extends Struct.ComponentSchema {
  collectionName: 'components_shared_audit_case_studies';
  info: {
    displayName: 'Audit Case Study';
    icon: 'picture';
  };
  attributes: {
    comingSoon: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    href: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    slides: Schema.Attribute.Component<'shared.case-study-slide', true>;
  };
}

export interface SharedCaseStudySlide extends Struct.ComponentSchema {
  collectionName: 'components_shared_case_study_slides';
  info: {
    description: 'Slide item (image or video) for case study carousel';
    displayName: 'Case Study Slide';
    icon: 'picture';
  };
  attributes: {
    src: Schema.Attribute.String & Schema.Attribute.Required;
    type: Schema.Attribute.Enumeration<['video', 'image']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'image'>;
  };
}

export interface SharedCaseStudyVideo extends Struct.ComponentSchema {
  collectionName: 'components_shared_case_study_videos';
  info: {
    description: 'Case study carousel item with tag, description, and slides';
    displayName: 'Case Study Video';
    icon: 'play';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    image: Schema.Attribute.String;
    slides: Schema.Attribute.Component<'shared.case-study-slide', true>;
    tag: Schema.Attribute.String & Schema.Attribute.Required;
    videoUrl: Schema.Attribute.String;
  };
}

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

export interface SharedChallengeCard extends Struct.ComponentSchema {
  collectionName: 'components_shared_challenge_cards';
  info: {
    description: 'Challenge card with tag and description';
    displayName: 'Challenge Card';
    icon: 'exclamation';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    tag: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedClientLogoItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_client_logo_items';
  info: {
    description: 'Client logo with src path, alt text and display width';
    displayName: 'Client Logo Item';
    icon: 'landscape';
  };
  attributes: {
    alt: Schema.Attribute.String & Schema.Attribute.Required;
    src: Schema.Attribute.String & Schema.Attribute.Required;
    width: Schema.Attribute.Integer & Schema.Attribute.Required;
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

export interface SharedIdealClientCard extends Struct.ComponentSchema {
  collectionName: 'components_shared_ideal_client_cards';
  info: {
    description: 'Who This Is For card with title and description';
    displayName: 'Ideal Client Card';
    icon: 'user';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedMvpCaseStudyItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_mvp_case_study_items';
  info: {
    description: 'Case study item for the MVP page with desktop and mobile images';
    displayName: 'MVP Case Study Item';
    icon: 'folder';
  };
  attributes: {
    comingSoon: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    desktopImage: Schema.Attribute.String & Schema.Attribute.Required;
    href: Schema.Attribute.String & Schema.Attribute.Required;
    mobileImage: Schema.Attribute.String & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedMvpChallengeCard extends Struct.ComponentSchema {
  collectionName: 'components_shared_mvp_challenge_cards';
  info: {
    description: 'Social-style challenge card with avatar, name and message';
    displayName: 'MVP Challenge Card';
    icon: 'message';
  };
  attributes: {
    actorImage: Schema.Attribute.String & Schema.Attribute.Required;
    actorName: Schema.Attribute.String & Schema.Attribute.Required;
    content: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface SharedMvpProcessStep extends Struct.ComponentSchema {
  collectionName: 'components_shared_mvp_process_steps';
  info: {
    description: 'Accordion step for the MVP How We Do It section';
    displayName: 'MVP Process Step';
    icon: 'arrowRight';
  };
  attributes: {
    content: Schema.Attribute.Text & Schema.Attribute.Required;
    counter: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedNextStep extends Struct.ComponentSchema {
  collectionName: 'components_shared_next_steps';
  info: {
    description: 'Next steps item with number and text';
    displayName: 'Next Step';
    icon: 'arrowRight';
  };
  attributes: {
    number: Schema.Attribute.String & Schema.Attribute.Required;
    text: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface SharedOtherService extends Struct.ComponentSchema {
  collectionName: 'components_shared_other_services';
  info: {
    displayName: 'Other Service';
    icon: 'apps';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    href: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
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

export interface SharedPrinciple extends Struct.ComponentSchema {
  collectionName: 'components_shared_principles';
  info: {
    description: 'Approach principle with number, title, description, and optional gif';
    displayName: 'Principle';
    icon: 'lightbulb';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    gif: Schema.Attribute.String;
    number: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedProcessStage extends Struct.ComponentSchema {
  collectionName: 'components_shared_process_stages';
  info: {
    description: 'How We Work process stage with deliverables';
    displayName: 'Process Stage';
    icon: 'arrowRight';
  };
  attributes: {
    counter: Schema.Attribute.String & Schema.Attribute.Required;
    deliverables: Schema.Attribute.Text;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    href: Schema.Attribute.String;
    note: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
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

export interface SharedSimpleStat extends Struct.ComponentSchema {
  collectionName: 'components_shared_simple_stats';
  info: {
    displayName: 'Simple Stat';
    icon: 'chartCircle';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
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

export interface SharedSprintStep extends Struct.ComponentSchema {
  collectionName: 'components_shared_sprint_steps';
  info: {
    description: 'Sprint CTA step with number and text';
    displayName: 'Sprint Step';
    icon: 'list';
  };
  attributes: {
    number: Schema.Attribute.String & Schema.Attribute.Required;
    text: Schema.Attribute.Text & Schema.Attribute.Required;
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

export interface SharedTeamContact extends Struct.ComponentSchema {
  collectionName: 'components_shared_team_contacts';
  info: {
    description: 'Team member contact info';
    displayName: 'Team Contact';
    icon: 'user';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    linkedin: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    role: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedTimelinePhase extends Struct.ComponentSchema {
  collectionName: 'components_shared_timeline_phases';
  info: {
    displayName: 'Timeline Phase';
    icon: 'clock';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedValueProp extends Struct.ComponentSchema {
  collectionName: 'components_shared_value_props';
  info: {
    description: 'Why Us value proposition card';
    displayName: 'Value Prop';
    icon: 'star';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.audit-case-study': SharedAuditCaseStudy;
      'shared.case-study-slide': SharedCaseStudySlide;
      'shared.case-study-video': SharedCaseStudyVideo;
      'shared.challenge': SharedChallenge;
      'shared.challenge-card': SharedChallengeCard;
      'shared.client-logo-item': SharedClientLogoItem;
      'shared.deliverable': SharedDeliverable;
      'shared.faq': SharedFaq;
      'shared.ideal-client-card': SharedIdealClientCard;
      'shared.mvp-case-study-item': SharedMvpCaseStudyItem;
      'shared.mvp-challenge-card': SharedMvpChallengeCard;
      'shared.mvp-process-step': SharedMvpProcessStep;
      'shared.next-step': SharedNextStep;
      'shared.other-service': SharedOtherService;
      'shared.outcome': SharedOutcome;
      'shared.phase': SharedPhase;
      'shared.principle': SharedPrinciple;
      'shared.process-stage': SharedProcessStage;
      'shared.process-step': SharedProcessStep;
      'shared.result': SharedResult;
      'shared.service-link': SharedServiceLink;
      'shared.simple-stat': SharedSimpleStat;
      'shared.social-link': SharedSocialLink;
      'shared.sprint-step': SharedSprintStep;
      'shared.stat': SharedStat;
      'shared.team-contact': SharedTeamContact;
      'shared.timeline-phase': SharedTimelinePhase;
      'shared.value-prop': SharedValueProp;
    }
  }
}
