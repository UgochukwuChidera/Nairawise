"use client"

import * as React from "react"
import { MoreHorizontal } from "lucide-react"

import type { Bill } from "@/lib/types"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"

type BillActionsProps = {
  bill: Bill
}

export function BillActions({ bill }: BillActionsProps) {
  const { toast } = useToast()

  const handleStatusChange = (status: Bill['status']) => {
    console.log(`Updating bill "${bill.name}" status to:`, status)
    toast({
      title: "Status Updated",
      description: `The bill "${bill.name}" has been marked as ${status}.`,
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">More options</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onSelect={() => handleStatusChange('Paid')}>
          Mark as Paid
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleStatusChange('Pending')}>
          Mark as Pending
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleStatusChange('Overdue')} className="text-destructive">
          Mark as Overdue
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
