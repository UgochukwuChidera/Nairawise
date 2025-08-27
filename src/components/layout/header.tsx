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
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Logo } from '@/components/logo'
import { NavLink } from './nav-link'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'

export function Header() {
  const { setTheme } = useTheme()

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
      <div className="hidden md:flex w-full items-center justify-between">
        {/* Left: Logo */}
        <div className="flex-1 min-w-0">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Logo />
          </Link>
        </div>
        
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
        <div className="flex flex-1 items-center justify-end gap-4 min-w-0">
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
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 mr-2" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 mr-2" />
                    <span>Toggle Theme</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                      <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTheme('system')}>System</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </div>

    </header>
  )
}
