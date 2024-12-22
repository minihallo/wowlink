import { ThemeProvider } from 'next-themes'
import { Navigation } from '../components/layout/Navigation'
import './globals.css'

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
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <header className="sticky top-0 z-50 w-full border-b">
            <div className="max-w-3xl mx-auto px-4">
              <div className="flex h-14 items-center">
                <Navigation />
              </div>
            </div>
          </header>
          <main className="container mx-auto px-4">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}