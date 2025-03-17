import { getWoWToken as getCurrentToken } from "@/lib/api/blizzard";
import Image from "next/image";
import { Black_Han_Sans } from 'next/font/google'
import { Metadata } from 'next'
import TokenChart from "./components/TokenChart";
import { getTokens } from "@/lib/db/getData";

export const metadata: Metadata = {
  title: 'WowLink | 토큰',
  description: 'WowLink'
}

const blackHanSans = Black_Han_Sans({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-black-han-sans',
})

export const revalidate = 3600; // 1시간마다 페이지 재생성

export default async function TokenPage() {
  const tokenPrice = await getCurrentToken();
  const data = await getTokens();
  
  return (
    <div>
      <div className={`flex flex-col items-center gap-4 py-8`}>
        {/* <div className={`flex flex-col items-center gap-4 py-8`}> */}
        <div className="w-16 h-16 relative">
          <Image
            src="/images/assets/wowtoken.png"
            alt="WoW 토큰"
            width={64}
            height={64}
            className="object-contain"
          />
        </div>
        <h1 className={`text-2xl md:text-3xl lg:text-4xl ${blackHanSans.className}`}>
          현재 <span className="text-yellow-500">WoW 토큰</span> 시세
        </h1>
        <p className="text-xl">{tokenPrice.toLocaleString()} 골드</p>
      </div>
      <div className="w-full max-w-[1200px] h-[400px]">
        <TokenChart data={data}/>
      </div>
    </div>
  );
}