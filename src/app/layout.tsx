import { ThemeProvider } from 'next-themes'
import { Navigation } from '../components/layout/Navigation'
import './globals.css'
import { Footer } from '@/components/layout/Footer'
import { Analytics } from "@vercel/analytics/react"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico"/>
        <meta property="og:title" content="WowLink"/>
        <meta property="og:description" content="한국 유저들을 위한 와우 큐레이션 사이트"/>
        <meta property="og:image" content="https://wowlink.me/images/assets/wl.png"/>
        <meta property="og:url" content="https://wowlink.me"/>
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex flex-col min-h-screen">
            <header className="sticky top-0 z-50 w-full border-b bg-background/60 backdrop-blur">
              <div className="max-w-7xl mx-auto px-4">
                <div className="flex h-14 items-center col-span-12 xl:col-span-8">
                  <Navigation />
                </div>
              </div>
            </header>
            <div className="max-w-7xl mx-auto px-4">
                <main className="col-span-12 xl:col-span-8 p-0 mb-6">
                  {children}
                  <Analytics />
                </main>
            </div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}