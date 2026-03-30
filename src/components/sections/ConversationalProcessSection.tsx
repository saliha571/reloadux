"use client";
import { MVPProcessSection } from "@/components/sections/MVPProcessSection";

export interface ProcessItem {
  bold: string;
  text: string;
}

export interface ProcessStep {
  counter: string;
  title: string;
  intro: string;
  listHeading: string;
  items: ProcessItem[];
}

export interface ConversationalProcessSectionProps {
  tag: string;
  heading: string;
  steps: ProcessStep[];
  deliverablesTag: string;
  deliverables: string[];
}

export function ConversationalProcessSection({
  tag,
  heading,
  steps,
  deliverables,
}: ConversationalProcessSectionProps) {
  // MVPProcessSection expects steps in a flattened format.
  // We include list items using "•" markers so the accordion body stays visually consistent.
  const mappedSteps = steps.map((step) => ({
    counter: step.counter,
    title: step.title,
    content: [
      step.intro,
      step.listHeading,
      ...step.items.map((item) => `• ${item.bold} - ${item.text}`),
    ].join(" "),
  }));

  return (
    <MVPProcessSection tag={tag} heading={heading} steps={mappedSteps} deliverables={deliverables} />
  );
}
