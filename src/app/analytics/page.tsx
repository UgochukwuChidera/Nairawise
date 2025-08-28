
import { BudgetBreakdownChart } from '@/components/analytics/budget-breakdown-chart'
import { IncomeExpenseChart } from '@/components/analytics/income-expense-chart'
import { RollingAverageChart } from '@/components/analytics/rolling-average-chart'
import { SavingsOverspendChart } from '@/components/analytics/savings-overspend-chart'
import { SavingsRateChart } from '@/components/analytics/savings-rate-chart'
import { SpendPredictor } from '@/components/analytics/spend-predictor'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export default function AnalyticsPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 md:gap-8">
       <div>
          <h1 className="text-3xl font-bold tracking-tight">Financial Analytics</h1>
          <p className="text-muted-foreground mt-2">
            A deep dive into your income, expenses, and spending habits.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle>Monthly Income vs. Expenses</CardTitle>
                    <CardDescription>Comparing your total income and expenses each month.</CardDescription>
                </CardHeader>
                <CardContent>
                    <IncomeExpenseChart />
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Budget Breakdown</CardTitle>
                    <CardDescription>How your spending is distributed across categories.</CardDescription>
                </CardHeader>
                <CardContent>
                    <BudgetBreakdownChart />
                </CardContent>
            </Card>
        </div>

         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
                <CardHeader>
                    <CardTitle>Savings & Overspend</CardTitle>
                    <CardDescription>Your monthly net savings or overspending.</CardDescription>
                </CardHeader>
                <CardContent>
                    <SavingsOverspendChart />
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Savings Rate</CardTitle>
                    <CardDescription>The percentage of your income you've saved each month.</CardDescription>
                </CardHeader>
                <CardContent>
                    <SavingsRateChart />
                </CardContent>
            </Card>
            <SpendPredictor />
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Rolling Average Spend</CardTitle>
                <CardDescription>Your average daily spending over different time windows.</CardDescription>
            </CardHeader>
            <CardContent>
                <RollingAverageChart />
            </CardContent>
        </Card>
    </div>
  )
}
