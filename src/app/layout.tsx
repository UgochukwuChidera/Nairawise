'use client'

import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import { Header } from '@/components/layout/header'
import { ThemeProvider } from '@/components/theme-provider'
import { BudgetProvider } from '@/context/budget-context'
import { useEffect, useState } from 'react'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>NairaWise</title>
        <meta name="description" content="A smart finance manager for students in Nigeria." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
          <BudgetProvider>
            <div className="flex min-h-screen w-full flex-col">
              {isClient ? <Header /> : null}
              <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-muted/20">
                {children}
              </main>
            </div>
            <Toaster />
          </BudgetProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
