import { getHomePage } from "@/lib/content";
import { HomePageClient } from "./HomePageClient";

export default async function HomePage() {
  const data = await getHomePage();

  return <HomePageClient data={data} />;
}
