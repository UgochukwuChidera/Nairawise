
'use client'

import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import { Header } from '@/components/layout/header'
import { ThemeProvider } from '@/components/theme-provider'
import { BudgetProvider } from '@/context/budget-context'
import { SettingsProvider } from '@/context/settings-context'
import { useEffect, useState } from 'react'
import { AuthProvider, useAuth } from '@/context/auth-context'
import { usePathname, useRouter } from 'next/navigation'

function AppContent({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isSubscribed, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])
  
  useEffect(() => {
    if (isLoading || !isClient) return;

    const isAuthRoute = pathname === '/auth';
    const isPricingRoute = pathname === '/pricing';

    if (!isAuthenticated && !isAuthRoute) {
      router.push('/auth');
    } else if (isAuthenticated && isAuthRoute) {
      router.push('/');
    } else if (isAuthenticated && !isSubscribed && !isPricingRoute) {
        router.push('/pricing');
    }

  }, [isAuthenticated, isSubscribed, isLoading, router, pathname, isClient]);

  if (isLoading || !isClient) {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <p>Loading...</p>
        </div>
    )
  }

  const isAuthPage = pathname === '/auth';
  const isPricingPage = pathname === '/pricing';

  return (
    <>
      {isAuthPage || isPricingPage ? (
        children
      ) : (
        <div className="flex min-h-screen w-full flex-col">
          <Header />
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-muted/20">
            {children}
          </main>
        </div>
      )}
      <Toaster />
    </>
  );
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

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
          <AuthProvider>
            <SettingsProvider>
              <BudgetProvider>
                <AppContent>{children}</AppContent>
              </BudgetProvider>
            </SettingsProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
