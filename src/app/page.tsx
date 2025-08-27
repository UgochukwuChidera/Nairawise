import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { OverviewChart } from "@/components/dashboard/overview-chart"
import { RecentTransactions } from "@/components/dashboard/recent-transactions"
import { StatCards } from "@/components/dashboard/stats-cards"
import { AddRecordDialog } from "@/components/dashboard/add-record-dialog"

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 md:gap-8 relative">
      <div className="flex items-center justify-between">
        <div className="grid gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
          <p className="text-muted-foreground mt-2">Here's a snapshot of your financial health.</p>
        </div>
        <div className="shrink-0">
          <AddRecordDialog />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <StatCards />
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2 shadow-lg">
          <OverviewChart />
        </Card>
        <RecentTransactions />
      </div>
    </div>
  )
}
