import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { getDiscords } from "@/lib/db/getData";
import { Black_Han_Sans } from 'next/font/google'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'WowLink | 디스코드',
  description: 'WowLink'
}

const blackHanSans = Black_Han_Sans({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-black-han-sans',
})


export default async function DiscordPage() {
 const discords: Discord[] = await getDiscords();

 return (
  <div>
    <div className="text-center space-y-4 my-8">
      <h1 className={`text-2xl md:text-3xl lg:text-4xl ${blackHanSans.className}`}>
        <span className="text-yellow-500">
          디스코드 채널
        </span>
      </h1>
      <p className="text-lg text-muted-foreground md:text-xl">
        직업별 가장 규모가 큰 디스코드 채널을 제공하고 있습니다.
      </p>
      <p className="text-sm text-muted-foreground">
        추가되었으면 하는 링크가 있으신가요? 
        <Link 
          href="https://tally.so/r/3jG8z4" 
          className="text-primary hover:underline ml-1"
          target="_blank"
        >
          여기를 클릭해주세요
        </Link>
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
      {discords.map((discord, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="w-12 h-12 relative flex-shrink-0">
              <Image
                src={discord.icon}
                alt={`${discord.class} 아이콘`}
                fill
                className="object-contain"
              />
            </div>
            <div className="flex-1">
              <CardTitle>{discord.name}</CardTitle>
              <CardDescription className="h-9">{discord.description}</CardDescription>
            </div>
          </CardHeader>
          <CardFooter className="mt-auto">
            <Link 
              href={discord.url}
              className="w-full bg-[#5865F2] text-white hover:bg-[#4752C4] h-10 px-4 py-2 rounded-md text-center flex items-center justify-center gap-2"
              target="_blank"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12z"/>
              </svg>
              디스코드 참여하기
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  </div>
 );
}

// types/discord.ts
export interface Discord {
 id: number;
 class: string;
 name: string;
 description: string;
 icon: string;
 url: string;
}