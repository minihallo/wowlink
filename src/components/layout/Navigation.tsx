'use client'

import Link from 'next/link'
import { Menu } from 'lucide-react'
import { useState } from 'react'
import { ThemeSwitch } from '@/components/layout/ThemeSwitch'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetFooter,
    SheetTrigger,
} from '@/components/ui/sheet'
import { Poppins, Black_Han_Sans } from 'next/font/google'
import Image from "next/image";

const blackHanSans = Black_Han_Sans({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-black-han-sans',
})

const poppins = Poppins({
  weight: ['600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
})

const navigation = [
    { title: '퀵링크', url: '/quickLink' },
    { title: '직업별 디스코드', url: '/discord' },
    { title: '토큰 시세', url: '/token' },
    // { title: '스트리머', url: '/s' },
    // { title: '업데이트', url: '/update' },
    // { title: '후원하기', url: '/donate' },
]
  
export function Navigation() {
    const [isOpen, setIsOpen] = useState(false)
    const closeSheet = () => setIsOpen(false)
    
    return (
      <nav className="flex w-full">
        <div className="flex-shrink-0 flex items-center gap-2">
          <Image
            src="/images/assets/wowtoken.png"
            alt="WoW 토큰"
            width={36}
            height={36}
            className="object-contain"
          />
          <Link
            href="/"
            className="text-2xl font-black tracking-tight hover:text-primary/90 transition-colors font-black-han-sans"
          >
            WoWLink
          </Link>
        </div>

        {/* PC 네비게이션 */}
        <div className="flex items-center gap-4 ml-auto">

        <div id="pc" className="hidden md:flex md:items-center md:gap-3">
          {navigation.map((item, index) => (
            <Link 
              key={index} 
              href={item.url} 
              prefetch={false}
            >
              {item.title}
            </Link>
          ))}
        </div>

        {/* Mobile 네비게이션 */}
        <div className="flex items-center gap-4">
          <div className="switch">
            <ThemeSwitch />
          </div>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger className="md:hidden">
              <Menu className="h-6 w-6 ml-auto" />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader className="mb-4">
                <SheetTitle>메뉴</SheetTitle>
                <SheetDescription className="flex flex-col space-y-2">
                  {navigation.map((item, index) => (
                    <Link
                      key={index}
                      href={item.url}
                      className="flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800/50 dark:hover:bg-zinc-800"
                      prefetch={false}
                      onClick={closeSheet}
                    >
                      {item.title}
                    </Link>
                  ))}
                </SheetDescription>
              </SheetHeader>
              <SheetFooter className="absolute bottom-4 left-4 right-4 text-xs text-gray-500">
                <div className="flex justify-center space-x-4">
                  <Link
                    href="https://tally.so/r/3jG8z4"
                    className="hover:underline"
                    target="_blank"
                  >
                    문의 및 건의사항
                  </Link>
                  <Link
                    href="mailto:loitermin@gmail.com"
                    className="hover:underline"
                    target="_blank"
                  >
                    메일 보내기
                  </Link>
                </div>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
        </div>
      </nav>
    )
  }