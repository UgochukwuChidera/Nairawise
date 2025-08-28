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

export default function BillsPage() {
  const [nameFilter, setNameFilter] = React.useState('')
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>()
  const [statusFilter, setStatusFilter] = React.useState<string[]>([])
  const [minAmount, setMinAmount] = React.useState('')
  const [maxAmount, setMaxAmount] = React.useState('')

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

  const filteredBills = React.useMemo(() => {
    return bills.filter((bill) => {
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
  }, [nameFilter, statusFilter, dateRange, minAmount, maxAmount])

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
      />

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Bills</CardTitle>
          <CardDescription>
            Manage your upcoming and past due bills.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
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
                    ₦{bill.amount.toLocaleString()}
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
