
"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts'
import { ChartTooltipContent, ChartContainer } from '@/components/ui/chart'
import { monthlyFinancialData } from '@/lib/analytics-data'

export function IncomeExpenseChart() {
  return (
    <ChartContainer config={{}} className="w-full" style={{ height: '300px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={monthlyFinancialData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `₦${Number(value) / 1000}k`}
          />
          <Tooltip
            content={
              <ChartTooltipContent
                formatter={(value, name) => [`₦${(value as number).toLocaleString()}`, name]}
              />
            }
          />
          <Legend />
          <Bar
            dataKey="income"
            fill="hsl(var(--chart-income))"
            radius={[4, 4, 0, 0]}
            name="Income"
          />
          <Bar
            dataKey="expenses"
            fill="hsl(var(--chart-expense))"
            radius={[4, 4, 0, 0]}
            name="Expenses"
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
