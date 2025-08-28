
"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts'
import { ChartTooltipContent, ChartContainer } from '@/components/ui/chart'
import { monthlyFinancialData } from '@/lib/analytics-data'

export function SavingsRateChart() {
  const savingsRateData = monthlyFinancialData.map(item => ({
    month: item.month,
    savingsRate: item.income > 0 ? Math.round(((item.income - item.expenses) / item.income) * 100) : 0,
  }))

  return (
    <ChartContainer config={{}} className="w-full" style={{ height: '300px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={savingsRateData}>
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
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip
            content={
              <ChartTooltipContent
                formatter={(value, name) => [`${value}%`, name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())]}
              />
            }
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="savingsRate"
            stroke="hsl(var(--chart-savings))"
            strokeWidth={3}
            dot={{ r: 5, fill: 'hsl(var(--background))', stroke: 'hsl(var(--chart-savings))', strokeWidth: 2 }}
            activeDot={{ r: 7 }}
            name="% of Income Saved"
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
