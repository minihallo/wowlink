import { getSites } from "@/lib/db/getSites";
import { Site } from "@/types/site";
import FilteredSites from "./q/page";

export default async function Home() {
  const sites: Site[] = await getSites();

  return <FilteredSites initialSites={sites} />;
}
