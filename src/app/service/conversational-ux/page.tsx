import type { Metadata } from "next";
import { getConversationalUXPage } from "@/lib/content";
import { ConversationalUXPageClient } from "./ConversationalUXPageClient";

export const metadata: Metadata = {
  title:
    "Conversational UX Design | Chatbot & Voice Interface Design | reloadux",
  description:
    "Shift from static interfaces to GenAI-driven experiences. We design human-like chat and voice experiences for your digital products.",
};

export default async function ConversationalUXPage() {
  const data = await getConversationalUXPage();
  return <ConversationalUXPageClient data={data} />;
}
