import { Black_Han_Sans } from 'next/font/google'
import StreamerGrid from "./components/StreamersGrid";
import { getStreamers } from "@/lib/db/getData";
import { Metadata } from 'next'
import getTwitchStreamers from '@/lib/api/twitch/getStreamers';
import getChzzkStreamers from '@/lib/api/chzzk/getStreamers';

export const metadata: Metadata = {
  title: 'WowLink | 스트리머',
  description: 'WowLink'
}

const blackHanSans = Black_Han_Sans({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-black-han-sans',
})

export default async function StreamerPage() {
  let streamers = await getChzzkStreamers();
  // const streamers = await getTwitchStreamers();

  return (
    <div>
      {/* <div className={`flex flex-col items-center gap-4 py-8`}>
        <h1 className={`text-2xl md:text-3xl lg:text-4xl ${blackHanSans.className}`}>ㄹㄹ
          월드 오브 워크래프트 <span className="text-yellow-500">스트리머</span>
        </h1>
      </div>
      <StreamerGrid 
        streamers={streamers!}
        twitchClientId={process.env.TWITCH_CLIENT_ID!}
        twitchClientSecret={process.env.TWITCH_CLIENT_SECRET!}
        chzzkAuth={process.env.NID_AUT!}
        chzzkSession={process.env.NID_SES!}
      /> */}
    </div>
  );
}