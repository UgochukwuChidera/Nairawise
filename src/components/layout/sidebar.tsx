import {
  Home,
  Wallet,
  Receipt,
  Bot,
  Newspaper,
  Users,
} from '@/components/icons';
import { Logo } from '@/components/logo';
import { NavLink } from './nav-link';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';

export function AppSidebar() {
  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Logo />
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <NavLink href="/" icon={Home}>
              Dashboard
            </NavLink>
            <NavLink href="/budget" icon={Wallet}>
              Budget Planner
            </NavLink>
            <NavLink href="/bills" icon={Receipt}>
              Bill Tracker
            </NavLink>
            <NavLink href="/assistant" icon={Bot}>
              Smart Assistant
            </NavLink>
            <NavLink href="/blog" icon={Newspaper}>
              Finance Blog
            </NavLink>
            <NavLink href="/hub" icon={Users}>
              Discussion Hub
            </NavLink>
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Card>
            <CardHeader className="p-2 pt-0 md:p-4">
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <p className="text-xs text-muted-foreground mb-2">Contact our student support team for any questions.</p>
              <Button size="sm" className="w-full">
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
