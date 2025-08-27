'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

type NavLinkProps = {
  href: string
  children: React.ReactNode
  onClick?: () => void
}

export function NavLink({ href, children, onClick }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'text-sm font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary',
        isActive && 'text-primary'
      )}
    >
      {children}
    </Link>
  )
}
