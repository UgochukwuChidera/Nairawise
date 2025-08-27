import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { OverviewChart } from "@/components/dashboard/overview-chart"
import { RecentTransactions } from "@/components/dashboard/recent-transactions"
import { StatCards } from "@/components/dashboard/stats-cards"
import { Plus } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 md:gap-8 relative">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">Welcome Back</h1>
          <p className="text-muted-foreground mt-2">Here's a snapshot of your financial health.</p>
        </div>
        <Button size="icon" className="rounded-full shadow-lg">
          <Plus className="h-5 w-5" />
          <span className="sr-only">Add new record</span>
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <StatCards />
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2 shadow-lg">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>A summary of your income and expenses.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <OverviewChart />
          </CardContent>
        </Card>
        <RecentTransactions />
      </div>
    </div>
  )
}
