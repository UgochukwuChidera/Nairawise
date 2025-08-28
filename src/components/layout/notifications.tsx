'use client'

import { Bell, Receipt, Users, TrendingUp, TrendingDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
  SheetFooter,
} from '@/components/ui/sheet'
import { notifications } from '@/lib/placeholder-data'
import type { Notification } from '@/lib/types'
import { cn } from '@/lib/utils'
import { ScrollArea } from '../ui/scroll-area'

const iconMap: { [key in Notification['type']]: React.ReactNode } = {
  bill_due: <Receipt className="h-5 w-5 text-yellow-500" />,
  budget_exceeded: <TrendingDown className="h-5 w-5 text-red-500" />,
  new_reply: <Users className="h-5 w-5 text-blue-500" />,
  income_received: <TrendingUp className="h-5 w-5 text-green-500" />,
}

export function Notifications() {
  const unreadCount = notifications.filter((n) => !n.isRead).length

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
              {unreadCount}
            </span>
          )}
          <span className="sr-only">Toggle notifications</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
          <SheetDescription>
            You have {unreadCount} unread messages.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="space-y-4 pr-4">
              {notifications.map((notification) => (
                <div key={notification.id} className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 relative border">
                   {!notification.isRead && (
                    <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-primary" />
                  )}
                  <div className="flex-shrink-0 mt-1">
                    {iconMap[notification.type]}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{notification.title}</p>
                    <p className="text-sm text-muted-foreground">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notification.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
        <SheetFooter>
            <Button variant="outline" className="w-full">
              Mark all as read
            </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
