import FilteredSites from './components/FilteredSites';
import { getSites } from '@/lib/db/getData';
import { Black_Han_Sans } from 'next/font/google'
import Link from 'next/link';
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'WowLink | 퀵링크',
  description: 'WowLink'
}

const blackHanSans = Black_Han_Sans({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-black-han-sans',
})

export default async function QuickLinkPage() {
  const sites = await getSites();

  
  return (
    <div>
      <div className="text-center space-y-4 my-8">
        <h1 className={`text-2xl md:text-3xl lg:text-4xl ${blackHanSans.className}`}>
          <span className="text-yellow-500">
            퀵링크
          </span>
        </h1>
        <p className="text-lg text-muted-foreground md:text-xl">
          월드 오브 워크래프트 플레이에 도움이 되는 웹사이트, 툴을 제공하고 있습니다.
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
      <FilteredSites initialSites={sites} />
    </div>
  );
}