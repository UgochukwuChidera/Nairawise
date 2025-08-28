
"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth-context";
import { usePathname, useRouter } from "next/navigation";
import { Header } from "@/components/layout/header";

export default function AppContent({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isSubscribed, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isLoading || !isClient) return;

    const isAuthRoute = pathname === "/auth";
    const isPricingRoute = pathname === "/pricing";

    if (!isAuthenticated && !isAuthRoute) {
      router.push("/auth");
    } else if (isAuthenticated && isAuthRoute) {
      router.push("/");
    } else if (isAuthenticated && !isSubscribed && !isPricingRoute) {
      router.push("/pricing");
    }
  }, [isAuthenticated, isSubscribed, isLoading, router, pathname, isClient]);

  const isAuthPage = pathname === "/auth";
  const isPricingPage = pathname === "/pricing";

  if (isLoading || !isClient) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (isAuthPage || isPricingPage) {
    return <>{children}</>;
  }

  if (isAuthenticated && isSubscribed) {
    return (
      <div className="flex min-h-screen w-full flex-col">
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-muted/20">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Loading...</p>
    </div>
  );
}
