import { Black_Han_Sans } from 'next/font/google'
import StreamerGrid from "./components/StreamerGrid";
import { getStreamers } from "@/lib/db/getData";

const blackHanSans = Black_Han_Sans({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-black-han-sans',
})

export default async function StreamerPage() {

  const streamers = getStreamers();
  return (
    <div>
      <div className={`flex flex-col items-center gap-4 py-8`}>
        <h1 className={`text-2xl md:text-3xl lg:text-4xl ${blackHanSans.className}`}>
          월드 오브 워크래프트 <span className="text-yellow-500">스트리머</span>
        </h1>
      </div>
      <StreamerGrid streamers={streamers} />
    </div>
  );
}