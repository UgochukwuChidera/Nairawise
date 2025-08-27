"use client"

import * as React from "react"
import { format } from "date-fns"
import type { DateRange } from "react-day-picker"
import { Calendar as CalendarIcon } from "lucide-react"

import { transactions } from "@/lib/placeholder-data"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ScrollArea } from "../ui/scroll-area"

export function TransactionsDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  const [description, setDescription] = React.useState("")
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>()
  const [minAmount, setMinAmount] = React.useState("")
  const [maxAmount, setMaxAmount] = React.useState("")

  const filteredTransactions = React.useMemo(() => {
    let filtered = transactions

    if (description) {
      filtered = filtered.filter((t) =>
        t.description.toLowerCase().includes(description.toLowerCase())
      )
    }

    if (dateRange?.from) {
      filtered = filtered.filter((t) => new Date(t.date) >= dateRange.from!)
    }
    if (dateRange?.to) {
      filtered = filtered.filter((t) => new Date(t.date) <= dateRange.to!)
    }

    if (minAmount) {
      filtered = filtered.filter((t) => t.amount >= parseFloat(minAmount))
    }

    if (maxAmount) {
      filtered = filtered.filter((t) => t.amount <= parseFloat(maxAmount))
    }

    return filtered
  }, [description, dateRange, minAmount, maxAmount])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="ml-auto gap-1">
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Transaction History</DialogTitle>
          <DialogDescription>
            View and filter your transaction history.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 border-t pt-4">
          <Input
            placeholder="Filter by description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "justify-start text-left font-normal",
                  !dateRange && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd, y")} -{" "}
                      {format(dateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
          <Input
            type="number"
            placeholder="Min amount"
            value={minAmount}
            onChange={(e) => setMinAmount(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Max amount"
            value={maxAmount}
            onChange={(e) => setMaxAmount(e.target.value)}
          />
        </div>

        <div className="flex-1 relative">
            <ScrollArea className="h-full absolute inset-0">
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                        <TableCell className="font-medium">{transaction.description}</TableCell>
                        <TableCell>{format(new Date(transaction.date), "PPP")}</TableCell>
                        <TableCell
                        className={cn(
                            "text-right font-bold",
                            transaction.type === "income" ? "text-green-500" : "text-red-500"
                        )}
                        >
                        {transaction.type === "income" ? "+" : "-"}₦
                        {transaction.amount.toLocaleString()}
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
                {filteredTransactions.length === 0 && (
                <div className="text-center p-8 text-muted-foreground">
                    No transactions match your filters.
                </div>
                )}
            </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  )
}
