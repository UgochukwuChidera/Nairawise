
"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BudgetBreakdownChart } from "@/components/analytics/budget-breakdown-chart";
import { IncomeExpenseChart } from "@/components/analytics/income-expense-chart";
import { RollingAverageChart } from "@/components/analytics/rolling-average-chart";
import { SavingsOverspendChart } from "@/components/analytics/savings-overspend-chart";
import { SavingsRateChart } from "@/components/analytics/savings-rate-chart";
import { SpendPredictor } from "@/components/analytics/spend-predictor";
import { dailySpendData, calculateRollingAverage } from "@/lib/analytics-data";

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<number>(5);

  const rollingAverageData = useMemo(() => {
    return calculateRollingAverage(dailySpendData, period);
  }, [period]);

  return (
    <div className="flex flex-1 flex-col gap-6 md:gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Deep dive into your financial habits and trends.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Income vs. Expenses</CardTitle>
            <CardDescription>Your monthly income compared to your expenses.</CardDescription>
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
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Savings & Overspend Analysis</CardTitle>
            <CardDescription>Your net savings or overspend each month.</CardDescription>
          </CardHeader>
          <CardContent>
            <SavingsOverspendChart />
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Savings Rate</CardTitle>
            <CardDescription>The percentage of your income you're saving over time.</CardDescription>
          </CardHeader>
          <CardContent>
            <SavingsRateChart />
          </CardContent>
        </Card>
        <SpendPredictor />
        <Card className="lg:col-span-3">
            <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <CardTitle>Rolling Average Spend</CardTitle>
                        <CardDescription>Your average daily spend over a selected period.</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                        <Select value={String(period)} onValueChange={(value) => setPeriod(Number(value))}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select period" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="5">5-Day Average</SelectItem>
                                <SelectItem value="10">10-Day Average</SelectItem>
                                <SelectItem value="20">20-Day Average</SelectItem>
                                <SelectItem value="50">50-Day Average</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <RollingAverageChart data={rollingAverageData} />
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
