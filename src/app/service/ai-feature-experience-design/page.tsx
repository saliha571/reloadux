import type { Metadata } from "next";
import { AIFeatureExperienceDesignPageClient } from "./AIFeatureExperienceDesignPageClient";

export const metadata: Metadata = {
  title: "AI Feature Experience Design for B2B SaaS | reloadux",
  description:
    "Your AI roadmap is clear. We'll design the experience your users will actually adopt.",
};

export default function AIFeatureExperienceDesignPage() {
  return <AIFeatureExperienceDesignPageClient />;
}
