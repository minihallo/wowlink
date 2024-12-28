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