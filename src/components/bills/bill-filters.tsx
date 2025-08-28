"use client"

import * as React from "react"
import { format } from "date-fns"
import type { DateRange } from "react-day-picker"
import { Calendar as CalendarIcon, ListFilter } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import type { Bill } from "@/lib/types"

type BillFiltersProps = {
  nameFilter: string
  setNameFilter: (value: string) => void
  dateRange: DateRange | undefined
  setDateRange: (value: DateRange | undefined) => void
  statusFilter: string[]
  setStatusFilter: (value: string[]) => void
  minAmount: string
  setMinAmount: (value: string) => void
  maxAmount: string
  setMaxAmount: (value: string) => void
}

const statusOptions: Bill['status'][] = ["Paid", "Pending", "Overdue"]

export function BillFilters({
  nameFilter,
  setNameFilter,
  dateRange,
  setDateRange,
  statusFilter,
  setStatusFilter,
  minAmount,
  setMinAmount,
  maxAmount,
  setMaxAmount,
}: BillFiltersProps) {

  const handleStatusChange = (status: string) => {
    setStatusFilter(
      statusFilter.includes(status)
        ? statusFilter.filter((s) => s !== status)
        : [...statusFilter, status]
    )
  }

  const clearFilters = () => {
    setNameFilter("");
    setDateRange(undefined);
    setStatusFilter([]);
    setMinAmount("");
    setMaxAmount("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Filters</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <Input
          placeholder="Search by bill name..."
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
        />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !dateRange && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2" />
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
                <span>Filter by due date</span>
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

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-start">
                <ListFilter className="mr-2" />
                Filter by status
                {statusFilter.length > 0 && ` (${statusFilter.length})`}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuLabel>Bill Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {statusOptions.map((status) => (
              <DropdownMenuCheckboxItem
                key={status}
                checked={statusFilter.includes(status)}
                onSelect={(e) => e.preventDefault()} // prevent menu from closing
                onCheckedChange={() => handleStatusChange(status)}
              >
                {status}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex gap-2">
            <Input
            type="number"
            placeholder="Min amount (₦)"
            value={minAmount}
            onChange={(e) => setMinAmount(e.target.value)}
            />
            <Input
            type="number"
            placeholder="Max amount (₦)"
            value={maxAmount}
            onChange={(e) => setMaxAmount(e.target.value)}
            />
        </div>

        <Button variant="ghost" onClick={clearFilters} className="w-full">Clear Filters</Button>
      </CardContent>
    </Card>
  )
}
