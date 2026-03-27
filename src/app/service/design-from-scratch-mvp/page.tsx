import type { Metadata } from "next";
import { getMVPPage } from "@/lib/content";
import { MVPPageClient } from "./MVPPageClient";

export const metadata: Metadata = {
  title: "Design from Scratch – MVP Development | reloadux",
  description:
    "From concept to execution, we turn your ideas into reality with strategic planning and technical expertise, ensuring your product's success from the ground up.",
};

export default async function MVPPage() {
  const data = await getMVPPage();
  return <MVPPageClient data={data} />;
}
