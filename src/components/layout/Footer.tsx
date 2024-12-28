// components/layout/Footer.tsx
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t mt-auto py-2 px-4">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-1 text-sm text-muted-foreground">
        <div className="text-center">
          한국 유저들을 위한 월드 오브 워크래프트 정보 웹사이트 WowLink
        </div>
        <div className="text-center text-xs">
          WowLink is not affiliated with or endorsed by Blizzard Entertainment.
        </div>
        <div className="flex gap-4 text-xs">
          <Link
            href="https://tally.so/r/3jG8z4"
            className="hover:text-primary transition-colors"
            target="_blank"
          >
            문의 및 건의사항
          </Link>
          <Link
            href="mailto:loitermin@gmail.com"
            className="hover:text-primary transition-colors"
            target="_blank"
          >
            메일 보내기
          </Link>
        </div>
      </div>
    </footer>
  )
}