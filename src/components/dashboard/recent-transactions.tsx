
'use client'

import { ArrowUpRight } from 'lucide-react'
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
import { transactions } from '@/lib/placeholder-data'
import { cn } from '@/lib/utils'
import { TransactionsDialog } from './transactions-dialog'
import { useSettings } from '@/context/settings-context'


export function RecentTransactions() {
  const { showMonetaryValues } = useSettings()

  const renderAmount = (amount: number, type: 'income' | 'expense') => {
    if (!showMonetaryValues) {
        return <span className="blur-sm">+/- ₦•••••</span>
    }
    return `${type === 'income' ? '+' : '-'}₦${amount.toLocaleString()}`
  }

  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Transactions</CardTitle>
          <CardDescription>
            Recent transactions from your account.
          </CardDescription>
        </div>
        <TransactionsDialog>
            <ArrowUpRight className="h-4 w-4" />
            View All
        </TransactionsDialog>
      </CardHeader>
      <CardContent>
        <div className="-mx-6">
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead className="px-6">Description</TableHead>
                <TableHead className="text-right px-6">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {transactions.slice(0, 5).map((transaction) => (
                <TableRow key={transaction.id}>
                    <TableCell className="px-6">
                    <div className="font-medium">{transaction.description}</div>
                    <div className="text-sm text-muted-foreground">
                        {transaction.date}
                    </div>
                    </TableCell>
                    <TableCell className={cn(
                    "text-right font-bold px-6",
                    showMonetaryValues && (transaction.type === 'income' ? 'text-green-500' : 'text-red-500')
                    )}>
                    {renderAmount(transaction.amount, transaction.type)}
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </div>
      </CardContent>
    </Card>
  )
}
