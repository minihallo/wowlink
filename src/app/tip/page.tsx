import { getWoWToken } from "@/lib/api/blizzard";
import Image from "next/image";
import { Black_Han_Sans } from 'next/font/google'
import Link from 'next/link';

const blackHanSans = Black_Han_Sans({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-black-han-sans',
})

export default async function TipPage() {

  return (
    <div className={`flex flex-col items-center gap-4 py-8`}>
      <h1 className={`text-2xl md:text-3xl lg:text-4xl ${blackHanSans.className}`}>
        월드 오브 워크래프트 <span className="text-yellow-500">꿀팁</span>
      </h1>
    </div>
  );
}