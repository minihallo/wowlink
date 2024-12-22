import { getWoWToken } from "@/lib/api/blizzard";
import Image from "next/image";
import { Black_Han_Sans } from 'next/font/google'
import Link from 'next/link';

const blackHanSans = Black_Han_Sans({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-black-han-sans',
})

export default async function TokenPage() {
  const tokenPrice = await getWoWToken();

  return (
    <div className={`flex flex-col items-center gap-4 py-8`}>
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
  );
}