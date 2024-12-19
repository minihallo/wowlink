'use client'

import Link from 'next/link'
import { Menu } from 'lucide-react'
import { useState } from 'react'
import { ThemeSwitch } from './ThemeSwitch'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetFooter,
    SheetTrigger,
} from '@/components/ui/sheet'

const navigation = [
    { title: '퀵링크', url: '/q' },
    { title: '가이드', url: '/act' },
    { title: '시세', url: '/price/currency' },
    { title: '스트리머', url: '/s' },
    { title: '팁', url: '/tip' },
    { title: '업데이트', url: '/update' },
    { title: '후원하기', url: '/donate' },
]
  
export function Navigation() {
    const [isOpen, setIsOpen] = useState(false)
    const closeSheet = () => setIsOpen(false)
  
    return (
      <nav className="flex w-full">
        {/* 로고나 사이트 제목이 필요하다면 여기에 */}
        <div className="flex-shrink-0">
          <Link href="/" className="text-xl font-semibold">
            Title
          </Link>
        </div>

        {/* PC 네비게이션 */}
        <div id="pc" className="hidden md:flex md:items-center md:gap-3 ml-auto">
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
  
        {/* 테마 스위치와 모바일 메뉴 */}
        <div className="flex items-center space-x-4">
          <div className="switch">
            <ThemeSwitch />
          </div>
    
          {/* 모바일 메뉴 */}
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
                    href="https://tally.so/r/31E7Gp"
                    className="hover:underline"
                    target="_blank"
                  >
                    문의 및 건의사항
                  </Link>
                  <Link
                    href="mailto:i@poe.gy"
                    className="hover:underline"
                    target="_blank"
                  >
                    i@poe.gy
                  </Link>
                </div>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    )
  }