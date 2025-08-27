'use client'

import Link from 'next/link'
import { Menu, CircleUser } from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Logo } from '@/components/logo'
import { NavLink } from './nav-link'
import { ModeToggle } from './mode-toggle'

export function Header() {
  const navItems = [
    { href: '/', label: 'Dashboard' },
    { href: '/budget', label: 'Budget' },
    { href: '/bills', label: 'Bills' },
    { href: '/assistant', label: 'Assistant' },
    { href: '/blog', label: 'Blog' },
    { href: '/hub', label: 'Hub' },
  ]

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b-0 bg-background/95 px-4 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-6">
      {/* Mobile Nav */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-4 text-base font-medium">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold mb-4"
            >
              <Logo />
            </Link>
            {navItems.map((item) => (
                <NavLink key={item.href} href={item.href}>
                    {item.label}
                </NavLink>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      {/* Desktop Nav */}
      <div className="hidden md:flex w-full items-center">
        {/* Left: Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Logo />
        </Link>
        
        {/* Center: Nav Links */}
        <nav className="flex-1 flex justify-center">
            <div className="flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-8 md:text-sm lg:gap-10">
                {navItems.map((item) => (
                    <NavLink key={item.href} href={item.href}>
                        {item.label}
                    </NavLink>
                ))}
            </div>
        </nav>

        {/* Right: Toggles and User Menu */}
        <div className="flex items-center gap-4">
            <ModeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="rounded-full">
                  <CircleUser className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </div>

    </header>
  )
}
