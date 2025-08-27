'use client'

import Link from 'next/link'
import {
  Menu,
  Home,
  Wallet,
  Receipt,
  Bot,
  Newspaper,
  Users,
  CircleUser,
} from '@/components/icons'
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
    { href: '/', icon: Home, label: 'Dashboard' },
    { href: '/budget', icon: Wallet, label: 'Budget Planner' },
    { href: '/bills', icon: Receipt, label: 'Bill Tracker' },
    { href: '/assistant', icon: Bot, label: 'Smart Assistant' },
    { href: '/blog', icon: Newspaper, label: 'Finance Blog' },
    { href: '/hub', icon: Users, label: 'Discussion Hub' },
  ];

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Logo />
          <span className="sr-only">NairaWise</span>
        </Link>
        {navItems.map((item) => (
            <NavLink key={item.href} href={item.href} icon={item.icon}>
                {item.label}
            </NavLink>
        ))}
      </nav>
      
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold mb-4"
            >
              <Logo />
              <span className="sr-only">NairaWise</span>
            </Link>
            {navItems.map((item) => (
                <NavLink key={item.href} href={item.href} icon={item.icon}>
                    {item.label}
                </NavLink>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      <div className="w-full flex-1">
        {/* Can add breadcrumbs or page title here later */}
      </div>

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
    </header>
  )
}
