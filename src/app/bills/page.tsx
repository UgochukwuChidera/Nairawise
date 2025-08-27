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

export default function BillsPage() {
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
              {bills.map((bill) => (
                <TableRow key={bill.id}>
                  <TableCell className="font-medium">{bill.name}</TableCell>
                  <TableCell>{bill.dueDate}</TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant={
                        bill.status === 'Paid'
                          ? 'default'
                          : bill.status === 'Overdue'
                          ? 'destructive'
                          : 'secondary'
                      }
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
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
