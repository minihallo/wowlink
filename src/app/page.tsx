import { getSites } from "@/lib/db/getData";
import { Site } from "@/types/site";
import FilteredSites from "./quickLink/components/FilteredSites";
import { Black_Han_Sans } from 'next/font/google'

const blackHanSans = Black_Han_Sans({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-black-han-sans',
})

export default async function Home() {
  const sites: Site[] = await getSites();

  return (
    <div>
      <h1 className={`text-2xl text-center my-8 md:text-3xl lg:text-4xl ${blackHanSans.className}`}>
        한국 와우저를 위한{" "}
        <span className="text-yellow-500">
          WoWLink
        </span>
      </h1>
      <FilteredSites initialSites={sites} />
    </div>
  );
}