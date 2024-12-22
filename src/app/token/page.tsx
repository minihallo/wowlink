import { getWoWToken } from "@/lib/api/blizzard";
import Image from "next/image";

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
      <h1 className="text-2xl font-bold">현재 WoW 토큰 시세</h1>
      <p className="text-xl">{tokenPrice.toLocaleString()} 골드</p>
    </div>
  );
}