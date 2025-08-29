
"use client"

import * as React from 'react'
import type { DateRange } from 'react-day-picker'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { bills } from '@/lib/placeholder-data'
import { AddBillDialog } from '@/components/bills/add-bill-dialog'
import { BillActions } from '@/components/bills/bill-actions'
import { cn } from '@/lib/utils'
import { BillFilters } from '@/components/bills/bill-filters'
import type { Bill } from '@/lib/types'
import { useSettings } from '@/context/settings-context'
import { Button } from '@/components/ui/button'
import { ArrowDown, ArrowUp } from 'lucide-react'

export default function BillsPage() {
  const { showMonetaryValues } = useSettings()
  const [nameFilter, setNameFilter] = React.useState('')
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>()
  const [statusFilter, setStatusFilter] = React.useState<string[]>([])
  const [minAmount, setMinAmount] = React.useState('')
  const [maxAmount, setMaxAmount] = React.useState('')
  const [sortOrder, setSortOrder] = React.useState<'newest' | 'oldest'>('newest');


  const getStatusClass = (status: 'Paid' | 'Pending' | 'Overdue') => {
    switch (status) {
      case 'Paid':
        return 'bg-gradient-to-r from-green-400 to-green-600 text-white'
      case 'Pending':
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white'
      case 'Overdue':
        return 'bg-gradient-to-r from-red-400 to-red-600 text-white'
      default:
        return 'bg-secondary text-secondary-foreground'
    }
  }

  const renderAmount = (amount: number) => {
    if (!showMonetaryValues) {
        return <span className="blur-sm">₦•••••</span>
    }
    return `₦${amount.toLocaleString()}`
  }

  const filteredBills = React.useMemo(() => {
    const filtered = bills.filter((bill) => {
      // Name filter
      if (nameFilter && !bill.name.toLowerCase().includes(nameFilter.toLowerCase())) {
        return false
      }
      // Status filter
      if (statusFilter.length > 0 && !statusFilter.includes(bill.status)) {
        return false
      }
      // Date range filter
      const billDueDate = new Date(bill.dueDate)
      if (dateRange?.from && billDueDate < dateRange.from) {
        return false
      }
      if (dateRange?.to && billDueDate > dateRange.to) {
        return false
      }
      // Amount range filter
      if (minAmount && bill.amount < parseFloat(minAmount)) {
        return false
      }
      if (maxAmount && bill.amount > parseFloat(maxAmount)) {
        return false
      }
      return true
    })

    // Sorting
    return filtered.sort((a, b) => {
        const dateA = new Date(a.dueDate).getTime();
        const dateB = new Date(b.dueDate).getTime();
        if (sortOrder === 'newest') {
            return dateB - dateA;
        } else {
            return dateA - dateB;
        }
    });

  }, [nameFilter, statusFilter, dateRange, minAmount, maxAmount, sortOrder])

  return (
    <div className="flex flex-1 flex-col gap-6 md:gap-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bill Tracker</h1>
          <p className="text-muted-foreground mt-2">
            Add, manage, and track all your upcoming bills.
          </p>
        </div>
        <div className="ml-4 shrink-0">
          <AddBillDialog />
        </div>
      </div>

      <BillFilters
        nameFilter={nameFilter}
        setNameFilter={setNameFilter}
        dateRange={dateRange}
        setDateRange={setDateRange}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        minAmount={minAmount}
        setMinAmount={setMinAmount}
        maxAmount={maxAmount}
        setMaxAmount={setMaxAmount}
        setSortOrder={setSortOrder}
      />

      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
                <CardTitle>Bill History</CardTitle>
                <CardDescription>
                    Manage your upcoming and past due bills.
                </CardDescription>
            </div>
            <div className="flex gap-2">
                <Button variant={sortOrder === 'newest' ? 'secondary' : 'outline'} size="sm" onClick={() => setSortOrder('newest')}>
                    <ArrowDown className="mr-2 h-4 w-4" /> Newest First
                </Button>
                <Button variant={sortOrder === 'oldest' ? 'secondary' : 'outline'} size="sm" onClick={() => setSortOrder('oldest')}>
                    <ArrowUp className="mr-2 h-4 w-4" /> Oldest First
                </Button>
            </div>
        </CardHeader>
        <CardContent>
          {/* Mobile View - Cards */}
          <div className="space-y-4 md:hidden">
            {filteredBills.length > 0 ? (
              filteredBills.map((bill: Bill) => (
                <Card key={bill.id} className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold">{bill.name}</p>
                      <p className="text-lg font-bold">{renderAmount(bill.amount)}</p>
                    </div>
                    <BillActions bill={bill} />
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <p className="text-muted-foreground">{bill.dueDate}</p>
                    <Badge
                      className={cn(
                        'justify-center rounded-md px-2 py-1 text-xs',
                        getStatusClass(bill.status)
                      )}
                    >
                      {bill.status}
                    </Badge>
                  </div>
                </Card>
              ))
            ) : (
              <div className="h-24 text-center flex items-center justify-center">
                <p>No bills found.</p>
              </div>
            )}
          </div>
          
          {/* Desktop View - Table */}
          <Table className="hidden md:table">
            <TableHeader>
              <TableRow>
                <TableHead>Bill</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBills.map((bill: Bill) => (
                <TableRow key={bill.id}>
                  <TableCell className="font-medium">{bill.name}</TableCell>
                  <TableCell>{bill.dueDate}</TableCell>
                  <TableCell className="text-center">
                    <Badge
                      className={cn(
                        'w-24 justify-center rounded-md px-2 py-1 text-xs',
                        getStatusClass(bill.status)
                      )}
                    >
                      {bill.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {renderAmount(bill.amount)}
                  </TableCell>
                  <TableCell className="text-right">
                    <BillActions bill={bill} />
                  </TableCell>
                </TableRow>
              ))}
              {filteredBills.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No bills found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
