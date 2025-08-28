
"use client"

import * as React from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { DollarSign, TrendingUp, TrendingDown, Wallet } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSettings } from '@/context/settings-context'

const MoneyValue = ({ value }: { value: number }) => {
  const { showMonetaryValues } = useSettings()

  return (
    <span
      className={cn(
        "text-2xl font-bold transition-all duration-300",
        !showMonetaryValues && "blur-sm"
      )}
    >
      {showMonetaryValues ? `₦${value.toLocaleString()}`: '₦•••••'}
    </span>
  )
}


export function StatCards() {
  return (
    <>
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Income</CardTitle>
          <TrendingUp className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <MoneyValue value={65000} />
          <p className="text-xs text-muted-foreground">in the last month</p>
        </CardContent>
      </Card>
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          <TrendingDown className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <MoneyValue value={17500} />
          <p className="text-xs text-muted-foreground">in the last month</p>
        </CardContent>
      </Card>
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Savings</CardTitle>
          <Wallet className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <MoneyValue value={47500} />
          <p className="text-xs text-muted-foreground">
            Current balance
          </p>
        </CardContent>
      </Card>
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Next Bill Due</CardTitle>
          <DollarSign className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
           <MoneyValue value={25000} />
          <p className="text-xs text-muted-foreground">Hostel Rent on Nov 1</p>
        </CardContent>
      </Card>
    </>
  )
}
